import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	Put,
	Query,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/implements/create-user.command';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard, RoleGuard } from '../../shared/guards';
import { Authorize } from '../../common/decorators';
import { Role } from '../../common/enums';
import { UpdateUserCommand, UpdateUserPhotoCommand } from './commands/implements';
import { UpdateUserDto, CreateUserDto } from './dto';
import { PaginationDto } from 'src/common/dtos';
import {
	GetAllStudentQuery,
	GetUserByIdQuery,
	GetUserQuery,
} from './queries/implements';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Users')
@Controller('user')
export class UserController {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@Get()
	async getUsers(@Query() pagination: PaginationDto) {
		return this.queryBus.execute(new GetUserQuery(pagination));
	}

	@Post()
	@ApiBearerAuth()
	@UseGuards(AuthGuard, RoleGuard)
	@Authorize(Role.Admin)
	async registerUser(@Body() createUserDto: CreateUserDto): Promise<any> {
		return this.commandBus.execute(new CreateUserCommand(createUserDto));
	}

	@Get('/:id')
	async getUserById(@Param('id') id: string): Promise<any> {
		return this.queryBus.execute(new GetUserByIdQuery(id));
	}

	@Put('/:id')
	@ApiBearerAuth()
	@UseGuards(AuthGuard, RoleGuard)
	@Authorize(Role.Admin)
	async updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
		return this.commandBus.execute(new UpdateUserCommand(id, updateUserDto));
	}

	@Get('/student')
	async getAllStudent(@Query() pagination: PaginationDto) {
		return this.queryBus.execute(new GetAllStudentQuery(pagination));
	}

	@Patch('/:id/photo')
	@ApiConsumes('multipart/form-data')
	@ApiBearerAuth()
	@UseGuards(AuthGuard, RoleGuard)
	@Authorize(Role.Admin)
	@ApiBody({
		description: 'File upload',
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	@UseInterceptors(
		FileInterceptor('file', {
			limits: { fileSize: 5 * 1024 * 1024 },
			fileFilter: (req, file, callback) => {
				if (!file.mimetype.match(/image\/(jpeg|png|gif)/)) {
					callback(
						new BadRequestException('Only image files are allowed!'),
						false,
					);
				} else {
					callback(null, true);
				}
			},
		}),
	)
	async updatePhoto(
		@Param('id') id: string,
		@UploadedFile() file: Express.Multer.File,
	) {
		return this.commandBus.execute(new UpdateUserPhotoCommand(id, file));
	}
}
