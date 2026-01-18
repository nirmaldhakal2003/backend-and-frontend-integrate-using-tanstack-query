import { useMutation, useQuery } from "@tanstack/react-query";
import { createUsers, getUsers } from "../api/users";

export function useCreateUser() {
  return useMutation({
    mutationFn: createUsers,
  });
}

export function useGetAllUsers(page: number = 1, perPage: number = 10) {
  return useQuery({
    queryKey: ["users", page, perPage],
    queryFn: () => getUsers(page, perPage),
    enabled: false,
  });
}
