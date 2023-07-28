import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExeptionFilter } from './modules/common/filters/http-exeption/http-exeption.filter';
import { ApiKeyGuard } from './modules/common/guards/api-key/api-key.guard';
import { WrapResponseInterceptor } from './modules/common/interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from './modules/common/interceptors/timeout/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    // Automatic Validation with the datas, using the dto automatic
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );
  app.useGlobalFilters(new HttpExeptionFilter())
  // app.useGlobalGuards(new ApiKeyGuard())
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(), 
    new TimeoutInterceptor()
  )
  await app.listen(3000);
}
bootstrap();
