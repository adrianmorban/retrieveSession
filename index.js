import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ 
    region: "us-east-1",
});

const ddbDocClient = DynamoDBDocumentClient.from(client);

const retrieveSession = async (event) => {
    const { message } = event;
    const { from } = message;
    let sessionID = from.id;
    sessionID = sessionID.toString();
    const command = new GetCommand({
        TableName: "sallySessions",
        Key: {
            sessionID: sessionID,
        }
    });
    const response = await ddbDocClient.send(command);
    return response.Item;
}

export { retrieveSession }