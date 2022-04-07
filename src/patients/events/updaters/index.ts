import { PatientCreatedUpdater } from './patient-created.updater';
import { PatientNameChangedUpdater } from './patient-name-changed.updater';
import { ConsentGrantedUpdater } from './consent-granted.updater';
import { ConsentRevokedUpdater } from './consent-revoked.updater';

export const StateUpdaters = [
  PatientCreatedUpdater,
  PatientNameChangedUpdater,
  ConsentGrantedUpdater,
  ConsentRevokedUpdater,
];
