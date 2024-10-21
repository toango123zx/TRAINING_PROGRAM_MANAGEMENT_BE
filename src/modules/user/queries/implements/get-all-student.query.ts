import { PaginationDto } from 'src/common/dtos';

export class GetAllStudentQuery {
	constructor(public readonly pagination: PaginationDto) {}
}
