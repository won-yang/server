import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});
const s3 = new AWS.S3();
const URL_EXPIRATION_SECONDS = 300;

export const getUploadURL = async (): Promise<string> => {
  const ramdomId = Math.random() * 10000000;
  const key = `${ramdomId}.png`;

  const s3Params = {
    Bucket: process.env.UPLOAD_BUCKET,
    Key: key,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: 'image/png',
  };

  const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params);

  return uploadURL;
};
