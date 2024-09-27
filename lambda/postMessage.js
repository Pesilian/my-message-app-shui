import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const generateId = () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);
  return `${timestamp}-${randomNum}`;
};

const client = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(client);

export const handler = async event => {
  try {
    if (!event.body) {
      throw new Error('Request body is missing');
    }

    const { userName, text } = JSON.parse(event.body);

    if (!userName || !text) {
      throw new Error('userName or text is missing from the request body');
    }

    const id = generateId();

    const createdAt = new Date().toISOString();

    const params = {
      TableName: 'Messages',
      Item: {
        id: id,
        userName: userName,
        message: text,
        createdAt: createdAt,
      },
    };

    await dynamoDb.send(new PutCommand(params));

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({
        message: 'Your message has been posted.',
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'An error occurred.',
        error: error.message,
      }),
    };
  }
};
