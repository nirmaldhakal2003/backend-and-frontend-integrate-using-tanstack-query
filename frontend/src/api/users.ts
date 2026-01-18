import { apiClient } from "./client";

export async function createUsers(data: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await apiClient.POST("/users", {
    body: data,
  });
  if (response.error) {
    throw new Error(
      typeof response.error === "string" ? response.error : "An error occurred",
    );
  }
  return response.data;
}

export async function getUsers(page: number = 1, perPage: number = 10) {
  const { data, error } = await apiClient.GET("/users", {
    params: {
      query: {
        page: Number(page),
        perPage: Number(perPage),
      },
    },
  });
  if (error) {
    throw new Error(`Failed to fetch users`);
  }

  return data?.users ?? [];
}
