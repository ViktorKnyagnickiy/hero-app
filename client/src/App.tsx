// src/App.tsx
import { Route, Routes, Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  Stack,
} from "@mui/material";

import HeroList from "./pages/HeroList";
import HeroDetail from "./pages/HeroDetail";
import HeroForm from "./pages/HeroForm";

export default function App() {
  return (
    <>
      {/* Header */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
            component={RouterLink}
            to="/"
            color="inherit"
            style={{ textDecoration: "none" }}
          >
            🦸 Hero App
          </Typography>

          <Stack direction="row" spacing={1}>
            <Button color="inherit" component={RouterLink} to="/">
              Home
            </Button>
            <NavCreate />
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Container sx={{ py: 6, maxWidth: 960 }}>
        <Routes>
          <Route path="/" element={<HeroList />} />
          <Route path="/heroes/new" element={<HeroForm />} />
          <Route path="/heroes/:id" element={<HeroDetail />} />
          <Route path="/heroes/:id/edit" element={<HeroForm />} />
        </Routes>
      </Container>

      {/* Footer */}
      <Box sx={{ textAlign: "center", py: 3, bgcolor: "grey.100", mt: 4 }}>
        <Typography variant="body2" color="text.secondary">
          © 2025 Hero App. All rights reserved.
        </Typography>
      </Box>
    </>
  );
}

function NavCreate() {
  const nav = useNavigate();
  return (
    <Button variant="outlined" color="inherit" onClick={() => nav("/heroes/new")}>
      + New Hero
    </Button>
  );
}
