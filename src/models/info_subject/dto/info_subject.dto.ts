import { Info_Subject_Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class InfoSubjectDto {
	@ApiProperty({
		type: 'string',
	})
	id_info_subject: string;
	@ApiProperty({
		type: 'string',
		format: 'date-time',
	})
	create_at: Date;
	@ApiProperty({
		type: 'string',
		format: 'date-time',
	})
	update_at: Date;
	@ApiProperty({
		type: 'string',
		format: 'date-time',
		nullable: true,
	})
	delete_at: Date | null;
	@ApiProperty({
		enum: Info_Subject_Status,
	})
	status: Info_Subject_Status;
	@ApiProperty({
		type: 'integer',
		format: 'int32',
	})
	semester: number;
}
