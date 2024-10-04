import { Info_Class_Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class InfoClassDto {
	@ApiProperty({
		type: 'string',
	})
	id_info_class: string;
	@ApiProperty({
		enum: Info_Class_Status,
	})
	status: Info_Class_Status;
}
