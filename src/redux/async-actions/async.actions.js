import {createAsyncThunk} from "@reduxjs/toolkit";
import {authActions} from "@/redux/auth/auth.reducer";
import {getOrderDetails, purchaseOrdersList} from "@/frontend-libs/reown-lib";
import { refreshAndRepeat } from "@/servers/helpers";

export const getOrdersList = createAsyncThunk('getOrdersList', async (payload, thunkApi)=>{
    let resp = await purchaseOrdersList(thunkApi.getState().auth.token??'', payload)
    if(resp.status == 200){
        return resp
    }
    else {
        const repeat_res= await refreshAndRepeat(thunkApi, resp, payload, getOrdersList, authActions.refreshTokens, authActions.logout, authActions.openSidebar)
        if(!repeat_res)
            return repeat_res
    }
    return resp
})

export const getOrderData = createAsyncThunk('orderDetails', async(payload, thunkApi) => {
    let resp = await getOrderDetails(thunkApi.getState().auth.token??'', payload)
    if(resp.status == 200){
        return resp
    }
    else {
        const repeat_res= await refreshAndRepeat(thunkApi, resp, payload, getOrderData, authActions.refreshTokens, authActions.logout, authActions.openSidebar)
        if(!repeat_res)
            return repeat_res
    }
    return resp
})