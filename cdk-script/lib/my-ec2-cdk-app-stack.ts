import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { readFileSync } from 'fs';

export class MyEC2CdkAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a VPC for the EC2 instance
    const vpc = new ec2.Vpc(this, 'MyVpc', {
    //   maxAzs: 2, // Maximum availability zones
    });

    // Create an EC2 instance
    new ec2.Instance(this, 'MyEC2Instance', {
      vpc: vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MEDIUM),
      machineImage: ec2.MachineImage.latestWindows(
        ec2.WindowsVersion.WINDOWS_SERVER_2022_ENGLISH_FULL_BASE,
      ),
      userData: ec2.UserData.custom(readFileSync('userdata.ps1').toString()),
    });
  }
}
