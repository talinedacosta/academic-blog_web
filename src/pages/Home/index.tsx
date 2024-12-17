import { Container, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect } from "react";
import { useUser } from "../../contexts/UserContext";

const Home = () => {
  const userContext = useUser();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      userContext?.setUser(JSON.parse(user));
    }
  }, []);

  return (
    <Stack gap={3}>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </Stack>
  );
};

export default Home;
