import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotAuthorized = () => {
  const navigate = useNavigate();

  return (
    <Stack direction="column" gap={2} flexWrap="wrap" width="100vw" height="100vh" justifyContent="center" alignItems="center">
      <Typography variant="h2">Você não tem permissão para acessar esta página</Typography>
      <Typography variant="h6">Faça login com uma conta de professor</Typography>
      <Button variant="contained" onClick={() => navigate("/login")}>
        Acessar conta
      </Button>
    </Stack>
  );
};

export default NotAuthorized;
