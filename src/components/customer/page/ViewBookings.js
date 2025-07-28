import {
    collection,
    query,
    where,
    onSnapshot,
    getDocs,
  } from "firebase/firestore";
  import { useEffect, useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { ClockLoader } from "react-spinners";
  import { db, auth } from "../../../Firebase"; // Import Firebase auth and Firestore
  import moment from "moment";
  
  export default function ViewBookings() {
    const nav = useNavigate();
  
    const getDate = (date) => {
      if (date?.toDate) {
        date = date.toDate();
      }
      let finalDate = moment(date).format("MMM Do YY");
      return finalDate;
    };
  
    const calculateEndDate = (startDate, duration) => {
      if (startDate?.toDate) {
        startDate = startDate.toDate();
      }
      const endDate = moment(startDate).add(duration, 'months').format("MMM Do YY");
      return endDate;
    };
  
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const spinnerObj = {
      margin: "0 auto",
      display: "block",
      borderColor: "red",
    };
  
    useEffect(() => {
      // Get the current user
      const currentUser = auth.currentUser;
  
      if (currentUser) {
        // If the user is logged in, fetch their customerId from Users collection
        getCustomerId(currentUser.uid).then(customerId => {
          if (customerId) {
            // Fetch bookings for this customerId
            getAllBookings(customerId);
          } else {
            console.log("Customer ID not found.");
            nav("/login");
          }
        });
      } else {
        console.log("No user is logged in.");
        nav("/login"); // Redirect to login page if needed
      }
    }, []);
  
    const getCustomerId = async (uid) => {
      const usersRef = collection(db, "Users");
      const q = query(usersRef, where("uid", "==", uid)); // Adjust the field if necessary
  
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        return userDoc.id; // Assuming the document ID is the customerId
      }
      return null;
    };
  
    const getAllBookings = (customerId) => {
      const bookingsRef = collection(db, "Bookings");
      const que = query(bookingsRef, where("customerId", "==", customerId)); // Filter by the customerId
  
      onSnapshot(que, (querySnapshot) => {
        setTimeout(() => {
          setLoading(false);
        }, 700);
  
        setBookings(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    };
  
    return (
      <>
        <section
          className="bg-title-page flex-column p-t-250 p-b-80 p-l-15 p-r-15"
          style={{ backgroundImage: "url(/assets/images/bg-title-page-03.jpg)" }}
        >
          <h2 className="tit6 t-center">View Bookings</h2>
          <nav>
            <ol className="main_menu d-flex justify-content-center">
              <li className="breadcrumb-item mx-0">
                <Link to="/admin/dashboard" className="px-0 mx-0">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item px-0 mx-0">
                <Link to="/admin/manage-bookings" className="text-white px-0">
                  View Bookings
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
        <div className={loading && "display-none"}>
          <section className="section-welcome bg1-pattern p-t-40 p-b-20">
            <div className="container-fluid">
              <div className="row mt-5">
                <div className="col-12 p-5">
                  {bookings.length === 0 ? (
                    <h3 className="text-center">Currently you don't have any bookings</h3>
                  ) : (
                    <table className="table table-bordered table-secondary">
                      <thead>
                        <tr>
                          <th scope="col">Sr No.</th>
                          <th scope="col">Customer Name</th>
                          <th scope="col">Duration (In Months)</th>
                          <th scope="col">Start</th>
                          <th scope="col">End</th>
                          <th scope="col">Pricing</th>
                          <th scope="col">Status</th>
                          <th scope="col">Created At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((i, index) => (
                          <tr key={index}>
                            <td scope="row">{index + 1}</td>
                            <td>{i?.customerName}</td>
                            <td>{i?.duration}</td>
                            <td>{getDate(i?.startdate)}</td>
                            <td>{calculateEndDate(i?.startdate, i?.duration)}</td>
                            <td>Rs. {i?.price}</td>
                            <td>{i?.status}</td>
                            <td>{getDate(i?.createdat)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
                <div className="col-1"></div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }
  