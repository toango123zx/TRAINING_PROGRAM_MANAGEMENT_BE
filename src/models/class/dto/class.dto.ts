import { Class_Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ClassDto {
	@ApiProperty({
		type: 'string',
	})
	id_class: string;
	@ApiProperty({
		type: 'string',
	})
	name: string;
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
		type: 'integer',
		format: 'int32',
	})
	quantity: number;
	@ApiProperty({
		type: 'integer',
		format: 'int32',
	})
	current_quantity: number;
	@ApiProperty({
		enum: Class_Status,
	})
	status: Class_Status;
}
