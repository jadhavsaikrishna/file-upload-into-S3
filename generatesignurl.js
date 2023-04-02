import AWS from "aws-sdk";

const s3 = new AWS.S3({
  region: "your-s3-region",
  accessKeyId: "your-access-key-id",
  secretAccessKey: "your-secret-access-key"
});

const generateSignedUrl = (key) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: "your-s3-bucket-name",
      Key: key,
      Expires: 60, // URL expires in 60 seconds
      ContentType: "video/mp4", // set the content type of the file
      ACL: "public-read" // set the access control level of the file
    };
    s3.getSignedUrl("putObject", params, (err, url) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    });
  });
};

export default generateSignedUrl;
