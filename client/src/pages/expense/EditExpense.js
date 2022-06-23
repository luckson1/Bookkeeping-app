import React, { useEffect } from "react";
import moneySVG from "../../img/money.svg";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useLocation, useNavigate } from "react-router-dom";
import { UpdateExpenseAction } from "../../redux/slices/expenses/ExpenseSlices";
import { useDispatch, useSelector } from "react-redux";
import DisabledButton from "../../components/disableButton";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage"


const formSchema = Yup.object({
    title: Yup.string().required("title is required"),
    description: Yup.string().required("description is required"),
    amount: Yup.number().required("amount is required")
});


const EditExpense = () => {
    // access location and state
    const location = useLocation()
  //call dispatch
        const dispatch = useDispatch()
//navigation and history
const navigate = useNavigate ()

    //form formik
    const formik = useFormik({
        initialValues: {
            title: location?.state?.title,
            description: location?.state?.description,
            amount: location?.state?.amount
        },
        onSubmit: values => {
            const data= {...values, id: location?.state?._id}
            dispatch(UpdateExpenseAction(data))


        },

        validationSchema: formSchema,
    });

    const expense = useSelector ((state) => {
        return state?.expenses
    })
    
    const { expenseAppErr, expenseServerErr, expenseLoading, isExpUpdated} = expense;
    

    //redirection
    useEffect (() => {
        if(isExpUpdated)navigate("/expenses")
    }, [isExpUpdated, dispatch])
    return (
        <section className="py-5 bg-secondary vh-100">
            <div className="container text-center">
                <a className="d-inline-block mb-5" href="/">
                    <img
                        className="img-fluid"
                        src={moneySVG}
                        alt="SVGeXPENSES"
                        width="200"
                    />
                </a>
                <div className="row mb-4">
                    <div className="col-12 col-md-8 col-lg-5 mx-auto">
                        <div className="p-4 shadow-sm rounded bg-white">
                            <form onSubmit={formik.handleSubmit}>
                                <span className="text-muted">
                                    {/* {data?.type === "income" ? " Income" : " Expense"} */}
                                </span>
                                <h2 className="mb-4 fw-light">
                                    {/* {data?.type === "income"
                    ? " Update Income"
                    : " Update Expense"} */}
                                </h2>
                                 {/* Display expense Err */}
                                 {expenseServerErr || expenseAppErr ? (
                                        <ErrorDisplayMessage>
                                            {expenseServerErr} {expenseAppErr}
                                        </ErrorDisplayMessage>
                                    ) : null}

                                <div className="mb-3 input-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Title"
                                        value={formik.values.title}
                                        onChange={formik.handleChange("title")}
                                        onBlur={formik.handleBlur("title")}

                                    />
                                </div>
                                {/* Err */}
                                <div className="text-danger mb-2">
                                    {formik.touched.title && formik.errors.title}
                                </div>
                                <div className="mb-3 input-group">
                                    <input
                                        value={formik.values.description}
                                        onChange={formik.handleChange("description")}
                                        onBlur={formik.handleBlur("description")}
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Description"
                                    />
                                </div>
                                {/* Err */}
                                <div className="text-danger mb-2">
                                    {formik.touched.description && formik.errors.description}
                                </div>

                                <div className="mb-3 input-group">
                                    <input
                                        value={formik.values.amount}
                                        onChange={formik.handleChange("amount")}
                                        onBlur={formik.handleBlur("amount")}
                                        className="form-control"
                                        type="number"
                                        placeholder="Enter Amount"
                                    />
                                </div>
                                {/* Err */}
                                <div className="text-danger mb-2">
                                    {formik.touched.amount && formik.errors.amount}
                                </div>
                                <div>
                                {expenseLoading?(<DisabledButton />): (<button
                                        type="submit"
                                        className="btn btn-primary py-2 w-100 mb-4"
                                    >
                                        Update
                                    </button>)}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditExpense;