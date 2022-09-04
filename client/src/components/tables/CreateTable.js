import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";
import AppDialog from "../common/AppDialog";
import { TABLES_ENDPOINT } from "../common/constants";
import AppButton from "../common/AppButton";
import { tbChanged } from "../../redux/actions/ui";
import { useDispatch } from "react-redux";

const CreateTable = ({ setOpenCreate, openCreate, handleCloseModal }) => {
  const [newTable, setNewTable] = useState("");
  const dispatch = useDispatch();

  /**
   * createPresenter
   */
  const createTable = async () => {
    const data = (
      await fetch(`${TABLES_ENDPOINT}/createTable`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTable),
      })
    )
      .json()
      .then(() => {
        dispatch(tbChanged(true));
        setOpenCreate(false);
      });

    return await data;
  };

  /**
   * handleChange
   * @param event
   */
  const handleChange = (event) => {
    setNewTable({
      ...newTable,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * modal content
   * return JSX
   */
  const modalContent = (
    <Grid>
      <TextField
        name="name"
        type="text"
        required
        label="Table name"
        value={newTable.name ?? ""}
        placeholder="Table name"
        onChange={handleChange}
        fullWidth
      />
    </Grid>
  );

  return (
    <>
      <AppButton title="Create table" onClick={() => setOpenCreate(true)}>
        Create presenter
      </AppButton>
      <AppDialog
        title="Create presenter"
        open={openCreate}
        save={() => createTable()}
        cancel={handleCloseModal}
        saveTitle="Save"
        cancelTitle="Cancel"
        content={modalContent}
      />
    </>
  );
};

export default CreateTable;
