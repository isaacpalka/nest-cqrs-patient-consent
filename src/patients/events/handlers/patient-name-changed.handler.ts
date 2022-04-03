import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { PatientNameChanged } from '../impl/patient-name-changed.event';
import { PatientNameChangedUpdater } from '../updaters/patient-name-changed.updater';

@EventsHandler(PatientNameChanged)
export class PatientNameChangedHandler
  implements IEventHandler<PatientNameChanged>
{
  constructor(private readonly viewUpdater: PatientNameChangedUpdater) {}
  private readonly logger = new Logger(PatientNameChangedHandler.name);

  async handle(event: PatientNameChanged) {
    try {
      await this.viewUpdater.handle(event);
    } catch (err) {
      this.logger.error(`Error handling event: ${err}`);
    }
  }
}
