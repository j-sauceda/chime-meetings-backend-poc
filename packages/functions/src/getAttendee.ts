import { APIGatewayEvent, APIGatewayProxyHandler } from 'aws-lambda';
import ChimeService from '../../core/src/chime.service';
import logger from '../../core/src/logger';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
  try {
    const meetingId = event.queryStringParameters?.meetingId ?? '';
    const attendeeId = event.queryStringParameters?.attendeeId ?? '';
    logger.info(`Processing getAttendee with attendeeId: ${attendeeId} at meeting ${meetingId}`);
  
    const chime = new ChimeService();
    const data = await chime.getAttendee(meetingId, attendeeId);
    return {
      headers: { 'Content-Type': 'application/json', },
      statusCode: data.$metadata ? data.$metadata.httpStatusCode : '200',
      body: JSON.stringify({ ...data }),
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    logger.error('Error while getting attendee: ', error);
    return {
      headers: { 'Content-Type': 'application/json', },
      statusCode: error.$metadata ? error.$metadata.httpStatusCode : '400',
      body: JSON.stringify({...error}),
    };
  }
};
