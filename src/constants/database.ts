export enum COLLECTIONS {
  STOCK = "stock",
  MISSING_PRODUCTS = "missingProducts",
  PURCHASES = "purchases",
  BILLS = "bills",
  OUTLAYS = "outlays",
  REPORTS = "reports",
}

export enum DBTables {
  STOCK_TABLE = "البضاعه",
  MISSING_PRODUCTS_TABLE = "المنقوصات",
  PURCHASES_TABLE = "المشتريات",
  BILLS_TABLE = "الفواتير",
  OUTLAYS_TABLE = "الخوارج",
}

export enum TableFields {
  MERCHANT_NAME = "اسم التاجر",
  PRODUCT_NAME = "اسم الصنف",
  PRODUCT_CATEGORY = "نوع الصنف",
  PRODUCT_AMOUNT = "الكميه",
  PRICE_PIECE = "ثمن القطعه (جمله)",
  PROFIT_OF_PIECE = "الربح من القطعه",
  NUMBER_OF_UNITS_IN_PIECE = "عدد الوحده في القطعه",
  PRICE_OF_UNIT = "سعر الوحده",
  PROFIT_OF_UNIT = "الربح من الوحده",
  PERCENTAGE_OF_PROFIT = "نسبة الربح",
  TOTAL_PROFIT = "الربح الكلي",
  DATE = "التاريخ",
  OUTLAY_TITLE = "العنوان",
  OUTLAY_AMOUNT = "القيمه",
}

export enum CRUDRequest {
  CREATE = "create",
  READ = "read",
  UPDATE = "update",
  DELETE = "delete",
}
