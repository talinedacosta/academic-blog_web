import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import api from "../../../services/api";
import { useUser } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const userContext = useUser();
  const [error, setError] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await api.post("/user/login", {
        email,
        password,
      });
      if (response.status === 200) {
        userContext?.setUser(response.data.user);
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/posts");
      }
    } catch (error) {
      console.error(error);
      setError("Email ou senha inválidos");
    }
  };

  return (
    <Stack direction={{ xs: "column", md: "row" }} gap={2} flexWrap="wrap" width="100vw" height="100vh" justifyContent="center" alignItems="center">
      <Stack
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%"
        color="white"
        flex={1}
        padding={2}
        sx={{
          backgroundColor: "info.main",
        }}>
        <Typography variant="h2" align="center">
          Blog acadêmico
        </Typography>
        <Typography variant="h6" align="center">
          Conteúdo sempre atualizado
        </Typography>
      </Stack>

      <Stack component="form" spacing={2} onSubmit={handleOnSubmit} flex={1} padding={5}>
        <Typography variant="h5">Acessar conta de professor</Typography>
        <TextField label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Senha" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <Alert severity="error">{error}</Alert>}
        <Button variant="contained" type="submit">
          Acessar
        </Button>
        <Button variant="text" onClick={() => navigate("/posts")}>
          Sou aluno
        </Button>
      </Stack>
    </Stack>
  );
};

export default Login;
