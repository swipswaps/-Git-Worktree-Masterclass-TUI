/**
 * @file validator.ts
 * @description Robust validation for Git paths and branch names.
 */

export class Validator {
  /**
   * Validates a file system path for a new worktree.
   * Ensures it's not empty and doesn't contain illegal characters.
   */
  public static validatePath(path: string): { valid: boolean; error?: string } {
    if (!path || path.trim().length === 0) {
      return { valid: false, error: 'Path cannot be empty.' };
    }
    
    // Basic check for common illegal characters in paths
    const illegalChars = /[<>:"|?*]/;
    if (illegalChars.test(path)) {
      return { valid: false, error: 'Path contains illegal characters.' };
    }

    return { valid: true };
  }

  /**
   * Validates a Git branch name.
   * Follows basic Git branch naming conventions.
   */
  public static validateBranch(branch: string): { valid: boolean; error?: string } {
    if (!branch || branch.trim().length === 0) {
      return { valid: false, error: 'Branch name cannot be empty.' };
    }

    // Git branch naming rules (simplified)
    // - Cannot start with a dot
    // - Cannot contain space, tilde, caret, colon, question mark, asterisk, open bracket
    // - Cannot contain ..
    // - Cannot end with /
    const gitBranchRegex = /^(?!\.)(?!.*?\.\.)[^\s\~\^\:\?\*\[]+(?<!\/)$/;
    
    if (!gitBranchRegex.test(branch)) {
      return { valid: false, error: 'Invalid Git branch name format.' };
    }

    return { valid: true };
  }
}
