import {
  IsString,
  IsInt,
  Min,
  Max,
  IsUrl,
  Length,
  ValidateIf,
} from 'class-validator';

export class UserPhotoDto {
  @IsString()
  @Length(2, 100, { message: 'Name must be between 2 and 100 characters' })
  name: string;

  @IsInt()
  @Min(1, { message: 'Size must be at least 1 byte' })
  @Max(5_000_000, { message: 'Size must not exceed 5MB' })
  size: number;

  @IsUrl(
    { protocols: ['http', 'https'], require_protocol: true },
    { message: 'Invalid URL format' },
  )
  url: string;

  @ValidateIf((o) => o.description !== undefined)
  @IsString({ message: 'Description must be a string' })
  @Length(10, 200, {
    message: 'Description must be between 10 and 200 characters',
  })
  description?: string;
}
