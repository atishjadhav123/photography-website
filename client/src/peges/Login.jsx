import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useLoginUserMutation } from '../redux/authApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [login, { data, isSuccess, isLoading, error, isError }] = useLoginUserMutation()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().required("Enter email").email(),
      password: yup.string().required("Enter password"),
    }),
    onSubmit: (values, { resetForm }) => {
      login(values)
      resetForm()
    }
  })
  useEffect(() => {
    if (isSuccess) {
      if (data && data.role === "admin") {
        toast.success("admin login success")
        navigate("/admin")
      } else if (data && data.role === "photographer") {
        toast.success("photographer login success")
        navigate("/photographer")
      } else if (data && data.role === "user") {
        toast.success("user login success")
        navigate("/")
      }
    }
  }, [isSuccess])
  if (isLoading) return <h3 className='spinner-border'></h3>
  if (isError) return <h3>Failed to add profile: {error?.message}</h3>
  return <>
    <div className="h-screen flex">
      <div className="hidden lg:flex w-full lg:w-1/2 login_img_section
          justify-around items-center">
        <div
          className=" 
                  bg-black 
                  opacity-20 
                  inset-0 
                  z-0"
        >

        </div>
        <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
          <h1 className="text-white font-bold text-4xl font-sans">Simple photographer's website login</h1>
          <p className="text-white mt-1">photographer's website login's website login</p>
          <div className="flex justify-center lg:justify-start mt-6">
            <a href="#" className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2">Get Started</a>
          </div>
        </div>
      </div>
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
        <div className="w-full px-8 md:px-32 lg:px-24">
          <form onSubmit={formik.handleSubmit} className="bg-white rounded-md shadow-2xl p-5">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello</h1>
            <p className="text-sm font-normal text-gray-600 mb-8">Welcome Back</p>
            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
              <input {...formik.getFieldProps("email")} id="email" className=" pl-2 w-full outline-none border-none" type="email" name="email" placeholder="Email Address" />
            </div>
            <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <input {...formik.getFieldProps("password")} className="pl-2 w-full outline-none border-none" type="password" name="password" id="password" placeholder="Password" />

            </div>
            <button type="submit" className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Login</button>
            <div className="flex justify-between mt-4">
              <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Forgot Password ?</span>

              <a href="register" className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Don't have an account yet?</a>
            </div>

          </form>
        </div>

      </div>
    </div>
  </>
}

export default Login