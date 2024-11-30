import { Info_Class_Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../user/entities/user.entity';
import { ClassEntity } from '../../class/entities/class.entity';

export class InfoClassEntity {
	@ApiProperty({
		type: 'string',
	})
	id_info_class: string;
	@ApiProperty({
		type: 'string',
	})
	id_user: string;
	@ApiProperty({
		type: () => UserEntity,
		required: false,
	})
	user?: UserEntity;
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
