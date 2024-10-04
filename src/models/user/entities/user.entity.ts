import { User_Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { RoleDto } from '../../role/entities/role.entity';
import { LecturerDto } from '../../lecturer/entities/lecturer.entity';
import { InfoClassDto } from '../../info_class/entities/info_class.entity';

export class UserDto {
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
		type: () => RoleDto,
		required: false,
	})
	role?: RoleDto;
	@ApiProperty({
		enum: User_Status,
	})
	status: User_Status;
	@ApiProperty({
		type: () => LecturerDto,
		required: false,
		nullable: true,
	})
	Lecturer?: LecturerDto | null;
	@ApiProperty({
		type: () => InfoClassDto,
		isArray: true,
		required: false,
	})
	info_class?: InfoClassDto[];
}
