"use client";
import { Typography } from "@mui/material";
import Link from "next/link";

export default function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        FileHarbor Cloud File Sharing 
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
