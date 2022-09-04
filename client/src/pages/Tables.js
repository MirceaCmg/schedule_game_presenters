import * as React from "react";
import { useEffect, useRef, useState } from "react";
import MaterialTable from "@material-table/core";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateTable from "../components/tables/CreateTable";
import EditTable from "../components/tables/EditTable";
import { TABLES_ENDPOINT } from "../components/common/constants";
import { AppWrapper } from "../components/common/shared.style";
import { getTables } from "../redux/actions/tables";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/common/Loader";
import { unsetTbChanged } from "../redux/actions/ui";
import { Typography } from "@mui/material";

const Tables = () => {
  const [tables, setTables] = useState([]);
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [tableDetails, setTableDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { tableChanged } = useSelector((state) => state.ui);
  const tableRef = useRef(null);
  const dispatch = useDispatch();
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

  const fetchTables = async () => {
    const response = await fetch(`/tables-data`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  console.log(tableChanged);

  useEffect(() => {
    fetchTables()
      .then((res) => {
        setTables(res);
        dispatch(getTables(res));
        if (tableChanged) {
          dispatch(unsetTbChanged());
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [tableChanged]);

  console.log(tables);

  /**
   * Handle updateCompany.
   */
  const handleUpdateTable = (document, edit) => {
    setOpen(edit);
    setTableDetails(document);
  };

  /**
   * Handle updateCompany.
   */
  const handleCloseModal = () => {
    setOpen(false);
    setOpenCreate(false);
  };

  const deleteTable = async (id) => {
    const data = (
      await fetch(`${TABLES_ENDPOINT}/deleteTable`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })
    ).json();

    return await data;
  };

  /**
   * Handle deleteCompany.
   */
  const handleDeleteTable = (id) => {
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
      console.log(result);
      if (result.isConfirmed) {
        return deleteTable(id);
      }
    });
  };
  /**
   * handleChange
   * @param event
   */
  const handleChange = (event) => {
    setTableDetails({
      ...tableDetails,
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
      <CreateTable
        handleChange={handleChange}
        handleCloseModal={handleCloseModal}
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
        presenterDetails={tableDetails}
      />
      <EditTable
        handleChange={handleChange}
        handleCloseModal={handleCloseModal}
        open={open}
        tableDetails={tableDetails}
        setOpen={setOpen}
      />
      <MaterialTable
        title="Tables"
        columns={columns}
        data={tables}
        tableRef={tableRef}
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
              handleUpdateTable({ name: document.name, id: document.id }, true),
          }),
          (document) => ({
            icon: () => <DeleteOutlineIcon color="error" />,
            tooltip: "Delete",
            onClick: () => handleDeleteTable(document.id),
          }),
        ]}
      />
    </AppWrapper>
  );
};

export default Tables;
