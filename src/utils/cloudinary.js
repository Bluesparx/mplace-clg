import {v2} from "cloudinary";
import fs from 'fs';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloud = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        // upload
        cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file uploaded
        console.log("File is uploaded on cloudinary. ", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove temp file cuz intterupt
        console.log(error);
        return null
    }
}


console.log(uploadResult);