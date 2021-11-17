import React from 'react'
import '../StyleSheet/Signup.css'
import { TextField, FormControl, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleSignup = (data) => {
        console.log('signup', data);
    }

    return (
        <div className='signup'>
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
                                <Typography className='text-start mt-1'>Enter your fullname</Typography>
                                <TextField error={errors.fullname?.type === "required" && true} {...register("fullname", { required: true })} name='fullname' type="text" id="outlined-basic" label="Full Name" variant="outlined" className="mt-1" focused color='success' />
                                {
                                    errors.fullname?.type === 'required' && (
                                        <p className="text-start text-danger m-0">Full name is required</p>
                                    )
                                }
                            </FormControl>
                            <FormControl fullWidth>
                                <Typography className='text-start mt-1'>Enter your number</Typography>
                                <TextField
                                    error={(errors.number?.type === 'required' || errors.number?.type === 'minLength' || errors.number?.type === 'maxLength') && true}
                                    {...register("number", { required: true, minLength: 10, maxLength: 10 })} type="tel" autoComplete='off' name='number' id="outlined-basic" label="Number" variant="outlined" className="mt-1" focused color='success' />
                                {
                                    errors.number?.type === 'required' && (
                                        <p className="text-start text-danger m-0">Number is required</p>
                                    )
                                }
                                {
                                    errors.number?.type === 'minLength' && (
                                        <p className="text-start text-danger m-0">Enter valid number</p>
                                    )
                                }
                                {
                                    errors.number?.type === 'maxLength' && (
                                        <p className="text-start text-danger">Enter valid number</p>
                                    )
                                }
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
                            <div className='mt-2'>
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
