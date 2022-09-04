import * as React from "react";
import { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditPresenter from "../components/presenters/EditPresenter";
import CreatePresenter from "../components/presenters/CreatePresenter";
import { PRESENTERS_ENDPOINT } from "../components/common/constants";
import { AppWrapper } from "../components/common/shared.style";
import { useDispatch, useSelector } from "react-redux";
import { unsetPresenterChanged } from "../redux/actions/ui";
import { getPresenters } from "../redux/actions/presenters";
import Loader from "../components/common/Loader";
import { Typography } from "@mui/material";

const Presenters = () => {
  const [presenters, setPresenters] = useState([]);
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [presenterDetails, setPresenterDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { presentersChanged } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.user);

  const columns = [
    {
      title: "ID",
      field: "id",
    },
    {
      title: "Name",
      field: "name",
    },
  ];

  const fetchPresenters = async () => {
    const response = await fetch(`/presenters-data`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  const deletePresenter = async (id) => {
    const data = (
      await fetch(`${PRESENTERS_ENDPOINT}/deletePresenter`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })
    ).json();

    return await data;
  };

  useEffect(() => {
    fetchPresenters()
      .then((res) => {
        setPresenters(res);
        dispatch(getPresenters(res));
        if (presentersChanged) {
          dispatch(unsetPresenterChanged(false));
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [presentersChanged]);

  /**
   * Handle updateCompany.
   */
  const handleUpdatePresenter = (document, edit) => {
    setOpen(edit);
    setPresenterDetails(document);
  };

  /**
   * Handle updateCompany.
   */
  const handleCloseModal = () => {
    setOpen(false);
    setOpenCreate(false);
  };

  /**
   * Handle deleteCompany.
   */
  const handleDeleteCompany = (id) => {
    Swal.fire({
      title: "Delete",
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#77D6D9",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        return deletePresenter(id);
      }
    });
  };
  /**
   * handleChange
   * @param event
   */
  const handleChange = (event) => {
    setPresenterDetails({
      ...presenterDetails,
      [event.target.name]: event.target.value,
    });
  };

  if (!user) {
    return (
      <AppWrapper>
        <Typography>You do not have permission to see this page</Typography>
      </AppWrapper>
    );
  }

  return loading ? (
    <Loader />
  ) : (
    <AppWrapper>
      <CreatePresenter
        handleChange={handleChange}
        handleCloseModal={handleCloseModal}
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
        presenterDetails={presenterDetails}
      />
      <EditPresenter
        handleChange={handleChange}
        handleCloseModal={handleCloseModal}
        open={open}
        presenterDetails={presenterDetails}
        setOpen={setOpen}
      />
      <MaterialTable
        title="Game presenters"
        columns={columns}
        data={presenters}
        style={{ width: "100%" }}
        options={{
          search: false,
          pageSize: 10,
          emptyRowsWhenPaging: false,
          actionsColumnIndex: -1,
        }}
        actions={[
          (document) => ({
            icon: () => <EditIcon color="action" />,
            tooltip: "Edit",
            onClick: () =>
              handleUpdatePresenter(
                { name: document.name, id: document.id },
                true
              ),
          }),
          (document) => ({
            icon: () => <DeleteOutlineIcon color="error" />,
            tooltip: "Delete",
            onClick: () => handleDeleteCompany(document.id),
          }),
        ]}
      />
    </AppWrapper>
  );
};

export default Presenters;
