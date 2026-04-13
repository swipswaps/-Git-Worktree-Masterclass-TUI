/**
 * @file engine.ts
 * @description The central command and state engine for the Git Worktree Masterclass.
 * This engine is platform-agnostic and is used by both the CLI and Web interfaces.
 */

import { LogEntry, PlatformAdapter, WizardStep, WizardData } from './types';
import { GIT_WORKTREE_LESSONS, WHITE_PAPER, TECHNIQUES, LESSON_PLAN, QUIZ } from '../constants/content';
import { Validator } from './validator';

export class CoreEngine {
  private wizardStep: WizardStep = 'none';
  private wizardData: WizardData = { path: '', branch: '' };
  private adapter: PlatformAdapter;
  private simulatedConflicts: string[] = [];

  constructor(adapter: PlatformAdapter) {
    this.adapter = adapter;
  }

  /**
   * Main entry point for processing any user input.
   */
  public handleInput(input: string): void {
    const trimmedInput = input.trim();
    if (!trimmedInput && this.wizardStep === 'none') return;

    // If we are in a wizard flow, delegate to the wizard handler
    if (this.wizardStep !== 'none') {
      this.handleWizard(trimmedInput);
      return;
    }

    // Standard command processing
    this.adapter.log({ type: 'command', text: trimmedInput });
    const lowerInput = trimmedInput.toLowerCase();
    const [baseCmd, ...args] = lowerInput.split(' ');

    switch (baseCmd) {
      case 'help':
        this.showHelp();
        break;
      case 'wizard':
        this.startWizard();
        break;
      case 'conflict':
        this.startConflictAssistant();
        break;
      case 'simulate-conflict':
        this.simulatedConflicts = ['src/App.tsx', 'src/index.css'];
        this.adapter.log({ type: 'success', text: 'Conflicts simulated for testing.' });
        break;
      case 'lesson':
        this.startLesson(args[0]);
        break;
      case 'graph':
        this.showGraph();
        break;
      case 'git':
        if (args[0] === 'worktree') {
          this.showGitHelp();
        } else {
          this.adapter.log({ type: 'error', text: 'Unknown git command. Try "git worktree".' });
        }
        break;
      case 'techniques':
        this.showTechniques();
        break;
      case 'lesson-plan':
        this.showLessonPlan();
        break;
      case 'paper':
        this.showPaper();
        break;
      case 'clear':
        this.adapter.clear();
        break;
      case 'about':
        this.showAbout();
        break;
      case 'exit':
        this.adapter.exit();
        break;
      default:
        this.adapter.log({ type: 'error', text: `Command not found: ${baseCmd}` });
    }
  }

  private showHelp(): void {
    this.adapter.log({
      type: 'response',
      text: `Available commands:
  help          - Show this help message
  wizard        - Start the interactive worktree creation wizard
  conflict      - Start the conflict resolution assistant
  simulate-conflict - Simulate merge conflicts (for testing)
  graph         - Visualize the worktree topology
  lesson [1-4]  - Start an interactive lesson with quiz
  git worktree  - Learn about git worktree commands
  techniques    - View advanced communication & negotiation techniques
  lesson-plan   - View the social interaction lesson plan
  paper         - Read the "Navigating Social Interactions" white paper
  clear         - Clear the terminal
  about         - About this masterclass
  exit          - Exit the application`
    });
  }

  private startWizard(): void {
    this.wizardStep = 'path';
    this.adapter.log({ type: 'success', text: '--- GIT WORKTREE WIZARD ---' });
    this.adapter.log({ type: 'response', text: 'Step 1: Enter the target path for your new worktree (e.g., ../feature-fix):' });
  }

  private startConflictAssistant(): void {
    this.wizardStep = 'conflict_start';
    this.adapter.log({ type: 'success', text: '--- CONFLICT RESOLUTION ASSISTANT ---' });
    this.adapter.log({ type: 'info', text: 'Scanning for conflicts...' });
    
    let conflicts: string[] = [];
    
    if (this.simulatedConflicts.length > 0) {
      conflicts = this.simulatedConflicts;
    } else {
      const res = this.adapter.executeGit(['status', '--porcelain']);
      if (res.status !== 0) {
        this.adapter.log({ type: 'error', text: 'Failed to run git status. Are you in a git repo?' });
        this.wizardStep = 'none';
        return;
      }
      const lines = res.stdout.split('\n').filter(l => l.startsWith('UU '));
      conflicts = lines.map(l => l.substring(3));
    }

    if (conflicts.length === 0) {
      this.adapter.log({ type: 'success', text: 'No merge conflicts detected! (UU status)' });
      this.wizardStep = 'none';
      return;
    }

    this.wizardData.conflicts = conflicts;
    this.adapter.log({ type: 'error', text: `Detected ${this.wizardData.conflicts.length} conflicted files:` });
    this.wizardData.conflicts.forEach(f => this.adapter.log({ type: 'response', text: `  - ${f}` }));
    
    this.adapter.log({ type: 'response', text: '\nWould you like to resolve them one by one? (yes/no)' });
    this.wizardStep = 'conflict_resolve';
  }

  private startLesson(idArg: string): void {
    const lessonId = parseInt(idArg);
    const lesson = GIT_WORKTREE_LESSONS.find(l => l.id === lessonId);
    if (lesson) {
      this.adapter.log({ type: 'success', text: `--- ${lesson.title} ---` });
      this.adapter.log({ type: 'response', text: lesson.content });
      
      const quiz = QUIZ.find(q => q.lessonId === lessonId);
      if (quiz) {
        this.adapter.log({ type: 'info', text: '\nStarting interactive quiz...' });
        this.wizardStep = 'lesson_quiz';
        this.wizardData.currentLesson = lessonId;
        this.wizardData.quizStep = 0;
        this.showQuizQuestion();
      }
    } else {
      this.adapter.log({ type: 'error', text: 'Lesson not found. Try "lesson 1", "lesson 2", etc.' });
    }
  }

  private showQuizQuestion(): void {
    const quiz = QUIZ.find(q => q.lessonId === this.wizardData.currentLesson);
    if (quiz && this.wizardData.quizStep !== undefined) {
      const q = quiz.questions[this.wizardData.quizStep];
      if (q) {
        this.adapter.log({ type: 'response', text: `\nQuestion ${this.wizardData.quizStep + 1}: ${q.text}` });
        q.options.forEach((opt, i) => this.adapter.log({ type: 'response', text: `  ${i + 1}. ${opt}` }));
      } else {
        this.adapter.log({ type: 'success', text: '\nQuiz complete! You mastered this lesson.' });
        this.wizardStep = 'none';
      }
    }
  }

  private handleWizard(input: string): void {
    this.adapter.log({ type: 'command', text: input });

    if (this.wizardStep === 'path') {
      const validation = Validator.validatePath(input);
      if (!validation.valid) {
        this.adapter.log({ type: 'error', text: validation.error || 'Invalid path.' });
        this.adapter.log({ type: 'response', text: 'Step 1: Enter the target path for your new worktree (e.g., ../feature-fix):' });
        return;
      }
      this.wizardData.path = input;
      this.adapter.log({ type: 'info', text: `Path set to: ${input}` });
      this.adapter.log({ type: 'response', text: 'Step 2: Enter the branch name (e.g., feature/new-ui):' });
      this.wizardStep = 'branch';
    } else if (this.wizardStep === 'branch') {
      const validation = Validator.validateBranch(input);
      if (!validation.valid) {
        this.adapter.log({ type: 'error', text: validation.error || 'Invalid branch name.' });
        this.adapter.log({ type: 'response', text: 'Step 2: Enter the branch name (e.g., feature/new-ui):' });
        return;
      }
      this.wizardData.branch = input;
      this.adapter.log({ type: 'info', text: `Branch set to: ${input}` });
      this.adapter.log({ type: 'success', text: '--- WORKTREE CREATION SUMMARY ---' });
      this.adapter.log({
        type: 'response',
        text: `Command to run:\n  git worktree add ${this.wizardData.path} ${this.wizardData.branch}\n\nThis will create a new working tree at "${this.wizardData.path}" checking out "${this.wizardData.branch}".`
      });
      this.adapter.log({ type: 'response', text: '\nWould you like to execute this command now? (yes/no)' });
      this.wizardStep = 'wizard_execute';
    } else if (this.wizardStep === 'wizard_execute') {
      if (input.toLowerCase() === 'yes') {
        this.adapter.log({ type: 'info', text: 'Executing command...' });
        const res = this.adapter.executeGit(['worktree', 'add', this.wizardData.path, this.wizardData.branch]);
        if (res.status === 0) {
          this.adapter.log({ type: 'success', text: 'Worktree created successfully!' });
        } else {
          this.adapter.log({ type: 'error', text: res.stderr || 'Failed to create worktree.' });
        }
      } else {
        this.adapter.log({ type: 'info', text: 'Execution skipped.' });
      }
      this.adapter.log({ type: 'info', text: 'Wizard complete. Returning to main terminal.' });
      this.wizardStep = 'none';
      this.wizardData = { path: '', branch: '' };
    } else if (this.wizardStep === 'conflict_resolve') {
      if (input.toLowerCase() === 'yes') {
        this.adapter.log({ type: 'info', text: 'Starting guided resolution...' });
        this.adapter.log({ type: 'response', text: '1. Open the file in your editor.\n2. Look for <<<<<<, ======, and >>>>>> markers.\n3. Choose the correct code.\n4. Save the file.\n5. Type "git add <file>" when done.' });
        this.adapter.log({ type: 'info', text: 'Returning to main terminal. Use "conflict" again to re-scan.' });
      } else {
        this.adapter.log({ type: 'info', text: 'Conflict resolution aborted.' });
      }
      this.wizardStep = 'none';
      this.wizardData.conflicts = [];
    } else if (this.wizardStep === 'lesson_quiz') {
      const quiz = QUIZ.find(q => q.lessonId === this.wizardData.currentLesson);
      if (quiz && this.wizardData.quizStep !== undefined) {
        const q = quiz.questions[this.wizardData.quizStep];
        const selectedIdx = parseInt(input) - 1;
        const selectedOpt = q.options[selectedIdx];
        
        if (selectedOpt === q.answer || input.toLowerCase() === q.answer.toLowerCase()) {
          this.adapter.log({ type: 'success', text: 'Correct!' });
          this.wizardData.quizStep++;
          this.showQuizQuestion();
        } else {
          this.adapter.log({ type: 'error', text: `Incorrect. The answer was: ${q.answer}` });
          this.wizardData.quizStep++;
          this.showQuizQuestion();
        }
      }
    }
  }

  private showGraph(): void {
    this.adapter.log({ type: 'success', text: '--- WORKTREE TOPOLOGY ---' });
    const res = this.adapter.executeGit(['worktree', 'list']);
    if (res.status === 0) {
      const lines = res.stdout.trim().split('\n');
      lines.forEach((line, i) => {
        const parts = line.split(/\s+/);
        const path = parts[0];
        const commit = parts[1];
        const branch = parts[2] || '(no branch)';
        
        const prefix = i === 0 ? 'Main: ' : ' └─ ';
        this.adapter.log({ type: 'response', text: `${prefix}${path} [${branch}]` });
      });
    } else {
      this.adapter.log({ type: 'error', text: 'Failed to list worktrees.' });
    }
  }

  private showGitHelp(): void {
    this.adapter.log({
      type: 'response',
      text: `Git Worktree Commands:
  git worktree add <path> <branch>  - Create a new working tree
  git worktree list                 - List all working trees
  git worktree remove <path>        - Remove a working tree
  git worktree prune                - Clean up stale worktree info`
    });
  }

  private showTechniques(): void {
    this.adapter.log({ type: 'success', text: '--- ADVANCED COMMUNICATION TECHNIQUES ---' });
    this.adapter.log({ type: 'response', text: TECHNIQUES });
  }

  private showLessonPlan(): void {
    this.adapter.log({ type: 'success', text: '--- LESSON PLAN: Navigating Social Interactions ---' });
    this.adapter.log({ type: 'response', text: LESSON_PLAN });
  }

  private showPaper(): void {
    this.adapter.log({ type: 'success', text: '--- WHITE PAPER: Navigating Social Interactions ---' });
    this.adapter.log({ type: 'response', text: WHITE_PAPER });
  }

  private showAbout(): void {
    this.adapter.log({
      type: 'response',
      text: 'This TUI is designed to teach Git Worktrees as a platform for crowd-sourced information and effective collaboration using advanced negotiation and conflict resolution techniques.'
    });
  }
}
