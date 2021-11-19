import { Button } from '@mui/material'
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loadUser, logoutuser } from '../actions'
import Header from '../Components/Header'
import '../StyleSheet/Home.css'

const Home = () => {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logoutuser(user._id))
        dispatch(loadUser())
    }

    useEffect(() => {
        if (user === null) {
            navigate('/login')
        }
    }, [user, navigate])

    return (
        <Fragment>
            <Header />
            <div className='home'>
                <div className="home_left">
                    <div className="user_details">
                        <h1>Hello, </h1>
                        <h3>{user && user.firstName} {user && user.lastName}</h3>
                        <h3> {user && user.phoneNumber}</h3>
                        <h3> {user && user.email}</h3>
                        <Button className='logout_btn' onClick={() => handleLogout()}>Logout</Button>
                    </div>
                </div>
                <div className="home_right">
                    <img src="https://static.wixstatic.com/media/51b1dd_a40af88b6ecc434baaf297f637555efe~mv2.png/v1/crop/x_0,y_0,w_2840,h_1858/fill/w_610,h_404,al_c,q_85,usm_0.66_1.00_0.01/Banner%20Vector%20Finals%20Final.webp" alt="banner" />
                </div>
            </div>
        </Fragment>

    )
}

export default Home
