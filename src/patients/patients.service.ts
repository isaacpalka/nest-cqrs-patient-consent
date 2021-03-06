import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreatePatientDto } from './interfaces/create-patient.dto';
import { ChangePatientNameDto } from './interfaces/change-patient-name.dto';
import { GrantConsentDto } from './interfaces/grant-consent.dto';
import { RevokeConsentDto } from './interfaces/revoke-consent.dto';
import { GetConsentsDto } from './interfaces/get-consents.dto';
import { PatientConsentsDto } from './interfaces/patient-consents.dto';

import { CreatePatient } from './commands/impl/create-patient.command';
import { ChangePatientName } from './commands/impl/change-patient-name.command';
import { GrantConsent } from './commands/impl/grant-consent.command';
import { RevokeConsent } from './commands/impl/revoke-consent.command';

import { GetPatientsQuery } from './queries/impl/get-patients.query';
import { GetPatientConsentsQuery } from './queries/impl/get-patient-consents.query';
import { Patient as PatientProjection } from './projections/patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @InjectRepository(PatientProjection)
    private readonly projectionRepository: Repository<PatientProjection>,
  ) {}
  private readonly logger = new Logger(PatientsService.name);

  async createPatient(data: CreatePatientDto) {
    const patientId = uuidv4();

    try {
      await this.commandBus.execute(new CreatePatient(patientId, data));
      this.logger.log(`Create patient: ${patientId}`);
      return { message: 'success', status: 201, patientId, data };
    } catch (err) {
      this.logger.log(err);
      this.logger.error(err.name, err.stack);
      throw new BadRequestException(err);
    }
  }

  async changePatientName(data: ChangePatientNameDto) {
    try {
      const { id, name } = data;
      await this.commandBus.execute(new ChangePatientName(id, name));
      this.logger.log(`Change patient name: ${id}, ${name}`);
      return { message: 'success', status: 201, id, data };
    } catch (err) {
      this.logger.log(err);
      this.logger.error(err.name, err.stack);
      throw new BadRequestException(err);
    }
  }

  async grantConsent(data: GrantConsentDto) {
    try {
      const { id, to_id, to_entity, target } = data;
      await this.commandBus.execute(
        new GrantConsent(id, to_id, to_entity, target),
      );
      this.logger.log(`Grant consent: ${id}`);
      return { message: 'success', status: 201, id, data };
    } catch (err) {
      this.logger.log(err);
      this.logger.error(err.name, err.stack);
      throw new BadRequestException(err.message);
    }
  }

  async revokeConsent(data: RevokeConsentDto) {
    try {
      const { id, from_id, from_entity, target } = data;
      await this.commandBus.execute(
        new RevokeConsent(id, from_id, from_entity, target),
      );
      this.logger.log(`Revoke consent: ${id}`);
      return { message: 'success', status: 201, id, data };
    } catch (err) {
      this.logger.log(err);
      this.logger.error(err.name, err.stack);
      throw new BadRequestException(err.message);
    }
  }

  // TODO: Don't tie response object to projection entity?
  // Should be its own DTO as with getConsents below?
  async getAllPatients(): Promise<PatientProjection[]> {
    this.logger.log('getAllPatients');
    const patients = await this.queryBus.execute(new GetPatientsQuery());
    return patients;
  }

  async getConsents(data: GetConsentsDto): Promise<PatientConsentsDto[]> {
    this.logger.log('getConsents');
    const patients = await this.queryBus.execute(
      new GetPatientConsentsQuery(data),
    );
    return patients;
  }
}
