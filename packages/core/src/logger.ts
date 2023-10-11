/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  NONE = 'NONE',
}

interface ILogInterface {
  debug(primaryMessage: string, ...supportingData: any[]): void;
  warn(primaryMessage: string, ...supportingData: any[]): void;
  error(primaryMessage: string, ...supportingData: any[]): void;
  info(primaryMessage: string, ...supportingData: any[]): void;
}

class Log implements ILogInterface {
  private logLevel: string;

  private isDevEnv: boolean;

  constructor(logLevel: string) {
    this.logLevel = logLevel.toUpperCase();
    this.isDevEnv = process.env.NODE_ENV !== 'prod';
  }

  public debug(primaryMessage: string, ...supportingData: any[]): void {
    if (this.logLevel === LogLevel.DEBUG && this.isDevEnv) {
      this.emitLogMessage('debug', `\x1b[32m[DEBUG] ${primaryMessage}\x1b[0m`, supportingData);
    }
  }

  public info(primaryMessage: string, ...supportingData: any[]): void {
    if (this.logLevel === LogLevel.DEBUG || this.logLevel === LogLevel.INFO) {
      if (this.isDevEnv) {
        this.emitLogMessage('info', `\x1b[34m[INFO] ${primaryMessage}\x1b[0m`, supportingData);
        return;
      }
      this.emitLogMessage('info', `[INFO] ${primaryMessage}`, supportingData);
    }
  }

  public warn(primaryMessage: string, ...supportingData: any[]): void {
    if (this.logLevel === LogLevel.DEBUG || this.logLevel === LogLevel.INFO || this.logLevel === LogLevel.WARN) {
      if (this.isDevEnv) {
        this.emitLogMessage('warn', `\x1b[33m[WARN] ${primaryMessage}\x1b[0m`, supportingData);
        return;
      }
      this.emitLogMessage('warn', `[WARN] ${primaryMessage}`, supportingData);
    }
  }

  public error(primaryMessage: string, ...supportingData: any[]): void {
    if (
      this.logLevel === LogLevel.DEBUG ||
      this.logLevel === LogLevel.INFO ||
      this.logLevel === LogLevel.WARN ||
      this.logLevel === LogLevel.ERROR
    ) {
      if (this.isDevEnv) {
        this.emitLogMessage('error', `\x1b[31m[ERROR] ${primaryMessage}\x1b[0m`, supportingData);
        return;
      }
      this.emitLogMessage('error', `[ERROR] ${primaryMessage}`, supportingData);
    }
  }

  private emitLogMessage(msgType: 'debug' | 'info' | 'error' | 'warn' | 'log', msg: string, supportingData: any[]) {
    if (supportingData != null && supportingData.length > 0) {
      console[msgType](msg, supportingData);
    } else {
      console[msgType](msg);
    }
  }
}

const logger = new Log(process.env.LOG_LEVEL || 'DEBUG');
export default logger;
