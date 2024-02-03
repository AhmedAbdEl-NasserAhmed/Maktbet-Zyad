import {
  BillsDoc,
  HttpInitialState,
  MissingProductsDoc,
  OutlaysDoc,
  PurchasesDoc,
  StockDoc,
} from ".";

export interface StockInitialState extends HttpInitialState<StockDoc> {
  filteredStockData: StockDoc[];
  productsInStore: StockDoc[];
  totalProductsBudget: number;
  totalProductsProfit: number;
}

export interface BillsInitialState extends HttpInitialState<BillsDoc> {
  billSelectedProducts: StockDoc[];
  dailyBills: BillsDoc[];
  dailyBillsTotal: number;
  total: number;
}

export interface PurchasesInitialState extends HttpInitialState<PurchasesDoc> {
  billSelectedProducts: StockDoc[];
  total: number;
  dailyPurchases: PurchasesDoc[];
}

export interface OutlaysInitialState extends HttpInitialState<OutlaysDoc> {
  dailyOutlays: OutlaysDoc[];
  dailyOutlaysTotal: number;
}

//prettier-ignore
export interface MissingProductsInitialState extends HttpInitialState<MissingProductsDoc> {
  dailyMissingProducts: MissingProductsDoc[];
}
