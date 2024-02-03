import { useState } from "react";

const useDate = () => {
  const [dateValue, setDateValue] = useState<Date>(new Date());

  const onChangeDateHandler = (e: React.FormEvent<HTMLInputElement>): void => {
    const targetElement = e.target as HTMLInputElement;

    setDateValue(new Date(targetElement.value));
  };

  return { dateValue, onChangeDateHandler };
};

export default useDate;
