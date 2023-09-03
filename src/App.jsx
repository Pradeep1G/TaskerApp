import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import TimeImg from './assets/TimeImg.jpg'
import { IoIosMail } from 'react-icons/io';
import { RiLockPasswordFill, RiNewspaperFill } from 'react-icons/ri';
import {TiTickOutline} from 'react-icons/ti'
import Footer from './components/Footer';
import axios from 'axios';
import { useAsyncError, useNavigate } from 'react-router-dom';

// import './App.css'

function App() {

  const [Register, setRegister] = useState(false)
  const [Login, setLogin] = useState(true)

  const  [LoginPassword, setLoginPassword] = useState("")
  const [LoginMail, setLoginMail] = useState("")

  const [RegisterName, setRegisterName] = useState("")
  const [RegisterMail, setRegisterMail] = useState("")
  const [RegisterOTP, setRegisterOTP] = useState("")
  const [RegisterNewPwd, setRegisterNewPwd] = useState("")
  const [RegisterCnfmPwd, setRegisterCnfmPwd] = useState("")
  
  
  const [isRegisterMailVerified, setisRegisterMailVerified] = useState(false);
  const [OtpInput, setOtpInput] = useState(false);


  const [GeneratedOTP, setGeneratedOTP] = useState(0);
  const [OTPVerfied, setOTPVerfied] = useState(false);

  const [showRegisterSuccess, setShowRegisterSuccess] = useState(false);



  const navigate = useNavigate();


  const toggleForm = () => {
    console.log("Before toggle:", Login, Register);
    console.warn("clicked")
    setRegister(!Register);
    setLogin(!Login);
    console.log("Before toggle:", Login, Register);
  };







  const doLogin = async(e) => {
    e.preventDefault();

    const data = {
      "mail": LoginMail,
      "password": LoginPassword
    }
    console.warn(data)
    
    const response = await axios.post("http://127.0.0.1:5000/checkUser",data)
    console.warn(response.data)
    if(response.data.act_available){
      if(response.data.is_password_correct){
        // alert("Login Success")
        navigate('/home')
      }else{
        alert("Wrong Password")
      }
    }else{
      alert("Invalid Mail Id")
    }

  }

  const  doRegister = async(e) => {
    e.preventDefault()

    const data = {
      "email":RegisterMail,
      "name": RegisterName,
      "password": RegisterNewPwd
    }
    // console.warn(data)
    if(RegisterCnfmPwd!=RegisterNewPwd){
      alert("Confirm Password and New Password are not same.")
    
    }else{
        if(isRegisterMailVerified){
          const response = await axios.put("http://127.0.0.1:5000/addUser",data)
          console.warn(response.data)
          navigate('/')
          setShowRegisterSuccess(true)
          setLogin(true);
          setRegister(false);
          setTimeout(() => {
            setShowRegisterSuccess(false);
          }, 2000);
        }
        else{
          alert("provided mail is not verified!")
        }
    }


  }

  const verifyRegisterMail = async(e) => {
    e.preventDefault()
    if(!RegisterMail){
      return
    }
    const data = {
      "email":RegisterMail
    }
    const response =await  axios.post("http://127.0.0.1:5000/verifyMail/"+RegisterMail,data)
    console.warn(response.data)
    if(response.data.Act_already_Registered){
      alert("An account is already exits with the given mail.")
    }
    else{
      if(response.data.isOTPsent){
        setGeneratedOTP(response.data.OTP)
        setOtpInput(true)
        startResendTimer()
      }else{
        alert("Invalid Mail Id")
      }
    }
  }


  const [ResendTimeout, setResendTimeout] = useState(30); // Initial countdown time in seconds
  const [IsResendDisabled, setIsResendDisabled] = useState(false);

  useEffect(() => {
    let timer;

    if (IsResendDisabled) {
      timer = setTimeout(() => {
        if (ResendTimeout > 0) {
          setResendTimeout(ResendTimeout - 1);
        } else {
          setIsResendDisabled(false);
          setOtpInput(false);
        }
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [IsResendDisabled, ResendTimeout]);

  const startResendTimer = () => {
    setIsResendDisabled(true);
    setResendTimeout(30); // Reset the countdown time
    // Trigger the OTP resend logic here
  };




  return (
    <>
      <div className='navbar'>
      <div className="px-5 sm:px-2 py-5 bg-blue-400">
            <div className="flex items-end justify-between">
                <div className="flex items-center text-blue-950 text-5xl font-bold px-5">
                    <p>Tasker</p>
                </div>
                <div className="px-5 flex">
                    <div className="flex space-x-5 text-blue-950">
                        <p onClick={()=>{setLogin(true);setRegister(false)}} className='cursor-pointer'><b>Login</b></p>
                        <p onClick={()=>{setLogin(false);setRegister(true)}} className='cursor-pointer'><b>Register</b></p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {showRegisterSuccess && (
            <div className='bg-blue-100 border border-blue-900 text-blue-700 px-4 py-3 rounded relative' role='alert'>
              <strong className='font-bold'>Success!</strong>
              <span className='block sm:inline'> You have successfully registered.</span>
              <span className='absolute top-0 bottom-0 right-0 px-4 py-3'>
                <svg
                  className='fill-current h-6 w-6 text-blue-500'
                  role='button'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  onClick={() => setShowRegisterSuccess(false)}
                >
                  <title>Close</title>
                  <path
                    d='M14.293 5.293a1 1 0 011.414 0l.293.293V3a1 1 0 112 0v2.586l.293-.293a1 1 0 111.414 1.414L17.414 6l2.293 2.293a1 1 0 01-1.414 1.414L16 7.414l-2.293 2.293a1 1 0 01-1.414-1.414L14.586 6l-2.293-2.293a1 1 0 010-1.414 1 1 0 011.414 0L16 4.586l2.293-2.293z'
                    clip-rule='evenodd'
                    fill-rule='evenodd'
                  ></path>
                </svg>
              </span>
            </div>
          )}

      


        <div className='lg:flex items-center justify-around space-x-1'>




          <div className=''>
          <img
            src = {TimeImg} />
          {/* <h1 className='border-solid border-4'>efgftdhgrfkfkfytrfrytdy</h1> */}
          </div>






          <div className=' px-20 lg:p-20'>

          
          <div className={Login ? "block":"hidden"}>
          <form onSubmit={doLogin}>
          <div className='lg:w-96'>

            <div className='text-3xl font-bold pb-10'>
              <p>Login</p>
            </div>

            <div className='flex border-b-2 border-solid border-black '><IoIosMail className='text-2xl'/>
              <input
                className=' outline-none w-full  pb-2 px-2'
                type='email'
                required
                placeholder='mailId'
                onChange={(e) => setLoginMail(e.target.value)}
                />
            </div>

            <div className='flex border-b-2 border-solid border-black pt-6'><RiLockPasswordFill className='text-2xl />'
 />
              <input
                className=' outline-none w-full   pb-2 px-2'
                required
                type='text'
                placeholder='password'
                onChange={(e) => setLoginPassword(e.target.value)}
                />
            </div>

            <div className='pt-8 pb-12'>
              <input type='checkbox'/> Remember me
            </div>

            <div>
              <button  className='bg-blue-500 p-4 px-8 text-xl rounded-xl'>Login</button>
            </div>

            <div className='pt-8'>
            <p><a className='' style={{ cursor: 'pointer', textDecoration:"underline", color:"blue" }}  onClick={toggleForm}>Create Account,</a> If not there.</p>
            </div>

          </div>
          </form>
          </div>






            <div className={Register ? "block":"hidden"}>
            <form onSubmit={doRegister}>
          <div className='lg:w-96'>


            <div className='text-3xl font-bold pb-10'>
              <p>Register</p>
            </div>

            <div className='flex border-b-2 border-solid border-black '><IoIosMail className='text-2xl'/>
              <input
                className=' outline-none w-full pb-2 px-2'
                type='text'
                required
                placeholder='name'
                onChange={(e) => {setRegisterName(e.target.value)}}
                />
            </div>



            {/* <form onSubmit={verifyRegisterMail}> */}
            <div className='flex border-b-2 border-solid border-black pt-6'><RiLockPasswordFill className='text-2xl />'
 />
              {OTPVerfied ? <input
                className=' outline-none  w-full  pb-2 px-2'
                required
                readOnly
                type='email'
                placeholder='mailId'
                onChange={(e) => {setRegisterMail(e.target.value)}}
                /> :
                <input
                className=' outline-none  w-full  pb-2 px-2'
                required
                type='email'
                placeholder='mailId'
                onChange={(e) => {setRegisterMail(e.target.value)}}
                />}
              {/* <input
                className=' outline-none  w-full  pb-2 px-2'
                required
                type='email'
                readOnly
                placeholder='mailId'
                onChange={(e) => {setRegisterMail(e.target.value)}}
                /> */}
            </div>


            <div className={OTPVerfied ? 'hidden':'pt-4 flex justify-center '}>
            {/* <button onClick={verifyRegisterMail} className='bg-blue-500 p-2 px-4 text-sm rounded-xl'>Verify</button> */}


            {IsResendDisabled ? (
                <button className='bg-gray-300 p-2 px-4 text-sm rounded-xl' disabled>
                  Resend ({ResendTimeout}s)
                </button>
              ) : (
                <button onClick={verifyRegisterMail} className='bg-blue-400 text-blue-950 p-2 px-4 text-sm font-semibold rounded-xl'>
                  <p>Verify</p>
                </button>
              )}


            </div>


            {/* <div className='pt-4'>
              {IsResendDisabled ? (
                <button className='bg-gray-300 p-2 px-4 text-sm rounded-xl' disabled>
                  Resend ({ResendTimeout}s)
                </button>
              ) : (
                <button onClick={startResendTimer} className='bg-blue-500 p-2 px-4 text-sm rounded-xl'>
                  Verify
                </button>
              )}
            </div> */}




            <div className={OTPVerfied ? 'pt-2 flex justify-center ': 'hidden'}>
              <p><b className='flex items-center'>VERIFIED<TiTickOutline className='text-xl'/></b></p>
            </div>


            <div className={OtpInput ? '  flex justify-center    pt-4':"hidden"}>



              <input
                className=' outline-none  border-b-2 border-solid border-black  pb-2 px-2'
                
                type='number'
                placeholder='OTP'
                onChange={(e) => {
                  setRegisterOTP(e.target.value)
                  if(e.target.value==GeneratedOTP){
                      setOTPVerfied(true)
                      setOtpInput(false)
                      setisRegisterMailVerified(true);
                  }
                  }}
                />
            </div>
            {/* </form> */}





            <div className='flex border-b-2 border-solid border-black pt-6'><RiLockPasswordFill className='text-2xl />'
 />
              <input
                className=' outline-none w-full   pb-2 px-2'
                required
                type='password'
                placeholder='new password'
                onChange={(e) => {setRegisterNewPwd(e.target.value)}}
                />
            </div>

            <div className='flex border-b-2 border-solid border-black pt-6'><RiLockPasswordFill className='text-2xl />'
 />
              <input
                className=' outline-none  w-full  pb-2 px-2'
                required
                type='password'
                placeholder='confirm password'
                onChange={(e) => {setRegisterCnfmPwd(e.target.value)}}
                />
            </div>

            <div className='pt-8'>
              <button  className='bg-blue-500 text-blue-950 p-4 px-8 text-xl rounded-xl'>Login</button>
            </div>

            <div className='pt-8'>
            <p><a className='' style={{ cursor: 'pointer', textDecoration:"underline", color:"blue" }}  onClick={toggleForm}>Login,</a> If you already have an account.</p>
            </div>

 
            </div>
            </form>





          </div>
          </div>
 







          </div>

          <div className='pt-5 lg:pt-0'>
            <Footer />
          </div>

      

    </>
  )
}

export default App
