import { Module } from "@nestjs/common";
import { CqrsModule } from '@nestjs/cqrs';

import { QueryHandlers } from "./queries/handlers";

import { HeathCheckController } from "./heathCheck.controller";
import { DatabaseModule } from "../database/database.module";
import { HeathCheckRepository } from "./repositories";


@Module({
    imports: [CqrsModule, DatabaseModule],
    controllers: [HeathCheckController],
    providers: [
        ...QueryHandlers,
        HeathCheckRepository
    ],
})

export class HeathCheckModule {}