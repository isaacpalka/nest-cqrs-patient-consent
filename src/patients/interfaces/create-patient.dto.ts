import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreatePatientDto {
  @ApiProperty()
  @Field()
  name?: string;
}
