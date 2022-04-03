import { PatientCreatedUpdater } from './patient-created.updater';
import { PatientNameChangedUpdater } from './patient-name-changed.updater';
import { ConsentGrantedUpdater } from './consent-granted.updater';

export const StateUpdaters = [
  PatientCreatedUpdater,
  PatientNameChangedUpdater,
  ConsentGrantedUpdater,
];
