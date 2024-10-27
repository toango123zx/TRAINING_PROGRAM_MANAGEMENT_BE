import { PrismaService } from '../../src/modules/database/services';

import * as infoSubject from './data/info_subject.json';

const prismaService = new PrismaService();

export const infoSubjectSeedData = async () => {
	return prismaService.info_Subject.createMany({
		data: infoSubject.map((item) => item),
	});
};
