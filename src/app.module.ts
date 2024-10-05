import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthCheckModule } from './modules/healthCheck/healthCheck.module';
import { DatabaseModule } from './modules/database/database.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { PrismaService } from './modules/database/services';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './shared/shared.module';

const Modules = [SharedModule, AuthModule, UserModule, RoleModule];

@Module({
	imports: [HealthCheckModule, DatabaseModule, ...Modules],
	providers: [PrismaService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
