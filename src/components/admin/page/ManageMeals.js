import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import { db } from "../../../Firebase";
import moment from "moment";
import { toast } from "react-toastify";
const getDate = (date) => {
  let finalDate = moment(date.toDate()).format("MMM Do YY");
  return finalDate;
};
export default function ManageMeals() {
  var [meals, setmeals] = useState([]);
  var [loading, setloading] = useState(true);
  var spinnerObj = {
    margin: "60px auto",
    display: "block",
    borderColor: "red",
  };

  useEffect(() => {
    getAllmeals();
  }, []);

  const getAllmeals = () => {
    const mealsRef = collection(db, "/Meals");
    const que = query(mealsRef, where("status", "==", true));
    onSnapshot(que, (querySnapshot) => {
      setTimeout(() => {
        setloading(false);
      }, 700);

      setmeals(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  };
  const deleteMeal = (id) => {
    let confirm = window.confirm("Are you sure you want to delete it?");
    if (confirm) {
      setloading(true);
      try {
        let mealsRef = doc(db, "/Meals", id);
        // deleteDoc(categoryRef)
        updateDoc(mealsRef, { status: false });

        setloading(false);
        toast.success("Data Deleted Succesfully");
      } catch (err) {
        console.log("Error in deleting category", err);
        setloading(false);
        toast.error("Something Went Wrong");
      }
    }
  };

  return (
    <>
      <section
        className="bg-title-page flex-column p-t-250 p-b-80 p-l-15 p-r-15"
        style={{
          backgroundImage: "url(/assets/images/bg-title-page-03.jpg)",
        }}
      >
        <h2 className="tit6 t-center">MANAGE MEALS</h2>
        <nav>
          <ol class="main_menu d-flex justify-content-center">
            <li class="breadcrumb-item mx-0">
              <Link to="/admin/dashboard" className="px-0 mx-0">
                Dashboard
              </Link>
            </li>
            <li class="breadcrumb-item px-0 mx-0">
              <Link to="/admin/manage-meal" className="text-white px-0">
                Manage Meals
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
            <div className="row p-t-14 p-b-30">
              <div className="col-1"></div>

              <div className="col-8 text-left">
                <h1 className="tit6 text-danger">List of Meals</h1>
              </div>
              <div className="col-2 text-right">
                <Link to="/admin/Add-Meal">
                  <button className="btn btn-outline-danger">ADD MEAL</button>
                </Link>
                <div className="col-1"></div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <table class="table table-bordered table-secondary">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Meal</th>
                      <th scope="col">Monday</th>
                      <th scope="col">Tuesday</th>
                      <th scope="col">Wednesday</th>
                      <th scope="col">Thursday</th>
                      <th scope="col">Friday</th>
                      <th scope="col">Saturday</th>
                      <th scope="col">Sunday</th>

                      <th scope="col">Created At</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meals?.map((i, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{i?.type}
                          <br/>
                          Rs. {i?.priceperday}
                        </td>
                        <td>{i?.Monday}</td>
                        <td>{i?.Tuesday}</td>
                        <td>{i?.Wednesday}</td>
                        <td>{i?.Thursday}</td>
                        <td>{i?.Friday}</td>
                        <td>{i?.Saturday}</td>
                        <td>{i?.Sunday}</td>
                        <td>{getDate(i?.createdat)}</td>

                        <td className="d-flex flex-row">
                          <button
                            className="btn btn-danger m-r-10"
                            onClick={() => {
                              deleteMeal(i?.id);
                            }}
                          >
                            <i class="bi bi-trash-fill fs-25"></i>
                          </button>
                          <Link to={`/admin/update-Meal/${i.id}`}>
                            <button className="btn btn-success">
                              <i class="bi bi-pencil-square fs-25"></i>
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}
