import { PrismaService } from '../../src/modules/database/services';

const prismaService = new PrismaService();

export const classSeedData = async () => {
	const subjects = await prismaService.subject.findMany();

	const lecturers = await prismaService.lecturer.findMany();

	return prismaService.class.createMany({
		data: subjects.map((item) => ({
			name: item.name,
			quantity: 50,
			id_subject: item.id_subject,
			id_lecturer:
				lecturers[Math.floor(Math.random() * lecturers.length)].id_lecturer,
		})),
	});
};
