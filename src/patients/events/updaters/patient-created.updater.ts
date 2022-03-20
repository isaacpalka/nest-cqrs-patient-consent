import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IViewUpdater,
  ViewUpdaterHandler,
} from '@peterdijk/nestjs-eventstoredb';

import { Patient as PatientProjection } from '../../projections/patient.entity';
import { PatientCreated } from '../impl/patient-created.event';

@ViewUpdaterHandler(PatientCreated)
export class PatientCreatedUpdater implements IViewUpdater<PatientCreated> {
  constructor(
    @InjectRepository(PatientProjection)
    private projectionRepository: Repository<PatientProjection>,
  ) {}

  private logger = new Logger(PatientCreatedUpdater.name);

  async handle(event: PatientCreated) {
    const patient = this.projectionRepository.create({
      ...event,
      patientId: event.id,
      name: event.name,
    });

    await patient.save();
  }
}
