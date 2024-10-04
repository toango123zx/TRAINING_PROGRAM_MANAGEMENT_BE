import { User_Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../user/entities/user.entity';
import { ClassDto } from '../../class/entities/class.entity';

export class LecturerDto {
	@ApiProperty({
		type: 'string',
	})
	id_lecturer: string;
	@ApiProperty({
		type: 'string',
	})
	id_user: string;
	@ApiProperty({
		type: () => UserDto,
		required: false,
	})
	user?: UserDto;
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
	})
	work_address: string;
	@ApiProperty({
		enum: User_Status,
	})
	status: User_Status;
	@ApiProperty({
		type: () => ClassDto,
		isArray: true,
		required: false,
	})
	classes?: ClassDto[];
}
