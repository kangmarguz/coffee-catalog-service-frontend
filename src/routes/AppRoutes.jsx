import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import AdminCoffeesPage from "../pages/AdminCoffeesPage";
import CatalogPage from "../pages/CatalogPage";
import CoffeeDetailPage from "../pages/CoffeeDetailPage";
import EditCoffeePage from "../pages/EditCoffeePage";
import LoginPage from "../pages/LoginPage";
import NewCoffeePage from "../pages/NewCoffeePage";
import RequireAdmin from "./RequireAdmin";

function AppRoutes() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/coffees/:id" element={<CoffeeDetailPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin/coffees"
          element={
            <RequireAdmin>
              <AdminCoffeesPage />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/coffees/new"
          element={
            <RequireAdmin>
              <NewCoffeePage />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/coffees/:id/edit"
          element={
            <RequireAdmin>
              <EditCoffeePage />
            </RequireAdmin>
          }
        />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </AppLayout>
  );
}

export default AppRoutes;
