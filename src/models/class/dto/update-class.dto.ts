import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
	IsDateString,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ConnectSubjectDto } from '../../subject/dto/connect-subject.dto';
import { ConnectLecturerDto } from '../../lecturer/dto/connect-lecturer.dto';

export class UpdateClassSubjectRelationInputDto {
	@ApiProperty({
		type: ConnectSubjectDto,
	})
	@IsNotEmpty()
	@ValidateNested()
	@Type(() => ConnectSubjectDto)
	connect: ConnectSubjectDto;
}
export class UpdateClassLecturerRelationInputDto {
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
	UpdateClassSubjectRelationInputDto,
	ConnectLecturerDto,
	UpdateClassLecturerRelationInputDto,
)
export class UpdateClassDto {
	@ApiProperty({
		type: 'string',
		required: false,
	})
	@IsOptional()
	@IsString()
	name?: string;
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
		type: 'integer',
		format: 'int32',
		required: false,
	})
	@IsOptional()
	@IsInt()
	quantity?: number;
	@ApiProperty({
		required: false,
		type: UpdateClassSubjectRelationInputDto,
	})
	@IsOptional()
	@ValidateNested()
	@Type(() => UpdateClassSubjectRelationInputDto)
	subject?: UpdateClassSubjectRelationInputDto;
	@ApiProperty({
		required: false,
		type: UpdateClassLecturerRelationInputDto,
	})
	@IsOptional()
	@ValidateNested()
	@Type(() => UpdateClassLecturerRelationInputDto)
	lecturer?: UpdateClassLecturerRelationInputDto;
}
