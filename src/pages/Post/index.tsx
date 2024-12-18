import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { Divider, Stack, Typography } from "@mui/material";
import { Post as PostType} from "../../interfaces/Post";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = React.useState<PostType | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await api.get(`/posts/${id}`);

        if (response.status === 200) {
          setPost(response.data);
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

  return (
    <Stack>
      {loading && <Typography>Carregando...</Typography>}
      {error && <Typography>Não foi possível carregar dados.</Typography>}
      {!loading && !error && post && (
        <Stack gap={2}>
          <Typography variant="h4">{post.title}</Typography>
          <Typography whiteSpace="pre-line">{post.content}</Typography>

          <Divider
            sx={{
              my: 1,
            }}
          />

          {post.created_by_name && post.created_at && (
            <Typography variant="body2">
              Criado por {post.created_by_name} em {new Date(post.created_at).toLocaleDateString()}
            </Typography>
          )}

          {post.updated_by_name && (
            <Typography variant="body2">
              Atualizado por {post.updated_by_name} em {new Date(post.updated_at!).toLocaleDateString()}
            </Typography>
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default Post;
