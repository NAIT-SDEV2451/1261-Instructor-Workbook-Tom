# Workflow

- Plan before editing unless it's a super small change (minor bug fix, etc.)
- Stop and ask before:
  - changing existing code
  - changing, skipping, or deleting tests
  - adding a dependency
  - changing an API url or response shape
  - changing models or adding migrations
  - adding anything that wasn't requested explicitly
- Reuse existing code before writing new code
- Write the minimal amount of code necessary to accomplish the task
- Don't change files through shell commands or scripts. Use the edit and write tools when possible so changes appear as reviewable diffs.
- Only say tests pass after running them. Report failures as they are.
- Always ask before committing or pushing. In general ask before interacting with git other than when reading logs/status.
