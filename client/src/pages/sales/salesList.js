import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
// import { AppPagination } from "../../components/AppPagination";
import ContentDetails from "../../components/ContentDetails";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import LoadingComponent from "../../components/Loading";
// import { FetchSalesAction } from "../../redux/slices/sales/SaleSlices";
import { fetchUserProfileAction } from "../../redux/slices/users/userSlices";
const SalesList = () => {

    //dispatch
    const dispatch = useDispatch()

    // const [page, setPage] = useState(1)
    
    //get all sales 
    const allSales = useSelector(state => state?.users);
    const { profileLoading, profileAppErr, profileServerErr, userProfile } = allSales
    useEffect(() => {
        dispatch(fetchUserProfileAction())
    }, [dispatch]);
    return (
        <>
            {profileLoading ? <LoadingComponent /> : profileServerErr || profileAppErr ?
                < ErrorDisplayMessage>
                    Err
                </ErrorDisplayMessage> :
                <section className="py-6">
                    <div className="container-fluid">
                        <div className="position-relative border rounded-2">
                            <a className="position-absolute top-0 end-0 mt-4 me-4" href="/">.</a>
                            <div className="pt-8 px-8 mb-8">
                                <h6 className="mb-0 fs-3">Recent sale transactions</h6>
                                <p className="mb-0">
                                    Below is the history of your Sale transactions records
                                </p>
                                <Link to="/add-sale" className="btn  btn-outline-danger me-2 m-2">
                                    New Sale
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
                                    {profileLoading ? (
                                        <h1>Loading</h1>
                                    ) : profileServerErr || profileAppErr ? (
                                        <div>Err</div>
                                    ) : userProfile?.sales?.length <= 0 ? (
                                        <h1>No sales Found</h1>
                                    ) : (userProfile?.sales?.map(sale => {
                                        
                                        return <ContentDetails item={sale} key={sale?._id} path={"/edit-sale"} />
                                    }))}
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
                    >
                        {/* Call App Pagination here */}
                        <div>
                            {/* <AppPagination pageNumber={saleList?.total} setPage={setPage} /> */}

                        </div>
                    </div>
                </section>}
        </>
    );
};

export default SalesList;