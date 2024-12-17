import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { AppBar, Box, Button, Container, Divider, Drawer, Stack, Toolbar, Typography } from "@mui/material";

const Header = () => {
  const drawerWidth = 240;
  const navigate = useNavigate();
  const userContext = useUser();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    userContext?.setUser(null);
    navigate("/login");
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Blog Acadêmico
      </Typography>
      <Divider />
      <Stack>
        <Button color="inherit" onClick={() => navigate("/posts")}>
          Postagens
        </Button>
        {userContext?.user && userContext?.user.role_id === 1 && (
          <Button color="inherit" onClick={() => navigate("/admin")}>
            Administração
          </Button>
        )}
        {userContext?.user ? (
          <Button color="inherit" onClick={handleSignOut}>
            Sair
          </Button>
        ) : (
          <Button color="inherit" onClick={() => navigate("/login")}>
            Acesso de professor
          </Button>
        )}
      </Stack>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Container>
            <Stack direction="row" justifyContent="space-between">
              <Button color="inherit" aria-label="open drawer" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
                Menu
              </Button>
              <Typography variant="h6">Blog Acadêmico</Typography>
              
              <Stack flex={1} direction="row" justifyContent="flex-end" spacing={2} display={{ xs: "none", sm: "flex" }}>
                <Button color="inherit" onClick={() => navigate("/posts")}>
                  Postagens
                </Button>
                {userContext?.user && userContext?.user.role_id === 1 && (
                  <Button color="inherit" onClick={() => navigate("/admin")}>
                    Administração
                  </Button>
                )}
                {userContext?.user ? (
                  <Button color="inherit" onClick={handleSignOut}>
                    Sair
                  </Button>
                ) : (
                  <Button color="inherit" onClick={() => navigate("/login")}>
                    Acesso de professor
                  </Button>
                )}
              </Stack>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}>
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};

export default Header;
