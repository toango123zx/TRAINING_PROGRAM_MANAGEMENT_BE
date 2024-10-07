import { CreateRoleDto } from 'src/models';
import { PrismaService } from 'src/modules/database/services';

const prismaService = new PrismaService();

const roleData: CreateRoleDto[] = [
	{
		name: 'ADMIN',
		description: 'Role for Administrators',
	},
	{
		name: 'LECTURER',
		description: 'Role for Lecturer',
	},
	{
		name: 'STUDENT',
		description: 'Role for Students',
	},
];

export const roleSeedData = () => {
	return prismaService.role.createMany({
		data: roleData,
	});
};
