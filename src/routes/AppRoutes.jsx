import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import AdminCoffeesPage from "../pages/AdminCoffeesPage";
import CatalogPage from "../pages/CatalogPage";
import CoffeeDetailPage from "../pages/CoffeeDetailPage";
import EditCoffeePage from "../pages/EditCoffeePage";
import NewCoffeePage from "../pages/NewCoffeePage";

function AppRoutes() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/coffees/:id" element={<CoffeeDetailPage />} />
        <Route path="/admin/coffees" element={<AdminCoffeesPage />} />
        <Route path="/admin/coffees/new" element={<NewCoffeePage />} />
        <Route path="/admin/coffees/:id/edit" element={<EditCoffeePage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </AppLayout>
  );
}

export default AppRoutes;

