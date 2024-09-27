import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  UpdateCommand,
  GetCommand,
} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(client);

export const handler = async event => {
  try {
    if (!event.body) {
      throw new Error('Request body is missing');
    }

    const { id, userName, text } = JSON.parse(event.body);

    if (!id || !text) {
      throw new Error('id or text is missing from the request body');
    }

    const getParams = {
      TableName: 'Messages',
      Key: { id: id },
    };

    const getResult = await dynamoDb.send(new GetCommand(getParams));

    if (!getResult.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: `Message with id ${id} not found`,
        }),
      };
    }

    const updatedAt = new Date().toISOString();

    const updateParams = {
      TableName: 'Messages',
      Key: { id: id },
      UpdateExpression: 'SET message = :text, updatedAt = :updatedAt',
      ExpressionAttributeValues: {
        ':text': text,
        ':updatedAt': updatedAt,
      },
      ReturnValues: 'ALL_NEW',
    };

    const updateResult = await dynamoDb.send(new UpdateCommand(updateParams));

    return {
      statusCode: 200,
      body: JSON.stringify({
        updatedItem: updateResult.Attributes,
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
