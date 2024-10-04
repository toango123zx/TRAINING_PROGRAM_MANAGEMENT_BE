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
		enum: Info_Class_Status,
	})
	status: Info_Class_Status;
}
