import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from 'src/models';
import { PrismaService } from '../../src/modules/database/services';

const prismaService = new PrismaService();

export const userSeedData = async () => {
	const userData: CreateUserDto[] = [];

	const adminQuantity = 10;
	const lecturerQuantity = 10;
	const studentQuantity = 10;

	const salt = await bcrypt.genSalt();

	const adminPassword = await bcrypt.hash('admin', salt);
	const lecturerPassword = await bcrypt.hash('lecturer', salt);
	const studentPassword = await bcrypt.hash('student', salt);

	for (let i = 0; i < adminQuantity; i++) {
		userData.push({
			username: `admin${i}`,
			password: adminPassword, //password: admin
			name: `admin${i}`,
			email: `admin${1}@gmail.com`,
			gender: true,
			date_of_birth: new Date(),
			phone_number: `0123456789`,
			address: `addressAdmin${i}`,
			salt: salt,
            role: {
                connect: {
                    name: 'ADMIN'
                }
            }
		});
	}

    for (let i = 0; i < lecturerQuantity; i++) {
        userData.push({
            username: `lecturer${i}`,
			password: lecturerPassword, //password: lecturer
			name: `lecturer${i}`,
			email: `lecturer${1}@gmail.com`,
			gender: true,
			date_of_birth: new Date(),
			phone_number: `0123456789`,
			address: `addresslecturer${i}`,
			salt: salt,
            role: {
                connect: {
                    name: 'LECTURER'
                }
            }
        })
    }

    for (let i = 0; i < studentQuantity; i++) {
        userData.push({
            username: `student${i}`,
			password: studentPassword, //password: student
			name: `student${i}`,
			email: `student${1}@gmail.com`,
			gender: true,
			date_of_birth: new Date(),
			phone_number: `0123456789`,
			address: `addressstudent${i}`,
			salt: salt,
            role: {
                connect: {
                    name: 'STUDENT'
                }
            }
        })
    }

    
};
