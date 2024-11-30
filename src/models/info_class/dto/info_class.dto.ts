import { Info_Class_Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class InfoClassDto {
	@ApiProperty({
		type: 'string',
	})
	id_info_class: string;
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
		enum: Info_Class_Status,
	})
	status: Info_Class_Status;
}
