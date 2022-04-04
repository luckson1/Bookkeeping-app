import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { AppPagination } from "../../components/AppPagination";
import ContentDetails from "../../components/ContentDetails";
import { FetchExpensesAction } from "../../redux/slices/expenses/ExpenseSlices";

const ExpensesList = () => {
    
    //dispatch
    const dispatch = useDispatch()

    const [page, setPage]=useState(1)
    useEffect(() => {
        dispatch(FetchExpensesAction(+page))
    }, [dispatch, page, setPage]);
    //get all expenses
    const allExpenses = useSelector(state => state?.expenses);
    const { expenseLoading, expenseServerErr, expenseAppErr, expenseList } = allExpenses
    console.log(expenseList?.total)
    return (
        <>
            <section className="py-6">
                <div className="container-fluid">
                    <div className="position-relative border rounded-2">
                        <a className="position-absolute top-0 end-0 mt-4 me-4" href="/">.</a>
                        <div className="pt-8 px-8 mb-8">
                            <h6 className="mb-0 fs-3">Recent Expense transactions</h6>
                            <p className="mb-0">
                                Below is the history of your expense transactions records
                            </p>
                            <Link to="/" className="btn  btn-outline-danger me-2 m-2">
                                New Expense
                            </Link>
                        </div>
                        <table className="table">
                            <thead>
                                <tr className="table-active">
                                    <th scope="col">
                                        <button className="btn d-flex align-items-centerr text-uppercase">
                                            <small>Created By</small>
                                        </button>
                                    </th>
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
                                {expenseLoading ? (
                                    <h1>Loading</h1>
                                ) : expenseAppErr || expenseServerErr ? (
                                    <div>Err</div>
                                ) : expenseList?.docs?.length <= 0 ? (
                                    <h1>No Expenses Found</h1>
                                ) : (expenseList?.docs?.map(exp => {
                                    return <ContentDetails item={exp} key={exp?._id} />
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
                        <AppPagination pageNumber= {expenseList?.total } setPage={setPage}/>
                        
                    </div>
                </div>
            </section>
        </>
    );
};

export default ExpensesList;