import React from 'react'
import '../StyleSheet/Signup.css'
import { TextField, FormControl, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { signupUser } from '../utils/Authentication';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions';
import { toast } from 'react-toastify';
import Toaster from '../Components/Toaster';

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const basis_user_details = JSON.parse(localStorage.getItem('basis_user_details'))
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector(state => state.user)

    const handleSignup = async (data) => {
        if (data.referal === "MAYANK" || data.referal === "") {
            let obj = {
                firstName: data.firstname,
                lastName: data.lastname,
                email: basis_user_details.email,
                referredCodeKey: "",
                agreeToPrivacyPolicy: true,
                token: basis_user_details.token,
                source: "WEB_APP"
            }

            const result = await signupUser(obj)
            localStorage.setItem("referalToken", result.results.user.referralToken)
            console.log('signup result', result);
            dispatch(registerUser(obj))
            if (isAuthenticated) {
                window.location.replace('/')
            }
        } else {
            toast.info("Enter a valid key or  leave it blank")
        }
    }

    // useEffect(() => {
    //     if (user !== null) {
    //         nevigate('/')
    //     }
    // }, [user, nevigate])

    return (
        <div className='signup'>
            <Toaster />
            {/* signup left */}
            <div className='signup_left'></div>

            {/* signup Right */}
            <div className="signup_right">
                <div className="text-center">
                    <img className='logo' src="https://app.getbasis.co/static/media/BasisLogo.6644ba4e.svg" alt="logo" />
                </div>
                <div className='heading'>
                    <p>Welcome!</p>
                    <p>A financially fabulous future awaits you.</p>
                </div>

                <Typography variant="h4" gutterBottom component="div">
                    Sign up
                </Typography>
                <div className="signup_form">
                    <center>
                        <form onSubmit={handleSubmit(handleSignup)}>
                            <FormControl fullWidth>
                                <Typography className='text-start mt-1'>Enter your first name</Typography>
                                <TextField error={errors.firstname?.type === "required" && true} {...register("firstname", { required: true })} name='firstname' type="text" id="outlined-basic" label="First name" variant="outlined" className="mt-1" focused color='success' />
                                {
                                    errors.firstname?.type === 'required' && (
                                        <p className="text-start text-danger m-0">First name is required</p>
                                    )
                                }
                            </FormControl>
                            <FormControl fullWidth>
                                <Typography className='text-start mt-1'>Enter your last name</Typography>
                                <TextField error={errors.lastname?.type === "required" && true} {...register("lastname", { required: true })} name='lastname' type="text" id="outlined-basic" label="Last name" variant="outlined" className="mt-1" focused color='success' />
                                {
                                    errors.lastname?.type === 'required' && (
                                        <p className="text-start text-danger m-0">Last name is required</p>
                                    )
                                }
                            </FormControl>

                            <FormControl fullWidth>
                                <Typography className='text-start mt-1'>Enter referal code</Typography>
                                <TextField {...register("referal")} name='referal' type="text" id="outlined-basic" label="Referal code" variant="outlined" className="mt-1" focused color='success' />

                            </FormControl>

                            <FormControl fullWidth>
                                <Typography type="email" className='text-start mt-1'>Enter your email id</Typography>
                                <TextField error={(errors.email?.type === 'required' || errors.email?.type === 'pattern') && true} name="email" {...register("email", { required: true, pattern: /^[^<>()[\]\\,;:#^\s@$&!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/ })} id="outlined-basic" label="Email" variant="outlined" className="mt-1" focused color='success' />
                                {
                                    errors.email?.type === 'required' && (
                                        <p className="text-start text-danger m-0">Email is required</p>
                                    )
                                }
                                {
                                    errors.email?.type === 'pattern' && (
                                        <p className="text-start text-danger m-0">Enter valid email</p>
                                    )
                                }
                            </FormControl>
                            <Button type='submit' fullWidth variant='contained' className='mt-3'>sign up</Button>
                            <div className='my-2'>
                                <Typography>
                                    <Link to="/">Already have an account ?</Link>
                                </Typography>
                            </div>
                        </form>
                    </center>
                </div>


            </div>
        </div>
    )
}

export default Signup
