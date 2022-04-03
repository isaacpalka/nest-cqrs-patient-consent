import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StoreEventPublisher } from '@peterdijk/nestjs-eventstoredb';
import { Logger } from '@nestjs/common';

import { Patient } from '../../aggregate/patient.aggregate';
import { PatientsRepository } from '../../repository/patients.repository';
import { ChangePatientName } from '../impl/change-patient-name.command';

@CommandHandler(ChangePatientName)
export class ChangePatientNameHandler
  implements ICommandHandler<ChangePatientName>
{
  private readonly logger = new Logger(ChangePatientNameHandler.name);

  constructor(
    private readonly repository: PatientsRepository,
    private publisher: StoreEventPublisher,
  ) {}

  async execute(command: ChangePatientName) {
    this.logger.log(`ChangePatientName...`);
    const { uuid, name } = command;

    const patient: Patient = this.publisher.mergeObjectContext(
      await this.repository.findOneById(uuid),
    );

    await patient.changeName(name);
    patient.commit();
  }
}
