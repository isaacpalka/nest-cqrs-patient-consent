import { PatientCreated } from './patient-created.event';

// What does this do?
export const EventSerializers = {
  PatientCreated: ({ id, name, dateCreated, dateModified }) => {
    return new PatientCreated(id, name, dateCreated, dateModified);
  },
};
