import { TableFields } from "../constants";

export type StockTableHeadData = [
  TableFields.PRODUCT_NAME,
  TableFields.PRODUCT_CATEGORY,
  TableFields.PRODUCT_AMOUNT,
  TableFields.PRICE_PIECE,
  TableFields.PROFIT_OF_PIECE,
  TableFields.NUMBER_OF_UNITS_IN_PIECE,
  TableFields.PRICE_OF_UNIT,
  TableFields.PROFIT_OF_UNIT,
  TableFields.PERCENTAGE_OF_PROFIT,
  TableFields.TOTAL_PROFIT
];

export type BillsTableHeadData = [
  TableFields.PRODUCT_NAME,
  TableFields.PRODUCT_CATEGORY,
  TableFields.PRICE_OF_UNIT,
  TableFields.PRODUCT_AMOUNT
];

export type PurchasesTableHeadData = [
  TableFields.PRODUCT_NAME,
  TableFields.PRODUCT_CATEGORY,
  TableFields.PRODUCT_AMOUNT,
  TableFields.PRICE_PIECE,
  TableFields.NUMBER_OF_UNITS_IN_PIECE,
  TableFields.PRICE_OF_UNIT
];

export type MissingProductsTableHeadData = [
  TableFields.PRODUCT_NAME,
  TableFields.PRODUCT_CATEGORY,
  TableFields.PRICE_OF_UNIT,
  TableFields.DATE
];

export type OutlaysTableHeadData = [
  TableFields.OUTLAY_TITLE,
  TableFields.OUTLAY_AMOUNT,
  TableFields.DATE
];
