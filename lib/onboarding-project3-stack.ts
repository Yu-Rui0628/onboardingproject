import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda'; 


export class OnboardingProject3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


       new lambda.Function(this, 'OnboardingProjectLambda', {
        runtime: lambda.Runtime.NODEJS_20_X,
        code: lambda.Code.fromAsset('lambda'), 
        handler: 'OnboardingProject.handler', 
       
      });
  }
}
