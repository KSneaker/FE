import { createSlice } from "@reduxjs/toolkit";
// const currentUser = JSON.parse(localStorage.getItem('currentUser'))

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            // currentUser: currentUser ? currentUser : null,
            currentUser: null,
            user: null,
            isFetching: false,
            error: false,
            isLogin: false
        },
        register: {
            isFetching: false,
            error: false,
            success: false
        },
        logout: {
            isFetching: false,
            error: false,
            success: false
        },
        msg: ""
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            const { msg, ...other } = action.payload
            state.login.isFetching = false;
            state.login.currentUser = { ...other };
            state.login.user = { ...other }.user;
            state.login.error = false;
            state.login.isLogin = true;
            state.msg = msg
        },
        loginFailed: (state, action) => {
            state.login.isFetching = false;
            state.login.error = true;
            state.msg = action.payload
        },
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
        },
        registerFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
            state.register.success = false;

        },
        logoutSuccess: (state) => {
            state.logout.success = true
            state.login.currentUser = null
        },
        logoutFailed: (state) => {
            state.logout.error = true
        },
        updateUserSuccess: (state, action) => {
            console.log('payload', {
                ...state.login.user,
                ...action.payload.data
            })
            state.login.user = {
                ...state.login.user,
                ...action.payload.data
            }
            state.login.error = false;
        },
        updateUserFailed: (state) => {
            // state.login.user = null
            state.login.error = true;
        },
    }
})


export const {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    logoutSuccess,
    logoutFailed,
    updateUserSuccess,
    updateUserFailed
} = authSlice.actions;

export default authSlice.reducer