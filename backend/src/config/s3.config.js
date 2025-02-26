"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Client = void 0;
// backend/src/config/s3.config.ts
const client_s3_1 = require("@aws-sdk/client-s3");
exports.s3Client = new client_s3_1.S3Client({
    endpoint: process.env.AWS_ENDPOINT || "http://localhost:4566",
    region: "us-east-1",
    credentials: {
        accessKeyId: "test",
        secretAccessKey: "test",
    },
    forcePathStyle: true,
});
