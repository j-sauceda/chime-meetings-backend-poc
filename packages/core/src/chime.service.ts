import {
  ChimeSDKMeetingsClient,
  CreateAttendeeCommand,
  CreateMeetingCommand,
  DeleteAttendeeCommand,
  DeleteMeetingCommand,
  GetAttendeeCommand,
  GetMeetingCommand,
  ListAttendeesCommand,
} from '@aws-sdk/client-chime-sdk-meetings';
import { v4 as uuid } from 'uuid';

export default class ChimeService {
  private chime: ChimeSDKMeetingsClient;

  constructor() {
    const config = {
      region: 'us-east-1',
    };
    this.chime = new ChimeSDKMeetingsClient(config);
  }

  public async createAttendee(meetingId: string) {
    const params = {
      ExternalUserId: uuid(),
      MeetingId: meetingId,
    };
    const command = new CreateAttendeeCommand(params);
    return this.chime.send(command);
  }

  public async createMeeting(clientToken: string, mediaRegion: string) {
    const params = {
      ClientRequestToken: clientToken,
      ExternalMeetingId: clientToken,
      MediaRegion: mediaRegion,
    };
    const command = new CreateMeetingCommand(params);
    return this.chime.send(command);
  }

  public async deleteAttendee(meetingId: string, attendeeId: string) {
    const params = {
      MeetingId: meetingId,
      AttendeeId: attendeeId,
    };
    const command = new DeleteAttendeeCommand(params);
    return this.chime.send(command);
  }

  public async deleteMeeting(meetingId: string) {
    const params = {
      MeetingId: meetingId,
    };
    const command = new DeleteMeetingCommand(params);
    return this.chime.send(command);
  }

  public async getAttendee(meetingId: string, attendeeId: string) {
    const params = {
      MeetingId: meetingId,
      AttendeeId: attendeeId,
    };
    const command = new GetAttendeeCommand(params);
    return this.chime.send(command);
  }

  public async getMeeting(meetingId: string) {
    const params = {
      MeetingId: meetingId,
    };
    const command = new GetMeetingCommand(params);
    return this.chime.send(command);
  }

  public async listAttendees(meetingId: string) {
    const params = {
      MeetingId: meetingId,
    };
    const command = new ListAttendeesCommand(params);
    return this.chime.send(command);
  }
}
