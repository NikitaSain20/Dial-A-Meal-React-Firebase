import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminHeader() {
  const nav = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    nav("/login");
    setTimeout(() => {
      toast.success("Logout Successful");
    }, 500);
  };
  return (
    <>
      {/* <!-- Header --> */}
      <header>
        {/* <!-- Header desktop --> */}
        <div class="wrap-menu-header gradient1 trans-0-4">
          <div className="container-fluid mt-4">
            {/* <div class="container h-full"> */}
            <div class="wrap_header trans-0-3">
              {/* <!-- Logo --> */}
              <div class="logo">
                <a href="#">
                <h1 className="text-light">Dial <span className="text-danger">A</span> Meal</h1>
                </a>
              </div>

              {/* <!-- Menu --> */}
              <div class="wrap_menu p-l-45 p-l-0-xl">
                <nav class="menu">
                  <ul class="main_menu">
                    <li>
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </li>

                    <li>
                      <Link to="/admin/Manage-Customers">Customers</Link>
                    </li>
                    <li>
                      <Link to="/admin/Manage-Meals">Meals</Link>
                    </li>

                    <li>
                      <Link to="/admin/Manage-Pricings">Pricings</Link>
                    </li>
                    <li>
                      <Link to="/admin/Manage-Custom-Bookings">
                        Custom Bookings
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/Manage-Bookings">Bookings</Link>
                    </li>

                    {/* <li>
                      <Link to="/login">Login</Link>
                    </li> */}
                    <li>
                      <a href="#" onClick={logout}>
                        LOGOUT
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>

              {/* <!-- Social --> */}
              {/* <div class="social flex-w flex-l-m p-r-20">
                <a href="#">
                  <i class="fa fa-tripadvisor" aria-hidden="true"></i>
                </a>
                <a href="#">
                  <i class="fa fa-facebook m-l-21" aria-hidden="true"></i>
                </a>
                <a href="#">
                  <i class="fa fa-twitter m-l-21" aria-hidden="true"></i>
                </a>

                <button class="btn-show-sidebar m-l-33 trans-0-4"></button>
              </div> */}
            </div>
          </div>
        </div>
      </header>
      {/* <h1> i am admin header</h1> */}
    </>
  );
}
