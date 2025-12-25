"use client";
import { useState, useEffect } from "react";
import { getPaginatedLaunches } from "@/lib/spacex/launches";
import { Table, Modal, SnackBar, List } from "@/components/ui";
import ModalBody from "./modalBody";
import { ApiDocs, ApiResponse } from "@/types";
import {  LoadingIcon } from "@/components/svg";

type TProps = {
  data: ApiResponse;
};

type TSnackBar = {
  active: boolean;
  message: string;
  title: string;
  type: "warning" | "error" | "success" | "neutral" | "";
};

export default function History() {
  const [isLoading, setIsLoading] = useState(false);
  const [snackBar, setSnackbar] = useState<TSnackBar>({
    active: false,
    title: "",
    message: "",
    type: "",
  });
  const [tableData, setTableData] = useState<ApiResponse | undefined>();
  const [selected, setSelected] = useState<ApiDocs | undefined>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const loadData = async () => {
    const apiResponse = await getPaginatedLaunches();

    if (!apiResponse.ok) {
      setIsLoading(false);
      setSnackbar({
        active: true,
        message: apiResponse.error.message,
        type: "error",
        title: apiResponse.error.name,
      });
      return;
    }
    setIsLoading(false);
    setTableData(apiResponse.data);
  };

  useEffect(() => {
    setIsLoading(true);
    loadData();
  }, []);

  useEffect(() => {
    if (selected !== undefined) setOpenModal(true);
  }, [selected]);

  return (
    <>
      <Modal
        modalTile={"Launch Details"}
        open={openModal}
        setOpen={setOpenModal}
      >
        {selected && <ModalBody selected={selected} />}
      </Modal>
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 translate-x-1/2 -translate-y-1/2 text-blue-500">
          <LoadingIcon height="5rem" width="5rem" />
        </div>
      )}
      <div className="hidden sm:block">
        {tableData && (
          <Table filters={true} data={tableData} setSelected={setSelected} />
        )}
      </div>
      <div className="block mt-24 sm:hidden">
        {tableData && (
          <List data={tableData} setSelected={setSelected}/>
        )}
      </div>
      <SnackBar info={snackBar} updateInfo={setSnackbar} />
    </>
  );
}
