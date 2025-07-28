import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../Firebase";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ClockLoader } from "react-spinners";

export default function ViewPricingDetails() {
  const params = useParams();
  const id = params.id;
  var nav = useNavigate();
  var [loading, setloading] = useState(true);

  var [pricings, setpricings] = useState([]);
  var spinnerObj = {
    margin: "120px auto",
    display: "block",
    border: "5px solid red",
  };

  useEffect(() => {
    getAllpricings();
  }, []);
  const getAllpricings = () => {
    const pricingsref = collection(db, "/Pricings");
    const que = query(pricingsref, where("status", "==", true));
    onSnapshot(que, (querySnapshot) => {
      setTimeout(() => {
        setloading(false);
      }, 700);

      setpricings(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  };
  console.log(pricings);
  // var [type, settype] = useState("");
  // var [Monday, setMonday] = useState("");
  // var [Tuesday, setTuesday] = useState("");
  // var [Wednesday, setWednesday] = useState("");
  // var [Thursday, setThursday] = useState("");
  // var [Friday, setFriday] = useState("");
  // var [Saturday, setSaturday] = useState("");
  // var [Sunday, setSunday] = useState("");
  // var [priceperday, setpriceperday] = useState("");
  // var [loading, setloading] = useState(false);

  // useEffect(() => {
  //   getSingleMeal();
  // }, []);
  // const getSingleMeal = async () => {
  //   let mealsRef = doc(db, "Meals", id);
  //   let mealsnap = await getDoc(mealsRef);
  //   console.log(mealsRef);
  //   if (mealsnap.exists()) {
  //     let mealsData = mealsnap.data();
  //     settype(mealsData.type);
  //     setMonday(mealsData.Monday);
  //     setTuesday(mealsData.Tuesday);
  //     setWednesday(mealsData.Wednesday);
  //     setThursday(mealsData.Thursday);
  //     setFriday(mealsData.Friday);
  //     setSaturday(mealsData.Saturday);
  //     setSunday(mealsData.Sunday);
  //     setpriceperday(mealsData.priceperday);
  //   } else {
  //     console.log("Error in fetching single category");
  //     toast.error("Something Went Wrong");
  //   }
  // };

  return (
    <>
      {/* banner starts */}
      <section
        class="bg-title-page flex-c-m p-t-160 p-b-80 p-l-15 p-r-15"
        style={{ backgroundImage: "url(assets/images/bg-title-page-03.jpg)" }}
      >
        <h2 class="tit6 t-center">View Pricing Details</h2>
      </section>
      {/* banner end */}
      <ClockLoader
        color="red"
        loading={loading}
        cssOverride={spinnerObj}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

      {/* <!-- Chef --> */}
      <section class="section-chef bgwhite p-t-115 p-b-95">
        <div class="container t-center">
          <span class="tit2 t-center">See Our</span>

          <h3 class="tit5 t-center m-b-50 m-t-5">Pricing Plans</h3>
          <div class="row">
            {pricings.map((el) => (
              <div class="col-md-8 col-lg-4 m-l-r-auto p-b-30">
                <div class="blo5 pos-relative p-t-60">
                  <div class="pic-blo5 size14 bo4 wrap-cir-pic hov-img-zoom ab-c-t">
                    <a href="#">
                      <div className="fs-75  bg-white">
                        <b>{el.duration}</b>
                      </div>
                    </a>
                  </div>

                  <div class="text-blo5 size34 t-center bo-rad-10 bo7 p-t-90 p-l-35 p-r-35 p-b-30">
                    <a href="#" class="txt34 dis-block p-b-6">
                      {el.name}
                    </a>

                    <span class="txt34 dis-block t-center txt35 p-b-25">
                      Rs. {el.price}
                    </span>

                    <p class="t-center">{el.description}</p>
                    <div class="wrap-btn-booking flex-c-m m-t-20">
                      <Link
                        to={
                          sessionStorage.getItem("isLogin")
                            ? "/add-bookings/" + el.id
                            : "/login"
                        }
                        onClick={() => {
                          if (!sessionStorage.getItem("isLogin")) {
                            setTimeout(() => {
                              toast.success("Please Login First for Booking");
                            }, 500);
                          }
                        }}
                      >
                        <button
                          type="submit"
                          class="btn3 flex-c-m size13 txt11 trans-0-4"
                        >
                          Add Booking
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
