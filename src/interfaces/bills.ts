import { StockDoc } from ".";

export interface GetSearchValue {
  type: string;
  payload: { searchValue: string };
}

// export interface BillsProduct {
//   type: string;
//   payload: { data: StockDoc[]; total: number };
// }
