import { PatientCreated } from './patient-created.event';
import { PatientNameChanged } from './patient-name-changed.event';

// What does this do?
export const EventSerializers = {
  PatientCreated: ({ id, name, dateCreated, dateModified }) => {
    return new PatientCreated(id, name, dateCreated, dateModified);
  },
  PatientNameChanged: ({ id, name, dateModified }) => {
    return new PatientNameChanged(id, name, dateModified);
  },
};
