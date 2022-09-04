import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, } from "@mui/material";

/**
 * Application dialog component.
 * @param {object}
 */
function AppDialog({
  open,
  cancel,
  save,
  content,
  title,
  saveTitle,
  cancelTitle,
}) {
  return (
    <>
      <Dialog open={open} onClose={cancel}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>

        <DialogActions>
          <Button onClick={cancel}>{cancelTitle}</Button>
          <Button onClick={save} variant="contained">
            {saveTitle}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

AppDialog.propTypes = {};

AppDialog.defaultProps = {};

export default AppDialog;
