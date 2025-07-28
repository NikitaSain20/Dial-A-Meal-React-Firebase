import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ClockLoader } from "react-spinners";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export default function Login() {
  const nav = useNavigate();
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [loading, setloading] = useState(false);

  var spinnerObj = {
    margin: "120px auto",
    display: "block",
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const loginSubmit = async (e) => {
    e.preventDefault();

    setloading(true);

    try {
      let res = await signInWithEmailAndPassword(auth, email, password);
      setloading(false);
      checkUser(res.user.uid);
    } catch (err) {
      setloading(false);
      console.log("Error in login", err);
      toast.error(err.message);
    }
  };

  const checkUser = (userId) => {
    setloading(true);
    let userRef = collection(db, "/Users");
    let que = query(userRef, where("uid", "==", userId));
    onSnapshot(que, (querySnapshot) => {
      let uData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setloading(false);

      if (uData[0].userType == 1) {
        sessionStorage.setItem("isLogin", "true");
        sessionStorage.setItem("id", uData[0].id);
        sessionStorage.setItem("userType", uData[0].userType);
        nav("/admin/dashboard");
        setTimeout(() => {
          toast.success("Welcome Admin");
        }, 700);
      } else if (uData[0].userType == 2) {
        if (uData[0].status) {
          sessionStorage.setItem("isLogin", "true");
          sessionStorage.setItem("id", uData[0].id);
          sessionStorage.setItem("userType", uData[0].userType);
          sessionStorage.setItem("uData", JSON.stringify(uData[0]));
          nav("/");
          setTimeout(() => {
            toast.success("Welcome " + uData[0].name);
          }, 700);
        } else {
          toast.error("In-active account, Contact Admin");
        }
      } else {
        toast.error("Invalid Credentials");
      }
    });
  };

  // const loginSubmit = (e) => {
  //   e.preventDefault();
  //   setloading(true);

  //   setTimeout(() => {
  //     setloading(false);
  //   }, 3000);

  //   if (email == "customer@gmail.com" && password == "123") {
  //     sessionStorage.setItem("isLogin", "true");
  //     sessionStorage.setItem("email", email);
  //     nav("/");
  //     setTimeout(() => {
  //       toast.success("Welcome Customer");
  //     }, 500);
  //   } else if (email == "admin@gmail.com" && password == "123") {
  //     sessionStorage.setItem("isLogin", "true");
  //     sessionStorage.setItem("email", email);
  //     nav("/admin/dashboard");
  //     setTimeout(() => {
  //       toast.success("Welcome Admin");
  //     }, 500);
  //   } else {
  //     toast.error("Invalid Credentials");
  //   }
  // };

  return (
    <>
      {/* title of page */}
      <ToastContainer />
      <section
        className="bg-title-page flex-column p-t-160 p-b-80 p-l-15 p-r-15"
        style={{ backgroundImage: "url(assets/images/bg-title-page-02.jpg)" }}
      >
        <div className="text-center text-white fs-70">
          <b>DIAL A MEAL</b>
        </div>
        <h2 className="tit6 t-center">login</h2>
        <nav>
          <ol class="main_menu d-flex justify-content-center">
            <li class="breadcrumb-item mx-0">
              <Link to="/" className="px-0 mx-0">
                Home
              </Link>
            </li>
            <li class="breadcrumb-item px-0 mx-0">
              <Link to="/login" className="text-white px-0">
                Login
              </Link>
            </li>
          </ol>
        </nav>
      </section>
      <ClockLoader
        color="red"
        loading={loading}
        cssOverride={spinnerObj}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

      {/* <!-- Contact form  */}
      <section className="section-contact bg1-pattern p-t-0 p-b-113">
        <div className={loading && "display-none"}>
          <div className="container">
            <h3 className="fs-40 text-danger t-center p-b-12 p-t-75 fs-20">
              Login here to enjoy the food.......
            </h3>
            <h3 className="tit11 t-center p-b-62 p-t-35">
              Don't have account?
              <Link className="tit11 text-danger fs-25" to="/register">
                Register Now.
              </Link>
            </h3>

            <form
              className="wrap-form-reservation size22 m-l-r-auto"
              onSubmit={loginSubmit}
            >
              <div className="row">
                <div className="col-md-4"></div>

                <div className="col-md-4">
                  {/* <!-- Email --> */}
                  <span className="txt9">Email</span>

                  <div className="wrap-inputemail size12 bo2 bo-rad-10 m-t-3 m-b-23">
                    <input
                      className="bo-rad-10 sizefull txt10 p-l-20"
                      id="email"
                      type="text"
                      name="email"
                      placeholder="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-4"></div>
              </div>
              <div className="row">
                <div className="col-md-4"></div>

                <div className="col-md-4">
                  {/* <!-- Phone --> */}
                  <span className="txt9">password</span>

                  <div className="wrap-inputphone size12 bo2 bo-rad-10 m-t-3 m-b-23">
                    <input
                      className="bo-rad-10 sizefull txt10 p-l-20"
                      id="password"
                      type="password"
                      name="password"
                      placeholder="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-4"></div>
              </div>
              <div className="row">
                <div className="col-md-4"></div>

                <div className="col-md-4">
                  {/* <!-- Phone --> */}
                  <div className="wrap-btn-booking flex-c-m m-t-13">
                    {/* <!-- Button3 --> */}
                    <button
                      type="submit"
                      className="btn3 flex-c-m size36 txt11 trans-0-4"
                    >
                      Login
                    </button>
                  </div>
                </div>
                <div className="col-md-4"></div>
              </div>
            </form>

            {/* <div className="row p-t-135">
              <div className="col-sm-8 col-md-4 col-lg-4 m-l-r-auto p-t-30">
                <div className="dis-flex m-l-23">
                  <div className="p-r-40 p-t-6">
                    <img
                      src="assets/images/icons/map-icon.png"
                      alt="IMG-ICON"
                    />
                  </div>

                  <div className="flex-col-l">
                    <span className="txt5 p-b-10">Location</span>

                    <span className="txt23 size38">
                      8th floor, 379 Hudson St, New York, NY 10018
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-sm-8 col-md-3 col-lg-4 m-l-r-auto p-t-30">
                <div className="dis-flex m-l-23">
                  <div className="p-r-40 p-t-6">
                    <img
                      src="assets/images/icons/phone-icon.png"
                      alt="IMG-ICON"
                    />
                  </div>

                  <div className="flex-col-l">
                    <span className="txt5 p-b-10">Call Us</span>

                    <span className="txt23 size38">(+1) 96 716 6879</span>
                  </div>
                </div>
              </div>

              <div className="col-sm-8 col-md-5 col-lg-4 m-l-r-auto p-t-30">
                <div className="dis-flex m-l-23">
                  <div className="p-r-40 p-t-6">
                    <img
                      src="assets/images/icons/clock-icon.png"
                      alt="IMG-ICON"
                    />
                  </div>

                  <div className="flex-col-l">
                    <span className="txt5 p-b-10">Opening Hours</span>

                    <span className="txt23 size38">
                      09:30 AM – 11:00 PM <br />
                      Every Day
                    </span>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}
