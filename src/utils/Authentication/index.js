import axios from "axios";
import { BASE_URL } from "../base";
axios.defaults.baseURL = BASE_URL

// Login user
export const emailRequest = async (obj) => {
    try {
        const res = await axios.post('/users/email', obj)
        let { success, results, message } = res.data
        return { success, results, message }
    } catch (error) {
        console.log('error occurs', error.message);
    }
}

// Verify Email Token
export const VerifyEmailToken = async (obj) => {
    try {
        const res = await axios.put('/users/email/verify', obj)
        let { success, results, message } = res.data
        return { success, results, message }
    } catch (error) {
        console.log('error occurs', error.message);
    }
}

// Resend Verify Email Token
export const ResendVerifyEmailToken = async (obj) => {
    try {
        console.log('resend obj', obj);

        const res = await axios.put('/users/token/resendtoken', obj)
        let { success, results, message } = res.data
        return { success, results, message }
    } catch (error) {
        console.log('error occurs', error.message);
    }
}

// Signup 
export const signupUser = async (obj) => {
    try {
        const res = await axios.post('/users', obj)
        let { success, results, message } = res.data
        return { success, results, message }
    } catch (error) {
        console.log('error occurs', error.message);
    }
}

// user profile 

export const getUserProfile = async (referal) => {
    try {
        const res = await axios.get(`/users/referral/${referal}`)
        let { success, results, message } = res.data
        return { success, results, message }
    } catch (error) {
        console.log('error occurs', error.message);
    }
}

// logout 
export const logoutUser = async (id) => {
    try {
        const res = await axios.delete(`/users/logout/${id}`)
        let { success, results, message } = res.data

        return { success, results, message }
    } catch (error) {
        console.log('error occurs', error.message);
    }
}