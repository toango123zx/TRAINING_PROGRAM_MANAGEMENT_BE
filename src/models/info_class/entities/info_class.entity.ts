import { Info_Class_Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../user/entities/user.entity';
import { ClassDto } from '../../class/entities/class.entity';

export class InfoClassDto {
	@ApiProperty({
		type: 'string',
	})
	id_info_class: string;
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
	id_class: string;
	@ApiProperty({
		type: () => ClassDto,
		required: false,
	})
	class?: ClassDto;
	@ApiProperty({
		enum: Info_Class_Status,
	})
	status: Info_Class_Status;
}
