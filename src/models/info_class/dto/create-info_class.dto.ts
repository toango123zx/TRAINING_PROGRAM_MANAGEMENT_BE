import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
	IsDateString,
	IsNotEmpty,
	IsOptional,
	ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ConnectUserDto } from '../../user/dto/connect-user.dto';
import { ConnectClassDto } from '../../class/dto/connect-class.dto';

export class CreateInfoClassUserRelationInputDto {
	@ApiProperty({
		type: ConnectUserDto,
	})
	@IsNotEmpty()
	@ValidateNested()
	@Type(() => ConnectUserDto)
	connect: ConnectUserDto;
}
export class CreateInfoClassClassRelationInputDto {
	@ApiProperty({
		type: ConnectClassDto,
	})
	@IsNotEmpty()
	@ValidateNested()
	@Type(() => ConnectClassDto)
	connect: ConnectClassDto;
}

@ApiExtraModels(
	ConnectUserDto,
	CreateInfoClassUserRelationInputDto,
	ConnectClassDto,
	CreateInfoClassClassRelationInputDto,
)
export class CreateInfoClassDto {
	@ApiProperty({
		type: CreateInfoClassUserRelationInputDto,
	})
	@IsNotEmpty()
	@ValidateNested()
	@Type(() => CreateInfoClassUserRelationInputDto)
	user: CreateInfoClassUserRelationInputDto;
	@ApiProperty({
		type: CreateInfoClassClassRelationInputDto,
	})
	@IsNotEmpty()
	@ValidateNested()
	@Type(() => CreateInfoClassClassRelationInputDto)
	class: CreateInfoClassClassRelationInputDto;
	@ApiProperty({
		type: 'string',
		format: 'date-time',
		required: false,
		nullable: true,
	})
	@IsOptional()
	@IsDateString()
	delete_at?: Date | null;
}
