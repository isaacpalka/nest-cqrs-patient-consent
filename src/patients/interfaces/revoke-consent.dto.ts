import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class RevokeConsentDto {
  @ApiProperty()
  @Field()
  id?: string;

  @ApiProperty()
  @Field()
  from_entity?: string;

  @ApiProperty()
  @Field()
  from_id?: string;

  @ApiProperty()
  @Field()
  target?: string;
}
