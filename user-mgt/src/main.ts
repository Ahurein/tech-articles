import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const getPrettyClassValidatorErrors = (
          validationErrors: ValidationError[],
          parentProperty = '',
        ): Array<{ property: string; errors: string[] }> => {
          const errors = [];

          const getValidationErrorsRecursively = (
            validationErrors: ValidationError[],
            parentProperty = '',
          ) => {
            for (const error of validationErrors) {
              // console.log(error)
              const propertyPath = parentProperty
                ? `${parentProperty}.${error.property}`
                : error.property;

              if (error.constraints) {
                errors.push({
                  property: propertyPath,
                  errors: Object.values(error.constraints),
                });
              }

              if (error.children?.length) {
                getValidationErrorsRecursively(error.children, propertyPath);
              }
            }
          };

          getValidationErrorsRecursively(validationErrors, parentProperty);

          return errors;
        };

        const errors = getPrettyClassValidatorErrors(validationErrors);

        return new BadRequestException({
          message: 'validation error',
          errors: errors,
        });
      },
    }),
  );
  await app.listen(3000);
}

bootstrap();
