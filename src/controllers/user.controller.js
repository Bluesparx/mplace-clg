import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {User} from "../models/user.model.js";
import { uploadOnCloud } from "../utils/cloudinary.js";


const registerUser = asyncHandler( async (req,res) => {
    const {fullname, email, username, password} = req.body
    if(
        [fullname, email, username, password].some((field) => field?.trim()==="")
    ){
        throw new ApiError(400, "All fields are required.")
    }
    const existingmail = await User.findOne(email)
    const existinguser = await User.findOne(username)
    if(existinguser){
        throw new ApiError(409, "User with username already exists.")
    }
    if(existingmail){
        throw new ApiError(409, "Email is already registered.")
    }
    const user = await User.create({
        username,
        fullname,
        email,
        password,
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})

const addItem = asyncHandler(async (req, res)=>{
    const picLocalPath = req.files?.itempic[0].path;
    if(!picLocalPath){
        throw new ApiError(400, "Item picture is required.")
    }
    const itempic = await uploadOnCloud(picLocalPath)
    if(!itempic){
        throw new ApiError(400, "Picture is required.")
    }
})

export {
    registerUser,
}