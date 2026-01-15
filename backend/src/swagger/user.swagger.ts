export const userPaths = {
  "/users": {
    post: {
      tags: ["Users"],
      summary: "Create a new user",
      description: "Create a user with name and email",

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "email"],
              properties: {
                name: {
                  type: "string",
                  example: "Nirmal Dhakal",
                },
                email: {
                  type: "string",
                  example: "nirmal@gmail.com",
                },
              },
            },
          },
        },
      },

      responses: {
        201: {
          description: "User created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                  email: { type: "string" },
                },
              },
            },
          },
        },

        400: {
          description: "Invalid input",
        },
      },
    },
  },
};
