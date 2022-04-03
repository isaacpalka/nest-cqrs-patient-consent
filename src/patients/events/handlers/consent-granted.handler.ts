import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { ConsentGranted } from '../impl/consent-granted.event';
import { ConsentGrantedUpdater } from '../updaters/consent-granted.updater';

@EventsHandler(ConsentGranted)
export class ConsentGrantedHandler implements IEventHandler<ConsentGranted> {
  constructor(private readonly viewUpdater: ConsentGrantedUpdater) {}
  private readonly logger = new Logger(ConsentGrantedHandler.name);

  async handle(event: ConsentGranted) {
    try {
      await this.viewUpdater.handle(event);
    } catch (err) {
      this.logger.error(`Error handling event: ${err}`);
    }
  }
}
