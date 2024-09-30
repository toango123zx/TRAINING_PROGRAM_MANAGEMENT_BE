import { Controller, Get } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { GetHeathCheckQuery } from "./queries/implements";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Heath Check")
@Controller("heath-check")
export class HeathCheckController {
    constructor(
        private readonly queryBus: QueryBus,
    ) {}
    
    @Get()
    async heatCheck() {
        return this.queryBus.execute(new GetHeathCheckQuery());
    }
}