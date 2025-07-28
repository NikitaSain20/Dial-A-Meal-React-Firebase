import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import { db } from "../../../Firebase";
import { addDoc, collection, doc, getDoc, Timestamp } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";

export default function AddBookings() {
  var nav = useNavigate();
  var [duration, setduration] = useState("");
  var [startdate, setstartdate] = useState("");
  var [enddate, setenddate] = useState("");
  var [price, setprice] = useState("");

  var [loading, setloading] = useState(false);
  var userData = JSON.parse(sessionStorage.getItem("uData"));
  const params = useParams();
  const id = params.id;
  var spinnerObj = {
    margin: "120px auto",
    display: "block",
  };
  useEffect(() => {
    getSinglePricingDetail();
  }, []);
  const getSinglePricingDetail = async () => {
    let pricingsref = doc(db, "Pricings", id);
    let pricingsnap = await getDoc(pricingsref);

    if (pricingsnap.exists()) {
      let pricingsData = pricingsnap.data();
      console.log(pricingsData);
      setduration(pricingsData.duration);
      setprice(pricingsData.price);
    } else {
      console.log("Error in fetching single category");
      toast.error("Something Went Wrong");
    }
  };
  const handleForm = (e) => {
    e.preventDefault();
    setloading(true);

    try {
      let Bookingsref = collection(db, "/Bookings");
      addDoc(Bookingsref, {
        customerName: userData["name"],
        customerId: userData["id"],
        duration: duration,
        startdate: startdate,
        // enddate: enddate,
        price: price,
        createdat: Timestamp.now(),
        status: "Pending",
      });
      setloading(false);

      nav("/");
      setTimeout(() => {
        toast.success("Your plan has been booked successfully");
      }, 300);
    } catch (err) {
      setloading(false);
      toast.error("Something Went Wrong");
      console.log("Error in add meal", err);
    }
  };

  return (
    <>
      {/* banner starts */}
      <ToastContainer />
      <section
        class="bg-title-page flex-c-m p-t-160 p-b-80 p-l-15 p-r-15"
        style={{ backgroundImage: "url(assets/images/bg-title-page-02.jpg)" }}
      >
        <h2 class="tit6 t-center">Add Bookings</h2>
      </section>
      {/* banner ends */}
      <ClockLoader
        color="red"
        loading={loading}
        cssOverride={spinnerObj}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <div className={loading && "display-none"}>
        <section class="section-reservation bg1-pattern p-t-70 p-b-113">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 p-b-30">
                <div class="t-center">
                  <span class="tit2 t-center">Subscribe Now</span>

                  <h3 class="tit3 t-center m-b-35 m-t-35">Add Bookings</h3>
                </div>

                <form
                  onSubmit={handleForm}
                  class="wrap-form-reservation size22 m-l-r-auto"
                >
                  <div class="row">
                    <div class="col-md-4">{/* <!-- Date --> */}</div>

                    <div class="col-md-4">
                      <span class="txt9">Starting Date</span>

                      <div class="wrap-inputdate pos-relative txt10 size12 bo2 bo-rad-10 m-t-3 m-b-23">
                        <input
                          class="bo-rad-10 sizefull txt10 p-l-20"
                          type="date"
                          name="Starting date"
                          placeholder="Starting from which date"
                          value={startdate}
                          onChange={(e) => {
                            setstartdate(e.target.value);
                          }}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div class="wrap-btn-booking flex-c-m m-t-6">
                    <button
                      type="submit"
                      class="btn3 flex-c-m size13 txt11 trans-0-4"
                    >
                      Subscribe
                    </button>
                    {/* </Link> */}
                  </div>
                </form>
              </div>
            </div>

            <div class="info-reservation flex-w p-t-80">
              <div class="size23 w-full-md p-t-40 p-r-30 p-r-0-md">
                <h4 class="txt5 m-b-18">Reserve by Phone</h4>

                <p class="size25">
                  Donec quis euismod purus. Donec feugiat ligula rhoncus, varius
                  nisl sed, tincidunt lectus.
                  <span class="txt25">Nulla vulputate</span>, lectus vel
                  volutpat efficitur, orci
                  <span class="txt25">lacus sodales</span>
                  sem, sit amet quam:
                  <span class="txt24">(001) 345 6889</span>
                </p>
              </div>

              <div class="size24 w-full-md p-t-40">
                <h4 class="txt5 m-b-18">For Event Booking</h4>

                <p class="size26">
                  Donec feugiat ligula rhoncus:
                  <span class="txt24">(001) 345 6889</span>, varius nisl sed,
                  tinci-dunt lectus sodales sem.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
