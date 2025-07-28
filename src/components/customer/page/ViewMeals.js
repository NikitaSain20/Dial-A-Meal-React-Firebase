import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../Firebase";

export default function ViewMeals() {
  var [meals, setmeals] = useState([]);
  useEffect(() => {
    getAllmeals();
  }, []);

  const getAllmeals = () => {
    const mealsRef = collection(db, "/Meals");
    const que = query(mealsRef, where("status", "==", true));
    onSnapshot(que, (querySnapshot) => {
      setmeals(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  };
  console.log(meals);
  return (
    <>
      {/* // ------banner starts------- */}
      <section
        class="bg-title-page flex-c-m p-t-160 p-b-80 p-l-15 p-r-15"
        style={{ backgroundImage: " url(assets/images/bg-title-page-01.jpg)" }}
      >
        <h2 class="tit6 t-center">Dial A Meal Menu</h2>
      </section>
      {/* // ---banner ends----- */}

      {/* -----menu starts------ */}
      <section class="section-mainmenu p-t-110 p-b-70 bg1-pattern">
        <div class="container-fluid">
          <div class="row">
            {meals.map((el) => (
              <div class="col-md-10 col-lg-3 p-r-35 p-r-15-lg m-l-r-auto">
                <div class="wrap-item-mainmenu p-b-22">
                  <h3 class="tit-mainmenu tit10 p-b-25 p-4">{el.type}</h3>

                  <div class="item-mainmenu m-b-36">
                    <div class="flex-w flex-b m-b-3 p-2">
                      <a href="#" class="name-item-mainmenu txt21 p-3">
                       Monday: {el.Monday}
                      </a>
                      <a href="#" class="name-item-mainmenu txt21 p-3">
                       Tuesday: {el.Tuesday}
                      </a>
                      <a href="#" class="name-item-mainmenu txt21 p-3">
                       Wednesday: {el.Wednesday}
                      </a>
                      <a href="#" class="name-item-mainmenu txt21 p-3">
                       Thursday: {el.Thursday}
                      </a>
                      <a href="#" class="name-item-mainmenu txt21 p-3">
                       Fridaay: {el.Friday}
                      </a>
                      <a href="#" class="name-item-mainmenu txt21 p-3">
                       Saturday: {el.Saturday}
                      </a>
                      <a href="#" class="name-item-mainmenu txt21 p-3">
                       Sunday: {el.Sunday}
                      </a>
                    </div>
                    <div class="line-item-mainmenu bg3-pattern"></div>
                      <h6 className="text-center">Price/Day</h6>
                    <div class="price-item-mainmenu txt22 text-center">Rs. {el.priceperday}</div>
                    <span class="info-item-mainmenu txt23"></span>
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
