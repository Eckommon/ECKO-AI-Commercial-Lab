# Windows local setup

Canonical local path:

```text
C:\ECKO-AI-Commercial-Lab
```

## Clone / initialize

If the directory is empty:

```powershell
Set-Location C:\
git clone https://github.com/Eckommon/ECKO-AI-Commercial-Lab.git ECKO-AI-Commercial-Lab
Set-Location C:\ECKO-AI-Commercial-Lab
git switch main
git pull --ff-only origin main
```

If the directory already exists as a Git repository:

```powershell
Set-Location C:\ECKO-AI-Commercial-Lab
git remote -v
git fetch origin
git switch main
git pull --ff-only origin main
```

## Benchmark #001 asset placement

Place the five approved generated images here:

```text
commercials\aurora-cold-brew\assets\shot-01-hero.png
commercials\aurora-cold-brew\assets\shot-02-macro.png
commercials\aurora-cold-brew\assets\shot-03-portrait.png
commercials\aurora-cold-brew\assets\shot-04-impact.png
commercials\aurora-cold-brew\assets\shot-05-endcard.png
```

## Validate and render

```powershell
npm install
npm run validate
npm run studio
npm run render:aurora
```

Expected output:

```text
commercials\aurora-cold-brew\output\aurora-cold-brew-v1.mp4
```

## Codex handoff

Start Codex from the repository root and instruct it to read `AGENTS.md` first. The brief and storyboard are the semantic source of truth; motion code must remain synchronized with those contracts.

## Snapshot repository description

Use this GitHub repository description:

> AI-native commercial production lab: GPT-directed storyboards, generated visual assets, code-driven motion, and reproducible MP4 rendering.
