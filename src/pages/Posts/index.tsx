import React from "react";
import api from "../../services/api";
import { Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";

export interface Post {
  id: number;
  title: string;
  content: string;
  created_at?: Date;
  updated_at?: Date;
  created_by?: number;
  updated_by?: number;
  created_by_name?: string;
  updated_by_name?: string;
}

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [value] = useDebounce(search, 500);

  const handleOnSearch = async () => {
    try {
      const response = await api.get(`/posts/search?search=${value}`);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
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
    if(value) {
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
      <Typography variant="h4">Postagens</Typography>

      <TextField label="Pesquisar" variant="outlined" fullWidth size="small" onChange={(e) => setSearch(e.target.value)} />

      {loading && <Typography>Carregando...</Typography>}
      {error && <Typography>Erro ao carregar os posts</Typography>}
      {!loading && !error && posts.length === 0 && <Typography>Nenhum post encontrado</Typography>}
      {!loading &&
        !error &&
        posts &&
        posts.map((post: Post) => (
          <Card
            key={post.id}
            onClick={() => navigate(`/posts/${post.id}`)}
            sx={{
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}>
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              <Typography>{post.content.slice(0, 200)}...</Typography>
              <Typography variant="caption">
                Criado por {post.created_by_name} em {new Date(post.created_at!).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
    </Stack>
  );
};

export default Posts;
