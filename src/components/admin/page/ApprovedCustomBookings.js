import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../../Firebase";
import { toast, ToastContainer } from "react-toastify";
import { ClockLoader } from "react-spinners";

export default function ApprovedCustomBookings() {

  var [bookings, setbookings] = useState([]);
  var [loading, setloading] = useState(true);
  const [priceInputs, setPriceInputs] = useState({});
  const nav = useNavigate();
  const getDate = (date) => {
    if (date?.toDate) {
      date = date.toDate(); 
    }
    let finalDate = moment(date).format("MMM Do YY");
    return finalDate;
  };

  var spinnerObj = {
    margin: "0 auto",
    display: "block",
    borderColor: "red",
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  const getAllBookings = () => {
    const Bookingsref = collection(db, "/Custombookings");
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
        const bookingRef = doc(db, "/Custombookings", id);
        await updateDoc(bookingRef, { status: "Rejected" });
        toast.success("Booking Rejected successfully!");
        setTimeout(() => {
          nav("/admin/rejectedcustombookings")
         }, 2000);
    } catch (error) {
        console.error("Error rejecting bookings:", error);
        toast.error("Failed to reject the booking.");
    }
    finally{
      setloading(false);
    }
  };

  const completeBooking = async (id) => {
    setloading(true);
    try {
        const bookingRef = doc(db, "/Custombookings", id);
        await updateDoc(bookingRef, { status: "Completed" });
        toast.success("Booking Completed successfully!");
        setTimeout(() => {
          nav("/admin/completedcustombookings")
         }, 2000);
    } catch (error) {
        console.error("Error Completing bookings:", error);
        toast.error("Failed to complete the booking.");
    }
    finally{
      setloading(false);
    }
  };

  const handlePriceInputChange = (orderId, event) => {
    setPriceInputs({ ...priceInputs, [orderId]: event.target.value });
};

const handleSavePrice = async (id) => {
    setloading(true);
    try {
        const price = priceInputs[id];
        if (!price) {
            toast.error("Please enter a price.");
            return;
        }

        const customBookRef = doc(db, "/Custombookings", id);
        await updateDoc(customBookRef, { totalPrice: price });

        toast.success("Total Price saved successfully!");
        setTimeout(() => {
            setloading(false);
        }, 2000);

        setbookings(prevData => prevData.map(book =>
            book.id === id ? { ...book, totalPrice: price } : book
        ));
    } catch (error) {
        console.error("Error saving total price:", error);
        toast.error("Failed to save total price.");
        setTimeout(() => {
            setloading(false);
        }, 2000);
    }
};
  return (
    <>
    <ToastContainer/>
      <section
        className="bg-title-page flex-column p-t-250 p-b-80 p-l-15 p-r-15"
        style={{ backgroundImage: "url(/assets/images/bg-title-page-03.jpg)" }}
      >
        <h2 className="tit6 t-center">Approved Custom bookings</h2>
        <nav>
          <ol class="main_menu d-flex justify-content-center">
            <li class="breadcrumb-item mx-0">
              <Link to="/admin/dashboard" className="px-0 mx-0">
                Dashboard
              </Link>
            </li>
            <li class="breadcrumb-item px-0 mx-0">
              <Link
                to="/admin//Manage-Custom-Bookings"
                className="text-white px-0"
              >
                Approved Custom Bookings
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
            <div className="col-md-6 d-flex justify-content-around">
              <Link to={"/admin/Manage-Custom-Bookings"}><button className="btn btn-info">Pending Bookings</button></Link>
            <Link to={"/admin/rejectedcustombookings"}><button className="btn btn-danger">Rejected Bookings</button></Link>
            <Link to={"/admin/completedcustombookings"}><button className="btn btn-primary">Completed Bookings</button></Link>
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
                    <th scope="col">Sr No.</th>
                    <th scope="col">CustomerName</th>
                    <th scope="col">Breakfast</th>
                    <th scope="col">Lunch</th>
                    <th scope="col">Dinner</th>
                    <th scope="col">Days</th>
                    <th scope="col">Final Price</th>
                    <th scope="col">Start</th>
                    <th scope="col">End</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings?.map((el,index)=>(
                    <>
                    <tr>
                    <td scope="row">{index+1}</td>
                    <td>{el?.customerName}</td>
                    <td>{el?.breakfasts}</td>
                    <td>{el?.lunchs}</td>
                    <td>{el?.dinners}</td>
                    <td>7</td>
                    <td>
                     {el.totalPrice ? (
                         <span>Rs.{el.totalPrice}</span>
                            ) : (
                             <>
                             <input
                              type="text"
                             className="form-control mb-2"
                            placeholder="Enter Total Price"
                             value={priceInputs[el.id] || ''}
                            onChange={(e) => handlePriceInputChange(el.id, e)}
                             />
                             <button
                             className="btn btn-primary"
                             onClick={() => handleSavePrice(el.id)}
                            >
                            Save Price
                            </button>
                            </>
                                                )}
                                            </td>

                    <td>{el?.startdate}</td>
                    <td>{el?.enddate}</td>
                    <td>{el?.status}</td>
                    <td>{getDate(el?.createdat)}</td>
                    <td>
                    <button className="btn btn-success m-r-10 " onClick={() => completeBooking(el.id)}>
                        {/* <i class="bi bi-check-circle-fill"></i> */}
                        <i class="bi bi-clipboard2-check-fill fs-25"></i>
                      </button>
                      <button className="btn btn-danger"  onClick={() => rejectBooking(el.id)}>
                        <i class="bi bi-x-square-fill fs-25"></i>
                        {/* <i class="bi bi-pencil-square"></i> */}
                      </button>
                    </td>
                  </tr>
                    </>
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
