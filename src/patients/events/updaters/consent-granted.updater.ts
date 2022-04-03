import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IViewUpdater,
  ViewUpdaterHandler,
} from '@peterdijk/nestjs-eventstoredb';

import { PatientConsent as PatientConsentProjection } from '../../projections/patient-consent.entity';
import { ConsentGranted } from '../impl/consent-granted.event';

@ViewUpdaterHandler(ConsentGranted)
export class ConsentGrantedUpdater implements IViewUpdater<ConsentGranted> {
  constructor(
    @InjectRepository(PatientConsentProjection)
    private projectionRepository: Repository<PatientConsentProjection>,
  ) {}

  private logger = new Logger(ConsentGrantedUpdater.name);

  async handle(event: ConsentGranted) {
    const consent = await this.projectionRepository.findOne({
      where: { patient_id: event.id, entity_id: event.to_id },
    });
    if (!consent) {
      await this.projectionRepository.save({
        patient_id: event.id,
        entity_id: event.to_id,
        permissions: [event.target],
      });
    } else if (!consent.permissions.includes(event.target)) {
      await this.projectionRepository.save({
        patient_id: event.id,
        entity_id: event.to_id,
        permissions: [...consent.permissions, event.target],
      });
    }
  }
}
