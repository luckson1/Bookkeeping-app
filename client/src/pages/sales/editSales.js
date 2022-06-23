import React, { useEffect} from "react";
import moneySVG from "../../img/money.svg";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DisabledButton from "../../components/disableButton";
import { UpdateSaleAction } from "../../redux/slices/sales/SaleSlices";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage"



const formSchema = Yup.object({
    title: Yup.string().required("title is required"),
    description: Yup.string().required("description is required"),
    amount: Yup.number().required("amount is required")
});


const EditSale = () => {
    //access location
    const location = useLocation()
        const dispatch = useDispatch()


//navigation and History
const navigate= useNavigate()

    //form formik
    const formik = useFormik({
        initialValues: {
            title: location?.state?.title,
            description: location?.state?.description,
            amount: location?.state?.amount
        },
        onSubmit: values => {
            const data= {...values, id: location?.state?._id}
            dispatch(UpdateSaleAction(data))


        },

        validationSchema: formSchema,
    });

    const sale = useSelector ((state) => {
        return state?.sales
    })
    
    const { saleServerErr, saleAppErr, saleLoading, isSaleUpdated} = sale;


    // redirection
    useEffect(() => {
        if (isSaleUpdated) navigate("/sales")
    }, [isSaleUpdated, dispatch])
    return (
        <section className="py-5 bg-secondary vh-100">
            <div className="container text-center">
                <a className="d-inline-block mb-5" href="/">
                    <img
                        className="img-fluid"
                        src={moneySVG}
                        alt="SVGSale"
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
                                {/* Display sale Err */}
                                {saleServerErr || saleAppErr ? (
                                        <ErrorDisplayMessage>
                                            {saleServerErr} {saleAppErr}
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
                                {saleLoading?(<DisabledButton />): (<button
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

export default EditSale;