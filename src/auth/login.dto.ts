import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'User email',
    example: 'ada@uoc.edu',
    format: 'email',
  })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
    minLength: 6,
  })
  password: string;
}
