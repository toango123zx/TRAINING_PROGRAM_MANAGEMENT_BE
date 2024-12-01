import { Weekday } from '@prisma/client';
import { CreateRoleDto, CreateScheduleDto } from 'src/models';
import { PrismaService } from 'src/modules/database/services';

export const scheduleSeedData = async () => {
	const prismaService = new PrismaService();

	const lession = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
	const weekdays = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday',
	];

	const classData = await prismaService.class.findMany();

	const scheduleData = [];

	classData.forEach((currentClass, index) => {
		const numberLession = Math.random() * 4 + 1;
		for (let i = 0; i < numberLession; i++) {
			scheduleData.push({
				id_class: currentClass.id_class,
				weekday: weekdays[Math.round(Math.random() * 6)] as Weekday,
				start_lession: lession[Math.round(Math.random() * 13)],
				end_lession: lession[Math.round(Math.random() * 13)],
			});
		}
	});

	return prismaService.schedule.createMany({ data: scheduleData });
};
