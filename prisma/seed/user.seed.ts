import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../src/modules/database/services';

const prismaService = new PrismaService();

const lastNames = [
	'Nguyễn',
	'Trần',
	'Lê',
	'Phạm',
	'Hoàng',
	'Vũ',
	'Đặng',
	'Bùi',
	'Phan',
	'Võ',
];

const maleMiddleNames = ['Văn', 'Minh', 'Hữu', 'Anh', 'Đức', 'Gia', 'Ngọc'];
const femaleMiddleNames = ['Thị', 'Ngọc', 'Mai', 'Thu', 'Bảo', 'Thanh'];

const maleFirstNames = [
	'An',
	'Bảo',
	'Cường',
	'Dũng',
	'Hùng',
	'Khang',
	'Khôi',
	'Minh',
	'Phát',
	'Quân',
];
const femaleFirstNames = [
	'An',
	'Linh',
	'My',
	'Ngọc',
	'Mai',
	'Hà',
	'Phương',
	'Thảo',
	'Quỳnh',
	'Trang',
];

function getRandomName(gender) {
	const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

	const middleName = gender
		? maleMiddleNames[Math.floor(Math.random() * maleMiddleNames.length)]
		: femaleMiddleNames[Math.floor(Math.random() * femaleMiddleNames.length)];

	const firstName = gender
		? maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)]
		: femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];

	return `${lastName} ${middleName} ${firstName}`;
}

export const userSeedData = async () => {
	const userData = [];

	const adminQuantity = 5;
	const lecturerQuantity = 10;
	const studentQuantity = 30;

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
		const gender = Boolean(i % 2);
		userData.push({
			username: `lecturer${i}`,
			password: lecturerPassword,
			name: getRandomName(gender),
			email: `lecturer${i}@gmail.com`,
			gender: gender,
			date_of_birth: new Date(),
			phone_number: '0123456789',
			address: `addresslecturer${i}`,
			salt: salt,
			id_role: role_id.lecturer,
		});
	}

	const programs = await prismaService.training_Program.findMany();
	const n = programs.length;
	for (let i = 0; i < studentQuantity; i++) {
		const gender = Boolean(i % 2);
		userData.push({
			username: `student${i}`,
			password: studentPassword,
			name: getRandomName(gender),
			email: `student${i}@gmail.com`,
			gender: gender,
			date_of_birth: new Date(),
			phone_number: '0123456789',
			address: `addressstudent${i}`,
			salt: salt,
			id_role: role_id.student,
			id_program: programs[Math.floor(Math.random() * n)].id_training_program,
		});
	}

	await prismaService.user.createMany({ data: userData });

	const lecturers = await prismaService.user.findMany({
		where: { id_role: role_id.lecturer },
	});

	lecturers.forEach(async (lecturer) => {
		await prismaService.lecturer.create({
			data: {
				id_user: lecturer.id_user,
				description: '',
				degree: 'ThS',
				work_address: 'dhbk',
			},
		});
	});
};
