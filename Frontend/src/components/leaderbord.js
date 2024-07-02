import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResult } from "../utility/action/adminActions";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import "./leaderboard.css";

const columns = [
  { field: "rank", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 300 },
  { field: "lastName", headerName: "Last name", width: 150 },
  {
    field: "email",
    headerName: "Email",
    width: 300,
  },
  {
    field: "questionsSolved",
    headerName: "Questions Solved",
    width: 150,
  },
  {
    field: "testSubmissionTime",
    headerName: "Submission Time",
    width: 250,
  },
];

export default function LeaderBoard() {
  const admin = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.resolve(dispatch(getResult()));
  }, [dispatch]);

  useEffect(() => {
    console.log(admin.rank_users);
  }, [admin.rank_users]);

  useEffect(() => {
    if (!admin.verified) navigate("/admin-login");
  }, [admin.verified, navigate]);

  const getRowId = (row) => row.rank;

  const getRowClassName = (params) => {
    return params.rowIndex < 3 ? "top-row" : "";
  };

  

  if (admin.rank_users.length === 0) {
    return (
      <>
        <div className="flex justify-center my-3">
          <CircularProgress />
        </div>
      </>
    );
  }
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/background_test.jpg)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className={`hero min-h-screen bg-slate-800  bg-opacity-60 `}>
          <div className="w-full h-screen items-center justify-center flex flex-col">
            <h2 className="text-5xl text-amber-500 hero-heading">
              Leaderboard
            </h2>
            <div
              style={{
                marginTop: "20px",
                color: "white",
                border: "none",
                maxHeight: "80vh",
                width: "95vw",
              }}
              className="mt-12 text-3xl font-bold text-center text-white box w-10/12 md:w-3/12 flex items-center justify-center px-12 py-4 rounded-2xl d-flex flex-col shadow-[0px_2px_50px_4px_#de9f14] bg-slate-950/50"
            >
              <DataGrid
                rows={admin.rank_users}
                columns={columns}
                pageSize={10}
                getRowId={getRowId}
                pageSizeOptions={[5, 10, 50]}
                getRowClassName={getRowClassName}
                style={{ marginTop: "20px", color: "white", border: "none" }}
                classes={{
                  root: "no-border",
                  cell: "no-border",
                  row: "no-border",
                  headerCell: "no-border",
                  pagination: "no-border",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
