import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export const handler = async (event, context) => {
  try {
    const result = await db.scan({
      TableName: 'messages',
    });
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
    return console.error(error);
  }
};
