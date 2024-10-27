import { User_Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class LecturerDto {
	@ApiProperty({
		type: 'string',
	})
	id_lecturer: string;
	@ApiProperty({
		type: 'string',
		nullable: true,
	})
	description: string | null;
	@ApiProperty({
		type: 'string',
		nullable: true,
	})
	degree: string | null;
	@ApiProperty({
		type: 'string',
		nullable: true,
	})
	work_address: string | null;
	@ApiProperty({
		enum: User_Status,
	})
	status: User_Status;
}
