import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventStore, StoreEventBus } from '@peterdijk/nestjs-eventstoredb';

import { Patient } from '../aggregate/patient.aggregate';
import { Patient as PatientProjection } from '../projections/patient.entity';

@Injectable()
export class PatientsRepository {
  @InjectRepository(PatientProjection)
  private readonly projectionRepository: Repository<PatientProjection>;
  constructor(
    private readonly eventStore: EventStore,
    private readonly eventBus: StoreEventBus,
  ) {}
  private logger = new Logger(PatientsRepository.name);

  async findOneById(id: string): Promise<Patient> {
    this.logger.error('findOneById');
    const patient = new Patient(id);
    const { events } = await this.eventStore.getEvents(
      this.eventBus.streamPrefix,
      id,
    );
    patient.loadFromHistory(events);
    return patient;
  }

  async findAll(): Promise<PatientProjection[]> {
    const patients = await this.projectionRepository.find({
      order: { dateCreated: 'DESC' },
    });
    return patients;
  }
}
