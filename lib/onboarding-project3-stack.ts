import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class OnboardingProject3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    new NodejsFunction(this, 'OnboardingProjectLambda', {
      runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,
      entry: 'lambda/OnboardingProject.ts',  
      handler: 'handler',
    });

    // new lambdaNodeJs.NodejsFunction(this, 'OnboardingProjectLambda', {
    //   runtime: lambda.Runtime.NODEJS_20_X, 
    //   entry: 'path/to/OnboardingProject.ts', 
    //   handler: 'handler', 
    // });
  }
}


  //   new lambda.Function(this, 'MyFunction', {
  //     runtime: lambda.Runtime.NODEJS_20_X,
  //     handler: 'OnboardingProject.handler',
  //     code: lambda.Code.fromAsset("../lambda"),
  //  });