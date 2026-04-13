# Git Worktree Masterclass TUI

An interactive terminal-based guide to Git worktrees, collaboration strategies, and conflict resolution. This application is a dual-interface educational platform designed to bridge the gap between technical Git workflows and advanced social coordination.

---

## 🚀 How to Run

### 1. Web Version
Simply open the application in your browser preview to use the integrated terminal emulator.

### 2. Native Terminal (Linux / macOS / Windows)
For the most authentic experience, run the TUI directly in your system terminal.

**Prerequisites:**
- Node.js (v18 or higher)
- npm

**Steps:**
1. Open your terminal in the project root directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Launch the TUI:
   ```bash
   npm run tui
   ```

---

## 📖 User Guide

The TUI operates as a stateful command-line environment. You can navigate through lessons, run interactive wizards, and even scan your real repository for conflicts.

### Key Workflows:
- **Learning**: Use `lesson 1` through `lesson 4`. Each lesson ends with an **Interactive Quiz** to verify mastery.
- **Creation**: Use the `wizard` command. It will guide you through creating a new worktree, validating your paths and branch names in real-time.
- **Maintenance**: Use `graph` to visualize your current worktree topology or `conflict` to scan for unmerged files.
- **Strategy**: Use `techniques` or `paper` to access the deep-dive research on social coordination.

---

## 🛠 Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| `git: command not found` | Git is not installed on your system. | Install Git from [git-scm.com](https://git-scm.com/). |
| `Failed to run git status` | You are running the CLI outside of a Git repository. | Navigate to a Git-initialized folder before running `npm run tui`. |
| `Invalid branch name` | Input failed the `Validator` check. | Ensure your branch name doesn't contain spaces or illegal characters (e.g., `:`, `..`, `*`). |
| Web TUI "Mock" output | Browser security prevents real system access. | Use the Native Terminal version for real Git execution. |

---

## 📈 Project Evolution

### How we got here
This project began as a simple web-based terminal emulator to teach Git Worktree basics. However, through a series of iterative corrections and "Phase Enforcements" (as documented in the integrated White Paper), it evolved into a robust, cross-platform tool. The user's insistence on "no omissions" and "ready for publication" forced a shift from a documentation-only app to a functional utility with a shared core engine.

### Where we are
Today, the app features a **Unified Core Engine** (`src/core/engine.ts`) that ensures 100% parity between the Web and CLI. It implements a formal state machine for complex interactions and utilizes a dedicated validation layer to ensure system safety.

---

## 🔬 Scientific Foundation & Proven Techniques

The "Masterclass" is built on established research from hostage negotiation, cognitive psychology, and behavioral economics.

### 1. Steelmanning (Daniel Dennett)
**Concept**: Rebuilding an opponent's argument to its strongest form before responding.
> *"Restate your opponent’s position so clearly… that they say, ‘Thanks, I wish I’d thought of putting it that way.’"*
> — [Daniel Dennett, Rapoport's Rules](https://www.brainpickings.org/2014/03/28/daniel-dennett-rapoport-rules-criticism/)

**Implementation in Code:**
Used in `Lesson 4` and the `conflict` assistant to guide users through collaborative resolution.
```typescript
// src/core/engine.ts
this.adapter.log({ 
  type: 'response', 
  text: '1. Open the file...\n2. Look for markers...\n3. Use Steelmanning to understand the other side\'s intent...' 
});
```

### 2. Tactical Empathy (Chris Voss)
**Concept**: Using "Labeling" and "Mirroring" to de-escalate emotional resistance.
> *"It seems like… It sounds like… It looks like…"*
> — [Chris Voss, Never Split the Difference](https://www.blackswanltd.com/resources)

**Implementation in Code:**
Integrated into the `techniques` command and the `lesson-plan`.
```typescript
// src/constants/content.ts
export const TECHNIQUES = `
## 2. From Hostage Negotiation (De-escalation)
- **Labeling**: Name emotions without judgment. "It sounds like you're frustrated."
`;
```

### 3. Interest-Based Negotiation (Fisher & Ury)
**Concept**: Shifting from rigid "positions" to underlying "interests."
> *"Focus on interests, not positions."*
> — [Fisher & Ury, Getting to Yes](https://www.pon.harvard.edu/daily/negotiation-skills-daily/getting-to-yes/)

**Implementation in Code:**
The `Alignment` phase of our 5-phase model is directly derived from this principle.
```typescript
// src/core/engine.ts
private startLesson(idArg: string): void {
  // ... logic to transition from content to interest-based quiz ...
}
```

### 4. Cognitive Chunking (George A. Miller)
**Concept**: Breaking complex information into manageable units.
> *"The magical number seven, plus or minus two."*
> — [George A. Miller, The Psychological Review](https://psychclassics.yorku.ca/Miller/)

**Implementation in Code:**
The `Validator` class ensures inputs are processed in discrete, manageable steps.
```typescript
// src/core/validator.ts
public static validateBranch(branch: string): { valid: boolean; error?: string } {
  // Ensures the branch "chunk" is valid before proceeding
}
```

---

## ⌨️ Commands Reference

- `help`: Show available commands.
- `wizard`: Start the interactive worktree creation wizard (with validation).
- `conflict`: Start the conflict resolution assistant (scans real files in CLI).
- `simulate-conflict`: Simulate merge conflicts for testing in the Web TUI.
- `graph`: Visualize your worktree topology.
- `lesson [1-4]`: Start an interactive lesson with a mastery quiz.
- `git worktree`: View git worktree command reference.
- `techniques`: View advanced communication techniques.
- `lesson-plan`: View the social interaction lesson plan.
- `paper`: Read the "Navigating Social Interactions" white paper.
- `clear`: Clear the terminal screen.
- `exit`: Close the TUI.
