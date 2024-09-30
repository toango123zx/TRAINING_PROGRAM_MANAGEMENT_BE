import { NestFactory } from '@nestjs/core';

// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { commonAppConfig } from './config';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = commonAppConfig.port;

  
  setupSwagger(app);

  await app.listen(port);

  console.log(`Application is running on port: ${port}`);
  console.log(
    `Swagger documentation is available at: http://localhost:${port}/api`,
  );
}
bootstrap();
