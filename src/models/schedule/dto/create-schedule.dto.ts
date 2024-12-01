import { Weekday } from '@prisma/client';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ConnectClassDto } from '../../class/dto/connect-class.dto';

export class CreateScheduleClassRelationInputDto {
	@ApiProperty({
		type: ConnectClassDto,
	})
	@IsNotEmpty()
	@ValidateNested()
	@Type(() => ConnectClassDto)
	connect: ConnectClassDto;
}

@ApiExtraModels(ConnectClassDto, CreateScheduleClassRelationInputDto)
export class CreateScheduleDto {
	@ApiProperty({
		type: CreateScheduleClassRelationInputDto,
	})
	@IsNotEmpty()
	@ValidateNested()
	@Type(() => CreateScheduleClassRelationInputDto)
	class: CreateScheduleClassRelationInputDto;
	@ApiProperty({
		minimum: 2,
		maximum: 8,
		enum: Weekday,
	})
	@IsNotEmpty()
	weekday: Weekday;
	@ApiProperty({
		minimum: 1,
		maximum: 14,
		type: 'integer',
		format: 'int32',
	})
	@IsNotEmpty()
	@IsInt()
	start_lession: number;
	@ApiProperty({
		minimum: 1,
		maximum: 14,
		type: 'integer',
		format: 'int32',
	})
	@IsNotEmpty()
	@IsInt()
	end_lession: number;
}
