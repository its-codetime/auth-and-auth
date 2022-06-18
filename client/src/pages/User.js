import { Button, Stack, Typography } from "@mui/material";
import { Box } from "../components/StyledComponents";

export default function User({ user, logout }) {
  return (
    <Box>
      <Stack spacing={2}>
        <Typography variant="h5">{user.username} is logged in</Typography>
        <Typography variant="h5">Username : {user.username}</Typography>
        <Typography variant="h5">Email : {user.email}</Typography>
        <Button variant="contained" onClick={logout}>
          SIGN OUT
        </Button>
      </Stack>
    </Box>
  );
}
