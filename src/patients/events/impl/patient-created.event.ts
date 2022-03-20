import { StorableEvent } from '@peterdijk/nestjs-eventstoredb';

export class PatientCreated extends StorableEvent {
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly dateCreated: Date,
    public readonly dateModified: Date,
  ) {
    super();
  }
}
