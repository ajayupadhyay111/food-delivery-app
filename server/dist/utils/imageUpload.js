// utils/uploadImageOnCloudinary.js
import streamifier from 'streamifier';
import cloudinary from './cloudinary';
const uploadImageOnCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            return reject(new Error('No file provided'));
        }
        const stream = cloudinary.uploader.upload_stream({
            folder: 'foop app', // optional
            resource_type: 'image',
        }, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result?.secure_url);
        });
        streamifier.createReadStream(file.buffer).pipe(stream);
    });
};
export default uploadImageOnCloudinary;
