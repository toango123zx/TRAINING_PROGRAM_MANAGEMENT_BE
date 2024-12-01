import { Weekday, Schedule_Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { ClassEntity } from '../../class/entities/class.entity';

export class ScheduleEntity {
	@ApiProperty({
		type: 'string',
	})
	id_schedule: string;
	@ApiProperty({
		type: 'string',
	})
	id_class: string;
	@ApiProperty({
		type: () => ClassEntity,
		required: false,
	})
	class?: ClassEntity;
	@ApiProperty({
		minimum: 2,
		maximum: 8,
		enum: Weekday,
	})
	weekday: Weekday;
	@ApiProperty({
		minimum: 1,
		maximum: 14,
		type: 'integer',
		format: 'int32',
	})
	start_lession: number;
	@ApiProperty({
		minimum: 1,
		maximum: 14,
		type: 'integer',
		format: 'int32',
	})
	end_lession: number;
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
		enum: Schedule_Status,
	})
	status: Schedule_Status;
}
