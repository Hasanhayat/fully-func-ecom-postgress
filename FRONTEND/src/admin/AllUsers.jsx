import React, { useEffect, useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, CircularProgress } from "@mui/material";
import api from "../api";
import { toast } from "react-toastify";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");        
        setUsers(res.data.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setUsers([]);
         toast.error("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "text.primary" }}>
        👥 All Registered Users
      </Typography>

      <TableContainer component={Paper} sx={{ backgroundColor: "background.paper" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "text.primary", fontWeight: "bold" }}>Profile</TableCell>
              <TableCell sx={{ color: "text.primary", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "text.primary", fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ color: "text.primary", fontWeight: "bold" }}>Phone</TableCell>
              <TableCell sx={{ color: "text.primary", fontWeight: "bold" }}>Role</TableCell>
              <TableCell sx={{ color: "text.primary", fontWeight: "bold" }}>Joined</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar src={user.profile_img} alt={user.first_name} />
                </TableCell>
                <TableCell sx={{ color: "text.secondary" }}>
                  {user.first_name} {user.last_name}
                </TableCell>
                <TableCell sx={{ color: "text.secondary" }}>{user.email}</TableCell>
                <TableCell sx={{ color: "text.secondary" }}>{user.phone || "N/A"}</TableCell>
                <TableCell sx={{ color: "text.secondary" }}>{user.role}</TableCell>
                <TableCell sx={{ color: "text.secondary" }}>
                  {new Date(user.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllUsers;
