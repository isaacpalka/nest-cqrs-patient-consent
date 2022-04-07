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
    const { id, to_id, target } = event;

    const consent = await this.projectionRepository.findOne({
      where: { patient_id: id, entity_id: to_id },
    });
    const permissions = consent?.permissions || [];

    // Ensure that the target isn't added twice
    if (!permissions.includes(target)) {
      await this.projectionRepository.save({
        patient_id: id,
        entity_id: to_id,
        permissions: [...permissions, target],
      });
    }
  }
}
