import { ICommand } from '@nestjs/cqrs';

export class RevokeConsent implements ICommand {
  constructor(
    public readonly patient_id: string,
    public readonly from_id: string,
    public readonly from_entity: string,
    public readonly target: string,
  ) {}
}
