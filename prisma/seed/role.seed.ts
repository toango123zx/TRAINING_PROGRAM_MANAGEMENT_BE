import { CreateRoleDto } from "src/models";
import { PrismaService } from "src/modules/database/services";

const prismaService = new PrismaService();

const roleData: CreateRoleDto[] = [
	{
		name: 'ADMIN',
		description: 'Role for Administrators',
	},
	{
		name: 'Lecturer',
		description: 'Role for Teachers',
	},
	{
		name: 'Student',
		description: 'Role for Students',
	},
];

export const roleSeedData = () => {
	return prismaService.role.createMany({
		data: roleData,
	})
}