import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../user/entities/user.entity';

export class RoleDto {
	@ApiProperty({
		type: 'string',
	})
	id_role: string;
	@ApiProperty({
		type: 'string',
	})
	name: string;
	@ApiProperty({
		type: 'string',
	})
	description: string;
	@ApiProperty({
		type: () => UserDto,
		isArray: true,
		required: false,
	})
	users?: UserDto[];
}
