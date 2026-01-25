<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally and deploy it to GitHub Pages.

View your app in AI Studio: https://ai.studio/apps/drive/1kDo_MoucT9N5twQSlc2eYcO_0vyhS_FI

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment

1. Push your changes to the `main` branch
2. GitHub Actions will automatically build and deploy your app
3. Your app will be available at: `https://[username].github.io/git-rebase-+-merge-workflow-pro/`

### Manual Deployment

You can also deploy manually using:

```bash
npm run deploy
```

### Setup Requirements

1. **Enable GitHub Pages**: Go to your repository Settings → Pages → Source: "GitHub Actions"
2. **Add API Key**: Go to Settings → Secrets and variables → Actions → Add `GEMINI_API_KEY` secret
3. **Repository Name**: Make sure your repository name matches the base path in `vite.config.ts`
