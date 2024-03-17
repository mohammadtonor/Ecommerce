import cloudinary from 'cloudinary';
          
cloudinary.config({ 
        cloud_name: 'dajdunc2w', 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });

export const cloudinaryUploadImg = async (fileToUploads) => {
    cloudinary.config({ 
        cloud_name: 'dajdunc2w', 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });
    return new Promise((resolve) => {
        cloudinary.uploader.upload(fileToUploads, (result) => {
        resolve(
            {
                url: result.secure_url,
                asset_id: result.asset_id,
                public_id: result.public_id,
            },
            {
                resource_type: "auto",
            }
        );
        });
    });
    };

