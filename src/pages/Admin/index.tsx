import React from "react";
import api from "../../services/api";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";
import { Post } from "../../interfaces/Post";

const Admin = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [value] = useDebounce(search, 500);
  const [currentPost, setCurrentPost] = React.useState<Post | null>(null);
  const [openModal, setOpenModal] = React.useState(false);

  const handleOnSearch = async () => {
    try {
      const response = await api.get(`/posts/search?search=${value}`);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnDeletePost = (post: Post) => {
    setCurrentPost(post);
    setOpenModal(true);
  };

  const deletePost = async () => {
    try {
      await api.delete(`/posts/${currentPost?.id}`);
      getPosts();
      setOpenModal(false);
      setCurrentPost(null);
    } catch (error) {
      console.error(error);
    }
  };

  const getPosts = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await api.get("/posts");
      if (response.status === 200) {
        setPosts(response.data);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (value) {
      handleOnSearch();
    } else {
      getPosts();
    }
  }, [value]);

  React.useEffect(() => {
    getPosts();
  }, []);

  return (
    <Stack spacing={2} sx={{ paddingY: 2 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">Postagens</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/admin/create-post")}>
          Criar postagem
        </Button>
      </Stack>

      <TextField label="Pesquisar" variant="outlined" fullWidth size="small" onChange={(e) => setSearch(e.target.value)} />

      {loading && <Typography>Carregando...</Typography>}
      {error && <Typography>Erro ao carregar os posts</Typography>}
      {!loading && !error && posts.length === 0 && <Typography>Nenhum post encontrado</Typography>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Conteúdo</TableCell>
              <TableCell>Criado por</TableCell>
              <TableCell>Criado em</TableCell>
              <TableCell>Atualizado por</TableCell>
              <TableCell>Atualizado em</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post: Post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <Button onClick={() => navigate(`/admin/edit-post/${post.id}`)}>Editar</Button>
                  <Button color="error" onClick={() => handleOnDeletePost(post)}>
                    Excluir
                  </Button>
                </TableCell>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.content.slice(0, 20)}...</TableCell>
                <TableCell>{post.created_by_name}</TableCell>
                <TableCell>{new Date(post.created_at!).toLocaleDateString()}</TableCell>
                <TableCell>{post.updated_by_name}</TableCell>
                <TableCell>{new Date(post.updated_at!).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogContent>
          <Typography variant="h5">Excluir postagem</Typography>
          <Typography>Tem certeza que deseja excluir a postagem?</Typography>
        </DialogContent>
        <DialogActions>
          <Button>Cancelar</Button>
          <Button color="error" onClick={deletePost}>Excluir</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default Admin;
