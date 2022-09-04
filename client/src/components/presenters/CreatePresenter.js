import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";
import AppDialog from "../common/AppDialog";
import { PRESENTERS_ENDPOINT } from "../common/constants";
import AppButton from "../common/AppButton";
import { useDispatch } from "react-redux";
import { changed } from "../../redux/actions/ui";

const CreatePresenter = ({ setOpenCreate, openCreate, handleCloseModal }) => {
  const [newPresenter, setNewPresenter] = useState("");
  const dispatch = useDispatch();

  /**
   * createPresenter
   */
  const createPresenter = async () => {
    const data = (
      await fetch(`${PRESENTERS_ENDPOINT}/createPresenter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPresenter),
      })
    )
      .json()
      .then(() => {
        dispatch(changed(true));
        setOpenCreate(false);
      });

    return await data;
  };

  /**
   * handleChange
   * @param event
   */
  const handleChange = (event) => {
    setNewPresenter({
      ...newPresenter,
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
        label="Presenter name"
        value={newPresenter.name ?? ""}
        placeholder="Presenter name"
        onChange={handleChange}
        fullWidth
      />
    </Grid>
  );

  return (
    <>
      <AppButton title="Create presenter" onClick={() => setOpenCreate(true)}>
        Create presenter
      </AppButton>
      <AppDialog
        title="Create presenter"
        open={openCreate}
        save={() => createPresenter()}
        cancel={handleCloseModal}
        saveTitle="Save"
        cancelTitle="Cancel"
        content={modalContent}
      />
    </>
  );
};

export default CreatePresenter;
