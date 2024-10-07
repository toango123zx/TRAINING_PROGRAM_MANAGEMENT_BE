import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../src/modules/database/services';

const prismaService = new PrismaService();

export const userSeedData = async () => {
	const userData = [];

	const adminQuantity = 5;
	const lecturerQuantity = 10;
	const studentQuantity = 10;

	const salt = await bcrypt.genSalt();

	const adminPassword = await bcrypt.hash('admin', salt);
	const lecturerPassword = await bcrypt.hash('lecturer', salt);
	const studentPassword = await bcrypt.hash('student', salt);

	const role_id = {
		admin: (await prismaService.role.findFirst({ where: { name: 'ADMIN' } }))
			.id_role,
		lecturer: (
			await prismaService.role.findFirst({ where: { name: 'LECTURER' } })
		).id_role,
		student: (await prismaService.role.findFirst({ where: { name: 'STUDENT' } }))
			.id_role,
	};

	for (let i = 0; i < adminQuantity; i++) {
		userData.push({
			username: `admin${i}`,
			password: adminPassword,
			name: `admin${i}`,
			email: `admin${i}@gmail.com`,
			gender: true,
			date_of_birth: new Date(),
			phone_number: '0123456789',
			address: `addressAdmin${i}`,
			salt: salt,
			id_role: role_id.admin,
		});
	}

	for (let i = 0; i < lecturerQuantity; i++) {
		userData.push({
			username: `lecturer${i}`,
			password: lecturerPassword,
			name: `lecturer${i}`,
			email: `lecturer${i}@gmail.com`,
			gender: true,
			date_of_birth: new Date(),
			phone_number: '0123456789',
			address: `addresslecturer${i}`,
			salt: salt,
			id_role: role_id.lecturer,
		});
	}

	for (let i = 0; i < studentQuantity; i++) {
		userData.push({
			username: `student${i}`,
			password: studentPassword,
			name: `student${i}`,
			email: `student${i}@gmail.com`,
			gender: true,
			date_of_birth: new Date(),
			phone_number: '0123456789',
			address: `addressstudent${i}`,
			salt: salt,
			id_role: role_id.student,
		});
	}

	return prismaService.user.createMany({ data: userData });
};
