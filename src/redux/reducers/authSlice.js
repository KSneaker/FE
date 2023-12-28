import { createSlice } from "@reduxjs/toolkit";
const currentUser = JSON.parse(localStorage.getItem('currentUser'))
const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: currentUser ? currentUser : null,
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
        }
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
    logoutFailed
} = authSlice.actions;

export default authSlice.reducer