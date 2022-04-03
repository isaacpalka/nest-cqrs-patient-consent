import { ICommand } from '@nestjs/cqrs';

export class ChangePatientName implements ICommand {
  constructor(public readonly uuid: string, public readonly name: string) {}
}
