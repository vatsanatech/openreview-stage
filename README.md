# OpenReview (OpenRouter Edition)

AI-powered code review bot using **OpenRouter + DeepSeek** instead of Anthropic Claude.

Forked from [vercel-labs/openreview](https://github.com/vercel-labs/openreview).

> **Note**: This fork uses OpenRouter API with DeepSeek as the default model for cost-effective code reviews.

## Changes from Original

- Uses **OpenRouter API** instead of Anthropic
- Default model: **DeepSeek Chat** (cheap and good for code review)
- Can easily switch to other models (Claude, GPT-4, Gemini, Llama)

## Features

- **On-demand reviews** - Mention `@openreview` in any PR comment to trigger a review
- **Sandboxed execution** - Runs in isolated Vercel Sandbox with full repo access
- **Inline suggestions** - Posts line-level comments with GitHub suggestion blocks
- **Code changes** - Can fix formatting, lint errors, and simple bugs directly
- **Reactions** - React with thumbs up to approve, thumbs down to skip
- **Extensible skills** - Supports custom skills via `.agents/skills/`

## Setup

### 1. Deploy to Vercel

Push this repo to your GitHub, then deploy to Vercel:

```bash
# Push to your GitHub
cd openreview-stage
git init
git add .
git commit -m "Initial commit: OpenReview with OpenRouter"
git remote add origin https://github.com/YOUR_USERNAME/openreview-stage.git
git push -u origin main
```

Then go to [vercel.com/new](https://vercel.com/new) and import this repo.

### 2. Create GitHub App

Go to [GitHub Settings > Developer Settings > GitHub Apps](https://github.com/settings/apps/new)

**Settings:**
- **App name**: `OpenReview-YourOrg`
- **Homepage URL**: Your Vercel deployment URL
- **Webhook URL**: `https://YOUR_DEPLOYMENT.vercel.app/api/webhooks`
- **Webhook secret**: Generate a strong secret (save it!)

**Repository Permissions:**
- Contents: Read & write
- Issues: Read & write
- Pull requests: Read & write
- Metadata: Read-only

**Subscribe to Events:**
- Issue comment
- Pull request review comment

After creation:
1. Note the **App ID** (shown at top of settings)
2. Generate a **Private Key** (download .pem file)
3. Install on your target repositories
4. Note the **Installation ID** from URL: `github.com/settings/installations/[ID]`

### 3. Configure Environment Variables

In Vercel project > Settings > Environment Variables, add:

| Variable | Description |
|----------|-------------|
| `OPENROUTER_API_KEY` | Your OpenRouter API key |
| `GITHUB_APP_ID` | GitHub App ID |
| `GITHUB_APP_INSTALLATION_ID` | Installation ID |
| `GITHUB_APP_PRIVATE_KEY` | Contents of .pem file (replace newlines with `\n`) |
| `GITHUB_APP_WEBHOOK_SECRET` | Your webhook secret |

### 4. Use It

Comment `@openreview` on any PR:

```
@openreview please review this PR
@openreview check for security issues
@openreview run linter and fix issues
```

## Changing Models

Edit `lib/openrouter.ts` to use a different model:

```typescript
// Default: DeepSeek (cheap, good for code)
export const DEFAULT_MODEL = "deepseek/deepseek-chat";

// Alternatives:
// "anthropic/claude-3.5-sonnet" - Best quality
// "openai/gpt-4o" - Good balance
// "google/gemini-pro-1.5" - Long context
// "meta-llama/llama-3.1-70b-instruct" - Open source
```

## Cost Comparison (via OpenRouter)

| Model | Input | Output |
|-------|-------|--------|
| DeepSeek Chat | $0.14/MTok | $0.28/MTok |
| Claude 3.5 Sonnet | $3/MTok | $15/MTok |
| GPT-4o | $2.5/MTok | $10/MTok |
| Llama 3.1 70B | $0.52/MTok | $0.75/MTok |

## Custom Skills

Add project-specific review rules in `.agents/skills/`:

```
.agents/skills/
└── my-project/
    └── SKILL.md
```

```markdown
---
name: my-project
description: Review rules for my specific project
---

# My Project Review Rules

Your custom review instructions...
```

## Tech Stack

- Next.js 16 - App framework
- Vercel Workflow - Durable execution
- Vercel Sandbox - Isolated code execution
- AI SDK + OpenRouter - AI model integration
- Octokit - GitHub API client

## License

MIT
