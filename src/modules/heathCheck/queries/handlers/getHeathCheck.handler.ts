import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { GetHeathCheckQuery } from "../implements";
import { HeathCheckRepository } from "../../repositories";

@QueryHandler(GetHeathCheckQuery)
export class GetHeathCheckHandler implements IQueryHandler<GetHeathCheckQuery> {
    constructor (private readonly heathCheckRepsitory: HeathCheckRepository) {}
    async execute() {
        const connectDatabase = await this.heathCheckRepsitory.getConection();
        if (!connectDatabase) {
            throw  Error('Database connection failed!');
        }
        return 'Okey';
    }
}