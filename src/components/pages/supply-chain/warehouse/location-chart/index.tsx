"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

import { AsyncSelect, Card, CardTitle } from "@/components/ui";
import { EMaterialKind, Option } from "@/lib";
import {
  MaterialBatchDto,
  WarehouseLocationRackDto,
  useLazyGetApiV1WarehouseRackByRackIdQuery,
  useLazyGetApiV1WarehouseRackQuery,
} from "@/lib/redux/api/openapi.generated";
import AccessTabs from "@/shared/access";
import { ClientDatatable } from "@/shared/datatable";
import EmptyState from "@/shared/empty";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import SkeletonLoadingPage from "@/shared/skeleton-page-loader";
import PageTitle from "@/shared/title";

import { getColumns } from "./columns";

const LocationChart = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const kind = searchParams.get("kind") as unknown as EMaterialKind; // Extracts 'type' from URL

  const [loadRacks, { isLoading: isLoadingRacks }] =
    useLazyGetApiV1WarehouseRackQuery();

  const [loadRackShelves, { isLoading: isLoadingRackShelves }] =
    useLazyGetApiV1WarehouseRackByRackIdQuery();

  const [selectedRack, setSelectedRack] = useState<Option>();
  const [selectedRackShelves, setSelectedRackShelves] =
    useState<WarehouseLocationRackDto>();
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const handleFalseReload = (reload: boolean) => {
    setReloadTrigger(reload);
  };

  const fetchOptions = async (searchQuery: string, page: number) => {
    const res = await loadRacks({
      searchQuery,
      page,
      kind: kind || EMaterialKind.Raw,
    }).unwrap();
    const response = {
      options: res?.data?.map((item) => ({
        label: item.warehouseLocation?.name + "-" + item.name,
        value: item.id,
      })) as Option[],
      hasNext: (res?.pageIndex || 0) < (res?.stopPageIndex as number),
      hasPrevious: (res?.pageIndex as number) > 1,
    };
    return response;
  };
  const handleOnSeletRack = async (rack: Option) => {
    setSelectedRack(rack);
    const response = await loadRackShelves({
      rackId: rack.value,
    }).unwrap();

    const shelves = response;
    setSelectedRackShelves(shelves);
  };

  const pathname = usePathname();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleTabClick = (tabType: EMaterialKind) => {
    router.push(pathname + "?" + createQueryString("kind", tabType.toString()));
    setReloadTrigger(true);
  };

  return (
    <ScrollablePageWrapper>
      <div className="space-y-3">
        <div className="flex items-center justify-between py-2">
          <PageTitle title="Location Chart Records" />
          <AccessTabs
            handleTabClick={handleTabClick}
            type={kind}
            tabs={[
              {
                label: EMaterialKind[EMaterialKind.Raw],
                value: EMaterialKind.Raw.toString(),
              },
              {
                label: EMaterialKind[EMaterialKind.Packing],
                value: EMaterialKind.Packing.toString(),
              },
            ]}
          />
        </div>

        <div className="max-w-md">
          <AsyncSelect
            value={selectedRack}
            onChange={handleOnSeletRack}
            fetchOptions={fetchOptions}
            isLoading={isLoadingRacks}
            reloadTrigger={reloadTrigger}
            setReloadTrigger={handleFalseReload}
          />
        </div>
        {!selectedRack?.value && (
          <EmptyState
            title="No rack selected"
            description="Please select a rack"
          />
        )}
        {isLoadingRackShelves && <SkeletonLoadingPage />}
        <div className="space-y-3">
          {selectedRackShelves?.shelves?.map((shelf) => (
            <Card key={shelf.id} className="space-y-4 p-5">
              <CardTitle>
                {`Shelf ${shelf.code || shelf.name} - Rack: ${selectedRackShelves?.name}`}
              </CardTitle>
              <ClientDatatable
                normalTable
                data={
                  (shelf.materialBatches
                    ?.map((smb) => smb.materialBatch)
                    .filter(
                      (batch) => batch !== undefined,
                    ) as MaterialBatchDto[]) ?? []
                }
                isLoading={isLoadingRackShelves}
                columns={getColumns()}
              />
            </Card>
          ))}
        </div>
      </div>
    </ScrollablePageWrapper>
  );
};

export default LocationChart;
