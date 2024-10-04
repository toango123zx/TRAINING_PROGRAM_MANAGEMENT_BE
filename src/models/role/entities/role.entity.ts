import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../user/entities/user.entity';

export class RoleEntity {
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
		type: () => UserEntity,
		isArray: true,
		required: false,
	})
	users?: UserEntity[];
}
