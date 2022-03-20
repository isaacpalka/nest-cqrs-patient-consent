import { AggregateRoot } from '@nestjs/cqrs';
import { Field, ObjectType } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import {
  IsString,
  validateOrReject,
  IsNumber,
  MinLength,
  Min,
  IsUUID,
} from 'class-validator';

import { PatientCreated } from '../events/impl/patient-created.event';
// import { LetterGuessedEvent } from './events/impl/letter-guessed.event';
import { InvalidCommandException } from '../exceptions';
import { CreatePatientDto } from '../interfaces/create-patient.dto';

@ObjectType()
export class Patient extends AggregateRoot {
  private logger = new Logger(Patient.name);

  @IsUUID()
  public readonly id: string;

  // @IsNumber() // FIXME - caused validation error
  private readonly version: number;

  private dateCreated: Date;
  private dateModified: Date;

  @Field()
  @IsString()
  @MinLength(1)
  private name: string;

  constructor(id: string, version?: number) {
    super();
    this.id = id;
    this.version = version;
  }

  async createPatient(data: CreatePatientDto) {
    // // apply to be able to validate

    try {
      // Does this need to be async with await? Can this entire method be made sync?
      // await validateOrReject(this); // Should you validate "this", or data (the DTO)?

      this.apply(
        new PatientCreated(this.id, data.name, new Date(), new Date()),
        false,
      );
    } catch (err) {
      // TODO: Is try/catch needed? Does validateOrReject throw an error already if it fails?
      throw new InvalidCommandException(err);
    }
  }

  // Replay event from history `loadFromHistory` function calls
  // onNameOfEvent
  // framework magic
  onPatientCreated(event: PatientCreated) {
    this.name = event.name;
    this.dateCreated = event.dateCreated;
    this.dateModified = event.dateModified;
  }
}
