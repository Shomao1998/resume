# Resume · TikTok Tech Edition

This repository now focuses solely on Xinrou's TikTok-inspired interactive resume. The layout features a neon hero section, featured projects, an experience timeline, skill highlights, offered services, and contact channels.

Welcome to Xinrou's homepage—I'm a former product manager and consultant sharing my journey here, so feel free to connect.

## Preview locally

```bash
npx serve .
# or open index.html directly in the browser
```

### Capture a fresh UI screenshot
If you need to share the latest render without pushing a build, start a quick static server and use your favorite headless browser tool to capture a full-page image. For example:

```bash
python -m http.server 3000
# then point Playwright/Puppeteer to http://localhost:3000 and take a full-page screenshot
```

## Files
- `index.html`: TikTok-styled hero with portrait rail, project introduction, experience journey, skill cards, services, and contact section.
- `tiktok.css` / `tiktok.js`: Styles and micro-interactions (glow effects, grid pulse, button animation) for the TikTok theme.

## Customize
- Update text content directly in `index.html`—copy is grouped by section for easier edits.
- Adjust palette or animation speeds via CSS variables declared at the top of `tiktok.css`.

## Azure OpenAI settings
The deployed chatbot is wired to the Azure OpenAI resource shown in your deployment snapshot:

- Endpoint: `https://personalsite-backend-openaiapi.cognitiveservices.azure.com`
- Deployment name: `gpt-4o-mini`
- API version: `2025-01-01-preview`
- API key: store the portal key as `AZURE_OPENAI_API_KEY` in your Static Web Apps configuration (do not commit it to the repo).

These values are also used as defaults by the Azure Function if no environment overrides are provided.

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

## 如何推送到 Git（Push to Git）
1. **配置远程仓库**：只需运行 `git remote add origin <你的仓库地址>`，把本地代码与 Git 仓库关联。
2. **确认分支**：使用 `git branch --show-current` 查看当前分支。如需新分支，可 `git checkout -b feature/resume-update`。
3. **提交改动**：执行 `git status` 查看更改，随后 `git add <文件>` 和 `git commit -m "描述信息"`。
4. **推送到远端**：首次推送分支时运行 `git push -u origin <分支名>`。之后同一分支仅需 `git push` 即可同步。

> 小提示：如果推送被拒绝，先 `git pull --rebase origin <分支名>` 同步远端最新提交，再重新 `git push`。
