import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { fetchUserProfileAction } from "../../redux/slices/users/userSlices";
import LoadingComponent from "../../components/Loading";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import calcTransaction from "../../utils/accountStats";
import UserProfileStats from "../users/UserProfileStats"
import GraphDtata from "../../components/GraphData";
const Profile = () => {
  // Dispatch
  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(fetchUserProfileAction ())
  }, [dispatch]);

  //get state from store
  const profile= useSelector((state) => {return state?.users})

  const{profileLoading, profileAppErr, profileServerErr, userProfile}=profile
  const navigate = useNavigate();
//Get sales statistics
const salesResult =
userProfile?.sales && calcTransaction(userProfile?.sales ? userProfile.sales : []);

  //Get expense statistics
  const expResult = userProfile?.expenses && calcTransaction(userProfile?.expenses);
  return (
    <>
     {profileLoading ? (
        <LoadingComponent />
      ) : profileAppErr || profileServerErr ? (
        <ErrorDisplayMessage>
          {profileServerErr} {profileAppErr}
        </ErrorDisplayMessage>
      ) : (
      <section className="py-5">
        <div className="container">
          <div className="position-relative p-8 border rounded-2">
            <div className="d-flex mb-6 align-items-center">
              <img
                className="img-fluid me-4 rounded-2"
                //   style="width: 64px; height: 64px;"
                src="https://images.unsplash.com/photo-1593789382576-54f489574d26?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=faces&amp;cs=tinysrgb&amp;fit=crop&amp;h=128&amp;w=128"
                alt=""
              />
              <div>
                <h6 className="fw-bold mb-0">
                  <span>{userProfile?.firstname} {userProfile?.lastname}</span>
                  <span className="badge ms-2 bg-primary-light text-primary">
                    {userProfile?.expenses?.length + userProfile?.sales?.length}{" "}
                    Records Created
                  </span>
                </h6>
                <p className="mb-0">{userProfile?.email}</p>
                <p className="mb-0">Date Joined: 12-Jan-1999</p>
                <button
                  // onClick={() => navigate(history, "update-profile", profile)}
                  onClick={() =>navigate({pathname: '/update'}, {state: userProfile})}
                  className="btn btn-warning"
                >
                  Edit Profile
                   <i class="bi bi-pen fs-3 m-3 text-primary"></i>
                </button>
              </div>
              <GraphDtata
                sales={salesResult?.sumTotal}
                expenses={expResult?.sumTotal}
              />
            </div>

            <UserProfileStats
                numOfTransExp={userProfile?.expenses?.length}
                avgExp={expResult?.avg}
                totalExp={expResult?.sumTotal}
                minExp={expResult?.min}
                maxExp={expResult?.max}
                numOfTransSales={userProfile?.sales?.length}
                avgSales={salesResult?.avg}
                totalSales={salesResult?.sumTotal}
                minSales={salesResult?.min}
                maxSales={salesResult?.max}
              />
            <div className="d-flex align-items-center justify-content-center">
              <button
                // onClick={() => navigate(history, "user-profile-expenses", "")}
                onClick={() =>navigate({pathname: "/user-expenses-list"}, {state: userProfile?.expenses})}
                
                className="btn me-4 w-100 btn-danger d-flex align-items-center justify-content-center"
              >
                <span>View Expenses History</span>
              </button>
              <button
                // onClick={() => navigate(history, "user-profile-sales", "")}
                onClick={() =>navigate({pathname: "/user-sales-list"}, {state: userProfile?.sales})}
                className="btn w-100 btn-outline-success d-flex align-items-center justify-content-center"
              >
                <span>View Sales History</span>
              </button>
            </div>
          </div>
        </div>
      </section>)}
    </>
  );
};

export default Profile;