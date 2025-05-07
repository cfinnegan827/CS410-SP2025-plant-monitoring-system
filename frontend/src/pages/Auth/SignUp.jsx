import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate, Link } from 'react-router-dom'
import Input from '../../components/inputs/input'
import { validateEmail} from '../../utils/helper'
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector'

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")

  const navigate = useNavigate()

  // handle sign up form submit 
  const handleSignUp = async (e) => {
    e.preventDefault(); 

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your name")
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return;
    }
    if (!password) {
      setError("Please enter a valid password")
      return;
    }

    setError("");

    // Signup api calls here
  }

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              value={fullName}
              onChange={({target}) => setFullName(target.value)}
              label="Full Name"
              placeholder="James"
              type="text"
              />
            <Input 
              value={email}
              onChange= {( {target} ) => setEmail(target.value)}
              label= "Email Address"
              placeholder="abc@example.com"
              type="text"
            />
            <div className='col-span-2'>
              <Input 
              value={password}
              onChange= {( {target} ) => setPassword(target.value)}
              label= "Password"
              placeholder="Min 8 Characters"
              type="password"
            />
            </div>
            
          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          
          <button type="submit" className='btn-primary'>
            SIGNUP
          </button>
          
          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an account?{" "}
            <Link className='font-medium text-primary underline' to='/login'>
              Login
            </Link> 
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp
