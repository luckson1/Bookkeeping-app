import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from 'yup';
import moneySVG from "../../img/money.svg";
import { createExpenseAction } from "../../redux/slices/expenses/ExpenseSlices";

// validation
const formSchema = Yup.object({
    title: Yup.string().required("title is required"),
    description: Yup.string().required("description is required"),
    amount: Yup.number().required("amount is required")
})
const AddExpense = () => {

    //history
    // const navigate = useNavigate();


    // dispatch
    const dispatch = useDispatch()

    
  

    //form formik
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            amount: ""
        },
        onSubmit: values => {
            dispatch(createExpenseAction(values))
            
            
        },

        validationSchema: formSchema,
    });

    const expense = useSelector((state) => {
        return state?.expenses
    })
    const { expenseAppErr, expenseServerErr} = expense;

    // useEffect(() => {
    //     if (expenseCreated) {
    //         return navigate('/expenses')
    //     }
    // }, [expenseCreated])
    return (
        <>
            <section className="py-5 bg-danger vh-100">
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
                                    <span className="text-muted">Expense</span>
                                    <h2 className="mb-4 fw-light">Record New Expense</h2>
                                    {/* Display income Err */}
                                    {expenseServerErr || expenseAppErr ? (
                                        <div className="alert alert-danger" role="alert">
                                            {expenseServerErr} {expenseAppErr}
                                        </div>
                                    ) : null}
                                    <div className="mb-3 input-group">
                                        <input
                                            value={formik.values.title}
                                            onChange={formik.handleChange("title")}
                                            onBlur={formik.handleBlur("title")}
                                            className="form-control"
                                            type="text"
                                            placeholder="Enter Title"
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
                                    <button type="submit" className="btn btn-danger mb-4 w-100">
                                        Record Expense
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddExpense;