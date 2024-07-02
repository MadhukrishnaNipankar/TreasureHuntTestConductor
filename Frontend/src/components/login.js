import React, { useEffect, useRef ,useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { login } from "../utility/action/userAction";
import CircularProgress from '@mui/material/CircularProgress';

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [load,setLoad]=useState(false)

  const isUserVerified = useRef(false)

  useEffect(() => {
    isUserVerified.current = user.verified
    localStorage.setItem("token", user.token)
  }, [user]);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setLoad(true)
      Promise.resolve(dispatch(login(values)))
        .then(() => {
          setLoad(false)
          if (isUserVerified.current === true) {
            setSubmitting(false);
            navigate("/instruction")
          }
        })
    } catch (error) {
      console.error("Error during form submission:", error);
      setSubmitting(false);
    }
  };
  return (
    <Formik
    initialValues={user}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
  <Form>
    <div className="w-screen  flex justify-center items-center min-h-[80vh] ">
        <div className="box w-10/12 md:w-3/12 flex items-center justify-center  px-12 py-4 rounded-2xl  d-flex flex-col shadow-[0px_2px_50px_4px_#de9f14] bg-slate-950/50 ">
          <h3 className="text-3xl font-bold  text-center text-white">Login</h3>
            <p className="text-md text-white text-center mt-4">Please enter your login</p>
            <div className="form-login px-6 py-3">
                <div className="mb-3">
                  <label htmlFor="email" className="text-slate-100 font-semibold">Email</label>
                  <Field  type="text" id="email" name="email" placeholder='yadhnesh@gmail.com' className="text-white py-2 px-3 mt-4 rounded-xl w-full border focus:border-yellow-300 bg-slate-950/100 border-blue-600 border-1 outline-none " />
                  <div className="h-7 p-1">
                  <ErrorMessage style={{color:'#EB5286',marginTop:"4px"}} name="email" component="div" />
                  </div>
                </div>

                {/* Password */}
                <div className="my-3">
                  <label htmlFor="password" className="text-slate-100 font-semibold">Password</label>
                  <Field type="password" id="password" name="password" placeholder='*********' className="text-white py-2 px-3 mt-4 rounded-xl w-full border focus:border-yellow-300 bg-slate-950/100 border-blue-600 border-1 outline-none " />
                  <div className="h-7 p-1">
                  <ErrorMessage style={{color:'#EB5286',marginTop:"4px"}} name="password" component="div" />
                  </div>
                </div>
              {load?<div className="flex justify-center w-full py-5 mt-4"><CircularProgress/></div>:
                <div className="my-4">
                <input type="submit" className="cursor-pointer py-2 px-3 mt-4 rounded-xl w-full border focus:border-yellow-300 bg-slate-950/100 border-blue-600 border-1 bg-yellow-500 outline-none " />
                </div>
              }
            </div>
        </div>
    </div>
    </Form>
    </Formik> 
  )
}

export default Login