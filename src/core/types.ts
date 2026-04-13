/**
 * @file types.ts
 * @description Shared types for the Git Worktree Masterclass Core Engine.
 */

export type LogType = 'command' | 'response' | 'error' | 'info' | 'success';

export interface LogEntry {
  type: LogType;
  text: string;
}

export type WizardStep = 'none' | 'path' | 'branch' | 'wizard_execute' | 'conflict_start' | 'conflict_resolve' | 'lesson_quiz';

export interface WizardData {
  path: string;
  branch: string;
  conflicts?: string[];
  currentLesson?: number;
  quizStep?: number;
}

/**
 * Interface for platform-specific adapters (CLI vs Web).
 */
export interface PlatformAdapter {
  log: (entry: LogEntry) => void;
  clear: () => void;
  exit: () => void;
  executeGit: (args: string[]) => { stdout: string; stderr: string; status: number | null };
}
