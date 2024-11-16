import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
	async uploadImage(
		file: Express.Multer.File,
	): Promise<UploadApiResponse | UploadApiErrorResponse> {
		return new Promise((resolve, reject) => {
			cloudinary.uploader
				.upload_stream({ folder: 'ktpm' }, (error, result) => {
					if (error) return reject(error);
					resolve(result);
				})
				.end(file.buffer);
		});
	}
}
