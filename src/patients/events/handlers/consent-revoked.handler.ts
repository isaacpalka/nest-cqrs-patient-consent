import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { ConsentRevoked } from '../impl/consent-revoked.event';
import { ConsentRevokedUpdater } from '../updaters/consent-revoked.updater';

@EventsHandler(ConsentRevoked)
export class ConsentRevokedHandler implements IEventHandler<ConsentRevoked> {
  constructor(private readonly viewUpdater: ConsentRevokedUpdater) {}
  private readonly logger = new Logger(ConsentRevokedHandler.name);

  async handle(event: ConsentRevoked) {
    try {
      await this.viewUpdater.handle(event);
    } catch (err) {
      this.logger.error(`Error handling event: ${err}`);
    }
  }
}
