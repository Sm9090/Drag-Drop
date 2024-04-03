'use client'
import toast from "react-hot-toast"
import { useFormik } from "formik"

import {Register} from "@/app/Config/firebase"
import { useRouter } from "next/navigation"
import { SignupSchema } from "@/app/Config/schemas"
import Image from "next/image"
import Link from "next/link"
import TrelloPng from '../../Icons/Trello_logo.svg.png'




export default function SignUp() {
  

    const initialValues ={
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  


    const router = useRouter()
    const {  handleBlur , errors ,  touched, handleSubmit , handleChange ,values}  = useFormik({
      initialValues,
      validationSchema: SignupSchema,
      onSubmit: async (values , action) => {
        try {
          await Register(values);
          toast.success('Registered Successfully');
          router.push('/Views/Login');
        } catch (e:any) {
          toast.error(e.message);
        }
        action.resetForm()
      }
      
    })

   
    return (
      <div className="min-h-full  bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center">
            <div className="flex  flex-1 flex-col justify-center my-5  px-6 py-6 lg:px-8 backdrop-blur-sm bg-white/20  max-w-sm rounded-lg ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image className="mx-auto h-10 w-auto" src={TrelloPng} alt="Your Company" />
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
             Create  Account
            </h2>
          </div>
  
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  FullName
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                    onChange={handleChange}
                    value={values.name}
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name ?(
                  <p className="text-sm text-red-300 m-2">{errors.name}</p>) : 
                  null}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                    onChange={handleChange}
                    value={values.email}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ?
                  <p className="text-sm text-red-300 m-2">{errors.email}</p> : 
                  null}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                    onChange={handleChange}
                    value={values.password}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ?
                  <p className="text-sm text-red-300 m-2">{errors.password}</p> : 
                  null}
                </div>
              </div>
  
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                    onChange={handleChange}
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                  />
                  {errors.confirmPassword && touched.confirmPassword ?
                  <p className="text-sm text-red-300 m-2">{errors.confirmPassword}</p> : 
                  null}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit
                </button>
              </div>
            </form>
  
            <p className="mt-5 text-center text-sm text-gray-500">
              Already have an Account?{' '}
              <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                <Link href='./Login'>SignIn</Link>
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }
  