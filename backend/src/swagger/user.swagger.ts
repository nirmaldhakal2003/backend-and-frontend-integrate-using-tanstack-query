export const userPaths = {
  "/users": {
    post: {
      tags: ["Users"],
      summary: "Create a new user",
      description: "Create a user with name, email, and password",

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "email", "password"],
              properties: {
                name: {
                  type: "string",
                  example: "Nirmal Dhakal",
                },
                email: {
                  type: "string",
                  example: "nirmal@gmail.com",
                },
                password: {
                  type: "string",
                  example: "securePassword123",
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

    get: {
      tags: ["Users"],
      summary: "Get all users with pagination",
      description: "Retrieve a list of users with pagination support",

      parameters: [
        {
          name: "page",
          in: "query",
          description: "Page number for pagination",
          required: false,
          schema: {
            type: "integer",
            default: 1,
          },
        },
        {
          name: "perPage",
          in: "query",
          description: "Number of users per page",
          required: false,
          schema: {
            type: "integer",
            default: 10,
          },
        },
        {
          name: "name",
          in: "query",
          description: "Filter users by name",
          required: false,
          schema: {
            type: "string",
          },
        },
      ],

      responses: {
        200: {
          description: "A list of users",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  users: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        email: { type: "string" },
                      },
                    },
                  },
                  totalUsers: { type: "integer" },
                },
              },
            },
          },
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
  },
};
