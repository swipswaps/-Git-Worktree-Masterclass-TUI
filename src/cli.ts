#!/usr/bin/env tsx
import * as readline from 'node:readline';
import { spawnSync } from 'node:child_process';
import { CoreEngine } from './core/engine';
import { PlatformAdapter, LogEntry } from './core/types';

/**
 * CLI Implementation of the PlatformAdapter.
 * Handles ANSI color formatting and process exit.
 */
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  italic: '\x1b[3m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

const cliAdapter: PlatformAdapter = {
  log: (entry: LogEntry) => {
    switch (entry.type) {
      case 'command':
        // Commands are handled by readline's echo in the terminal
        break;
      case 'error':
        console.log(`\n${colors.red}Error: ${entry.text}${colors.reset}\n`);
        break;
      case 'success':
        console.log(`\n${colors.bold}${colors.yellow}--- ${entry.text} ---${colors.reset}\n`);
        break;
      case 'info':
        console.log(`${colors.italic}${entry.text}${colors.reset}`);
        break;
      case 'response':
        console.log(entry.text);
        break;
    }
  },
  clear: () => {
    process.stdout.write('\x1bc');
    printWelcome();
  },
  exit: () => {
    console.log(`\n${colors.green}Goodbye!${colors.reset}\n`);
    process.exit(0);
  },
  executeGit: (args: string[]) => {
    const res = spawnSync('git', args, { encoding: 'utf-8' });
    return {
      stdout: res.stdout || '',
      stderr: res.stderr || '',
      status: res.status
    };
  }
};

const engine = new CoreEngine(cliAdapter);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '\x1b[32m$\x1b[0m '
});

function printWelcome() {
  console.log(`${colors.bold}${colors.green}--- GIT WORKTREE MASTERCLASS TUI v1.0.0 ---${colors.reset}`);
  console.log(`${colors.italic}Master the art of parallel development and social coordination.${colors.reset}`);
  console.log('Type "help" to see available commands.\n');
}

printWelcome();
rl.prompt();

rl.on('line', (line) => {
  engine.handleInput(line);
  rl.prompt();
}).on('close', () => {
  cliAdapter.exit();
});
