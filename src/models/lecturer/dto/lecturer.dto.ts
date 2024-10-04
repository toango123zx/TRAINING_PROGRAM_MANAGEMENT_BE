import { User_Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class LecturerDto {
	@ApiProperty({
		type: 'string',
	})
	id_lecturer: string;
	@ApiProperty({
		type: 'string',
	})
	description: string;
	@ApiProperty({
		type: 'string',
		nullable: true,
	})
	degree: string | null;
	@ApiProperty({
		type: 'string',
	})
	work_address: string;
	@ApiProperty({
		enum: User_Status,
	})
	status: User_Status;
}
