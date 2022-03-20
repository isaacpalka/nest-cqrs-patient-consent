import { Inject, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PatientsService } from './patients.service';
import { Patient } from './aggregate/patient.aggregate';
import {
  PatientResponse,
  AllPatientsResponse,
} from './interfaces/api-dto.interface';
import { CreatePatientDto } from './interfaces/create-patient.dto';
import { Patient as PatientProjection } from './projections/patient.entity';

@Resolver((of) => Patient)
export class PatientsResolver {
  constructor(
    @Inject(PatientsService) private patientService: PatientsService,
  ) {}
  private readonly logger = new Logger(PatientsResolver.name);

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Query((returns) => AllPatientsResponse)
  async getAllPatients(): Promise<AllPatientsResponse> {
    const patients = await this.patientService.getAllPatients();
    return { patients };
  }

  @Mutation((returns) => PatientResponse)
  async createPatient(
    @Args('input') data: CreatePatientDto,
  ): Promise<PatientResponse> {
    return await this.patientService.createPatient(data);
  }
}
