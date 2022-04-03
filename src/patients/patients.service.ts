import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreatePatientDto } from './interfaces/create-patient.dto';
import { CreatePatient } from './commands/impl/create-patient.command';
import { GetPatientsQuery } from './queries/impl/get-patients.query';
import { Patient as PatientProjection } from './projections/patient.entity';
import { ChangePatientNameDto } from './interfaces/change-patient-name.dto';
import { ChangePatientName } from './commands/impl/change-patient-name.command';
import { GrantConsentDto } from './interfaces/grant-consent.dto';
import { GrantConsent } from './commands/impl/grant-consent.command';

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

  async getAllPatients(): Promise<PatientProjection[]> {
    this.logger.log('getAllPatients');
    const patients = await this.queryBus.execute(new GetPatientsQuery());
    return patients;
  }
}
