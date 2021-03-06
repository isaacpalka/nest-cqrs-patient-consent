import { PatientCreatedHandler } from './patient-created.handler';
import { PatientNameChangedHandler } from './patient-name-changed.handler';
import { ConsentGrantedHandler } from './consent-granted.handler';
import { ConsentRevokedHandler } from './consent-revoked.handler';

export const EventHandlers = [
  PatientCreatedHandler,
  PatientNameChangedHandler,
  ConsentGrantedHandler,
  ConsentRevokedHandler,
];
