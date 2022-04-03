import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class GrantConsentDto {
  @ApiProperty()
  @Field()
  id?: string;

  @ApiProperty()
  @Field()
  to_entity?: string;

  @ApiProperty()
  @Field()
  to_id?: string;

  @ApiProperty()
  @Field()
  target?: string;
}
