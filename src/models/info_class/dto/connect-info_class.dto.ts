import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConnectInfoClassDto {
	@ApiProperty({
		type: 'string',
	})
	@IsNotEmpty()
	@IsString()
	id_info_class: string;
}
