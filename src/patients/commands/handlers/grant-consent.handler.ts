import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StoreEventPublisher } from '@peterdijk/nestjs-eventstoredb';
import { Logger } from '@nestjs/common';

import { Patient } from '../../aggregate/patient.aggregate';
import { PatientsRepository } from '../../repository/patients.repository';
import { GrantConsent } from '../impl/grant-consent.command';

@CommandHandler(GrantConsent)
export class GrantConsentHandler implements ICommandHandler<GrantConsent> {
  private readonly logger = new Logger(GrantConsentHandler.name);

  constructor(
    private readonly repository: PatientsRepository,
    private publisher: StoreEventPublisher,
  ) {}

  async execute(command: GrantConsent) {
    this.logger.log(`GrantConsent...`);
    const { patient_id } = command;

    const patient: Patient = this.publisher.mergeObjectContext(
      await this.repository.findOneById(patient_id),
    );

    await patient.grantConsent(command);
    patient.commit();
  }
}
