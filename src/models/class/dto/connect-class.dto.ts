import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConnectClassDto {
	@ApiProperty({
		type: 'string',
	})
	@IsNotEmpty()
	@IsString()
	id_class: string;
}
