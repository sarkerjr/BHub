export interface IS3Service {
  uploadFile(file: Express.Multer.File, providerId: number): Promise<string>;
}
