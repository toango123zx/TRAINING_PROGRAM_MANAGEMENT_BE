import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { HealthCheckModule } from './modules/healthCheck/healthCheck.module';
import { DatabaseModule } from './modules/database/database.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
	imports: [HealthCheckModule, DatabaseModule],
	// controllers: [AppController],
	// providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
