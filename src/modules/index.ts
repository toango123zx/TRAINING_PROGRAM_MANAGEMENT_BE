import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { HealthCheckModule } from './healthCheck/healthCheck.module';
import { LecturerModule } from './lecturer/lecturer.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

export const Modules = [
	AuthModule,
	DatabaseModule,
	HealthCheckModule,
	RoleModule,
	UserModule,
	LecturerModule,
];