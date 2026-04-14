export const GIT_WORKTREE_LESSONS = [
  {
    id: 1,
    title: "Introduction to Git Worktrees",
    content: `
Git worktrees allow you to have multiple working trees attached to the same repository. 
This means you can check out more than one branch at a time in different directories.

# Why use them?
- Switch branches without 'git stash' or 'git commit'.
- Run tests on one branch while coding on another.
- Compare different versions of the code side-by-side.

# Basic Commands:
- git worktree add <path> <branch>: Create a new worktree at <path> checking out <branch>.
- git worktree list: Show all current worktrees.
- git worktree remove <path>: Safely remove a worktree.
- git worktree prune: Clean up administrative files for worktrees that no longer exist.
    `
  },
  {
    id: 2,
    title: "Crowd-Sourced Information Platforms",
    content: `
Using Git worktrees effectively in a team environment turns your local setup into a high-performance information platform.

# Strategies:
- **Parallel Review**: Keep a dedicated worktree for code reviews. When a PR comes in, 'git worktree add ../reviews/pr-123 pr-branch'.
- **Documentation Worktree**: Keep your docs branch checked out in a separate folder so you can update documentation as you write code.
- **Hotfix Isolation**: Never stop your current feature work for a hotfix. Just 'git worktree add ../hotfix/security-patch master' and fix it there.
    `
  },
  {
    id: 3,
    title: "Branching Strategies & Pitfalls",
    content: `
# Strategies:
- **The Linked-Tree Pattern**: Use a main 'repo' folder and sibling folders for worktrees.
- **Ephemeral Worktrees**: Create a worktree for a specific task and delete it immediately after.

# Common Pitfalls:
- **Duplicate Branches**: You cannot check out the same branch in two different worktrees simultaneously.
- **Untracked Files**: Remember that untracked files in one worktree are NOT visible in another.
- **Submodules**: Worktrees and submodules can be tricky; ensure you understand how submodules are initialized in new trees.
    `
  },
  {
    id: 4,
    title: "Conflict Resolution & Communication",
    content: `
When working in a "crowd-sourced" model, conflicts are inevitable—not just in code, but in communication.

# Conflict Resolution Methods:
- **IBR (Interest-Based Relational)**: Focus on interests, not positions. Separate people from the problem.
- **TKI (Thomas-Kilmann)**: Understand your style (Competing, Collaborating, Compromising, Avoiding, Accommodating).
- **NVC (Nonviolent Communication)**: Observation -> Feelings -> Needs -> Requests.

# Negotiation Techniques:
- **Mirroring**: "Repeat the last three words... of what someone has just said." — Chris Voss
- **Labeling**: "It sounds like... It seems like... It looks like..." — Chris Voss
- **Steelmanning**: "Restate your opponent’s position so clearly… they say, 'Thanks, I wish I’d thought of putting it that way.'" — Daniel Dennett
    `
  },
  {
    id: 5,
    title: "Agentic Development & AI Workflows",
    content: `
Git worktrees are the "superpower" of agentic development. When using AI coding agents (Claude Code, Cursor, GitHub Copilot), worktrees provide the necessary isolation to prevent context contamination.

# The Agentic Workflow:
1. **Isolation**: Spin up a new worktree for an AI agent to solve a specific issue.
2. **Parallelism**: Have multiple agents working on different features in parallel worktrees.
3. **Deterministic Coding**: Tools like Archon use worktrees to make AI coding repeatable and verifiable by snapshotting the environment.
4. **Looming**: iloom-cli runs tasks in isolated "Looms" (worktrees) to persist analysis, plans, and decisions to your issue tracker (Jira/GitHub) without polluting your main environment.

# Key Tools & Installation:
- **Archon**: Harness builder for deterministic AI coding.
  - *Install*: \`git clone https://github.com/coleam00/archon && cd archon && npm install\`
- **iloom-cli**: Multi-agent workflow system.
  - *Install*: \`npm install -g @iloom/cli\`
- **Claude Code + tmux**: Automate agent sessions.
  - *Install*: \`npm install -g @anthropic-ai/claude-code\`

# Verbatim References:
- "Git worktrees are a superpower for agentic dev... they allow agents to work in a clean room while you maintain your flow in the main tree." — [Reddit /r/ClaudeCode](https://www.reddit.com/r/ClaudeCode/comments/1pzczjn/git_worktrees_are_a_superpower_for_agentic_dev/)
- "The magic of git worktree is that it allows me to multitask despite tests taking forever to run. I can just spin up a new worktree and keep coding." — [ahferroin7, Dev.to](https://dev.to/ahferroin7/the-magic-of-git-worktree-how-i-multitask-despite-tests-taking-forever-to-run-5fe4)
- "Using git-worktree with AI coding tools like Cursor and Claude Code boosts productivity by isolating agent context." — [satococoa, Dev.to](https://dev.to/satococoa/boost-productivity-using-git-worktree-with-ai-coding-tools-2lln)
    `
  }
];

export const TECHNIQUES = `
# Advanced Communication Toolkit

## 1. From Debate (Momentum & Clarity)
- **Steelmanning**: Rebuild their argument before responding. Eliminates friction caused by misunderstanding.
- **Framing**: Shift topic from "who's right" -> "what outcome works".
- **Signposting**: "First..., second..., finally..." - creates directional flow.

## 2. From Hostage Negotiation (De-escalation)
- **Mirroring**: Repeat last 3 words. Prompts the other person to expand.
- **Labeling**: Name emotions without judgment. "It sounds like you're frustrated."
- **Tactical Silence**: Pause after key questions. Compels the other side to continue.

## 3. From Business Negotiation (Deal Flow)
- **Focus on Interests**: "Focus on interests, not positions." — Fisher & Ury
- **Invent Options**: Brainstorm before deciding. Prevents binary deadlock.
- **Objective Criteria**: Use standards, data, benchmarks. Shifts from opinion -> resolution.

## 4. Cognitive Techniques
- **Chunking**: Break ideas into smaller parts. Reduces overload.
- **Clarification Requests**: "If you can't explain it simply, you don't understand it well enough." — Einstein

# Conflict Resolution Assistant
The "conflict" command triggers a real-time scan of your repository for merge conflicts.
It looks for "UU" (Unmerged) status in your files and provides a guided path to resolution.
`;

export const LESSON_PLAN = `
# Lesson Plan: Navigating Social Interactions Using Cross-Domain Techniques

## Lesson Title
From Conflict to Coordination: Structured Techniques for Moving Conversations Forward

## Learning Objectives
1. Identify the three primary causes of stalled interactions: Ambiguity, Emotional resistance, Lack of structure.
2. Apply techniques from Debate (Steelmanning), Negotiation (Interests), Hostage Negotiation (Labeling), and Cognitive methods (Chunking).
3. Execute the 5-phase interaction model: Stabilize -> Clarify -> Align -> Expand -> Resolve.

## Lesson Structure
- **Phase 1: Warm-Up (10m)**: Identify why conversations fail.
- **Phase 2: Concepts (15m)**: Introduce the 3 failure modes and the 5-phase model.
- **Phase 3: Training (30m)**: Station-based practice (Steelmanning, Labeling, Interests, Chunking).
- **Phase 4: Simulation (25m)**: Guided conflict scenario.
- **Phase 5: Reflection (10m)**: Debrief and assessment.
`;

export const WHITE_PAPER = `
# Navigating Social Interaction Through Iterative Constraint Enforcement:
# A Process Model Demonstrated via Human–LLM Dialogue

## Abstract
Social interactions frequently fail due to ambiguity, emotional escalation, and lack of structured progression. This paper presents a unified, evidence-based framework integrating research from negotiation theory, psychology, communication science, and decision research. The model consists of five sequential phases—Stabilization, Clarification, Alignment, Expansion, and Resolution—each supported by peer-reviewed literature.

## Introduction
Social interaction is often treated as intuitive, yet repeated failures across domains suggest that it follows structured, predictable dynamics. This paper advances a procedural model of interaction and demonstrates it empirically using a real conversational dataset: the very dialogue that produced this artifact.

## The Five-Phase Model
1. **Stabilization**: Reduce emotional interference through labeling and regulation.
2. **Clarification**: Establish shared understanding using active listening and restatement.
3. **Alignment**: Identify underlying interests through inquiry and perspective-taking.
4. **Expansion**: Generate multiple options to avoid deadlock.
5. **Resolution**: Apply structured criteria to reach decisions.

## Empirical Mapping (Chat Data Analysis)
The progression of this interaction demonstrates the model in action:
- **Event 1**: "check those answers" -> Stabilization + early clarification. Indicates failure without escalation.
- **Event 2**: "all of these answers are outlines, not ready for submission" -> Clarification. Identifies exact failure mode: format, not content.
- **Event 3**: "check and number* each claim..." -> Alignment. Defines success criteria explicitly.
- **Event 4**: "weave this very chat into the paper" -> Expansion. Introduces new dimension: reflexive data integration.
- **Event 5**: "use what has been learned... verbatim" -> Resolution. Removes ambiguity completely.

## Discussion
The analyzed interaction demonstrates that progress does not emerge from initial correctness but from iterative enforcement of structure. Each user intervention corresponds to a failure in one of the five phases. The most significant finding is that user corrections function as phase enforcement mechanisms. Rather than passively receiving output, the user actively restructures the interaction, guiding it toward completeness.

## Conclusion
Effective social interaction is procedural rather than intuitive. By organizing these mechanisms into a five-phase model, interactions can be guided from conflict to coordination. The conversation itself becomes the proof: progress emerges not from avoiding failure, but from systematically correcting it.
`;

export const QUIZ = [
  {
    lessonId: 1,
    questions: [
      {
        text: "Can you check out the same branch in two different worktrees at the same time?",
        options: ["Yes", "No"],
        answer: "No"
      },
      {
        text: "Which command lists all active worktrees?",
        options: ["git worktree show", "git worktree list", "git worktree status"],
        answer: "git worktree list"
      }
    ]
  },
  {
    lessonId: 4,
    questions: [
      {
        text: "What is 'Steelmanning'?",
        options: [
          "Attacking the weakest part of an argument",
          "Building the strongest possible version of an opponent's argument",
          "Ignoring the argument entirely"
        ],
        answer: "Building the strongest possible version of an opponent's argument"
      }
    ]
  },
  {
    lessonId: 5,
    questions: [
      {
        text: "Why are Git worktrees considered a 'superpower' for AI agentic development?",
        options: [
          "They make the AI faster",
          "They provide isolation to prevent context contamination",
          "They replace the need for Git branches",
          "They allow the AI to push code without review"
        ],
        answer: "They provide isolation to prevent context contamination"
      },
      {
        text: "Which tool uses 'Looms' to run tasks in isolated workflows?",
        options: ["Archon", "iloom-cli", "Claude Code", "tmux"],
        answer: "iloom-cli"
      }
    ]
  }
];
