import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { PatientsRepository } from '../../repository/patients.repository';
import { GetPatientsQuery } from '../impl/get-patients.query';

@QueryHandler(GetPatientsQuery)
export class GetPatientsHandler implements IQueryHandler<GetPatientsQuery> {
  constructor(private readonly repository: PatientsRepository) {}
  private readonly logger = new Logger(GetPatientsHandler.name);

  async execute(query: GetPatientsQuery) {
    this.logger.log('Async GetPatientsQuery...');
    return this.repository.findAll();
  }
}
