import { TableFields } from "../constants";
import {
  StockTableHeadData,
  PurchasesTableHeadData,
  MissingProductsTableHeadData,
  BillsTableHeadData,
  OutlaysTableHeadData,
} from "../types";

export const stockTableHeadData: StockTableHeadData = [
  TableFields.PRODUCT_NAME,
  TableFields.PRODUCT_CATEGORY,
  TableFields.PRODUCT_AMOUNT,
  TableFields.PRICE_PIECE,
  TableFields.PROFIT_OF_PIECE,
  TableFields.NUMBER_OF_UNITS_IN_PIECE,
  TableFields.PRICE_OF_UNIT,
  TableFields.PROFIT_OF_UNIT,
  TableFields.PERCENTAGE_OF_PROFIT,
  TableFields.TOTAL_PROFIT,
];

export const billsTableHeadData: BillsTableHeadData = [
  TableFields.PRODUCT_NAME,
  TableFields.PRODUCT_CATEGORY,
  TableFields.PRICE_OF_UNIT,
  TableFields.PRODUCT_AMOUNT,
];

export const purchasesTableHeadData: PurchasesTableHeadData = [
  TableFields.PRODUCT_NAME,
  TableFields.PRODUCT_CATEGORY,
  TableFields.PRODUCT_AMOUNT,
  TableFields.PRICE_PIECE,
  TableFields.NUMBER_OF_UNITS_IN_PIECE,
  TableFields.PRICE_OF_UNIT,
];

export const missingProductsTableHeadData: MissingProductsTableHeadData = [
  TableFields.PRODUCT_NAME,
  TableFields.PRODUCT_CATEGORY,
  TableFields.PRICE_OF_UNIT,
  TableFields.DATE,
];

export const outlaysTableHeadData: OutlaysTableHeadData = [
  TableFields.OUTLAY_TITLE,
  TableFields.OUTLAY_AMOUNT,
  TableFields.DATE,
];
