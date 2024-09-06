import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {User} from "../models/user.model.js";
import { uploadOnCloud } from "../utils/cloudinary.js";


const registerUser = asyncHandler( async (req,res) => {
    // get details from frontend - username, email, fullname, password
    const {fullname, email, username, password} = req.body
    // validation of these details - not empty
    if(
        [fullname, email, username, password].some((field) => field?.trim()==="")
    ){
        throw new ApiError(400, "All fields are required.")
    }
    // check if user already exists - email, username
    const existingmail = User.findOne(email)
    const existinguser = User.findOne(username)
    if(existinguser){
        throw new ApiError(409, "User with username already exists.")
    }
    if(existingmail){
        throw new ApiError(409, "Email is already registered.")
    }
    // create user object - create entry in Db
    const user = User.create({
        username: username.toLowerCase(),
        fullname,
        email,
        password,
    })
    // remove password and refresh token from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    // check for user creation
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    // return res
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