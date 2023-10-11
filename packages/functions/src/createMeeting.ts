import { APIGatewayEvent, APIGatewayProxyHandler } from 'aws-lambda';
import ChimeService from '../../core/src/chime.service';
import logger from '../../core/src/logger';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
  try {
    const { clientToken, mediaRegion } = typeof event.body === 'string' ? JSON.parse(event.body || '{}') : event.body;
    logger.info(`Processing request to create chime meeting with clientToken: ${clientToken}`);
  
    const chime = new ChimeService();
    const data = await chime.createMeeting(clientToken, mediaRegion);
    return {
      headers: { 'Content-Type': 'application/json', },
      statusCode: data.$metadata ? data.$metadata.httpStatusCode : '200',
      body: JSON.stringify({ ...data }),
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    logger.error('Error while creating meeting: ', error);
    return {
      headers: { 'Content-Type': 'application/json', },
      statusCode: error.$metadata ? error.$metadata.httpStatusCode : '400',
      body: JSON.stringify({error}),
    };
  }
};
