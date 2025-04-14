import { RegisterInput } from "../types/auth.types.js";

export async function createUser(data: RegisterInput) {
  const { name, email, password } = data;

  const newUser = {
    id: Date.now(),
    name,
    email,
    password, // In a real application, we should hash the password
  };

  // Simulate saving the user to a database
  return newUser;
}
