# Ctrl+Shift

A free, self-hosted, open-source shift scheduler application for managing on-call rotations.

## Our Commitment

**Ctrl+Shift will remain free forever.** Unlike other services that start free and later introduce paid tiers or restrict features, we guarantee there will be no "rug pull" where this becomes a paid service.

### Core Values

- **Free Forever**: All features will always remain free
- **Open Source**: Community-driven development
- **Self-Hosted**: You own your data and infrastructure
- **Support-Focused**: Customer care is a product team's highest priority

## Community

We believe that support and customer care are the most important parts of building software. We encourage you to:

- **Fork**: Make it your own
- **Contribute**: Help make this tool better for everyone
- **Share**: Spread the word about truly free on-call management

## Project Structure

- `frontend/`: Next.js frontend application
- `AWS/`: AWS deployment configuration using SAM (Serverless Application Model)

## Deployment

### AWS S3 Deployment

The frontend can be deployed to AWS S3 as a static website. For detailed instructions, see [AWS Deployment README](./AWS/README.md).

The deployment is automated using GitHub Actions. The workflow file is located at `.github/workflows/deploy-frontend-aws.yml`.

## Contributing

We welcome contributions from everyone! Here's how you can help make Ctrl+Shift better:

1. **Report issues**: Let us know about bugs or suggest new features
2. **Submit pull requests**: Fix bugs, add features, or improve documentation
3. **Share feedback**: Help us understand how to make Ctrl+Shift work better for you
4. **Spread the word**: Tell others about this free alternative to paid on-call management tools

### Development Setup

1. Clone the repository
2. Install dependencies: `cd frontend && npm install`
3. Start the development server: `npm run dev`
4. Visit `http://localhost:3000` to see your local version

## License

Ctrl+Shift is released under the MIT License, ensuring it remains free and open source forever.
