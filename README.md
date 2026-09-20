# UserBlog

UserBlog is a server-rendered blogging application built with Node.js, Express, EJS, and MongoDB. It lets visitors browse users, blogs, and individual user blog pages through a simple web interface.

The application can run locally as an Express server or be deployed as a serverless application using AWS Lambda and API Gateway.

## Features

- Server-rendered pages with EJS
- User and blog data stored in MongoDB
- User listing and user-specific blog pages
- Blog listing and latest blog previews
- Static CSS assets served from `public/`
- AWS Lambda deployment through Serverless Framework

## Technology Stack

- Node.js with ES modules
- Express 5
- EJS templates
- MongoDB with Mongoose
- AWS Lambda
- Amazon API Gateway HTTP API
- Serverless Framework

## Project Structure

```text
user-blog-app/
├── app.js                 # Express application
├── handler.js             # AWS Lambda entry point
├── serverless.yml         # AWS Lambda configuration
├── config/db.js           # MongoDB connection
├── controllers/           # Application controllers
├── models/                # Mongoose models
├── routers/               # Web routes
├── seed/                  # Sample database seed script
├── public/                # CSS and static files
└── views/                 # EJS templates
```

## Requirements

Install the following before starting:

- Node.js 24 or a compatible modern Node.js version
- npm
- A MongoDB database, such as MongoDB Atlas
- An AWS account for deployment
- AWS CLI credentials configured locally

Check Node.js and npm:

```powershell
node --version
npm --version
```

## Run Locally

### 1. Clone the repository

```powershell
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
cd YOUR-REPOSITORY
```

Replace the repository URL with this project's GitHub URL.

### 2. Install dependencies

```powershell
npm install
```

### 3. Create the environment file

Create a file named `.env` in the project root:

```env
PORT=5000
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/userblog?retryWrites=true&w=majority
```

Do not commit `.env` or publish your MongoDB password. Add `.env` to `.gitignore` if it is not already ignored.

### 4. Seed sample data

```powershell
npm run seed
```

### 5. Start the application

```powershell
npm run dev
```

Open [http://localhost:5000](http://localhost:5000).

Available pages include:

- `/` - Home page
- `/users` - All users
- `/blogs` - All blogs
- `/about` - About page
- `/user/:username/blogs` - Blogs for one user

## Deploy to AWS Lambda

This project uses Serverless Framework to package the complete application and deploy it to AWS Lambda behind API Gateway.

### 1. Configure AWS credentials

Install and configure the AWS CLI:

```powershell
aws configure
```

Provide an AWS Access Key ID, Secret Access Key, default region, and output format when prompted. The AWS identity must have permission to create and update Lambda, API Gateway, IAM, CloudFormation, and CloudWatch resources.

Verify the credentials:

```powershell
aws sts get-caller-identity
```

### 2. Install project dependencies

Run this from the project root, where `serverless.yml` is located:

```powershell
npm install
```

### 3. Configure MongoDB for deployment

Keep the MongoDB connection string in the root `.env` file:

```env
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/userblog?retryWrites=true&w=majority
```

The `MONGO_URI` value is referenced by `serverless.yml` and supplied to the Lambda function as an environment variable during deployment.

For production applications, use AWS Secrets Manager or AWS Systems Manager Parameter Store instead of storing database credentials in a local deployment environment.

### 4. Deploy from the project root

```powershell
cd path\to\user-blog-app
npm run deploy
```

Do not deploy from an old template or subfolder. The root directory must contain:

- `serverless.yml`
- `handler.js`
- `app.js`
- `package.json`
- `views/`
- `public/`

Serverless Framework will package these files and deploy the `api` Lambda function.

### 5. Find the API URL

After deployment, Serverless Framework prints an API Gateway endpoint similar to:

```text
endpoints:
  ANY - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/{proxy+}
  ANY - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/
```

Open the root endpoint in a browser:

```text
https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/
```

You can also retrieve the endpoint later with:

```powershell
npx serverless info --stage dev --region us-east-1
```

### 6. Test the deployed application

```powershell
Invoke-WebRequest `
  -Uri "https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/" `
  -UseBasicParsing
```

A successful response should have status code `200` and contain the UserBlog HTML page.

## Useful Commands

```powershell
npm run dev       # Start the local Express server
npm run seed      # Insert sample users and blogs
npm run deploy    # Deploy the root service to AWS
npx serverless package  # Build the deployment package without deploying
npx serverless info     # Show deployed service information
```

## Troubleshooting

### Internal Server Error from API Gateway

Check these items:

1. Deploy from the project root, not from `serverless-folder` or another subfolder.
2. Confirm that `MONGO_URI` is available during deployment.
3. Confirm that the MongoDB Atlas network access rules allow connections from AWS Lambda.
4. Check the Lambda logs:

```powershell
npx serverless logs --function api --stage dev --region us-east-1
```

### MongoDB connection failure

Verify the connection string, database user, password, and MongoDB Atlas network access settings. Passwords containing special characters may need URL encoding.

### Old endpoint still shows an error

An API Gateway URL belongs to a specific deployed service. A URL from an earlier `serverless-test` deployment will not automatically use the root application. Use the endpoint printed by the root deployment.

### Remove the AWS service

To remove the root deployment and its AWS resources:

```powershell
npx serverless remove --stage dev --region us-east-1
```

Use this command carefully because it deletes the deployed AWS resources for this service.

## License

This project is available under the license included in the repository.
