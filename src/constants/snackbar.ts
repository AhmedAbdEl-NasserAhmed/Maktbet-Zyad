export enum SnackbarType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
}

export enum SnackbarSuccess {
  ADD_NORMAL_BILL = "تم أضافة فاتوره عاديه بنجاح",
  UPDATE_NORMAL_BILL = "تم تعديل فاتوره عاديه بنجاح",
  DELETE_NORMAL_BILL = "تم مسح فاتوره عاديه بنجاح",
  ADD_RETURNED_BILL = "تم أضافة فاتوره مرتجع بنجاح",
  UPDATE_RETURNED_BILL = "تم تعديل فاتوره مرتجع بنجاح",
  DELETE_RETURNED_BILL = "تم مسح فاتوره مرتجع بنجاح",
  ADD_PURCHASE_BILL = "تم أضافة فاتوره شراء بنجاح",
  UPDATE_PURCHASE_BILL = "تم تعديل فاتوره شراء بنجاح",
  DELETE_PURCHASE_BILL = "تم مسح فاتوره شراء بنجاح",
  ADD_REPORT = "تم إنشاء تقرير بنجاح",
  ADD_OUTLAY = "تم اضافة مصروفات خارجيه بنجاح",
  UPDATE_OUTLAY = "تم تعديل مصروفات خارجيه بنجاح",
  UPDATE_PRODUCT = "تم تعديل المنتج بنجاح",
  DELETE_PRODUCT = "تم مسح المنتج بنجاح",
  DELETE_OUTLAY = "تم مسح المصروف بنجاح",
  DELETE_MISSING = "تم مسح المنتج من المنقوصات بنجاح",
}

export enum SnackbarWarning {
  ADD_MISSING = "تم اضافة المنتج في المنقوصات",
  DELETE_MISSING = "تم مسح المنتج من المنقوصات بنجاح",
}

export enum SnackbarFailed {
  ADD_NORMAL_BILL = "حدث خطأ, أضافة فاتوره عاديه",
  UPDATE_NORMAL_BILL = "حدث خطأ, تعديل فاتوره عاديه",
  DELETE_NORMAL_BILL = "حدث خطأ, مسح فاتوره عاديه",
  ADD_RETURNED_BILL = "حدث خطأ, أضافة فاتوره مرتجع",
  UPDATE_RETURNED_BILL = "حدث خطأ, تعديل فاتوره مرتجع",
  DELETE_RETURNED_BILL = "حدث خطأ, مسح فاتوره مرتجع",
  ADD_PURCHASE_BILL = "حدث خطأ, أضافة فاتوره شراء",
  UPDATE_PURCHASE_BILL = "حدث خطأ, تعديل فاتوره شراء",
  DELETE_PURCHASE_BILL = "حدث خطأ, مسح فاتوره شراء",
  ADD_REPORT = "حدث خطأ, إنشاء تقرير",
  ADD_OUTLAY = "حدث خطأ, اضافة مصروفات خارجيه",
  UPDATE_OUTLAY = "حدث خطأ, تعديل مصروفات خارجيه",
  UPDATE_PRODUCT = "حدث خطأ, تعديل منتج",
  DELETE_PRODUCT = "حدث خطأ, مسح منتج",
  DELETE_OUTLAY = "حدث خطأ, مسح المصروف",
  ADD_MISSING = "حدث خطأ, أضافة المنتج في المنقوصات",
  DELETE_MISSING = "حدث خطأ, مسح المنتج من المنقوصات",
}
