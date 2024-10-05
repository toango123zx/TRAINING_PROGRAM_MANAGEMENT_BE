import { Module } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../config';
import { AuthRepository } from 'src/modules/auth/repositories/auth.repository';
import { PrismaService } from 'src/modules/database/services';

@Module({
	imports: [
		JwtModule.register({
			secret: jwtConfig.secret,
		}),
	],
	providers: [AuthGuard, AuthRepository, PrismaService],
	exports: [AuthGuard],
})
export class SharedModule {}
