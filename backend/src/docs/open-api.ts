import { generateOpenApi } from "@ts-rest/open-api";
import { contract } from "../contracts/contract";

export const openApiDocument = generateOpenApi(contract, {
  info: {
    title: "Nirmal API",
    version: "1.0.0",
  },
  security: [{ bearerAuth: [] }],
  components: {
    securitySchemes: {
      customHeaderAuth: {
        type: "apiKey",
        in: "header",
        name: "x-access-token",
        description: "Access token",
      },
    },
  },
});
