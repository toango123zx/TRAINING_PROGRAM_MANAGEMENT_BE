import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
	IsDateString,
	IsNotEmpty,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ConnectSubjectDto } from '../../subject/dto/connect-subject.dto';
import { ConnectLecturerDto } from '../../lecturer/dto/connect-lecturer.dto';

export class CreateClassSubjectRelationInputDto {
	@ApiProperty({
		type: ConnectSubjectDto,
	})
	@IsNotEmpty()
	@ValidateNested()
	@Type(() => ConnectSubjectDto)
	connect: ConnectSubjectDto;
}
export class CreateClassLecturerRelationInputDto {
	@ApiProperty({
		type: ConnectLecturerDto,
	})
	@IsNotEmpty()
	@ValidateNested()
	@Type(() => ConnectLecturerDto)
	connect: ConnectLecturerDto;
}

@ApiExtraModels(
	ConnectSubjectDto,
	CreateClassSubjectRelationInputDto,
	ConnectLecturerDto,
	CreateClassLecturerRelationInputDto,
)
export class CreateClassDto {
	@ApiProperty({
		type: 'string',
	})
	@IsNotEmpty()
	@IsString()
	name: string;
	@ApiProperty({
		type: 'string',
		format: 'date-time',
		required: false,
		nullable: true,
	})
	@IsOptional()
	@IsDateString()
	delete_at?: Date | null;
	@ApiProperty({
		type: CreateClassSubjectRelationInputDto,
	})
	@IsNotEmpty()
	@ValidateNested()
	@Type(() => CreateClassSubjectRelationInputDto)
	subject: CreateClassSubjectRelationInputDto;
	@ApiProperty({
		type: CreateClassLecturerRelationInputDto,
	})
	@IsNotEmpty()
	@ValidateNested()
	@Type(() => CreateClassLecturerRelationInputDto)
	lecturer: CreateClassLecturerRelationInputDto;
}
