import React, { useState } from 'react'
import '../StyleSheet/Login.css'
import { TextField, FormControl, Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form'
import { emailRequest, ResendVerifyEmailToken, VerifyEmailToken } from '../utils/Authentication';
import OtpInput from 'react-otp-input'
import { toast } from 'react-toastify';
import Toaster from '../Components/Toaster';
import { useDispatch } from 'react-redux'
import { login } from '../actions';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [verifyEmailToken, setVerifyEmailToken] = useState(false)
    const [otpvalue, setOtpValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [token, setToken] = useState('')
    const dispatch = useDispatch()

    const handleLogin = async (data) => {
        let obj = {
            email: data.email
        }
        setEmail(data.email)
        const result = await emailRequest(obj)
        setVerifyEmailToken(true)
        dispatch(login(data.email, result.results.token))
        setToken(result.results.token)
        toast.success(result.message)

    }


    const handleChange = otp => setOtpValue(otp);


    const handleVerifyEmailToken = async () => {
        setLoading(true)

        let obj = {
            email: email,
            token: token,
            verificationCode: otpvalue
        }
        localStorage.setItem('basis_user_details', JSON.stringify(obj))

        const result = await VerifyEmailToken(obj)

        if (result.results.wrongEmailTokenCount === 3 || result.results.resendEmailTokenCount === 3) {
            window.location.reload()
        } else {
            setLoading(false)
            if (!result.results.isLogin) {
                window.location.replace('/signup')
            } else {
                localStorage.setItem("referalToken", result.results.user.referralToken)
                window.location.replace('/')
            }
        }
    }

    const handleResendToken = async () => {
        let obj = {
            email: email,
            token: token
        }

        const result = await ResendVerifyEmailToken(obj)
        console.log('resedn token result', result);
        if (result && result.results.resendEmailTokenCount === 3) {
            window.location.reload()
        }
    }

    // useEffect(() => {
    //     if (user !== null) {
    //         navigate('/')
    //     }
    // }, [user, navigate])


    return (
        <div className='login'>
            {/* Toaster  */}
            <Toaster />

            {/* login left */}
            <div className='login_left'></div>

            {/* Login Right */}
            <div className="login_right">
                <div className="text-center">
                    <img className='logo' src="https://app.getbasis.co/static/media/BasisLogo.6644ba4e.svg" alt="logo" />
                </div>
                <div className='heading'>
                    <p>Welcome!</p>
                    <p>A financially fabulous future awaits you.</p>
                </div>
                {
                    !verifyEmailToken ? (
                        <>
                            <Typography variant="h4" gutterBottom component="div">
                                Login
                            </Typography>

                            <div className="login_form">
                                <center>
                                    <form onSubmit={handleSubmit(handleLogin)}>
                                        <FormControl fullWidth>
                                            <Typography className='text-start'>Enter your email id</Typography>
                                            <TextField error={(errors.email?.type === 'required' || errors.email?.type === 'pattern') && true} name="email" {...register("email", { required: true, pattern: /^[^<>()[\]\\,;:#^\s@$&!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                                                autoComplete="off" id="outlined-basic" label="Email" variant="outlined" className="mt-2" focused color='success' />
                                            {
                                                errors.email?.type === 'required' && (
                                                    <p className="text-start text-danger">Email is required</p>
                                                )
                                            }
                                            {
                                                errors.email?.type === 'pattern' && (
                                                    <p className="text-start text-danger">Enter valid email</p>
                                                )
                                            }
                                        </FormControl>
                                        <Button type="submit" fullWidth variant='contained' className='mt-3'>Get otp</Button>
                                        {/* <div className='mt-2'>
                                            <Typography>
                                                <Link to="/signup" className='link'>Don't have an account ?</Link>
                                            </Typography>
                                        </div> */}
                                    </form>
                                </center>
                            </div>
                        </>
                    ) : (
                        <div className="otp">
                            <div className="wrapper">
                                <div className="dialog">
                                    <h3 className="text-center">Verification code</h3>
                                    <h3 className="fs-5">Please enter the 6-digit verification code we sent via email:</h3>
                                    <center>
                                        <form className="form" onSubmit={handleSubmit(handleVerifyEmailToken)}>
                                            <div className="d-flex flex-column align-items-center w-100">
                                                <OtpInput
                                                    value={otpvalue}
                                                    onChange={handleChange}
                                                    numInputs={6}
                                                    separator={<span>-</span>}
                                                />

                                                {
                                                    errors.otp?.type === 'required' && (
                                                        <p className="text-start text-danger">Password is required</p>
                                                    )
                                                }
                                                {
                                                    errors.otp?.type === 'min' && (
                                                        <p className="text-start text-danger">Invalid Otp</p>
                                                    )
                                                }
                                            </div>
                                            <Typography className='mt-2'>Didn't get the OTP ? <span className='link' onClick={handleResendToken}>Send Again</span></Typography>

                                            <div className="checkoutbtn mt-2 mb-2">
                                                <Button disabled={loading && true} type="submit" fullWidth>
                                                    {
                                                        loading ? "Loading..." : "Verify"
                                                    }
                                                </Button>
                                            </div>
                                        </form>
                                    </center>

                                    {/* <img src="http://jira.moovooz.com/secure/attachment/10424/VmVyaWZpY2F0aW9uLnN2Zw==" alt="test" /> */}
                                </div>
                            </div>
                        </div>
                    )
                }


                <div className='secure'>
                    <Typography>Your information is safe with us. <br />
                        Oh also, we won't spam you!</Typography>
                </div>
            </div>
        </div>
    )
}

export default Login
