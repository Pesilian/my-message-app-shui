import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

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
      const sortedMessages = result.Items.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      const formattedMessages = sortedMessages.map(item => {
        const date = new Date(item.createdAt);
        const formattedDate = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(
          date.getHours()
        ).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        return { ...item, createdAt: formattedDate };
      });

      const response = {
        statusCode: 200,
        body: JSON.stringify({ message: formattedMessages }),
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
