import React, { useCallback, useState } from "react";
import { DatabaseCollectionsType } from "../interfaces/database";

const useReadData = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [readData, setReadData] = useState<DatabaseCollectionsType>();

  const triggerModalAction = useCallback(
    (data: any, event?: React.MouseEvent): void => {
      setReadData(data);
      setShowModal(true);
    },
    []
  );

  const hideModalAction = useCallback((event: React.MouseEvent): void => {
    setShowModal(false);
  }, []);

  return {
    showModal,
    triggerModalAction,
    hideModal: hideModalAction,
    readData,
  };
};

export default useReadData;
