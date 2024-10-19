import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
	IsDateString,
	IsInt,
	IsNotEmpty,
	IsOptional,
	ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ConnectTrainingProgramDto } from '../../training_program/dto/connect-training_program.dto';
import { ConnectSubjectDto } from '../../subject/dto/connect-subject.dto';

export class CreateInfoSubjectTrainingProgramRelationInputDto {
	@ApiProperty({
		type: ConnectTrainingProgramDto,
	})
	@IsNotEmpty()
	@ValidateNested()
	@Type(() => ConnectTrainingProgramDto)
	connect: ConnectTrainingProgramDto;
}
export class CreateInfoSubjectSubjectRelationInputDto {
	@ApiProperty({
		type: ConnectSubjectDto,
	})
	@IsNotEmpty()
	@ValidateNested()
	@Type(() => ConnectSubjectDto)
	connect: ConnectSubjectDto;
}

@ApiExtraModels(
	ConnectTrainingProgramDto,
	CreateInfoSubjectTrainingProgramRelationInputDto,
	ConnectSubjectDto,
	CreateInfoSubjectSubjectRelationInputDto,
)
export class CreateInfoSubjectDto {
	@ApiProperty({
		type: CreateInfoSubjectTrainingProgramRelationInputDto,
	})
	@IsNotEmpty()
	@ValidateNested()
	@Type(() => CreateInfoSubjectTrainingProgramRelationInputDto)
	trainingProgram: CreateInfoSubjectTrainingProgramRelationInputDto;
	@ApiProperty({
		type: CreateInfoSubjectSubjectRelationInputDto,
	})
	@IsNotEmpty()
	@ValidateNested()
	@Type(() => CreateInfoSubjectSubjectRelationInputDto)
	subject: CreateInfoSubjectSubjectRelationInputDto;
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
	})
	@IsNotEmpty()
	@IsInt()
	semester: number;
}
