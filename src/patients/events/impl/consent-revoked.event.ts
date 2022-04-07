import { StorableEvent } from '@peterdijk/nestjs-eventstoredb';

export class ConsentRevoked extends StorableEvent {
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly from_id: string,
    public readonly from_entity: string,
    public readonly target: string,
  ) {
    super();
  }
}
