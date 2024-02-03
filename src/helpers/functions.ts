import moment from "moment";

export const trimBillDataBeforeAction = (productsArray: any[]) => {
  const trimmedProductsArray = productsArray.map(
    (product: any, _: number, arr: any) => {
      delete product.oldProductAmount;
      delete product.initialProductAmount;
      return arr;
    }
  );
  return trimmedProductsArray;
};

export const changeBillProductsTotalAmount = (billProducts: any[]) => {
  billProducts.forEach((billProduct: any) => {
    billProduct.totalProductAmount = billProduct.updatedProductAmount;
  });
};

export const resetBillProductsValue = (billProducts: any[], value: string) => {
  const updatedBillProducts = [...billProducts];
  billProducts = updatedBillProducts.map((billProduct: any) => {
    return { ...billProduct, [value]: 0 };
  });
  return billProducts;
};

export const deleteBillProductsValue = (billProducts: any[], value: string) => {
  const updatedBillProducts = [...billProducts];
  updatedBillProducts.forEach((billProduct: any) => {
    delete billProduct[value];
  });
  return updatedBillProducts;
};

export const formatDateByHours = (date: string | Date) => {
  return moment(new Date(date)).startOf("hour").fromNow();
};

export const formatDateByDay = (date: string | Date) => {
  return moment(new Date(date)).format("dddd");
};

export const formatFullDate = (date: string | Date) => {
  return moment(new Date(date)).format("LL");
};

export const maxDate = () => {
  const now: Date = new Date();
  let day: string | number = now.getDate();
  let month: string | number = now.getMonth() + 1;
  const year: number = now.getFullYear();

  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
};

export const dateMe = (date: string) => new Date(date);

export const resetDate = (date: Date) => date.setHours(0, 0, 0, 0);

export const formatNumber = (price: number, style: string = "currency") => {
  //prettier-ignore
  const inStyle = style === 'd' ? 'decimal' : style === 'p' ? 'percent' : 'currency';
  return new Intl.NumberFormat("ar-EG", {
    style: inStyle,
    currency: "EGP",
  }).format(price);
};
