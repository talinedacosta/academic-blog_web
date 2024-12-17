import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Stack direction="column" gap={2} flexWrap="wrap" width="100vw" height="100vh" justifyContent="center" alignItems="center">
      <Typography variant="h2">404</Typography>
      <Typography variant="h6">Página não encontrada</Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Voltar para a página inicial
      </Button>
    </Stack>
  );
};

export default PageNotFound;
