import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(client);

export const handler = async event => {
  try {
    if (!event.body) {
      throw new Error('Request body is missing');
    }

    const { id, userName, text } = JSON.parse(event.body);

    if (!id || !text) {
      throw new Error('id, or text is missing from the request body');
    }

    const updatedAt = new Date().toISOString();

    const params = {
      TableName: 'Messages',
      Key: { id: id },
      UpdateExpression: 'SET  message = :text, updatedAt = :updatedAt',
      ExpressionAttributeValues: {
        ':userName': userName,
        ':text': text,
        ':updatedAt': updatedAt,
      },
      ReturnValues: 'ALL_NEW',
    };

    const result = await dynamoDb.send(new UpdateCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Message updated successfully',
        updatedItem: result.Attributes,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'An error occurred while updating the message.',
        error: error.message,
      }),
    };
  }
};
