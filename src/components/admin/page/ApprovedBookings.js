import {
    collection,
    doc,
    onSnapshot,
    query,
    updateDoc,
    where,
  } from "firebase/firestore";
  import { useEffect, useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { ClockLoader } from "react-spinners";
  import { db } from "../../../Firebase";
  import moment from "moment";
  import { toast } from "react-toastify";
  export default function ApprovedBookings() {
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
    
  
    var [bookings, setbookings] = useState([]);
    var [loading, setloading] = useState(true);
    var spinnerObj = {
      margin: "0 auto",
      display: "block",
      borderColor: "red",
    };
  
    useEffect(() => {
      getAllBookings();
    }, []);
  
    const getAllBookings = () => {
      const Bookingsref = collection(db, "/Bookings");
      const que = query(Bookingsref, where("status", "==", "Approved"));
      onSnapshot(que, (querySnapshot) => {
        setTimeout(() => {
          setloading(false);
        }, 700);
  
        setbookings(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    };
  
  const rejectBooking = async (id) => {
    setloading(true);
    try {
        const bookingRef = doc(db, "Bookings", id);
        await updateDoc(bookingRef, { status: "Rejected" });
        toast.success("Booking Rejected successfully!");
       setTimeout(() => {
        nav("/admin/rejectedbookings")
       }, 2000);
    } catch (error) {
        console.error("Error rejecting bookings:", error);
        toast.error("Failed to reject the booking.");
    }finally{
        setloading(false);
    }
  };
  
    return (
      <>
        <section
          className="bg-title-page flex-column p-t-250 p-b-80 p-l-15 p-r-15"
          style={{ backgroundImage: "url(/assets/images/bg-title-page-03.jpg)" }}
        >
          <h2 className="tit6 t-center">Approved Bookings</h2>
          <nav>
            <ol class="main_menu d-flex justify-content-center">
              <li class="breadcrumb-item mx-0">
                <Link to="/admin/dashboard" className="px-0 mx-0">
                  Dashboard
                </Link>
              </li>
              <li class="breadcrumb-item px-0 mx-0">
                <Link to="/admin/manage-bookings" className="text-white px-0">
                  Approved Bookings
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
              <div className="row justify-content-end">
              <div className="col-md-4 d-flex justify-content-around">
                <Link to={"/admin/Manage-Bookings"}> <button className="btn btn-info">Pending Bookings</button></Link>
             <Link to={"/admin/rejectedbookings"}><button className="btn btn-danger">Rejected Bookings</button></Link>
              </div>
              
              </div>
              <div className="row mt-5">
                <div className="col-12 p-5">
                  {bookings.length===0 ? (
                    <>
                    <h3 className="text-center">No Data Available</h3>
                    </>
                  ):(
                    <>
                      <table class="table table-bordered table-secondary">
                    <thead>
                      <tr>
                        <th scope="col">Sr no.</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Duration(In Months)</th>
                        <th scope="col">Start</th>
                        <th scope="col">End</th>
                        <th scope="col">Pricing</th>
                        <th scope="col">Status</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings?.map((i, index) => (
                        <tr key={index}>
                          <td scope="row">{index + 1}</td>
                          <td>{i?.customerName}</td>
                          <td>{i?.duration}</td>
                          <td>{getDate(i?.startdate)}</td>
                          <td>{calculateEndDate(i?.startdate, i?.duration)}</td>
                          <td>Rs. {i?.price}</td>
                          <td>{i?.status}</td>
                          <td>{getDate(i?.createdat)}</td>
                          <td>
                            
                            <button
                              className="btn btn-danger"
                              onClick={() => rejectBooking(i.id)}
                            >
                              <i class="bi bi-x-square-fill fs-25"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                    </>
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
  
  
  
  