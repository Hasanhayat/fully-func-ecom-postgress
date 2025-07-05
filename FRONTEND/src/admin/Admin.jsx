import React from "react";
import { Link } from "react-router";
import { Box, Typography, Button } from "@mui/material";

const Admin = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        Admin Dashboard
      </Typography>

      <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
        <Link to="/addproduct" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              borderRadius: "12px",
              textTransform: "none",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "secondary.main",
                color: "background.default",
              },
            }}
          >
            ➕ Add Product
          </Button>
        </Link>

        <Link to="/users" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              borderRadius: "12px",
              textTransform: "none",
              borderWidth: "2px",
              "&:hover": {
                backgroundColor: "secondary.main",
                color: "background.default",
              },
            }}
          >
            👥 All Users
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Admin;
