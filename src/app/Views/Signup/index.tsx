'use client'
import Link from "next/link"
import { useState } from "react"

import {Register} from "@/app/Config/firebase"
import { useRouter } from "next/navigation"
import Image from "next/image"

import TrelloPng from '../../Icons/Trello_logo.svg.png'
import toast from "react-hot-toast"



export default function SignUp() {
    const [name , setName] = useState<string>('')
    const [email ,setEmail] = useState<string>('')
    const [password ,setPassword] = useState<string>('')
    const [phoneNumber ,setPhoneNumber] = useState<number | null>(null)

    console.log(toast)


    const router = useRouter()

    const handleRegister = async (e:any) =>{
        e.preventDefault()
        try {
            await Register({ name, phoneNumber, email, password })
            setEmail('')
            setPassword('')
            setName('')
            setPhoneNumber(null)
            alert('Registered Succefully')
            // router.push('/Views/Login')
          } catch(e:any) {
            alert(e)
          }

    }


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
            <form className="space-y-6" action="#" method="POST">
            <div>
                <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">
                  FullName
                </label>
                <div className="mt-1">
                  <input
                    id="fullName"
                    name="fullName"
                    type="fullName"
                    autoComplete="fullName"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                    onChange={(e) => setName(e.target.value)}
                  />
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
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-900">
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    id="number"
                    name="number"
                    type="number"
                    autoComplete="number"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                    onChange={(e) => setPhoneNumber(parseInt(e.target.value))}
                  />
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
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleRegister}
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
  