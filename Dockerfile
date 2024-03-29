### BASE
FROM node:lts-alpine3.10 AS base

# Set the working directory
WORKDIR /app
# Copy project specification and dependencies lock files
COPY package.json yarn.lock tsconfig.json /tmp/
# Install npm 
RUN apk --no-cache add npm

### DEPENDENCIES
FROM base AS dependencies
# Install Node.js dependencies
RUN cd /tmp && yarn

### RELEASE
FROM base AS development
# Copy app sources
COPY . .
# Copy dependencies
COPY --from=dependencies /tmp/node_modules ./node_modules
# Expose application port
EXPOSE 7070
