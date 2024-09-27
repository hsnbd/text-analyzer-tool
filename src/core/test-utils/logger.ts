import { Logger } from '@nestjs/common';

export const LoggerMock = {
  provide: Logger,
  useValue: {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    verbose: jest.fn(),
    fatal: jest.fn(),
    setLogLevels: jest.fn(),
  },
};
