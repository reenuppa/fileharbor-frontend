import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Loader } from "./Loaders";
import { getUserFromLocalStorage } from "../utils/auth";

interface TableProps {
  columns: GridColDef[];
  rows: any[];
}

// CustomTable component displays a table with the given columns and rows
const CustomTable: React.FC<TableProps> = ({ columns, rows }) => {
  // State to handle the open/close state of the create portfolio dialog
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // State to control the visibility of the loader

  // State to store data for creating a new portfolio

  const [formData, setFormData] = useState<any>({});
  const initialFormData = {
    id: 0,
    portfolio_name: "",
    role: "",
    last_modified_by: null,
  };
  const handleOpen = () => {
    setOpen(true);
    setFormData(initialFormData);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    setIsLoading(true);
    // Logic to handle form submission
    // For example, you can make an API call to create the new row using formData
    // console.log(formData);
    try {
      // const user = JSON.parse(localStorage.getItem('user'));
      // const token = user?.token;
      // const userId = user?.id;

      const user = getUserFromLocalStorage();
      const token = user?.token;
      const userId = user?.id;

      if (!token || !userId) {
        console.error("User not authenticated.");
        // Handle the case when the user is not authenticated or redirect to the sign-in page
        return;
      }

      const headersList = {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      };

      const bodyContent = new FormData();
      bodyContent.append("portfolioName", formData.portfolio_name);
      bodyContent.append("userId", String(userId));
      bodyContent.append("lastModifiedBy", String(userId));

      // Replace this with the actual backend URL for creating portfolios
      const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const url = `${backendURL}/portfolios`;

      const response = await axios.post(url, bodyContent, {
        headers: headersList,
      });

      // console.log("Response:", response.data);

      // Check the response status and redirect to the portfolio details page if successful (status 201)
      if (response.status === 201) {
        const portfolioId = response.data.id;
        await new Promise((resolve) => setTimeout(resolve, 2000));

        router.push(`/edit_portfolios/${portfolioId}`);
      }
    } catch (error) {
      console.error("Error creating portfolio:", error);
    }
    // Close the dialog after form submission
    handleClose();
    setIsLoading(false);
  };

  const rowCount = rows?.length ?? 0;
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <Typography variant="h5">My Portfolios</Typography>
        <Button
          sx={{ backgroundColor: "#5C76B7" }}
          variant="contained"
          onClick={handleOpen}
        >
          Create Portfolio
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: "auto", padding: "1rem" }}>
        <DataGrid
          sx={{ minWidth: "400px", minHeight: "70vh" }} // Minimum width to prevent horizontal scroll on small devices
          autoHeight
          rows={rows}
          columns={columns}
        />
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Portfolio</DialogTitle>
        <DialogContent>
          {/* Hidden fields */}
          <input type="hidden" name="id" value={formData.id} />
          <input
            type="hidden"
            name="last_modified_by"
            value={formData.last_modified_by || ""}
          />

          {/* Input fields for other properties */}
          <TextField
            autoFocus
            margin="dense"
            name="portfolio_name"
            label="Portfolio Name"
            type="text"
            fullWidth
            value={formData.portfolio_name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="role"
            label="role"
            type="text"
            fullWidth
            value={formData.role}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Loader open={isLoading} />
    </Box>
  );
};

export default CustomTable;
