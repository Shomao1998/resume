# Resume · TikTok Tech Edition

This repository now focuses solely on Xinrou's TikTok-inspired interactive resume. The layout features a neon hero section, featured projects, an experience timeline, skill highlights, offered services, and contact channels—all rendered through a lightweight Vue app.

Welcome to Xinrou's homepage—I'm a former product manager and consultant sharing my journey here, so feel free to connect.

## Preview locally

No build step is required; a static file server is enough:

```bash
npx --yes serve -l 4173 .
# or
python -m http.server 4173
```

Then open http://localhost:4173 in your browser.

## Files
- `index.html`: Hosts the Vue root, section markup, and component shells.
- `tiktok.css`: Styles, layout primitives, and animation variables (glow effects, grid pulse, and button animation).
- `tiktok.js`: Vue app initialization, translation strings, hero typing logic, glow-card pointer tracking, and other micro-interactions.

## Customize
- Update localized copy in the `translations` object inside `tiktok.js`. Each locale key mirrors the strings referenced throughout the UI.
- Modify the hero typing sequence via `heroLineKeyMap` in `tiktok.js` if you need different line splits per language.
- Tweak palette, spacing, or animation speeds via the CSS variables declared at the top of `tiktok.css`.
- Swap imagery (e.g., `self portrait.png`) directly in `index.html`.

## Version control workflow
Use the following commands to stage, commit, and push future tweaks as you continue refining the copy or assets:

```bash
# one-time setup — point "origin" to your remote repository
git remote add origin <git-url>

# regular update loop
git status                   # review changes
git add <files>              # stage updates
git commit -m "feat: ..."    # create a descriptive commit
git push --set-upstream origin main   # publish to the main branch the first time
```

If the remote has already been configured, replace the last command with `git push` or `git push origin main`.

### Fast push helper

Once `origin` is configured, you can run `./push.sh` from the repository root to push the current branch. The script detects
whether an upstream already exists and automatically chooses between `git push origin <branch>` and `git push --set-upstream`.
This keeps your workflow down to a single command after each commit.
