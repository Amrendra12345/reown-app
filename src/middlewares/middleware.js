import nextConnect from 'next-connect'
import multipartFormParser from "@/middlewares/multipart-form-parser";

const  middleware = nextConnect();

middleware.use(multipartFormParser)

export default  middleware;