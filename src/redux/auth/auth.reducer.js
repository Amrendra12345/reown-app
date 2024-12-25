import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    loginSendOtp,
    loginVerifyOtp,
    signupSendOtp,
    signupVerifyOtp,
    refreshBearerToken,
    getProfileDetails
} from '@/servers/rapiv1'

const INITIAL_STATE = {
    authLoaded:false,  //inform child components if auth info has been loaded
    currentUser:null,
    token:null,
    refreshToken:null,
    openedLoginSidebar:null, //possible values: login,signup,verifyLogin,verifySignup
    errorMessage:null,
    userMobile:null
}

const loginOtp = createAsyncThunk('loginOtp',
        async (mobile_number, thukApi) => {
            return await loginSendOtp(mobile_number)
        }
    )

export const verifyLogin = createAsyncThunk('verifyLogin',
    async ({mobile_number, otp}, thukApi) => {
            return await loginVerifyOtp(mobile_number, otp)
        }
    )

const signupOtp = createAsyncThunk('signupOtp',
    async ({name, email, mobile_number, party_gender}, thukApi) => {
        return await signupSendOtp(name, email, mobile_number, party_gender)
    }
)

const verifySignup = createAsyncThunk('verifySignup',
    async ({mobile_number, otp}, thukApi) => {
        return await signupVerifyOtp(mobile_number, otp)
    }
)

/**
 * Read auth info from local storage , verifies it and load it to application state
 * clear auth data from local storage if not verified
 */
const checkAndLoadInitialAuth = createAsyncThunk('loadInitialAuth', async (payload, thunkApi)=>{
    const localAuth = localStorage.getItem('auth')?JSON.parse(localStorage.getItem('auth')):null
    if(localAuth){
        console.log(localAuth)
        const res = await refreshBearerToken(localAuth.refreshToken)
        if(res.status == 200){
            thunkApi.dispatch(authActions.setCurrentUser({
                currentUser:localAuth.currentUser,
                token:res.data.tokens.token,
                refreshToken:res.data.tokens.refresh_token
            }))
            localAuth.token = res.data.tokens.token
            localAuth.refreshToken = res.data.tokens.refresh_token
            localStorage.setItem("auth", JSON.stringify(localAuth))
        }else{
            thunkApi.dispatch(authActions.logout())
        }
    }
    thunkApi.dispatch(authActions.setAuthLoaded(true))
})

/**
 * Refreshes user token if tokens are valid
 * Otherwise clears expired auth data
 */
const refreshTokens = createAsyncThunk('refreshTokens', async (payload, thunkAPI)=>{
    return await refreshBearerToken(thunkAPI.getState().auth.refreshToken??'')
})

const authSlice = createSlice({
    name : 'auth',
    initialState: INITIAL_STATE,
    reducers: {
            setCurrentUser(state,action){
                //console.log(action)
                state.currentUser = action.payload.currentUser
                state.token = action.payload.token
                state.refreshToken = action.payload.refreshToken
            },
            logout(state, action){
                state.token = null
                state.refreshToken =null
                state.currentUser = null
                state.userMobile = null
                state.partyFullData = null
                localStorage.removeItem('auth')
            },
            openSidebar(state,action){
                state.openedLoginSidebar = action.payload
                state.errorMessage = null
                state.userMobile = null
            },
            closeSidebar(state){
                //alert()
                state.openedLoginSidebar = null
                state.errorMessage = null
                state.userMobile = null
            },
            setPartyFullData(state, action){
                state.partyFullData = action.payload
            },
            setAuthLoaded(state,action){
                state.authLoaded = action.payload
            }
    },
    extraReducers: (builder)=> {
        builder.addCase(loginOtp.fulfilled, (state, action)=>{
            if(action.payload.status == 200){
                state.openedLoginSidebar = 'verifyLogin'
                state.errorMessage = null
            }else{
                console.log(action.payload.message)
                if(action.payload.message.match(/not registered/i)){
                    state.openedLoginSidebar = 'signup'
                    state.errorMessage = null
                }else{
                    state.errorMessage = action.payload.message
                }
            }
        }).addCase(loginOtp.pending, (state, action)=>{
            state.userMobile = action.meta.arg
        })
        .addCase(verifyLogin.fulfilled, (state, action)=>{
            if(action.payload.status == 200){
                if(action.payload.data.profile){
                    state.currentUser = action.payload.data.profile
                    state.token = action.payload.data.tokens.token
                    state.refreshToken = action.payload.data.tokens.refresh_token
                    state.openedLoginSidebar = null
                    localStorage.setItem("auth", JSON.stringify(state))
                    state.authLoaded = true
                }else{
                    state.errorMessage = action.payload.data.status_message??'Some error occurred'
                }
            }else{
                state.errorMessage = action.payload.message
            }
        })
        .addCase(signupOtp.fulfilled, (state, action)=>{
            if(action.payload.status == 200){
                state.openedLoginSidebar = 'verifySignup'
                state.errorMessage = null
            }else{
                state.errorMessage = action.payload.message
            }
        }).addCase(signupOtp.pending, (state, action)=>{
            state.userMobile = action.meta.arg.mobile_number
        })
        .addCase(verifySignup.fulfilled, (state, action)=>{
            if(action.payload.status == 200 && action.payload.data.profile){
                state.currentUser = action.payload.data.profile
                state.token = action.payload.data.tokens.token
                state.refreshToken = action.payload.data.tokens.refresh_token
                state.openedLoginSidebar = null
                state.authLoaded = true
            }else{
                state.errorMessage = action.payload.message
            }
        }).addCase(refreshTokens.fulfilled, (state, action)=>{
            if(action.payload.status == 200 && action.payload.data.tokens){
                state.token = action.payload.data.tokens.token
                state.refreshToken = action.payload.data.tokens.refresh_token
                localStorage.setItem("auth", JSON.stringify(state))
            }else{
                localStorage.removeItem('auth')
                state.token = null
                state.refreshToken =null
                state.currentUser = null
                state.userMobile = null
                state.openedLoginSidebar = 'login'
                state.errorMessage = null
                state.userMobile = null
            }
            state.authLoaded = true
        })
    }
})

export const authReducer = authSlice.reducer
export const authActions = {...authSlice.actions, loginOtp, verifyLogin, signupOtp, verifySignup, refreshTokens, getProfileDetails, checkAndLoadInitialAuth}