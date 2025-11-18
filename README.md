# Resume · Notion Minimal & TikTok Light

Single repository hosts two static personal landing pages: a Notion-inspired minimal profile and a bright TikTok-tech vibe homepage tailored for Xinrou.

## Preview locally

```bash
npx serve .
# or open index.html / tiktok.html directly in the browser
```

## Files
- `index.html` / `style.css` / `script.js`: Notion-like layout with hero, abilities, timeline, project highlights, and contact CTA plus theme toggle.
- `tiktok.html` / `tiktok.css` / `tiktok.js`: TikTok-styled hero with portrait rail, project introduction, experience journey, skill cards, services, and contact section.

## Customize
- Update text content directly in each HTML file—copy is grouped by section for easier edits.
- Replace the hero portrait placeholder inside `.hero-media` with a `<img>` tag pointing to your image.
- Adjust palette or animation speeds via CSS variables declared at the top of each stylesheet.

## Version control workflow
Use the following commands to stage, commit, and push future tweaks as you continue refining the copy or assets:

```bash
# one-time setup — point "origin" to your remote repository
git remote add origin <git-url>

# regular update loop
git status                   # review changes
git add <files>              # stage updates
git commit -m "feat: ..."    # create a descriptive commit
git push --set-upstream origin work   # publish to the current branch
```

If the remote has already been configured, replace the last command with `git push` or `git push origin work`.
