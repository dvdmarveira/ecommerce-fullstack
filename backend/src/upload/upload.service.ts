// backend/src/upload/upload.service.ts
import { Injectable } from "@nestjs/common";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../config/s3.config";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class UploadService {
  private readonly bucketName = "ecommerce-uploads";

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const key = `${uuidv4()}-${file.originalname}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    return `${process.env.AWS_ENDPOINT}/${this.bucketName}/${key}`;
  }
}
