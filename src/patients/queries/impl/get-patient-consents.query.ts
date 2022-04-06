import { GetConsentsDto } from 'src/patients/interfaces/get-consents.dto';

export class GetPatientConsentsQuery {
  public readonly patient_id: string;
  public readonly entity_id: string;

  constructor(data: GetConsentsDto) {
    this.patient_id = data.id;
    this.entity_id = data.entity_id;
  }
}
