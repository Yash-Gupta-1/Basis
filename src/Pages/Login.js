import React from 'react'
import '../StyleSheet/Login.css'
import { TextField, FormControl, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleLogin = (data) => {
        console.log('login', data);
    }

    return (
        <div className='login'>
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

                <Typography variant="h4" gutterBottom component="div">
                    Login

                </Typography>
                <div className="login_form">
                    <center>
                        <form onSubmit={handleSubmit(handleLogin)}>
                            <FormControl fullWidth>
                                <Typography className='text-start'>Enter your email id</Typography>
                                <TextField error={(errors.email?.type === 'required' || errors.email?.type === 'pattern') && true} name="email" {...register("email", { required: true, pattern: /^[^<>()[\]\\,;:#^\s@$&!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/ })} autoComplete="off" id="outlined-basic" label="Email" variant="outlined" className="mt-2" focused color='success' />
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
                            <div className='mt-2'>
                                <Typography>
                                    <Link to="/signup">Don't have an account ?</Link>
                                </Typography>
                            </div>
                        </form>
                    </center>
                </div>

                <div className='secure'>
                    <Typography>Your information is safe with us. <br />
                        Oh also, we won't spam you!</Typography>
                </div>
            </div>
        </div>
    )
}

export default Login
