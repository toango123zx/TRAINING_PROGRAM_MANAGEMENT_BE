import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export class CreateLecturerUserRelationInputDto {
	@ApiProperty({
		type: CreateUserDto,
	})
	@IsNotEmpty()
	@ValidateNested()
	@Type(() => CreateUserDto)
	create: CreateUserDto;
}

@ApiExtraModels(CreateUserDto, CreateLecturerUserRelationInputDto)
export class CreateLecturerDto {
	@ApiProperty({
		type: CreateLecturerUserRelationInputDto,
	})
	@IsNotEmpty()
	@ValidateNested()
	@Type(() => CreateLecturerUserRelationInputDto)
	user: CreateLecturerUserRelationInputDto;
	@ApiProperty({
		type: 'string',
	})
	@IsNotEmpty()
	@IsString()
	description: string;
	@ApiProperty({
		type: 'string',
		required: false,
		nullable: true,
	})
	@IsOptional()
	@IsString()
	degree?: string | null;
	@ApiProperty({
		type: 'string',
	})
	@IsNotEmpty()
	@IsString()
	work_address: string;
}
