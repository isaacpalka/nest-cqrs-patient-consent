import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class ChangePatientNameDto {
  @ApiProperty()
  @Field()
  id?: string;

  @ApiProperty()
  @Field()
  name?: string;
}
