import { z } from "zod";

export const SubscribeSchema = z.object({
  email: z.string().email("Adresse email invalide"),
});
