import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import { db } from "../../../Firebase";
import { addDoc, collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";

export default function AddMeal() {
  var nav = useNavigate("");
  var [type, settype] = useState("");
  var [Monday, setMonday] = useState("");
  var [Tuesday, setTuesday] = useState("");
  var [Wednesday, setWednesday] = useState("");
  var [Thursday, setThursday] = useState("");
  var [Friday, setFriday] = useState("");
  var [Saturday, setSaturday] = useState("");
  var [Sunday, setSunday] = useState("");
  var [priceperday, setpriceperday] = useState("");
  var [loading, setloading] = useState(false);

  var spinnerObj = {
    margin: "120px auto",
    display: "block",
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      let mealsref = collection(db, "Meals");

      // Check if the meal type already exists
      const q = query(mealsref, where("type", "==", type));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Meal type does not exist, so add it
        await addDoc(mealsref, {
          type: type,
          Monday: Monday,
          Tuesday: Tuesday,
          Wednesday: Wednesday,
          Thursday: Thursday,
          Friday: Friday,
          Saturday: Saturday,
          Sunday: Sunday,
          priceperday: priceperday,
          createdat: Timestamp.now(),
          status: true,
        });

        setloading(false);
        nav("/admin/manage-meals");
        setTimeout(() => {
          toast.success("New Meal Added");
        }, 300);
      } else {
        // Meal type already exists, show an error
        setloading(false);
        toast.error("Meal type already exists");
      }
    } catch (err) {
      setloading(false);
      toast.error("Something Went Wrong");
      console.log("Error in add meal", err);
    }
  };

  return (
    <>
      {/* banner starts */}
      <section
        className="bg-title-page flex-column p-t-250 p-b-80 p-l-15 p-r-15"
        style={{ backgroundImage: "url(/assets/images/bg-title-page-03.jpg)" }}
      >
        <h2 className="tit6 t-center">ADD MEAL</h2>
        <nav>
          <ol className="main_menu d-flex justify-content-center">
            <li className="breadcrumb-item mx-0">
              <Link to="/admin/dashboard" className="px-0 mx-0">
                Dashboard
              </Link>
            </li>
            <li className="breadcrumb-item mx-0">
              <Link to="/admin/manage-meals" className="px-0 mx-0">
                Manage Meals
              </Link>
            </li>
            <li className="breadcrumb-item px-0 mx-0">
              <Link className="text-white px-0">Add Meal</Link>
            </li>
          </ol>
        </nav>
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
        {/* add meal starts */}
        <section className="section-contact bg1-pattern p-t-2 p-b-70">
          <div className="container">
            <h3 className="tit7 t-center p-b-52 p-t-50 text-danger">ADD MEAL</h3>

            <form
              onSubmit={handleForm}
              className="wrap-form-reservation size22 m-l-r-auto"
            >
              <div className="row">
                <div className="col-md-4">
                  {/* <!-- Email --> */}
                  <span className="txt9">Type</span>

                  <div className="wrap-inputemail size12 bo2 bo-rad-10 m-t-3 m-b-23">
                    <select
                      className="bo-rad-10 sizefull txt10 p-l-20"
                      name="type"
                      placeholder="type of meal"
                      value={type}
                      onChange={(e) => {
                        settype(e.target.value);
                      }}
                      required
                    >
                      <option>Choose type of meal</option>
                      <option>Breakfast</option>
                      <option>Lunch</option>
                      <option>Dinner</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-4">
                  {/* <!-- Phone --> */}
                  <span className="txt9">Monday</span>

                  <div className="wrap-inputphone size12 bo2 bo-rad-10 m-t-3 m-b-23">
                    <input
                      className="bo-rad-10 sizefull txt10 p-l-20"
                      type="text"
                      name="Monday"
                      placeholder="Monday"
                      value={Monday}
                      onChange={(e) => {
                        setMonday(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  {/* <!-- Name --> */}
                  <span className="txt9">Tuesday</span>

                  <div className="wrap-inputname size12 bo2 bo-rad-10 m-t-3 m-b-23">
                    <input
                      className="bo-rad-10 sizefull txt10 p-l-20"
                      type="text"
                      name="Tuesday"
                      placeholder="Tuesday"
                      value={Tuesday}
                      onChange={(e) => {
                        setTuesday(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  {/* <!-- Email --> */}
                  <span className="txt9">Wednesday</span>

                  <div className="wrap-inputemail size12 bo2 bo-rad-10 m-t-3 m-b-23">
                    <input
                      className="bo-rad-10 sizefull txt10 p-l-20"
                      type="text"
                      name="Wednesday"
                      placeholder="Wednesday"
                      value={Wednesday}
                      onChange={(e) => {
                        setWednesday(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  {/* <!-- Phone --> */}
                  <span className="txt9">Thursday</span>

                  <div className="wrap-inputphone size12 bo2 bo-rad-10 m-t-3 m-b-23">
                    <input
                      className="bo-rad-10 sizefull txt10 p-l-20"
                      type="text"
                      name="Thursday"
                      placeholder="Thursday"
                      value={Thursday}
                      onChange={(e) => {
                        setThursday(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  {/* <!-- Name --> */}
                  <span className="txt9">Friday</span>

                  <div className="wrap-inputname size12 bo2 bo-rad-10 m-t-3 m-b-23">
                    <input
                      className="bo-rad-10 sizefull txt10 p-l-20"
                      type="text"
                      name="Friday"
                      placeholder="Friday"
                      value={Friday}
                      onChange={(e) => {
                        setFriday(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  {/* <!-- Email --> */}
                  <span className="txt9">Saturday</span>

                  <div className="wrap-inputemail size12 bo2 bo-rad-10 m-t-3 m-b-23">
                    <input
                      className="bo-rad-10 sizefull txt10 p-l-20"
                      type="text"
                      name="Saturday"
                      placeholder="Saturday"
                      value={Saturday}
                      onChange={(e) => {
                        setSaturday(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  {/* <!-- Phone --> */}
                  <span className="txt9">Sunday</span>

                  <div className="wrap-inputphone size12 bo2 bo-rad-10 m-t-3 m-b-23">
                    <input
                      className="bo-rad-10 sizefull txt10 p-l-20"
                      type="text"
                      name="Sunday"
                      placeholder="Sunday"
                      value={Sunday}
                      onChange={(e) => {
                        setSunday(e.target.value);
                      }}
                      required

                    />
                  </div>
                </div>
                <div class="col-md-4">
                  {/* <!-- Name --> */}
                  <span class="txt9">PricePerDay</span>

                  <div class="wrap-inputname size12 bo2 bo-rad-10 m-t-3 m-b-23">
                    <input
                      class="bo-rad-10 sizefull txt10 p-l-20"
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={priceperday}
                      onChange={(e) => {
                        setpriceperday(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="wrap-btn-booking flex-c-m m-t-13">
                <button
                  type="submit"
                  className="btn3 flex-c-m size36 txt11 trans-0-4"
                >
                  ADD
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
