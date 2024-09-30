import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetHealthCheckQuery } from './queries/implements';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller('health-check')
export class HealthCheckController {
	constructor(private readonly queryBus: QueryBus) {}

	@Get()
	async heatCheck() {
		return this.queryBus.execute(new GetHealthCheckQuery());
	}
}
