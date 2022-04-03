import { ICommand } from '@nestjs/cqrs';

export class GrantConsent implements ICommand {
  constructor(
    public readonly patient_id: string,
    public readonly to_id: string,
    public readonly to_entity: string,
    public readonly target: string,
  ) {}
}
