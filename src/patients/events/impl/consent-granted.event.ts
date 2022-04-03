import { StorableEvent } from '@peterdijk/nestjs-eventstoredb';

export class ConsentGranted extends StorableEvent {
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly to_id: string,
    public readonly to_entity: string,
    public readonly target: string,
  ) {
    super();
  }
}
