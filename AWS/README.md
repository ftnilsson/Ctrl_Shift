# Frontend Deployment with AWS SAM (AWS Folder)

This document provides instructions on how to deploy the Ctrl+Shift frontend to AWS S3 using the AWS Serverless Application Model (SAM).

## Prerequisites

- AWS CLI installed and configured
- AWS SAM CLI installed
- Node.js and npm installed
- GitHub repository set up with GitHub Actions

## Local Deployment

1. Build the Next.js application:
   ```
   cd frontend
   npm run build
   ```

2. Deploy using SAM:
   ```
   cd AWS
   sam build
   sam deploy
   ```

3. Get the S3 bucket name:
   ```
   aws cloudformation describe-stacks --stack-name ctrl-shift-frontend --query "Stacks[0].Outputs[?OutputKey=='S3BucketName'].OutputValue" --output text
   ```

4. Upload the build artifacts to S3:
   ```
   aws s3 sync frontend/out/ s3://BUCKET_NAME/ --delete
   ```

5. Get the website URL:
   ```
   aws cloudformation describe-stacks --stack-name ctrl-shift-frontend --query "Stacks[0].Outputs[?OutputKey=='WebsiteURL'].OutputValue" --output text
   ```

## Automated Deployment with GitHub Actions

The project is configured with GitHub Actions for CI/CD. The workflow will automatically deploy the frontend to AWS S3 when changes are pushed to the main branch.

### GitHub Actions Configuration

The GitHub Actions workflow defined in `.github/workflows/deploy-frontend.yml` performs the following:

1. Builds the Next.js application
2. Deploys the SAM template
3. Uploads the build artifacts to the S3 bucket created by the SAM template

### Required GitHub Secrets

To use GitHub Actions for deployment, set up the following GitHub secret in your repository settings (Settings > Secrets and variables > Actions):

- `AWS_ROLE_TO_ASSUME`: ARN of an IAM role with permissions to deploy SAM templates and upload to S3

For example: `arn:aws:iam::123456789012:role/GitHubActionsRole`

#### Setting up the IAM Role:

1. Create an IAM role in your AWS account with permissions for:
   - CloudFormation (to deploy the SAM template)
   - S3 (to upload files)
   - IAM (to create roles and policies)

2. Configure trust relationship for the role to allow GitHub Actions to assume it:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:your-username/your-repo:*"
        }
      }
    }
  ]
}
```

3. Set up OIDC provider in IAM for GitHub Actions
   - Provider URL: `token.actions.githubusercontent.com`
   - Audience: `sts.amazonaws.com`

## SAM Template

The SAM template (`template.yaml`) defines:

1. An S3 bucket configured for website hosting
2. A bucket policy that allows public read access
3. Outputs for the S3 bucket name and website URL

## Customizing the Deployment

To customize the deployment, modify the following files:

- `AWS/samconfig.toml`: SAM CLI configuration
- `AWS/template.yaml`: SAM template
- `.github/workflows/deploy-frontend-aws.yml`: GitHub Actions workflow
- `frontend/next.config.ts`: Next.js configuration for static export

## Troubleshooting

If you encounter any issues during deployment, check:

1. AWS CloudFormation console for stack creation errors
2. GitHub Actions logs for workflow execution errors
3. Next.js build logs for any compilation errors
