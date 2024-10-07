import { Module } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../config';
import { AuthRepository } from 'src/modules/auth/repositories/auth.repository';
import { PrismaService } from 'src/modules/database/services';
import { RoleGuard } from './guards/role.guard';

@Module({
	imports: [
		JwtModule.register({
			secret: jwtConfig.secret,
		}),
	],
	providers: [AuthGuard, RoleGuard, AuthRepository, PrismaService],
	exports: [AuthGuard, RoleGuard],
})
export class SharedModule {}
