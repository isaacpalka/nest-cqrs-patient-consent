export enum ActorType {
  Patient = 'patient',
  Provider = 'provider',
}

export enum HealthRecordType {
  Exam = 'exam',
  Consultation = 'consultation',
  Condition = 'condition',
  ERVisit = 'er',
}

export type ConsentMap = Record<string, Set<HealthRecordType>>;
