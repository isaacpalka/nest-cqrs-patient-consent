import { ChangePatientNameHandler } from './change-patient-name.handler';
import { CreatePatientHandler } from './create-patient.handler';
import { GrantConsentHandler } from './grant-consent.handler';

export const CommandHandlers = [
  CreatePatientHandler,
  ChangePatientNameHandler,
  GrantConsentHandler,
];
