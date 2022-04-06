import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { PatientConsentsRepository } from '../../repository/patient-consents.repository';
import { GetPatientConsentsQuery } from '../impl/get-patient-consents.query';

@QueryHandler(GetPatientConsentsQuery)
export class GetPatientConsentsHandler
  implements IQueryHandler<GetPatientConsentsQuery>
{
  constructor(private readonly repository: PatientConsentsRepository) {}
  private readonly logger = new Logger(GetPatientConsentsHandler.name);

  async execute(query: GetPatientConsentsQuery) {
    this.logger.log('Async GetPatientConsentsQuery...');
    return this.repository.findOneById(query);
  }
}
