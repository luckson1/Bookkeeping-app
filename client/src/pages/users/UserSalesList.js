import React from "react";
import { useSelector } from "react-redux";

import { Link, useLocation } from "react-router-dom";
import UserProfileContentDetails from "./UserProfileContentDetails";


const UserSalesList = () => {
    const location = useLocation()
    const sales = location?.state
    console.log(sales)

    // get user profile from store
    const profile= useSelector((state) => {return state?.users});
    const{profileLoading, profileAppErr, profileServerErr}= profile;
    

  return (
    <>
      <section className="py-6">
        <div className="container-fluid">
          <div className="position-relative border rounded-2">
            <a className="position-absolute top-0 end-0 mt-4 me-4" href="/"></a>
            <div className="pt-8 px-8 mb-8">
              <h6 className="mb-0 fs-3">Recent sales transactions</h6>
              <p className="mb-0">
                Below is the history of your sales transactions records
              </p>
              <Link
                to="/add-sales"
                className="btn  btn-outline-primary me-2 m-2"
              >
                New sales
              </Link>
            </div>
            <table className="table">
              <thead>
                <tr className="table-active">
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Title</small>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Description</small>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Amount</small>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Date</small>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Action</small>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <> {profileLoading ? (
                                        <h1>Loading</h1>
                                    ) : profileServerErr || profileAppErr ? (
                                        <div>Err</div>
                                    ) : sales?.length <= 0 ? (
                                        <h1>No sales Found</h1>
                                    ) : (sales?.map(sale => {
                                        return <UserProfileContentDetails item={sale} key={sale?._id} path={"/edit-sale"}/>
                                    }))}</>
              </tbody>
            </table>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        ></div>
      </section>
    </>
  );
};

export default UserSalesList;
