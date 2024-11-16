import { User } from '@prisma/client';

export class SafeUserDto {
	constructor(user: User) {
		this.id_user = user.id_user;
		this.username = user.username;
		this.name = user.name;
		this.email = user.email;
		this.gender = user.gender;
		this.date_of_birth = user.date_of_birth;
		this.phone_number = user.phone_number;
		this.address = user.address;
		this.create_at = user.create_at;
		this.id_role = user.id_role;
		this.photo_url = user.photo_url;
	}

	id_user: string;
	username: string;
	name: string;
	email: string;
	gender: boolean;
	date_of_birth: Date;
	phone_number: string;
	address: string;
	create_at: Date;
	id_role: string;
	photo_url: string;
}
