import { ICommand } from '@nestjs/cqrs';
import { CreatePatientDto } from '../../interfaces/create-patient.dto';

export class CreatePatient implements ICommand {
  constructor(
    public readonly uuid: string,
    public readonly data: CreatePatientDto,
  ) {}
}
