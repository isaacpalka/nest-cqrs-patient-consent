import { PatientCreated } from './patient-created.event';
import { PatientNameChanged } from './patient-name-changed.event';
import { ConsentGranted } from './consent-granted.event';

// What does this do?
export const EventSerializers = {
  PatientCreated: ({ id, name, dateCreated, dateModified }) => {
    return new PatientCreated(id, name, dateCreated, dateModified);
  },
  PatientNameChanged: ({ id, name, dateModified }) => {
    return new PatientNameChanged(id, name, dateModified);
  },
  ConsentGranted: ({ id, to_id, to_entity, target }) => {
    return new ConsentGranted(id, to_id, to_entity, target);
  },
};
