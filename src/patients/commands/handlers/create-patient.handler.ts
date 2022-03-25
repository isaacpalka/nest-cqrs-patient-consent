import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StoreEventPublisher } from '@peterdijk/nestjs-eventstoredb';
import { Logger } from '@nestjs/common';

import { Patient } from '../../aggregate/patient.aggregate';
import { CreatePatient } from '../impl/create-patient.command';

@CommandHandler(CreatePatient)
export class CreatePatientHandler implements ICommandHandler<CreatePatient> {
  private readonly logger = new Logger(CreatePatientHandler.name);

  constructor(private publisher: StoreEventPublisher) {}

  async execute(command: CreatePatient) {
    this.logger.log(`CreatePatient...`);
    const { uuid, data } = command;

    const PatientModel = this.publisher.mergeClassContext(Patient);
    const patient = new PatientModel(uuid);
    await patient.createPatient(data);

    patient.commit();
  }
}
