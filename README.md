# Resume · TikTok Tech Edition

This repository now focuses solely on Xinrou's TikTok-inspired interactive resume. The layout features a neon hero section, featured projects, an experience timeline, skill highlights, offered services, and contact channels.

Welcome to Xinrou's homepage—I'm a former product manager and consultant sharing my journey here, so feel free to connect.

## Preview locally

```bash
npx serve .
# or open index.html directly in the browser
```

## Files
- `index.html`: TikTok-styled hero with portrait rail, project introduction, experience journey, skill cards, services, and contact section.
- `tiktok.css` / `tiktok.js`: Styles and micro-interactions (glow effects, grid pulse, button animation) for the TikTok theme.

## Customize
- Update text content directly in `index.html`—copy is grouped by section for easier edits.
- Adjust palette or animation speeds via CSS variables declared at the top of `tiktok.css`.

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
