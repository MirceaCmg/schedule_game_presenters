import * as React from "react";
import { Grid, TextField } from "@mui/material";
import AppDialog from "../common/AppDialog";
import { TABLES_ENDPOINT } from "../common/constants";

const EditTable = ({
  tableDetails,
  open,
  handleCloseModal,
  handleChange,
  setOpen,
}) => {
  /**
   * editPresenter
   */
  const editTable = async () => {
    const data = (
      await fetch(`${TABLES_ENDPOINT}/editTable`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tableDetails),
      })
    )
      .json()
      .then(() => setOpen(false));

    return await data;
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
        value={tableDetails.name ?? ""}
        placeholder="Table name"
        onChange={handleChange}
        fullWidth
      />
    </Grid>
  );

  return (
    <>
      <AppDialog
        title="Edit table"
        open={open}
        save={() => editTable()}
        cancel={handleCloseModal}
        saveTitle="Save"
        cancelTitle="Cancel"
        content={modalContent}
      />
    </>
  );
};

export default EditTable;
