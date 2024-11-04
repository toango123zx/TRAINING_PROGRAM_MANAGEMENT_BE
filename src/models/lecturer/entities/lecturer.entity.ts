import { User_Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../user/entities/user.entity';
import { ClassEntity } from '../../class/entities/class.entity';

export class LecturerEntity {
	@ApiProperty({
		type: 'string',
	})
	id_lecturer: string;
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
	description: string;
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
	@ApiProperty({
		type: () => ClassEntity,
		isArray: true,
		required: false,
	})
	classes?: ClassEntity[];
}
