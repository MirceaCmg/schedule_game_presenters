import * as React from "react";
import { Grid, TextField } from "@mui/material";
import AppDialog from "../common/AppDialog";
import { PRESENTERS_ENDPOINT } from "../common/constants";
import { presenterChanged } from "../../redux/actions/ui";
import { useDispatch } from "react-redux";

const EditPresenter = ({
  presenterDetails,
  open,
  handleCloseModal,
  handleChange,
  setOpen,
}) => {
  const dispatch = useDispatch();
  /**
   * editPresenter
   */
  const editPresenter = async () => {
    const data = (
      await fetch(`${PRESENTERS_ENDPOINT}/editPresenter`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(presenterDetails),
      })
    )
      .json()
      .then(() => {
        dispatch(presenterChanged(true));
        setOpen(false);
      });

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
        label="Presenter name"
        value={presenterDetails.name}
        placeholder="Presenter name"
        onChange={handleChange}
        fullWidth
      />
    </Grid>
  );

  return (
    <>
      <AppDialog
        title="Edit presenter"
        open={open}
        save={() => editPresenter()}
        cancel={handleCloseModal}
        saveTitle="Save"
        cancelTitle="Cancel"
        content={modalContent}
      />
    </>
  );
};

export default EditPresenter;
