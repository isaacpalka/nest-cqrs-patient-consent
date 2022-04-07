import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StoreEventPublisher } from '@peterdijk/nestjs-eventstoredb';
import { Logger } from '@nestjs/common';

import { Patient } from '../../aggregate/patient.aggregate';
import { PatientsRepository } from '../../repository/patients.repository';
import { RevokeConsent } from '../impl/revoke-consent.command';

@CommandHandler(RevokeConsent)
export class RevokeConsentHandler implements ICommandHandler<RevokeConsent> {
  private readonly logger = new Logger(RevokeConsentHandler.name);

  constructor(
    private readonly repository: PatientsRepository,
    private publisher: StoreEventPublisher,
  ) {}

  async execute(command: RevokeConsent) {
    this.logger.log(`RevokeConsent...`);
    const { patient_id } = command;

    const patient: Patient = this.publisher.mergeObjectContext(
      await this.repository.findOneById(patient_id),
    );

    await patient.revokeConsent(command);
    patient.commit();
  }
}
