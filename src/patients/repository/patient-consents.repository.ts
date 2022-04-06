import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { PatientConsent as PatientConsentProjection } from '../projections/patient-consent.entity';
import { GetPatientConsentsQuery } from '../queries/impl/get-patient-consents.query';

@Injectable()
export class PatientConsentsRepository {
  @InjectRepository(PatientConsentProjection)
  private readonly projectionRepository: Repository<PatientConsentProjection>;
  // constructor() {}
  private logger = new Logger(PatientConsentsRepository.name);

  async findOneById(query: GetPatientConsentsQuery): Promise<string[]> {
    const consents = await this.projectionRepository.findOne({
      where: { patient_id: query.patient_id, entity_id: query.entity_id },
    });
    // If getEvents() throws an error, and the catch block is called,
    // the patient aggregate simply will have no events to load,
    // but we still return the aggregate object. The aggregate code
    // or command handler can do validation checks to determine
    // whether to throw an error, or dispatch an event.
    return consents?.permissions || [];
  }
}
