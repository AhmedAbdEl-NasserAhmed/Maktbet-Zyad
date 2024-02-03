import { useState } from "react";

const useProduct = () => {
  const [counter, setCounter] = useState<number>(0);

  const [productFormArray, setProductFormArray] = useState<number[]>([counter]);

  function addProductFormData(event: React.MouseEvent<HTMLButtonElement>) {
    setCounter((prevState) => prevState + 1);
    setProductFormArray((prevState) => prevState.concat(counter + 1));
  }

  function removeProductFormData(productIndex: number) {
    setProductFormArray((prevState) =>
      prevState.filter((productId) => {
        return productId !== productIndex;
      })
    );
  }

  return {
    productFormArray,
    addProductFormData,
    removeProductFormData,
  };
};

export default useProduct;
