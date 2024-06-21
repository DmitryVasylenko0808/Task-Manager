import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import NoBoardPage from "./pages/NoBoardPage";
import BoardDetailsPage from "./pages/BoardDetailsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AuthLayout from "./layouts/AuthLayout";
import { useAuth } from "./hooks/useAuth";
import RequireAuth from "./components/RequireAuth";

function App() {
  const { isAuthenticated, setAuthData } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      setAuthData();
    }
  }, []);

  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<NoBoardPage />} />
          <Route path=":boardId" element={<BoardDetailsPage />} />
        </Route>
      </Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}

export default App;
