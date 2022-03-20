export class InvalidCommandException extends Error {
  constructor(message?: string) {
    super(`Invalid command: ${message}`);
    this.name = 'InvalidCommandException';
  }
}
