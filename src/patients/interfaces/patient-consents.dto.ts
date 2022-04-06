import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { HealthRecordType } from '../aggregate/patient-types';

@InputType()
export class PatientConsentsDto {
  @ApiProperty()
  @Field()
  consents?: HealthRecordType[];
}
