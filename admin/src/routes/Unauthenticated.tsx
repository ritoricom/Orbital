import { FC, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Login = lazy(() =>
  import("@/features/auth/routes/Login").then((mod) => ({ default: mod.Login }))
);

export const Unauthenticated: FC = () => (
  <Routes>
    <Route path="/auth/login" element={<Login />} />
    <Route path="*" element={<Navigate replace to="/auth/login" />} />
  </Routes>
);
