import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [created, setCreated] = React.useState(false);

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCreated(false);
      setError(false);
      setLoading(true);
      const response = await api.post("/posts", { title, content });
      if (response.status === 201) {
        setTitle("");
        setContent("");
        setCreated(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Criar postagem</Typography>
      {error && <Alert severity="error">Erro ao criar postagem</Alert>}
      {created && <Alert severity="success">Postagem criada com sucesso</Alert>}

      <Stack component="form" onSubmit={handleOnSubmit} spacing={2}>
        <TextField required label="Título" variant="outlined" fullWidth size="small" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField required label="Conteúdo" variant="outlined" fullWidth size="small" multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)} />
        <Typography variant="caption">As postagens serão criadas com seu usuário</Typography>

        <Button variant="contained" color="primary" type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Criar"}
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => navigate("/admin")}>
          Cancelar
        </Button>
      </Stack>
    </Stack>
  );
};

export default CreatePost;
