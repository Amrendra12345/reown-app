import axios from "axios"
import { config_urlencoded, INVALID_TOKEN_TEXT, TOKEN_REQUIRED_TEXT } from "./contants"
import { createResponse } from "./helpers"

export const getAccessToken = async (session) => {
    
    try{
        const res = await axios.post(process.env.RAPI_BASE_URL+'/authorize/get-token', {
            grant_type: process.env.WEB_GRANT_TYPE,
            client_id: process.env.WEB_CLIENT_ID,
            client_secret: process.env.WEB_CLIENT_SECRET,
        }, config_urlencoded)

        session.ACCESS_TOKEN = res.data.token.access_token
        await session.save()

        return createResponse(true,200, '',
            { token:res.data.token.access_token})
    }catch(err){
        if(!err.response){
            return createResponse(false, 500, 'Network Error',
                {message:'Network Error'});
        }
        return createResponse(false,err.response.status, err.response.data.message,
            err.response.data)
    }
}

export const searchFamily =  async (session, data) => {
    
try{
    const res = await axios.post(process.env.RAPI_BASE_URL+'/search-family', {
        'access_token' : session.ACCESS_TOKEN,
        'client' : 'web',
        'city' : data.city??process.env.DEFAULT_CITY,
        'search_key' : data.search_key,
    }, config_urlencoded)
    return createResponse(true,200, '',
        res.data )
}catch(err){
    return await errorHandler(searchFamily, session, data, err)
}
}
export const getCommonData = async (req, post_data=[]) =>{
    let data = post_data
    if(!req.session.FOOTER)
        data = [
            ...data,
            {
                data_name:'view-footer'
            }
        ]
    if(isMetaRequired(req.url)){
        data = [
            ...data,
            {
                data_name:'view-meta',
                url : req.url
            }
        ]
    }
    const result = await getPageData(data)
    if(result.success)
    {
        if(result.data.footer)
            req.session.FOOTER = result.data.footer
        else
            result.data =  {
                    ...result.data,
                    footer:req.session.FOOTER
            }
        await req.session.save()
    }
    return result
}
export const isMetaRequired = (url) => {
    const url_segs = url.split('/')
    if(url_segs[1]!='_next')
        return true
    return false
}
export const getPageData =  async (data) => {
    try{
        const res = await axios.post(process.env.RAPI_BASE_URL+'/get-page-data', {
            data: JSON.stringify(data)
        }, config_urlencoded)
        return createResponse(true,200, '',
            res.data )
    }catch(err){
        return await errorHandler(getPageData, null, data, err)
    }
}

export const errorHandler = async(caller, session, data, err)=> {
    if(!err.response){
        return createResponse(false, 500, 'Network Error',
            {message:'Network Error'});
    }
    if(err.response.status == 401 || err.response.data.message==INVALID_TOKEN_TEXT || err.response.data.message == TOKEN_REQUIRED_TEXT){
        if(session){
            await getAccessToken(session)
            return await caller(session, data)
        }else{
            return await caller(data)
        }

    }
    return createResponse(false, err.response.status, err.response.data.message,
        err.response.data)
}

// reown data  

export const create400Response = (res) => {
    return createResponse(400, res.data.message, res.data )
}

export const createExceptionResponse = (err) => {
    return createResponse(err.response.status??500, err.response.data.message??'Something went wrong', err.response.data??[])
}

export const getProductsList = async (search='', make_id=null, processor=null, offset=0, limit=20, sort_by=null, get_filters=0) => {   
      try {
         const data_post = new FormData();
         data_post.append('search', search)
         data_post.append('offset', offset)
         data_post.append('limit', limit)
         data_post.append('sort_by', sort_by)
         data_post.append('get_filters',get_filters)
         if(Array.isArray(make_id)){
             make_id.forEach((itme)=>{
                post_data.append('make_id[]', item)
             })
         }else if(make_id!='' && make_id!=null && make_id!=undefined ){
            post_data.append('make_id[]', make_id)
         }
         const res = await axios.post(process.env.NEXT_PUBLIC_RAPIV2_BASE_URL+'/reown/models', data_post, config_urlencoded)
         return createResponse(200,'success','', res.data)
      } catch (error) {
        
      }     
    // try{
    //     let post_data = new FormData()
    //     post_data.append('search', search)
    //     post_data.append('offset', offset)
    //     post_data.append('limit', limit)
    //     post_data.append('sort_by', sort_by)
    //     post_data.append('get_filters', get_filters)
    //     if(Array.isArray(make_id)){
    //         make_id.forEach((item)=>{
    //             post_data.append('make_id[]', item)
    //         })
    //     }else if(make_id!='' && make_id!=null && make_id!=undefined){
    //         post_data.append('make_id[]', make_id)
    //     }
    //     if(Array.isArray(processor)){
    //         processor.forEach((item)=>{
    //             post_data.append('processors[]', item)
    //         })
    //     }else if(processor!='' && processor!=null && processor!=undefined){
    //         post_data.append('processors[]', make_id)
    //     }
    //     const res = await axios.post(process.env.NEXT_PUBLIC_RAPIV2_BASE_URL+'/reown/models', post_data, config_urlencoded)        
    //     return createResponse(200,'success', res.data )
    // }catch(err){
    //     return createExceptionResponse(err)
    // }
}
export const getFilters = async () => {
    try{
        const res = await axios.get(process.env.NEXT_PUBLIC_RAPIV2_BASE_URL+'/reown/get-filters')        
        return createResponse(true, 200, '', res.data )
    }catch(err){
        return createExceptionResponse(err)
    }
}

export const createSlug = (title, product_sku_id) => {
    return (title.replace(/[^A-Za-z0-9-]+/g, '-')+'-'+product_sku_id).toLowerCase();
}

export const getLaptopDetails = async (product_sku_id) => {
    try{
        const res = await axios.post(process.env.NEXT_PUBLIC_RAPIV2_BASE_URL+'/reown/models/detail', {
            product_sku_id
        }, config_urlencoded)
        if(res.data.product){
            return createResponse(true, 200,'success', res.data )
        }
        return create400Response(res)
    }catch(err){
        return createExceptionResponse(err)
    }
}

export const checkPincodeServiceability = async (to_pincode)=>{    
    try{
        const res = await axios.post(process.env.NEXT_PUBLIC_RAPIV2_BASE_URL+'/reown/check-pincode-servicability', {
            to_pincode
        }, config_urlencoded)      
        return createResponse(true, 200, res.data.message, res.data )
    }catch(err){
        return createExceptionResponse(err)
    }
}

// auth 

export const getHeadersWithAuth = (token) => {
    return {
        headers: {
            ...config_urlencoded.headers,
            'Authorization': 'Bearer ' + token
        }
    }
}

export const loginSendOtp = async (mobile_number) => {
    console.log(mobile_number)
    try{
        const res = await axios.post(process.env.NEXT_PUBLIC_RAPIV2_BASE_URL+'/login/send-otp', {
            mobile_number
        }, config_urlencoded)
        console.log(res)
        if(res.data.success){
            return createResponse(200,res.data.message??'success', res.data )
        }
        
        return create400Response(res)
    }catch(err){
        return createExceptionResponse(err)
    }
}

export const loginVerifyOtp = async (mobile_number, otp) => {
    try{
        const res = await axios.post(process.env.NEXT_PUBLIC_RAPIV2_BASE_URL+'/login/verify-otp', {
            mobile_number,
            otp
        }, config_urlencoded)
        if(res.data.profile){
            return createResponse(true, 200,'success', res.data )
        }
        return create400Response(res)
    }catch(err){
        return createExceptionResponse(err)
    }
}

export const signupSendOtp = async (name, email, mobile_number, party_gender) => {
    try{
        const res = await axios.post(process.env.NEXT_PUBLIC_RAPIV2_BASE_URL+'/signup/send-otp', {
            mobile_number,
            name,
            email,
            party_gender,
            party_type:'customer'
        }, config_urlencoded)
        if(res.data.success){
            return createResponse(true, 200,res.data.message??'success', res.data )
        }
        return create400Response(res)
    }catch(err){
        return createExceptionResponse(err)
    }
}

export const signupVerifyOtp = async (mobile_number, otp) => {
    try{
        const res = await axios.post(process.env.NEXT_PUBLIC_RAPIV2_BASE_URL+'/signup/verify-otp', {
            mobile_number,
            otp
        }, config_urlencoded)
        if(res.data.profile){
            return createResponse(true, 200,'success', res.data )
        }
        return create400Response(res)
    }catch(err){
        return createExceptionResponse(err)
    }
}

export const refreshBearerToken = async (token) => {
    let configs = getHeadersWithAuth(token)
    try{
        const res = await axios.get(process.env.NEXT_PUBLIC_RAPIV2_BASE_URL+'/refresh-tokens', configs)
        return createResponse(true, 200,res.data.message??'', res.data??[] )
    }catch(err){
        return createExceptionResponse(err)
    }
}
export const getProfileDetails = async (token) => {
    let configs = getHeadersWithAuth(token)
    try{
        const res = await axios.get(process.env.NEXT_PUBLIC_RAPIV2_BASE_URL+'/manage-profile/get-profile-full-details', configs)
        return createResponse(true, 200,res.data.message??'', res.data??[] )
    }catch(err){
        return createExceptionResponse(err)
    }
}
export const purchaseOrdersList = async (token, limit='', offset='') => {
    try{
        let configs = getHeadersWithAuth(token)
        const res = await axios.post(process.env.NEXT_PUBLIC_RAPIV2_BASE_URL+'/reown/orders-list', {limit, offset}, configs)
        return createResponse(true, 200,res.data.message??'', res.data??[] )
    }catch(err){
        return createExceptionResponse(err)
    }
}
export const getOrderDetails = async (token, order_id) => {
    try{
        let configs = getHeadersWithAuth(token)
        const res = await axios.get(process.env.NEXT_PUBLIC_RAPIV2_BASE_URL+'/reown/orders-details/'+order_id, configs)
        return createResponse(true, 200,res.data.message??'', res.data??[] )
    }catch(err){
        return createExceptionResponse(err)
    }
}