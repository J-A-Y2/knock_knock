import 'dotenv/config';
import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            console.log('upload의 file: ', file);
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            console.log('This function is getting called');
            console.log('upload.js의 file', file);
            console;
            const date = new Date().toISOString().replace(/:/g, '-');
            const fileExtension = file.originalname.split('.').pop();
            const filename = `image-${date}.${fileExtension}`;
            cb(null, filename);
        },
    }),
});

export { upload };
