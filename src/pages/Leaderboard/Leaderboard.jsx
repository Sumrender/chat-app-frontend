import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { rankings } from "../../media/test_data";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "username", headerName: "Username", width: 130 },
  {
    field: "total_points",
    headerName: "Total Points",
    width: 100,
    type: "number",
  },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rankings}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
