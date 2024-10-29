import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Classes')
@Controller('class')
export class ClassController {}
