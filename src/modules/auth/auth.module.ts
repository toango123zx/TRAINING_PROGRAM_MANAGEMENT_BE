import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './auth.controller';
import { PrismaService } from '../database/services';
import { AuthRepository } from './repositories/auth.repository';
import { AuthCommandHandlers } from './commands/handlers';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/config';
import { UserModule } from '../user/user.module';
import { AuthQueryHandlers } from './queries/handlers';

@Module({
	imports: [
		CqrsModule,
		UserModule,
		JwtModule.register({
			global: true,
			secret: jwtConfig.secret,
		}),
	],
	controllers: [AuthController],
	providers: [
		PrismaService,
		JwtService,
		AuthRepository,
		...AuthCommandHandlers,
		...AuthQueryHandlers,
	],
	exports: [AuthRepository],
})
export class AuthModule {}
