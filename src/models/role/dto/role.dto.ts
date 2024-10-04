import { ApiProperty } from '@nestjs/swagger';

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
}
