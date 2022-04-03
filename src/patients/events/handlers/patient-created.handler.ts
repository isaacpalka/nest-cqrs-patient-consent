import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { PatientCreated } from '../impl/patient-created.event';
import { PatientCreatedUpdater } from '../updaters/patient-created.updater';

@EventsHandler(PatientCreated)
export class PatientCreatedHandler implements IEventHandler<PatientCreated> {
  constructor(private readonly viewUpdater: PatientCreatedUpdater) {}
  private readonly logger = new Logger(PatientCreatedHandler.name);

  async handle(event: PatientCreated) {
    try {
      await this.viewUpdater.handle(event);
    } catch (err) {
      this.logger.error(`Error handling event: ${err}`);
    }
  }
}
