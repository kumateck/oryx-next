export interface paginationParams {
  hasNextPage: boolean | undefined;
  fetchNextPage: (pageParam?: number) => void;
  fetchPreviousPage: (pageParam?: number) => void;
  fetchFirstPage: (pageParam?: number) => void;
  fetchLastPage: (pageParam?: number) => void;
  fetchGotoPage: (pageParam: number) => void;
  hasPreviousPage: boolean | undefined;
}

export type TPaginationResponse = {
  onChangePageSize?: (pageSize: number) => void;
  pageIndex: number;
  pageCount: number;
  totalRecordCount: number;
  numberOfPagesToShow: number;
  startPageIndex: number;
  stopPageIndex: number;
  pageSize?: number;
  actions?: React.ReactNode;
};
