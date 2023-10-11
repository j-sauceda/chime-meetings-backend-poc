import { Api, StackContext } from "sst/constructs";

export function ApiStack({ stack }: StackContext) {
  // Create the API
  const api = new Api(stack, "Api", {
    cors: {
      allowHeaders: ["Content-Type"],
      allowMethods: ["GET", "POST", "DELETE"],
      allowOrigins: [
        "http://localhost:4173",
        "http://localhost:5173",
      ],
    },
    defaults: {
      function: {
        permissions: [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
          "logs:TagResource",
          "xray:PutTraceSegments",
          "xray:PutTelemetryRecords",
        ],
        runtime: "nodejs18.x",
      },
    },
    routes: {
      "POST /createAttendee": {
        function: {
          handler: "packages/functions/src/createAttendee.handler",
          permissions: ["chime:CreateAttendee"],
        },
      },
      "POST /createMeeting": {
        function: {
          handler: "packages/functions/src/createMeeting.handler",
          permissions: ["chime:CreateMeeting"],
        },
      },
      "GET /getAttendee": {
        function: {
          handler: "packages/functions/src/getAttendee.handler",
          permissions: ["chime:GetAttendee"],
        },
      },
      "GET /getMeeting/{meetingId}": {
        function: {
          handler: "packages/functions/src/getMeeting.handler",
          permissions: ["chime:GetMeeting"],
        },
      },
      "GET /listAttendees/{meetingId}": {
        function: {
          handler: "packages/functions/src/listAttendees.handler",
          permissions: ["chime:ListAttendees"],
        },
      },
      "DELETE /deleteAttendee": {
        function: {
          handler: "packages/functions/src/deleteAttendee.handler",
          permissions: ["chime:DeleteAttendee"],
        },
      },
      "DELETE /deleteMeeting/{meetingId}": {
        function: {
          handler: "packages/functions/src/deleteMeeting.handler",
          permissions: ["chime:DeleteMeeting"],
        },
      },
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({ ApiEndpoint: api.url });

  // Return the API resource
  return { api };
}
