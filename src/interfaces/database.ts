import { COLLECTIONS } from "../constants";
import { BillType } from "../types/bills";

export interface StockDoc {
  id?: string;
  productName: string;
  category: string;
  numberOfPieces: number;
  priceOfPiece: number;
  numberOfUnits: number;
  priceOfUnit: number;
  purchasingCosts: number;
  profitOfPiece: number;
  profitOfUnit: number;
  totalProfit: number;
  profitPercent: number;
  totalProductAmount?: number;
  oldProductAmount?: number;
  totalNumberOfUnits: number;
  remainingAmountOfPieces: number;
  remainingAmountOfUnits: number;
  updatedProductAmount?: number;
  missingAt?: string;
}

export interface BillsDoc {
  id?: string;
  products: StockDoc[];
  type: BillType;
  total: number;
  createdAt: string;
  updatedAt?: string;
}

export interface OutlaysDoc {
  id?: string;
  title: string;
  amount: number;
  createdAt: string;
  updatedAt?: string;
}

export interface ReportsDoc {
  id?: string;
  income: number;
  expenses: number;
  bills: BillsDoc[];
  outlays: OutlaysDoc[];
  missingProducts: MissingProductsDoc[];
  purchases: PurchasesDoc[];
  createdAt: string;
}

export interface PurchasesDoc {
  id?: string;
  merchantName?: string;
  products: StockDoc[];
  type: BillType;
  total: number;
  createdAt: string;
  updatedAt?: string;
}

export interface MissingProductsDoc {
  id?: string;
  productName: string;
  category: string;
  priceOfPiece: number;
  createdAt: string;
}

export interface DatabaseCollectionsType
  extends StockDoc,
    PurchasesDoc,
    MissingProductsDoc,
    BillsDoc {}

export interface SendRequestData {
  collectionName: COLLECTIONS;
  data: any;
  // data: DatabaseCollectionsType;
}

export interface UpdateRequestData {
  collectionName: COLLECTIONS;
  docId: any;
  newData: any;
}

export interface DeleteRequestData {
  collectionName: COLLECTIONS;
  docId: string;
}

export interface GetDocRequestData {
  collectionName: COLLECTIONS;
  docId: string;
}
