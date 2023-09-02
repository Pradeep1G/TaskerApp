import { useState } from 'react'
import Navbar from './components/Navbar'
import TimeImg from './assets/TimeImg.jpg'
import { IoIosMail } from 'react-icons/io';
import { RiLockPasswordFill } from 'react-icons/ri';

// import './App.css'

function App() {

  const [Register, setRegister] = useState(false)
  const [Login, setLogin] = useState(true)

  const toggleForm = () => {
    console.log("Before toggle:", Login, Register);
    console.warn("clicked")
    setRegister(!Register);
    setLogin(!Login);
    console.log("Before toggle:", Login, Register);
  };


  return (
    <>
      
      <Navbar />

      


        <div className='lg:flex items-center justify-around space-x-1'>




          <div className=''>
          <img
            src = {TimeImg} />
          {/* <h1 className='border-solid border-4'>efgftdhgrfkfkfytrfrytdy</h1> */}
          </div>






          <div className=' px-20 lg:p-20'>


          <div className={Login ? "block":"hidden"}>
          <div className='lg:w-96'>

            <div className='text-3xl font-bold pb-10'>
              <p>Login</p>
            </div>

            <div className='flex border-b-2 border-solid border-black '><IoIosMail className='text-2xl'/>
              <input
                className=' outline-none  pb-2 px-2'
                type='text'
                required
                placeholder='mailId'
                />
            </div>

            <div className='flex border-b-2 border-solid border-black pt-6'><RiLockPasswordFill className='text-2xl />'
 />
              <input
                className=' outline-none    pb-2 px-2'
                required
                type='text'
                placeholder='password'
                />
            </div>

            <div className='pt-8 pb-12'>
              <input type='checkbox'/> Remember me
            </div>

            <div>
              <button className='bg-blue-500 p-4 px-8 text-xl rounded-xl'>Login</button>
            </div>

            <div className='pt-8'>
            <p><a className='' style={{ cursor: 'pointer', textDecoration:"underline", color:"blue" }}  onClick={toggleForm}>Create Account,</a> If not there.</p>
            </div>

          </div>
          </div>






            <div className={Register ? "block":"hidden"}>
          <div className='lg:w-96'>


            <div className='text-3xl font-bold pb-10'>
              <p>Register</p>
            </div>

            <div className='flex border-b-2 border-solid border-black '><IoIosMail className='text-2xl'/>
              <input
                className=' outline-none  pb-2 px-2'
                type='text'
                required
                placeholder='name'
                />
            </div>

            <div className='flex border-b-2 border-solid border-black pt-6'><RiLockPasswordFill className='text-2xl />'
 />
              <input
                className=' outline-none    pb-2 px-2'
                required
                type='text'
                placeholder='mailId'
                />
            </div>


            <div className='pt-4'>
            <button className='bg-blue-500 p-2 px-4 text-sm rounded-xl'>Verify</button>

            </div>


            <div className='flex   pt-4'>



              <input
                className=' outline-none  border-b-2 border-solid border-black  pb-2 px-2'
                required
                type='text'
                placeholder='OTP'
                />
            </div>





            <div className='flex border-b-2 border-solid border-black pt-6'><RiLockPasswordFill className='text-2xl />'
 />
              <input
                className=' outline-none    pb-2 px-2'
                required
                type='text'
                placeholder='new password'
                />
            </div>

            <div className='flex border-b-2 border-solid border-black pt-6'><RiLockPasswordFill className='text-2xl />'
 />
              <input
                className=' outline-none    pb-2 px-2'
                required
                type='text'
                placeholder='confirm password'
                />
            </div>

            <div className='pt-8'>
              <button className='bg-blue-500 p-4 px-8 text-xl rounded-xl'>Login</button>
            </div>

            <div className='pt-8'>
            <p><a className='' style={{ cursor: 'pointer', textDecoration:"underline", color:"blue" }}  onClick={toggleForm}>Login,</a> If already have an account.</p>
            </div>

 
            </div>





          </div>
          </div>
 







          </div>

      

    </>
  )
}

export default App
