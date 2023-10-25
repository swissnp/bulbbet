import { S3Client } from "@aws-sdk/client-s3";
import { env } from "~/env.mjs";
const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${env.ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  }
});

export default s3;
