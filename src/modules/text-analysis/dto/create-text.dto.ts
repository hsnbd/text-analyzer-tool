import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTextDto {
  @IsString()
  @IsNotEmpty()
  text_body: string;
}
