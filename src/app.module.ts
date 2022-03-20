import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventStoreModule } from '@peterdijk/nestjs-eventstoredb';

import { config } from '../config';
import TypeOrmConfig from '../ormconfig';

import { PatientsModule } from './patients/patients.module';

const { hostname, httpPort } = config.EVENTSTORE_SETTINGS;

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      introspection: process.env.GQL_PLAYGROUND === 'true',
      playground: process.env.GQL_PLAYGROUND === 'true',
      cors: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => TypeOrmConfig as any,
    }),
    EventStoreModule.forRoot({
      eventStoreUrl: `esdb://${hostname}:${httpPort}?tls=false`,
    }),
    PatientsModule,
  ],
})
export class AppModule {}
