'use client'
import Link from "next/link"
import { useState } from "react"

import { SignIn } from "@/app/Config/firebase"
import { useRouter } from "next/navigation"
import Image from "next/image"



import TrelloPng from '../../Icons/Trello_logo.svg.png'
import toast from "react-hot-toast"




export default function Login() {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const router = useRouter()
    

    const handleLogIn = async (e: any) => {
        e.preventDefault()
        try {
            await SignIn({ email, password })
            setEmail('')
            setPassword('')
            toast.success('Login Sucessfully')
            router.push('/')
        } catch (error: any) {
            toast.error(error.message)
        }
    }


    return (
        <div className="min-h-full h-screen bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center">
            <div className="flex  flex-1 flex-col justify-center mx-6  px-6 py-12 lg:px-8 backdrop-blur-sm bg-white/20  max-w-sm rounded-lg ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
                <Image className="mx-auto h-10 w-auto" src={TrelloPng} alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleLogIn} method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
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
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
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
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            <Link href='/Views/Signup'> Create Account </Link>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}