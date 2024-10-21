import { PaginationDto } from 'src/common/dtos';

export class GetAllLecturerQuery {
	constructor(public readonly pagination: PaginationDto) {}
}
