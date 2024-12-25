export const INVALID_TOKEN_TEXT = "The access token provided is invalid"
export const TOKEN_REQUIRED_TEXT = "The access token field is required."


export const config_urlencoded = {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
}
export const config_multipart = {
    headers: {
        "Content-Type": "multipart/form-data"
    }
}
export const default500 = {
    success:false,
    message:'Something went wrong'
}