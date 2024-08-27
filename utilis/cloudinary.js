const cloudinary = require('cloudinary').v2;
const fs = require('fs');

 // Configuration
 cloudinary.config({ 
    cloud_name: 'ducjbqvdd', 
    api_key: '118528729625737', 
    api_secret: 'C75AuiJl8vWsLT9x1xz9Qd7Nknk' 
});

const uploadImageOnCloudinary = async (filePath,folderName)=> {
    try {
        //uploading image from server
       const result = await cloudinary.uploader.upload(filePath, {
        folder: folderName
       });
       //image delete from server
       try {
        fs.unlinkSync(filePath);
       } catch (error) {
        console.log("failed to delete image from server",error)
       }
       console.log(result)
       return{
        secure_url: result.secure_url,
        public_id: result.public_id,
       }

    } catch (error) {
        throw new Error(error);
    }
}
module.exports = {uploadImageOnCloudinary};