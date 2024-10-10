import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
	constructor() {
		super('Resource not found', HttpStatus.NOT_FOUND);
	}
}
