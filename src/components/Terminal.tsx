/**
 * @file Terminal.tsx
 * @description Web-based terminal emulator for the Git Worktree Masterclass.
 * Uses the shared CoreEngine to process commands and manage state.
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Terminal as TerminalIcon, ChevronRight, Command, Info, BookOpen, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CoreEngine } from '../core/engine';
import { PlatformAdapter, LogEntry } from '../core/types';

export const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Web Implementation of the PlatformAdapter.
   * Updates React state to log messages and clear the screen.
   */
  const webAdapter: PlatformAdapter = useMemo(() => ({
    log: (entry: LogEntry) => {
      setLogs(prev => [...prev, entry]);
    },
    clear: () => {
      setLogs([]);
      // Re-add welcome message after clear
      setLogs([
        { type: 'info', text: '--- GIT WORKTREE MASTERCLASS TUI v1.0.0 ---' },
        { type: 'info', text: 'Master the art of parallel development and social coordination.' },
        { type: 'info', text: 'Type "help" to see available commands.' },
      ]);
    },
    exit: () => {
      setLogs(prev => [...prev, { type: 'info', text: 'To exit the web version, simply close this browser tab.' }]);
    },
    executeGit: (args: string[]) => {
      // Mock implementation for the web
      if (args[0] === 'status' && args[1] === '--porcelain') {
        return {
          stdout: 'UU src/App.tsx\nUU src/index.css\n',
          stderr: '',
          status: 0
        };
      }
      if (args[0] === 'worktree' && args[1] === 'list') {
        return {
          stdout: '/app/applet 1234567 main\n/app/feature-fix 890abc feature/new-ui\n',
          stderr: '',
          status: 0
        };
      }
      if (args[0] === 'worktree' && args[1] === 'add') {
        return { stdout: 'Preparing worktree...', stderr: '', status: 0 };
      }
      return { stdout: '', stderr: 'Git execution not supported in browser.', status: 1 };
    }
  }), []);

  // Initialize the shared engine with the web adapter
  const engine = useMemo(() => new CoreEngine(webAdapter), [webAdapter]);

  // Initial welcome message
  useEffect(() => {
    webAdapter.clear();
  }, [webAdapter]);

  // Auto-scroll to bottom on new logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() || engine) {
      engine.handleInput(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-100 font-mono p-4 md:p-8">
      <div className="max-w-4xl w-full mx-auto flex flex-col h-full border border-zinc-800 rounded-lg overflow-hidden shadow-2xl shadow-emerald-500/10">
        {/* Terminal Header */}
        <div className="bg-zinc-900 px-4 py-2 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <TerminalIcon size={16} className="text-emerald-500" />
            <span className="text-xs font-bold tracking-tight text-zinc-400">GIT_WORKTREE_MASTERCLASS</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          </div>
        </div>

        {/* Terminal Body */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
        >
          <AnimatePresence initial={false}>
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`text-sm leading-relaxed whitespace-pre-wrap ${
                  log.type === 'command' ? 'text-emerald-400' :
                  log.type === 'error' ? 'text-rose-400' :
                  log.type === 'success' ? 'text-amber-400 font-bold' :
                  log.type === 'info' ? 'text-zinc-500 italic' :
                  'text-zinc-300'
                }`}
              >
                {log.type === 'command' && <span className="text-zinc-600 mr-2">$</span>}
                {log.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Terminal Input */}
        <form onSubmit={handleSubmit} className="bg-zinc-900/50 p-4 border-t border-zinc-800 flex items-center gap-2">
          <ChevronRight size={18} className="text-emerald-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent border-none outline-none flex-1 text-sm text-emerald-400 placeholder:text-zinc-700"
            placeholder="Enter command..."
            autoFocus
          />
        </form>
      </div>

      {/* Quick Links / Sidebar for Desktop */}
      <div className="max-w-4xl w-full mx-auto mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-50 hover:opacity-100 transition-opacity">
        <button onClick={() => engine.handleInput('lesson 1')} className="flex items-center gap-2 text-xs text-zinc-400 hover:text-emerald-400 transition-colors text-left">
          <BookOpen size={14} /> Lesson 1: Basics
        </button>
        <button onClick={() => engine.handleInput('lesson 4')} className="flex items-center gap-2 text-xs text-zinc-400 hover:text-emerald-400 transition-colors text-left">
          <MessageSquare size={14} /> Lesson 4: Conflict
        </button>
        <button onClick={() => engine.handleInput('lesson 5')} className="flex items-center gap-2 text-xs text-zinc-400 hover:text-emerald-400 transition-colors text-left">
          <Command size={14} /> Lesson 5: Agentic
        </button>
        <button onClick={() => engine.handleInput('tools')} className="flex items-center gap-2 text-xs text-zinc-400 hover:text-emerald-400 transition-colors text-left">
          <Info size={14} /> Tools Directory
        </button>
        <button onClick={() => engine.handleInput('test-parallel')} className="flex items-center gap-2 text-xs text-zinc-400 hover:text-emerald-400 transition-colors text-left">
          <Command size={14} /> Test Parallel
        </button>
        <button onClick={() => engine.handleInput('paper')} className="flex items-center gap-2 text-xs text-zinc-400 hover:text-emerald-400 transition-colors text-left">
          <Info size={14} /> White Paper
        </button>
        <button onClick={() => engine.handleInput('wizard')} className="flex items-center gap-2 text-xs text-zinc-400 hover:text-emerald-400 transition-colors text-left">
          <Command size={14} /> Start Wizard
        </button>
      </div>
    </div>
  );
};
