# Patient Consent

## Overview

Sample project that demonstrates how patients can give consent to others for their medical records. It applies concepts from DDD (domain-driven design), CQRS (command query responsibility separation), and ES (event sourcing), using the NestJS framework.

## Setup

Prepare a `.env` file for environment variables with:

```bash
DIR_DATA_PATH="$PWD"
CONTAINER_COMMAND="npm run start"
CONTAINER_SCALE="1"
APP_PORT=7070
CONTAINER_PORT=3000
EVENTSTORE_CLUSTER_SIZE=1
EVENTSTORE_RUN_PROJECTIONS=All
EVENTSTORE_START_STANDARD_PROJECTIONS=true
EVENTSTORE_EXT_TCP_PORT=1113
EVENTSTORE_EXT_HTTP_PORT=2113
EVENTSTORE_INSECURE=true
EVENTSTORE_ENABLE_EXTERNAL_TCP=true
EVENTSTORE_ENABLE_ATOM_PUB_OVER_HTTP=true
EVENTSTORE_HOSTNAME=eventstore.db
PROJECTIONS_HOSTNAME=projections.db
PROJECTIONS_PORT=5432
PROJECTIONS_CREDENTIALS_USERNAME=root
PROJECTIONS_CREDENTIALS_PASSWORD=example
PROJECTIONS_DB_TYPE=postgres
PROJECTIONS_DATABASE=patient-consent-projections
STORE_STATE_HOSTNAME=eventstore.db
STORE_STATE_PORT=27017
STORE_STATE_DB_TYPE=mongodb
STORE_STATE_USERNAME=root
STORE_STATE_PASSWORD=example
STORE_STATE_DB=store-state-db
STORE_STATE_EVENTS_DB=eventstore
GQL_PLAYGROUND=true
```

## Running the App

```bash
# development
$ docker-compose up
```

## Migrations

These will be run on start of the container.

To run manually:

```bash
$ docker-compose exec patient-consent yarn run migration:run

# After adding model(s) or make changes to models, generate new migration:
$ docker-compose exec patient-consent yarn run migration:generate <migration-name>
```

```bash
$ docker-compose build
```

## Interfaces

- GraphQL: GraphQL Playground available on http://localhost:7070/graphql
- REST API: See Swagger documentation on http://localhost:7070/api
- EventStore: https://localhost:2113

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Credits

This project heavily borrows from `@peterDijk`'s [Hangman](https://github.com/peterDijk/hangman-ddd-events) sample project, which utilizes the [NestJS Event Sourcing](https://github.com/peterDijk/nestjs-eventstoredb) package.
