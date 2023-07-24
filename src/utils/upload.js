import 'dotenv/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';

const s3Client = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Configure multer to use multerS3 with your S3 credentials
const upload = multer({
    storage: multerS3({
        s3: new AWS.S3({ accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY }),
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const date = new Date().toISOString().replace(/:/g, '-');
            const fileExtension = file.originalname.split('.').pop();
            const filename = `image-${date}.${fileExtension}`;
            cb(null, filename);
        },
    }),
});

async function putObjectURL(key) {
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
    });
    const url = await getSignedUrl(s3Client, command);
    return url;
}

export { putObjectURL, upload };
