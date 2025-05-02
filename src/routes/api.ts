import { FastifyPluginAsync } from "fastify";
import { SubscribeSchema } from "../zod/zod";
import { mailChimpConfig } from "../config";
import { SubscribeSchemaFastify } from "../schemas/schemas";
import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: mailChimpConfig.apiKey,
  server: mailChimpConfig.server,
});

const apiRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post(
    "/subscribe",
    { schema: SubscribeSchemaFastify },
    async (request, reply) => {
      const parse = SubscribeSchema.safeParse(request.body);

      if (!parse.success) {
        return reply.status(400).send({
          success: false,
          message: parse.error.flatten(),
        });
      }

      const { email } = parse.data;

      try {
        await mailchimp.lists.addListMember(mailChimpConfig.audienceId!, {
          email_address: email,
          status: "subscribed",
        });

        return reply
          .status(200)
          .send({ success: true, message: "Inscription réussie !" });
      } catch (err: any) {
        const detail = err?.response?.body?.detail || "";
        if (detail.includes("is already a list member")) {
          return reply.status(200).send({
            success: true,
            message: "Cet email est déjà inscrit !",
          });
        }

        return reply.status(500).send({
          success: false,
          message: detail || "Erreur Mailchimp !",
        });
      }
    }
  );
};

export default apiRoutes;
