import { APIGatewayEvent, APIGatewayProxyHandler } from 'aws-lambda';
import ChimeService from '../../core/src/chime.service';
import logger from '../../core/src/logger';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
  try {
    const { meetingId, attendeeId } = typeof event.body === 'string' ? JSON.parse(event.body || '{}') : event.body;
    logger.info(`Processing request to delete attendeeId: ${attendeeId} from meetingId: ${meetingId}`);
  
    const chime = new ChimeService();
    const data = await chime.deleteAttendee(meetingId, attendeeId);
    return {
      headers: { 'Content-Type': 'application/json', },
      statusCode: data.$metadata ? data.$metadata.httpStatusCode : '200',
      body: JSON.stringify({ ...data }),
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    logger.error('Error while deleting attendee', error);
    return {
      headers: { 'Content-Type': 'application/json', },
      statusCode: error.$metadata ? error.$metadata.httpStatusCode : '204',
      body: JSON.stringify({error}),
    };
  }
};
