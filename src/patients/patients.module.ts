import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventStoreModule } from '@peterdijk/nestjs-eventstoredb';

import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { PatientsRepository } from './repository/patients.repository';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { StateUpdaters } from './events/updaters';
import { QueryHandlers } from './queries/handlers';

import { PatientsResolver } from './patients.resolver';
import { Projections } from './projections/';
import { EventSerializers } from './events/impl/EventSerializers';

const STREAM_PREFIX = 'patient';

@Module({
  imports: [
    CqrsModule,
    EventStoreModule.forFeature({
      streamPrefix: STREAM_PREFIX,
      eventSerializers: EventSerializers, // What does this do?
    }),
    TypeOrmModule.forFeature(Projections),
  ],
  exports: [TypeOrmModule],
  controllers: [PatientsController],
  providers: [
    PatientsResolver,
    PatientsService,
    PatientsRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...StateUpdaters,
    ...QueryHandlers,
  ],
})
export class PatientsModule {}
