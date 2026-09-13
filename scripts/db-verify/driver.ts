import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';

export interface RunResult {
  lastInsertRowId: number;
  changes: number;
}

export type Params = (string | number | null)[];

export class VerifierDatabase {
  readonly db: DatabaseSync;
  readonly driverPath: string;

  constructor(name: string) {
    mkdirSync('/tmp/opencode', { recursive: true });
    this.driverPath = path.join('/tmp/opencode', `${name}.db`);
    rmSync(this.driverPath, { force: true });
    this.db = new DatabaseSync(this.driverPath);
    this.execAsync('PRAGMA foreign_keys = ON;');
  }

  execAsync(sql: string): Promise<void> {
    this.db.exec(sql);
    return Promise.resolve();
  }

  runAsync(sql: string, ...params: Params): Promise<RunResult> {
    const stmt = this.db.prepare(sql);
    const r = stmt.run(...params);
    return Promise.resolve({
      lastInsertRowId: Number(r.lastInsertRowid),
      changes: Number(r.changes),
    });
  }

  getFirstAsync<T>(sql: string, ...params: Params): Promise<T | null> {
    const stmt = this.db.prepare(sql);
    const row = stmt.get(...params) as T | undefined;
    return Promise.resolve(row ?? null);
  }

  getAllAsync<T>(sql: string, ...params: Params): Promise<T[]> {
    const stmt = this.db.prepare(sql);
    return Promise.resolve(stmt.all(...params) as T[]);
  }

  close(): void {
    this.db.close();
  }
}