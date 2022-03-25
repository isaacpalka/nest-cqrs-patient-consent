import { StorableEvent } from '@peterdijk/nestjs-eventstoredb';

export class PatientNameChanged extends StorableEvent {
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly dateModified: Date,
  ) {
    super();
  }
}
