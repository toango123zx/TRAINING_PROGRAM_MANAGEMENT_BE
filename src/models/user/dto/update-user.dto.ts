import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
	IsBoolean,
	IsDateString,
	IsNotEmpty,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ConnectRoleDto } from '../../role/dto/connect-role.dto';

export class UpdateUserRoleRelationInputDto {
	@ApiProperty({
		type: ConnectRoleDto,
	})
	@IsNotEmpty()
	@ValidateNested()
	@Type(() => ConnectRoleDto)
	connect: ConnectRoleDto;
}

@ApiExtraModels(ConnectRoleDto, UpdateUserRoleRelationInputDto)
export class UpdateUserDto {
	@ApiProperty({
		type: 'string',
		required: false,
	})
	@IsOptional()
	@IsString()
	username?: string;
	@ApiProperty({
		type: 'string',
		required: false,
	})
	@IsOptional()
	@IsString()
	password?: string;
	@ApiProperty({
		type: 'string',
		required: false,
	})
	@IsOptional()
	@IsString()
	name?: string;
	@ApiProperty({
		type: 'string',
		required: false,
	})
	@IsOptional()
	@IsString()
	email?: string;
	@ApiProperty({
		type: 'boolean',
		required: false,
	})
	@IsOptional()
	@IsBoolean()
	gender?: boolean;
	@ApiProperty({
		type: 'string',
		format: 'date-time',
		required: false,
	})
	@IsOptional()
	@IsDateString()
	date_of_birth?: Date;
	@ApiProperty({
		type: 'string',
		required: false,
	})
	@IsOptional()
	@IsString()
	phone_number?: string;
	@ApiProperty({
		type: 'string',
		required: false,
	})
	@IsOptional()
	@IsString()
	address?: string;
	@ApiProperty({
		type: 'string',
		required: false,
	})
	@IsOptional()
	@IsString()
	salt?: string;
	@ApiProperty({
		required: false,
		type: UpdateUserRoleRelationInputDto,
	})
	@IsOptional()
	@ValidateNested()
	@Type(() => UpdateUserRoleRelationInputDto)
	role?: UpdateUserRoleRelationInputDto;
}
