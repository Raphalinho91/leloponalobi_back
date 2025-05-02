export const config = {
  port: Number(process.env.NODE_PORT) || 6060,
  host: process.env.NODE_HOST || "0.0.0.0",
  env: process.env.NODE_ENV || "development",
};

export const mailChimpConfig = {
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
  audienceId: process.env.MAILCHIMP_AUDIENCE_ID,
};
