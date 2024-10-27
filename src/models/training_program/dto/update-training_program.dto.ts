import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
	IsArray,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateInfoSubjectDto } from '../../info_subject/dto/create-info_subject.dto';

export class UpdateTrainingProgramInfoSubjectsRelationInputDto {
	@ApiProperty({
		type: CreateInfoSubjectDto,
		isArray: true,
	})
	@IsNotEmpty()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateInfoSubjectDto)
	create: CreateInfoSubjectDto[];
}

@ApiExtraModels(
	CreateInfoSubjectDto,
	UpdateTrainingProgramInfoSubjectsRelationInputDto,
)
export class UpdateTrainingProgramDto {
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
		nullable: true,
	})
	@IsOptional()
	@IsString()
	description?: string | null;
	@ApiProperty({
		type: 'string',
		required: false,
	})
	@IsOptional()
	@IsString()
	school_year?: string;
	@ApiProperty({
		type: 'integer',
		format: 'int32',
		required: false,
	})
	@IsOptional()
	@IsInt()
	number_semester?: number;
	@ApiProperty({
		required: false,
		type: UpdateTrainingProgramInfoSubjectsRelationInputDto,
	})
	@IsOptional()
	@ValidateNested()
	@Type(() => UpdateTrainingProgramInfoSubjectsRelationInputDto)
	infoSubjects?: UpdateTrainingProgramInfoSubjectsRelationInputDto;
}
