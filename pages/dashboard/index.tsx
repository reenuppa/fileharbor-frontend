import Layout from "@/Layout/MainLayout";
import CustomTable from "@/components/DataTb";
import { useAuthSession } from "@/utils/auth";

import {
  Avatar,
  Box,
  Container,
  Grid,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Link from "@mui/material/Link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloneIcon from "@mui/icons-material/ContentCopy"; // Import CloneIcon
import UserAvatar from "@/components/UserAvatar";

const api = require("apiCalls");

const Dashboard: React.FC = () => {
  const router = useRouter();
  var [sampleData, setSampleData] = useState<any[]>([]);

  useEffect(() => {
    const fetchPortfolios = async () => {
      const responseData = await api.getPortfolioByUserID();
      let sampleD = [];
      if (responseData.data.length > 0) {
        sampleD = responseData.data.map(
          (data: {
            last_modified_by: any;
            id: any;
            portfolio_name: any;
            updated_at: any;
          }) => ({
            id: data.id,
            portfolio_name: data.portfolio_name,
            last_modified_by: data.last_modified_by,
            updated_at: data.updated_at,
          })
        );
      }
      setSampleData(sampleD);
      return sampleD;
    };
    fetchPortfolios();
  }, []);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const handleDelete = async () => {
    if (selectedId) {
      try {
        await api.deletePortfolioById(selectedId);
        setSampleData((prevData) =>
          prevData.filter((item) => item.id !== selectedId)
        );
        handleClose();
        console.log("Item deleted successfully.");
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const getLastModifiedDisplayTime = (date: Date) => {
    const now = new Date();
    const then = new Date(date);
    const timeElapsed = now.getTime() - then.getTime();

    const seconds = Math.floor(timeElapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30); // Rough estimation
    const years = Math.floor(days / 365); // Rough estimation

    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days < 7) {
      return `${days} days ago`;
    } else if (weeks < 4) {
      return `${weeks} weeks ago`;
    } else if (months < 12) {
      return `${months} months ago`;
    } else {
      return `${years} years ago`;
    }
  };

  const handleClone = async () => {
    if (selectedId) {
      try {
        const cloneResponse = await api.clonePortfolio(selectedId); // Replace with the actual clone function
        if (cloneResponse.data) {
          // Fetch updated data after cloning
          const responseData = await api.getPortfolioByUserID();
          let updatedData = [];
          if (responseData.data.length > 0) {
            updatedData = responseData.data.map(
              (data: {
                last_modified_by: any;
                id: any;
                portfolio_name: any;
                created_at: any;
              }) => ({
                id: data.id,
                portfolio_name: data.portfolio_name,
                last_modified_by: data.last_modified_by,
                created_at: data.created_at,
              })
            );
          }
          setSampleData(updatedData);
          handleClose();
          console.log("Item cloned successfully.");
        }
      } catch (error) {
        console.error("Error cloning item:", error);
      }
    }
  };

  const columns: GridColDef[] = [
    {
      field: "portfolio_name",
      headerName: "Name",
      width: 210,
      renderCell: (params) => {
        const portfolioId = params.row.id;
        return (
          <Link
            href={`/edit_portfolios/${portfolioId}`}
            sx={{ color: "text.primary" }}
            // underline="hover"
          >
            {params.value}
          </Link>
        );
      },
    },
    {
      field: "last_modified_by",
      headerName: "Last modified by",
      width: 300,
      renderCell: (params) => {
        return <UserAvatar portfolio_id={params.row.id} />;
      },
    },
    {
      field: "updated_at",
      headerName: "Last Modified At",
      width: 400,
      renderCell: (params) => {
        console.log(params);
        return (
          <Typography>{getLastModifiedDisplayTime(params.value)}</Typography>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        const portfolioId = params.row.id;
        return (
          <IconButton
            aria-label="actions"
            aria-controls={`actions-menu-${portfolioId}`}
            aria-haspopup="true"
            onClick={(event) => handleClick(event, portfolioId)}
            sx={{ color: "#5C76B7" }}
          >
            <Typography variant="body2">▼</Typography>
          </IconButton>
        );
      },
    },
  ];

  return (
    <Layout title="Dashboard">
      <CustomTable columns={columns} rows={sampleData} />
      <Menu
        id={`actions-menu`}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            const portfolioId = selectedId;
            if (portfolioId) {
              router.push(`/edit_portfolios/${portfolioId}`);
              handleClose();
            }
          }}
        >
          <EditIcon sx={{ marginRight: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleClone}>
          <CloneIcon sx={{ marginRight: 1 }} />
          Clone
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon sx={{ marginRight: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </Layout>
  );
};

export default Dashboard;
