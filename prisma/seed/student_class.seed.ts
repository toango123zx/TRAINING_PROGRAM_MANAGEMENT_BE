import { PrismaService } from 'src/modules/database/services';

const prisma = new PrismaService();

function getRandomElements<T>(array: T[], count: number): T[] {
	if (count > array.length) {
		throw new Error('Count cannot be greater than the array length');
	}

	const shuffled = [...array];
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}

	return shuffled.slice(0, count);
}

export const studentClassDataSeed = async () => {
	const studentRole = await prisma.role.findFirst({ where: { name: 'STUDENT' } });
	const students = await prisma.user.findMany({
		where: { id_role: studentRole.id_role },
	});

	for (let i = 0; i < students.length; i++) {
		const data = await prisma.training_Program.findFirst({
			where: { id_training_program: students[i].id_program },
			include: {
				infoSubjects: {
					include: {
						subject: {
							include: {
								classes: true,
							},
						},
					},
				},
			},
		});
		const assignedClasses = getRandomElements(data.infoSubjects, 8).map(
			(item) => item.subject.classes[0],
		);
		assignedClasses.forEach(async (c) => {
			await prisma.info_Class.create({
				data: { id_class: c.id_class, id_user: students[i].id_user },
			});
		});
	}
	const classes = await prisma.class.findMany();
	for (let i = 0; i < classes.length; i++) {
		const count = await prisma.info_Class.count({
			where: { id_class: classes[i].id_class },
		});
		await prisma.class.update({
			where: { id_class: classes[i].id_class },
			data: { current_quantity: count },
		});
	}
};
