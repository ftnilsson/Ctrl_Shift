#!/bin/bash
set -e

echo "Building the Next.js application..."
cd frontend
npm run build

# Check if Next.js export command exists
if grep -q '"export"' package.json; then
  npm run export
else
  # For Next.js 12+, export is part of the build command with an output flag
  npm run build -- -o out
fi

cd ..

echo "Deploying SAM template..."
cd AWS
sam build
sam deploy

# Get the S3 bucket name from SAM outputs
BUCKET_NAME=$(aws cloudformation describe-stacks --stack-name ctrl-shift-frontend --query "Stacks[0].Outputs[?OutputKey=='S3BucketName'].OutputValue" --output text)

echo "S3 Bucket Name: $BUCKET_NAME"

echo "Uploading build artifacts to S3..."
cd ..
aws s3 sync frontend/out/ s3://$BUCKET_NAME/ --delete

WEBSITE_URL=$(aws cloudformation describe-stacks --stack-name ctrl-shift-frontend --query "Stacks[0].Outputs[?OutputKey=='WebsiteURL'].OutputValue" --output text)

echo "Deployment complete!"
echo "Website URL: $WEBSITE_URL"
