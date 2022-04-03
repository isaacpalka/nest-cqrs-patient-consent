import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IViewUpdater,
  ViewUpdaterHandler,
} from '@peterdijk/nestjs-eventstoredb';

import { Patient as PatientProjection } from '../../projections/patient.entity';
import { PatientNameChanged } from '../impl/patient-name-changed.event';

@ViewUpdaterHandler(PatientNameChanged)
export class PatientNameChangedUpdater
  implements IViewUpdater<PatientNameChanged>
{
  constructor(
    @InjectRepository(PatientProjection)
    private projectionRepository: Repository<PatientProjection>,
  ) {}

  private logger = new Logger(PatientNameChangedUpdater.name);

  async handle(event: PatientNameChanged) {
    await this.projectionRepository.save({
      patientId: event.id,
      name: event.name,
    });
  }
}
