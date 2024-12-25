
export const createResponse = (success, status_code, message, data) => {
    return {
        success,
        status_code,
        message,
        data
    }
}

/**
 * Recall caller function after refreshing token
 * if token is not valid show clear auth info & show login popup
 */
export const refreshAndRepeat = async (thunkApi, dispatch, response, payload, callerFunction, refreshTokens, logout, openSidebar) => {
    if(resp.status == 401){
        if(resp.data.device_action == 'refresh_bearer_token'){
            //refresh token if token bearer token is expired
            const refresh_res = await thunkApi.dispatch(refreshTokens()).unwrap()
            if(refresh_res.status == 200)
                return await thunkApi.dispatch(callerFunction(payload)).unwrap()
        }else if(resp.data.device_action == 'ask_login'){
            //open login sidebar
            thunkApi.dispatch(logout())
            thunkApi.dispatch(openSidebar('login'))
        }
    }
    return null
}