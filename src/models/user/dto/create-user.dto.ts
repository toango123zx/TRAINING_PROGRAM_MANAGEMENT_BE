import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
	IsBoolean,
	IsDateString,
	IsNotEmpty,
	IsString,
	ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ConnectRoleDto } from '../../role/dto/connect-role.dto';

export class CreateUserRoleRelationInputDto {
	@ApiProperty({
		type: ConnectRoleDto,
	})
	@IsNotEmpty()
	@ValidateNested()
	@Type(() => ConnectRoleDto)
	connect: ConnectRoleDto;
}

@ApiExtraModels(ConnectRoleDto, CreateUserRoleRelationInputDto)
export class CreateUserDto {
	@ApiProperty({
		type: 'string',
	})
	@IsNotEmpty()
	@IsString()
	username: string;
	@ApiProperty({
		type: 'string',
	})
	@IsNotEmpty()
	@IsString()
	password: string;
	@ApiProperty({
		type: 'string',
	})
	@IsNotEmpty()
	@IsString()
	name: string;
	@ApiProperty({
		type: 'string',
	})
	@IsNotEmpty()
	@IsString()
	email: string;
	@ApiProperty({
		type: 'boolean',
	})
	@IsNotEmpty()
	@IsBoolean()
	gender: boolean;
	@ApiProperty({
		type: 'string',
		format: 'date-time',
	})
	@IsNotEmpty()
	@IsDateString()
	date_of_birth: Date;
	@ApiProperty({
		type: 'string',
	})
	@IsNotEmpty()
	@IsString()
	phone_number: string;
	@ApiProperty({
		type: 'string',
	})
	@IsNotEmpty()
	@IsString()
	address: string;
	@ApiProperty({
		type: 'string',
	})
	@IsNotEmpty()
	@IsString()
	salt: string;
	@ApiProperty({
		type: CreateUserRoleRelationInputDto,
	})
	@IsNotEmpty()
	@ValidateNested()
	@Type(() => CreateUserRoleRelationInputDto)
	role: CreateUserRoleRelationInputDto;
}
