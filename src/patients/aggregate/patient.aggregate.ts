import { AggregateRoot } from '@nestjs/cqrs';
import { Field, ObjectType } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import {
  IsString,
  // validateOrReject,
  // IsNumber,
  MinLength,
  // Min,
  IsUUID,
} from 'class-validator';

import { PatientCreated } from '../events/impl/patient-created.event';
import { InvalidCommandException } from '../exceptions';
import { CreatePatientDto } from '../interfaces/create-patient.dto';
import { PatientNameChanged } from '../events/impl/patient-name-changed.event';
import { ActorType, ConsentMap, HealthRecordType } from './patient-types';
import { GrantConsent } from '../commands/impl/grant-consent.command';
import { ConsentGranted } from '../events/impl/consent-granted.event';

@ObjectType()
export class Patient extends AggregateRoot {
  private logger = new Logger(Patient.name);

  @IsUUID()
  public readonly id: string;

  // @IsNumber() // FIXME - caused validation error
  private readonly version: number;

  private dateCreated: Date;
  private dateModified: Date;

  private consents: ConsentMap;

  @Field()
  @IsString()
  @MinLength(1)
  private name: string;

  constructor(id: string, version?: number) {
    super();
    this.id = id;
    this.version = version;

    // Key is a string concat of actor type and actor id
    // e.g. "<actor_type>|<actor_id>"
    // Value is a list of record types that consent has been granted for
    this.consents = {};
  }

  private validateAggregateExists(): void {
    // Validate that aggregate exists (is this the best way?)
    if (!this.dateCreated) {
      throw new InvalidCommandException(`Patient id ${this.id} doesn't exist`);
    }
  }

  private getConsentKey(entityType: ActorType, entityId: string): string {
    return `${entityType}|${entityId}`;
  }

  private hasConsent(
    entityType: ActorType,
    entityId: string,
    target: HealthRecordType,
  ): boolean {
    const key = this.getConsentKey(entityType, entityId);
    return this.consents[key]?.has(target);
  }

  private updateConsent(
    entityType: ActorType,
    entityId: string,
    target: HealthRecordType,
  ): ConsentMap {
    const key = this.getConsentKey(entityType, entityId);

    // FIXME: Check if has consent here??? Or turn map into Set?
    // Generate updated consents for this given key
    // const consentsToUpdate = this.consents[key] || new Set();
    const updatedConsents = new Set(this.consents[key]).add(target);
    // Return updated consents map with updates for the given key
    return {
      ...this.consents,
      [key]: updatedConsents,
    };
  }

  async createPatient(data: CreatePatientDto) {
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

  async changeName(name: string) {
    // FIXME: Use command as input param?
    try {
      this.validateAggregateExists();

      this.apply(new PatientNameChanged(this.id, name, new Date()), false);
    } catch (err) {
      throw new InvalidCommandException(err);
    }
  }

  async grantConsent(command: GrantConsent) {
    try {
      this.validateAggregateExists();
      const { patient_id, to_id, to_entity, target } = command;

      if (
        this.hasConsent(
          to_entity as ActorType,
          to_id,
          target as HealthRecordType,
        )
      ) {
        throw new InvalidCommandException('Consent already granted');
      }

      this.apply(
        new ConsentGranted(patient_id, to_id, to_entity, target),
        false,
      );
    } catch (err) {
      throw new InvalidCommandException(err.message);
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

  onPatientNameChanged(event: PatientNameChanged) {
    this.name = event.name;
    this.dateModified = event.dateModified;
  }

  onConsentGranted(event: ConsentGranted) {
    const newc = this.updateConsent(
      event.to_entity as ActorType,
      event.to_id,
      event.target as HealthRecordType,
    );
    this.consents = newc;
  }
}
