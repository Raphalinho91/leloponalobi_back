export const config = {
  port: 6060,
  host: "127.0.0.1",
  env: process.env.NODE_ENV || "development",
};

export const mailChimpConfig = {
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
  audienceId: process.env.MAILCHIMP_AUDIENCE_ID,
};
