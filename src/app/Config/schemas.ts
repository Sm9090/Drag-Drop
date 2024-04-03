import * as Yup from 'yup';


const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

export const SignupSchema = Yup.object().shape({
    
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Please Enter Your name'),
    email: Yup.string().email('Invalid email').matches(emailRegex, 'Invalid Email').required("Email is required"),
    password: Yup.string().min(8).required("Please Enter Your Password"),
    confirmPassword: Yup.string().required('Password must be match').oneOf([Yup.ref("password") , ''], "Password Doesn't Match")   
  })

  export const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').matches(emailRegex, 'Invalid Email').required("Email is required"), 
  })



  