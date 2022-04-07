import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IViewUpdater,
  ViewUpdaterHandler,
} from '@peterdijk/nestjs-eventstoredb';

import { PatientConsent as PatientConsentProjection } from '../../projections/patient-consent.entity';
import { ConsentRevoked } from '../impl/consent-revoked.event';

@ViewUpdaterHandler(ConsentRevoked)
export class ConsentRevokedUpdater implements IViewUpdater<ConsentRevoked> {
  constructor(
    @InjectRepository(PatientConsentProjection)
    private projectionRepository: Repository<PatientConsentProjection>,
  ) {}

  private logger = new Logger(ConsentRevokedUpdater.name);

  async handle(event: ConsentRevoked) {
    const { id, from_id, target } = event;

    const consent = await this.projectionRepository.findOne({
      where: { patient_id: id, entity_id: from_id },
    });
    const permissions = consent?.permissions || [];
    const updatedPermissions = permissions.filter((perm) => perm !== target);

    // If after removing (revoking) the current consent, there
    // are still other consents, update the record.
    // Otherwise, if no consents are left, delete the record.
    if (updatedPermissions.length > 0) {
      await this.projectionRepository.save({
        patient_id: id,
        entity_id: from_id,
        permissions: updatedPermissions,
      });
    } else {
      await this.projectionRepository.delete({
        patient_id: id,
        entity_id: from_id,
      });
    }
  }
}
