import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  resetUser,
  resetAllUsers,
} from "../utility/action/adminActions";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";

export default function Table() {
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    Promise.resolve(dispatch(getAllUsers()));
  }, [dispatch]);

  useEffect(() => {
    console.log(admin.reg_users);
  }, [admin.reg_users]);

  const columns = [
    { field: "_id", headerName: "User Id", width: 250 },
    { field: "firstName", headerName: "First name", width: 300 },
    { field: "lastName", headerName: "Last name", width: 150 },
    {
      field: "emailId",
      headerName: "Email",
      width: 300,
    },
    {
      field: "reset",
      headerName: "Reset",
      with: 150,
      renderCell: (params) => {
        const onClickFunc = () => {
          if (
            !window.confirm(
              "Are you sure you want to reset the data?This will permanent reset the test history!"
            )
          ) {
            return;
          }
          dispatch(resetUser(params.id));
        };
        return (
          <>
            <button
              onClick={onClickFunc}
              style={{
                padding: "0.5rem 1rem",
                color: "white",
                borderRadius: "0.5rem",
                background: "#3b71ca",
              }}
            >
              Reset
            </button>
          </>
        );
      },
    },
  ];
  if (admin.reg_users.length === 0) {
    return (
      <>
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      </>
    );
  }
  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <h2 className="text-5xl text-black-500 ">Registered Users</h2>
        <DataGrid
          rows={admin.reg_users}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row._id}
          style={{ marginTop: "20px" }}
        />
        <button
          onClick={() => {
            if (
              !window.confirm(
                "Are you sure you want to reset all the test data?This will permanent reset the test history for all users!"
              )
            ) {
              return;
            }
            dispatch(resetAllUsers());
          }}
          type="button"
          style={{
            backgroundColor: "red",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
          class="btn btn-danger"
        >
          Reset All Test Data
        </button>
      </div>
    </>
  );
}
