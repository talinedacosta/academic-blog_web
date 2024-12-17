import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import api from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [updated, setUpdated] = React.useState(false);

  React.useEffect(() => {
    const getPost = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await api.get(`/posts/${id}`);

        if (response.status === 200) {
          setTitle(response.data.title);
          setContent(response.data.content);
        }
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [id]);

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUpdated(false);
      setError(false);
      setLoading(true);
      const response = await api.put(`/posts/${id}`, { title, content });
      if (response.status === 201) {
        setTitle("");
        setContent("");
        setUpdated(true);
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
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
      <Typography variant="h4">Atualizar postagem</Typography>
      {error && <Alert severity="error">Erro ao atualizar postagem</Alert>}
      {updated && <Alert severity="success">Postagem atualizada com sucesso. Redirecionando...</Alert>}

      <Stack component="form" onSubmit={handleOnSubmit} spacing={2}>
        <TextField required label="Título" variant="outlined" fullWidth size="small" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField required label="Conteúdo" variant="outlined" fullWidth size="small" multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)} />
        <Typography variant="caption">As postagens serão atualizadas com seu usuário</Typography>

        <Button variant="contained" color="primary" type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Atualizar"}
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => navigate("/admin")}>
          Cancelar
        </Button>
      </Stack>
    </Stack>
  );
};

export default EditPost;
