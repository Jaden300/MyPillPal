# How we work

This is the working method for this repo. Future agents: follow it.

## Context discipline

- Keep `CLAUDE.md` minimal. It only holds what is needed in **every** session.
  If something is only needed sometimes, it belongs in `docs/`.
- Use `/clear` when starting a new task. Do not use `/compact` unless the
  previous context is genuinely required for the next step.
- Iterate over small changes. When a change is done, `/clear` and start fresh.

## Project knowledge

- All project knowledge lives in `docs/`.
- Reference a doc with `@docs/filename.md` when it is relevant to the task at
  hand. Do not load every doc every session.
- No memory bank, no complex memory system. `docs/` is the memory.

## Tasks

- Track tasks with markdown checkboxes in `docs/tasks.md`.
- Use `[ ]` for open and `[x]` for done. Update the file as work completes.
- Do not build a separate task tracking system on top of this.

## Docs index

| File | What it holds | Committed |
|---|---|---|
| `docs/workflow.md` | This file | Yes |
| `docs/prd.md` | Full product spec | No, gitignored |
| `docs/conventions.md` | Palette, type, spacing, voice | Yes |
| `docs/data-sources.md` | Citations | Yes |
| `docs/tasks.md` | Checkbox task list | Yes |

`CLAUDE.md` and `docs/prd.md` are gitignored. They are internal working
material and stay local.

## Adding a doc

New knowledge goes in a new file in `docs/`, added to the table above and to
the reference list in `CLAUDE.md`. Keep each doc focused on one topic so it can
be loaded on its own.
