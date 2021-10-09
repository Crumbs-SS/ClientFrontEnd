import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const region = "us-east-1";
const client = new SecretsManagerClient({region});

const command = new GetSecretValueCommand({ SecretId="dev/crumbs/alb/dns" });
const response = await client.send(command);

console.log(response.SecretString)