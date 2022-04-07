import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector} from "react-redux";
import { updateProfileAction } from "../../redux/slices/users/userSlices";

// validation
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  firstname: Yup.string().required("firstname is required"),
  lastname: Yup.string().required("lastname is required")
});

const UpdateProfile = () => {
    // get pushed history and state
    const location= useLocation()
    const user=location?.state

    // disptach 

    const dispatch= useDispatch()
    //call={formik.}
    
    const formik = useFormik({
        initialValues: {
          firstname: user?.firstname,
          lastname: user?.lastname,
          email: user?.email,
                  },
        onSubmit: values => {
          dispatch(updateProfileAction(values))
        },
    
        validationSchema: formSchema,
    });
// get state from store
    const updatedProfile= useSelector ((state) => {return state?.users})
    const{profileLoading, profileAppErr, isProfileUpdated, profileServerErr, newProfile}=updatedProfile
    const navigate = useNavigate();
    // redirection
    useEffect (() => {
        if (isProfileUpdated) navigate("/profile")
    }, [isProfileUpdated, dispatch])
  return (
    <>
      <section className="py-5 bg-success vh-100">
        <div className="container text-center">
          <div className="row mb-4">
            <div className="col-12 col-md-8 col-lg-5 mx-auto">
              <div className="p-4 shadow-sm rounded bg-white">
                <form onSubmit={formik.handleSubmit}>
                  <span className="text-muted">Update Profile</span>
                  <h4 className="mb-4 fw-light">
                    Hi, {user?.firstname} Do you want to update your
                    profile
                  </h4>

                  {/* Display income Err */}
                  {/* {userAppErr || userServerErr ? (
                    <ErrorDisplayMessage
                      error={{
                        userAppErr,
                        userServerErr,
                      }}
                    />
                  ) : null} */}
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.firstname}
                      onBlur={formik.handleBlur("firstname")}
                      onChange={formik.handleChange("firstname")}
                      className="form-control"
                      type="text"
                      placeholder="Enter firstname"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.firstname && formik.errors.firstname}
                  </div>
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.lastname}
                      onBlur={formik.handleBlur("lastname")}
                      onChange={formik.handleChange("lastname")}
                      className="form-control"
                      type="text"
                      placeholder="Enter lastname"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.lastname && formik.errors.lastname}
                  </div>
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.email}
                      onBlur={formik.handleBlur("email")}
                      onChange={formik.handleChange("email")}
                      className="form-control"
                      type="email"
                      placeholder="Enter email"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.email && formik.errors.email}
                  </div>

                  <div
                    class="btn-group"
                    role="group"
                    aria-label="Basic mixed styles example"
                  >
                    <button type="submit" class="btn btn-warning">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateProfile;