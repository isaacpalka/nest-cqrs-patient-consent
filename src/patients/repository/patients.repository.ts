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
    this.logger.log('findOneById: ', id);

    // Even if id has no previous events, we still load an aggregate
    // with that ID
    const patient = new Patient(id);

    try {
      const { events } = await this.eventStore.getEvents(
        this.eventBus.streamPrefix,
        id,
      );
      patient.loadFromHistory(events);
    } catch (err) {
      this.logger.error(err.name, err.stack);
    }

    // If getEvents() throws an error, and the catch block is called,
    // the patient aggregate simply will have no events to load,
    // but we still return the aggregate object. The aggregate code
    // or command handler can do validation checks to determine
    // whether to throw an error, or dispatch an event.
    return patient;
  }

  async findAll(): Promise<PatientProjection[]> {
    const patients = await this.projectionRepository.find({
      order: { date_created: 'DESC' },
    });
    return patients;
  }
}
