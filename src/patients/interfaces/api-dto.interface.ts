import { Field, ObjectType } from '@nestjs/graphql';
import { Patient as PatientProjection } from '../projections/patient.entity';

@ObjectType()
export class PatientResponse {
  @Field()
  message: string;

  @Field((type) => String, { nullable: true })
  patientId?: string;

  @Field((type) => String, { nullable: true })
  error?: string;

  @Field()
  status: number;
}

@ObjectType()
export class AllPatientsResponse {
  @Field((type) => [PatientProjection], { nullable: true })
  patients: PatientProjection[];
}
