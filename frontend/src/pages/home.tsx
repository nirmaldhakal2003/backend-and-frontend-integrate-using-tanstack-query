import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

type UserForm = {
  name: string;
  email: string;
  password: string;
};
const Home = () => {
  const [form, setForm] = useState<UserForm>({
    name: "",
    email: "",
    password: "",
  });

  const mutation = useMutation({
    mutationFn: async (userData: UserForm) => {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      return response.json();
    },
    onSuccess: (data) => {
      alert("User created successfully!");
      console.log("Created user:", data);
    },
    onError: (error: string) => {
      alert("Error: " + error.toString());
    },
  });

  // 2. Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 3. Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Creating..." : "Create User"}
      </button>
    </form>
  );
};
export default Home;
