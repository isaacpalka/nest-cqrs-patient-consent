import { ChangePatientNameHandler } from './change-patient-name.handler';
import { CreatePatientHandler } from './create-patient.handler';
import { GrantConsentHandler } from './grant-consent.handler';
import { RevokeConsentHandler } from './revoke-consent.handler';

export const CommandHandlers = [
  CreatePatientHandler,
  ChangePatientNameHandler,
  GrantConsentHandler,
  RevokeConsentHandler,
];
