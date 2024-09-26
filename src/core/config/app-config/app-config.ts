import {
  IsNumberString,
  IsString,
  validateSync,
  ValidationError,
} from 'class-validator';
import { plainToClass } from 'class-transformer';

class EnvValidation {
  @IsNumberString()
  PORT: number;

  @IsString()
  APP_ENV: string;
}

export const validateConfig = (config: Record<string, any>) => {
  const validatedConfig = plainToClass(EnvValidation, config);
  const errors = validateSync(validatedConfig);

  const error_messages = [];
  if (errors.length > 0) {
    errors.forEach((error: ValidationError) => {
      error_messages.push(...Object.values(error.constraints));
    });

    console.error(error_messages.join('\n'));
    throw new Error('Configuration validation failed');
  }

  return validatedConfig;
};
