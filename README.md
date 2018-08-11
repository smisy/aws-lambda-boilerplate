# AWS Lambda in TypeScript and MongoDB

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![Build Status](https://travis-ci.com/smisy/aws-lambda-boilerplate.svg?branch=master)](https://travis-ci.com/smisy/aws-lambda-boilerplate)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5abc44743daf4074ac8b1e8096b0e6ee)](https://www.codacy.com/app/thanhtruong0315/aws-lambda-boilerplate?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=smisy/aws-lambda-boilerplate&amp;utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/smisy/aws-lambda-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/smisy/aws-lambda-boilerplate?branch=master)
## Features

## Setup
```
npm install
```

### Run unit tests
```
npm test
```

### Build
```
npm run build
```

### Start on local
```
npm start
```

### Environment variable
`serverless` read env variables from env files. There 3 env files in project with 3 stages: local, development and production
```
env.local.yml
env.development.yml
env.production.yml
```

you should find the format file as below

##### env.local.yml
```
MONGODB_URL: mongodb://localhost:27017/aws-lambda
<variable name>: <value>
```

| npm scripts         | env                 |
|---------------------|---------------------|
| npm start           | env.local.yml       |
| npm run deploy      | env.development.yml |
| npm run deploy:prod | env.production.yml  |

### Deploy to aws lambda services

We need aws credential to deploy our aws-lambda functions to aws services.
#### NOTE:

update your `MONGODB_URI` at `env.development.yml` and `env.production.yml`

* Generate `aws_access_key_id` & `aws_secret_access_key` from your aws account
* Add aws credential to your local
  ```
  $ vim  ~/.aws/credentials

  [your profile]
  aws_access_key_id=XXXXXXXXXXXXXX
  aws_secret_access_key=XXXXXXXXXXXXXXXXXXX
  region=us-east-1
  ```
* Deploy in development: `AWS_PROFILE=<your profile> npm run deploy`
* Deploy in production: `AWS_PROFILE=<your profile>  npm run deploy:prod`
