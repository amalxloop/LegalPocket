import type { SQLiteDatabase } from 'expo-sqlite';
import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getDb } from '@/db/database';

const DbContext = createContext<SQLiteDatabase | null>(null);

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const [db, setDb] = useState<SQLiteDatabase | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    getDb()
      .then((database) => {
        if (mounted) setDb(database);
      })
      .catch((e: unknown) => {
        if (mounted) setError(e instanceof Error ? e : new Error(String(e)));
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (error) {
    throw error;
  }

  return <DbContext.Provider value={db}>{children}</DbContext.Provider>;
}

export function useDatabase(): SQLiteDatabase {
  const db = useContext(DbContext);
  if (!db) {
    throw new Error('DatabaseProvider not ready — screens must be rendered below DatabaseProvider.');
  }
  return db;
}

export function useDatabaseReady(): boolean {
  return useContext(DbContext) != null;
}