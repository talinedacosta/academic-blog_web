import { CssBaseline } from "@mui/material";
import { UserProvider } from "./contexts/UserContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  return (
    <>
      <CssBaseline />
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </>
  );
}

export default App;
