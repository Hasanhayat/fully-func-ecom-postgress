import React from "react";
import { Box, Typography, Avatar, Paper, Stack, Divider } from "@mui/material";
import { GlobalContext } from "../context/Context"; // adjust path if needed
import { format } from "date-fns";

const Profile = () => {
  const { state } = React.useContext(GlobalContext);
  const user = state?.user;

  if (!user) return <Typography>Loading...</Typography>;

  const fullName = `${user.first_name} ${user.last_name}`;
  const formattedDate = format(new Date(user.created_at), "dd MMM yyyy");
  const role = user.role === 1 ? "Admin" : "User";

  return (
    <Box
      maxWidth="600px"
      mx="auto"
      mt={5}
      px={3}
      py={4}
      component={Paper}
      elevation={3}
      borderRadius={3}
    >
      <Stack alignItems="center" spacing={2}>
        <Avatar
          src={
            user.profile_img
              ? user.profile_img
              : `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=3f51b5&color=fff`
          }
          sx={{ width: 100, height: 100 }}
        />
        <Typography variant="h5" color="primary">
          {fullName}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {role}
        </Typography>
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Stack spacing={1}>
        <Typography>
          <strong>Email:</strong> {user.email}
        </Typography>

        <Typography>
          <strong>Account Created:</strong> {formattedDate}
        </Typography>
      </Stack>
    </Box>
  );
};

export default Profile;
