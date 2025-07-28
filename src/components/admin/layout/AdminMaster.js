import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AdminMaster() {
  return (
    <>
      <ToastContainer />
      <AdminHeader />
      <Outlet />
      <AdminFooter />
    </>
  );
}
