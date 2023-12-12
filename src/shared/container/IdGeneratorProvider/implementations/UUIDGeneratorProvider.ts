import IIdGeneratorProvider from '../models/IIdGeneratorProvider';
import crypto from 'node:crypto'

class IdGeneratorProvider implements IIdGeneratorProvider {
  generate(): string {
    return crypto.randomUUID();
  }
}

export default IdGeneratorProvider;
