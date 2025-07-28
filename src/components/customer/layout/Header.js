import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Header() {
  const nav = useNavigate();
  const sidebar = useRef();
  const showSidebar = () => {
    sidebar.current.classList.add("show-sidebar");
  };
  const hideSidebar = () => {
    sidebar.current.classList.remove("show-sidebar");
  };
  var isLogin = sessionStorage.getItem("isLogin");

  const logout = () => {
    sessionStorage.clear();
    nav("/login");
    setTimeout(() => {
      toast.success("Logout Successful");
    }, 500);
  };
  return (
    <>
      <ToastContainer />
      {/* <!-- Header --> */}
      <header>
        {/* <!-- Header desktop --> */}
        <div class="wrap-menu-header gradient1 trans-0-4">
          <div className="container-fluid mt-4 px-5">
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
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/about">About</Link>
                    </li>
                    <li>
                      <Link to="/view-meals">Meals</Link>
                    </li>
                    <li>
                      <Link to="/view-pricing-details">Pricing Details</Link>
                    </li>
                    <li>
                      <Link to="/custom-bookings">Custom Bookings</Link>
                    </li>
                    {/* <li>
                      <Link to="/register">Register</Link>
                    </li> */}
                    <li>
                      {isLogin ? (
                        <>
                        <div className="dropdown menu">
                        <Link
                          className=" dropdown-toggle text-light"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          User Section
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link className="dropdown-item" to={"/profile"}>
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to={"/viewbookings"}>
                              View Bookings
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to={"/viewcustombookings"}>
                              View Custom Bookings
                            </Link>
                          </li>
                        </ul>
                      </div>
                        </>
                        
                      ) : (
                        <Link to="/register">Register</Link>
                      )}
                    </li>
                    {/* <li>
                      <Link to="/login">Login</Link>
                    </li> */}
                    <li>
                      {isLogin ? (
                        <>
                        <a href="#" onClick={logout}>
                          LOGOUT
                        </a>
                        </>
                        
                      ) : (
                        <Link to="/login">LOGIN</Link>
                      )}
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

                <button
                  class="btn-show-sidebar m-l-33 trans-0-4"
                  onClick={() => {
                    showSidebar();
                  }}
                ></button>
              </div> */}
            </div>
          </div>
        </div>
      </header>

      {/* <!-- Sidebar --> */}
      <aside class="sidebar trans-0-4" ref={sidebar}>
        {/* <!-- Button Hide sidebar --> */}
        <button
          class="btn-hide-sidebar ti-close color0-hov trans-0-4"
          onClick={() => {
            hideSidebar();
          }}
        ></button>

        {/* <!-- - --> */}
        <ul class="menu-sidebar p-t-95 p-b-70">
          <li class="t-center m-b-13">
            <a href="index.html" class="txt19">
              Home
            </a>
          </li>

          <li class="t-center m-b-13">
            <a href="menu.html" class="txt19">
              Menu
            </a>
          </li>

          <li class="t-center m-b-13">
            <a href="gallery.html" class="txt19">
              Gallery
            </a>
          </li>

          <li class="t-center m-b-13">
            <a href="about.html" class="txt19">
              About
            </a>
          </li>

          <li class="t-center m-b-13">
            <a href="blog.html" class="txt19">
              Blog
            </a>
          </li>

          <li class="t-center m-b-33">
            <a href="contact.html" class="txt19">
              Contact
            </a>
          </li>

          <li class="t-center">
            {/* <!-- Button3 --> */}
            <a
              href="reservation.html"
              class="btn3 flex-c-m size13 txt11 trans-0-4 m-l-r-auto"
            >
              Reservation
            </a>
          </li>
        </ul>

        {/* <!-- - --> */}
        <div class="gallery-sidebar t-center p-l-60 p-r-60 p-b-40">
          {/* <!-- - --> */}
          <h4 class="txt20 m-b-33">Gallery</h4>

          {/* <!-- Gallery --> */}
          <div class="wrap-gallery-sidebar flex-w">
            <a
              class="item-gallery-sidebar wrap-pic-w"
              href="assets/images/photo-gallery-01.jpg"
              data-lightbox="gallery-footer"
            >
              <img
                src="assets/images/photo-gallery-thumb-01.jpg"
                alt="GALLERY"
              />
            </a>

            <a
              class="item-gallery-sidebar wrap-pic-w"
              href="assets/images/photo-gallery-02.jpg"
              data-lightbox="gallery-footer"
            >
              <img
                src="assets/images/photo-gallery-thumb-02.jpg"
                alt="GALLERY"
              />
            </a>

            <a
              class="item-gallery-sidebar wrap-pic-w"
              href="assets/images/photo-gallery-03.jpg"
              data-lightbox="gallery-footer"
            >
              <img
                src="assets/images/photo-gallery-thumb-03.jpg"
                alt="GALLERY"
              />
            </a>

            <a
              class="item-gallery-sidebar wrap-pic-w"
              href="assets/images/photo-gallery-05.jpg"
              data-lightbox="gallery-footer"
            >
              <img
                src="assets/images/photo-gallery-thumb-05.jpg"
                alt="GALLERY"
              />
            </a>

            <a
              class="item-gallery-sidebar wrap-pic-w"
              href="assets/images/photo-gallery-06.jpg"
              data-lightbox="gallery-footer"
            >
              <img
                src="assets/images/photo-gallery-thumb-06.jpg"
                alt="GALLERY"
              />
            </a>

            <a
              class="item-gallery-sidebar wrap-pic-w"
              href="assets/images/photo-gallery-07.jpg"
              data-lightbox="gallery-footer"
            >
              <img
                src="assets/images/photo-gallery-thumb-07.jpg"
                alt="GALLERY"
              />
            </a>

            <a
              class="item-gallery-sidebar wrap-pic-w"
              href="assets/images/photo-gallery-09.jpg"
              data-lightbox="gallery-footer"
            >
              <img
                src="assets/images/photo-gallery-thumb-09.jpg"
                alt="GALLERY"
              />
            </a>

            <a
              class="item-gallery-sidebar wrap-pic-w"
              href="assets/images/photo-gallery-10.jpg"
              data-lightbox="gallery-footer"
            >
              <img
                src="assets/images/photo-gallery-thumb-10.jpg"
                alt="GALLERY"
              />
            </a>

            <a
              class="item-gallery-sidebar wrap-pic-w"
              href="assets/images/photo-gallery-11.jpg"
              data-lightbox="gallery-footer"
            >
              <img
                src="assets/images/photo-gallery-thumb-11.jpg"
                alt="GALLERY"
              />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
