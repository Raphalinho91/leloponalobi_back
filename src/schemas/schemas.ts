export const SubscribeSchemaFastify = {
  tags: ["Subscription"],
  summary: "Ajoute une adresse email à Mailchimp",
  description:
    "Cette route permet d'ajouter une adresse email valide à une liste Mailchimp.",
  body: {
    type: "object",
    required: ["email"],
    properties: {
      email: {
        type: "string",
        format: "email",
        description: "Adresse email à inscrire",
      },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
      },
    },
    400: {
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
    500: {
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
  },
};
