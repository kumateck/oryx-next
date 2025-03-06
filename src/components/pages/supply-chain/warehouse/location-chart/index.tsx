"use client";

import { Control, useForm } from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { Card, CardTitle } from "@/components/ui";
import { InputTypes, Option } from "@/lib";
import {
  MaterialBatchDto,
  useGetApiV1WarehouseRackByRackIdQuery,
  useGetApiV1WarehouseRackQuery,
} from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import TableForData from "./table";
import { LocationChartDto } from "./types";

const LocationChart = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useForm<LocationChartDto>({
    mode: "all",
    defaultValues: {
      rackId: undefined,
    },
  });

  const selectedRackId = watch("rackId");
  console.log("Selected Rack ID:", selectedRackId);

  const { data: selectedRack } = useGetApiV1WarehouseRackByRackIdQuery(
    { rackId: selectedRackId?.value },
    { skip: !selectedRackId },
  );

  const { data: racks } = useGetApiV1WarehouseRackQuery({
    page: 1,
    pageSize: 100,
  });

  const rackOptions = racks?.data?.map((rack) => ({
    label: `${rack?.warehouseLocation?.name}-${rack.name}`,
    value: String(rack.id),
  })) as Option[];

  return (
    <ScrollablePageWrapper>
      <div className="space-y-3">
        <PageTitle title="Location Chart Record" />

        <div className="flex items-center justify-between">
          <div className="w-1/2">
            <FormWizard
              className="w-full gap-x-10 gap-y-5 space-y-0"
              fieldWrapperClassName="flex-grow"
              config={[
                {
                  label: "Rack Number",
                  type: InputTypes.SELECT,
                  control: control as unknown as Control,
                  name: "rackId",
                  required: true,
                  onModal: true,
                  placeholder: "Select Rack Number",
                  options: rackOptions,
                  errors,
                },
              ]}
            />
          </div>
          {/* <div>
            <Button
              variant={"default"}
              className="flex items-center gap-2 bg-neutral-dark"
            >
              <Icon name="Printer" className="h-4 w-4" />
              <span>Print Chart</span>
            </Button>
          </div> */}
        </div>

        {/* Render shelves with their material batches */}
        {selectedRack?.shelves?.map((shelf) => (
          <Card key={shelf.id} className="space-y-4 p-5">
            <CardTitle>
              {`Shelf ${shelf.code || shelf.name} - Rack: ${selectedRack.warehouseLocation?.name}-${selectedRack.name}`}
            </CardTitle>
            <TableForData
              lists={
                shelf.materialBatches
                  ?.map((smb) => smb.materialBatch)
                  .filter((batch) => batch !== undefined) as MaterialBatchDto[]
              }
              // Remove setItemLists if not used for editing
              setItemLists={() => {}}
            />
          </Card>
          // <h3 key={shelf.id}>I should appear</h3>
        ))}
      </div>
    </ScrollablePageWrapper>
  );
};

export default LocationChart;
