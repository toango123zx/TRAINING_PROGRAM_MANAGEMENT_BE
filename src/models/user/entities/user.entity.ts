import { User_Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from '../../role/entities/role.entity';
import { TrainingProgramEntity } from '../../training_program/entities/training_program.entity';
import { LecturerEntity } from '../../lecturer/entities/lecturer.entity';
import { InfoClassEntity } from '../../info_class/entities/info_class.entity';

export class UserEntity {
	@ApiProperty({
		type: 'string',
	})
	id_user: string;
	@ApiProperty({
		type: 'string',
	})
	username: string;
	@ApiProperty({
		type: 'string',
	})
	password: string;
	@ApiProperty({
		type: 'string',
	})
	name: string;
	@ApiProperty({
		type: 'string',
	})
	email: string;
	@ApiProperty({
		type: 'boolean',
	})
	gender: boolean;
	@ApiProperty({
		type: 'string',
		format: 'date-time',
	})
	date_of_birth: Date;
	@ApiProperty({
		type: 'string',
	})
	phone_number: string;
	@ApiProperty({
		type: 'string',
	})
	address: string;
	@ApiProperty({
		type: 'string',
	})
	photo_url: string;
	@ApiProperty({
		type: 'string',
		format: 'date-time',
	})
	create_at: Date;
	@ApiProperty({
		type: 'string',
	})
	salt: string;
	@ApiProperty({
		type: 'string',
	})
	id_role: string;
	@ApiProperty({
		type: 'string',
		nullable: true,
	})
	id_program: string | null;
	@ApiProperty({
		type: () => RoleEntity,
		required: false,
	})
	role?: RoleEntity;
	@ApiProperty({
		type: () => TrainingProgramEntity,
		required: false,
		nullable: true,
	})
	program?: TrainingProgramEntity | null;
	@ApiProperty({
		enum: User_Status,
	})
	status: User_Status;
	@ApiProperty({
		type: () => LecturerEntity,
		required: false,
		nullable: true,
	})
	Lecturer?: LecturerEntity | null;
	@ApiProperty({
		type: () => InfoClassEntity,
		isArray: true,
		required: false,
	})
	info_class?: InfoClassEntity[];
}
