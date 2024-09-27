import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

// Initiera DynamoDBClient och DynamoDBDocumentClient
const dbClient = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(dbClient);

export const handler = async (event, context) => {
  try {
    const result = await db.send(
      new ScanCommand({
        TableName: 'Messages',
      })
    );

    if (result.Items.length === 0) {
      const response = {
        statusCode: 200,
        body: JSON.stringify({ message: 'There are no messages.' }),
      };
      return response;
    } else {
      const response = {
        statusCode: 200,
        body: JSON.stringify({ message: result.Items }),
      };
      return response;
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'An error occurred while fetching messages.',
      }),
    };
  }
};
