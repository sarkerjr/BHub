import {
  S3Client,
  PutObjectCommand,
  type PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { env } from '../../lib/env';
import { IS3Service } from './s3.service.interface';

export class S3Service implements IS3Service {
  private s3: S3Client;
  private bucketName: string;

  constructor() {
    this.s3 = new S3Client({
      region: env.AWS_REGION,
      endpoint: env.AWS_ENDPOINT,
      forcePathStyle: true, // Required for MinIO
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });

    this.bucketName = env.AWS_S3_BUCKET_NAME;
  }

  async uploadFile(
    file: Express.Multer.File,
    providerId: number
  ): Promise<string> {
    const fileExtension = file.originalname.split('.').pop();
    const key = `${uuidv4()}.${fileExtension}`;

    const params: PutObjectCommandInput = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      await this.s3.send(new PutObjectCommand(params));
      return key;
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw new Error('Failed to upload file to S3');
    }
  }
}

export const s3Service = new S3Service();
