import bcrypt from "bcryptjs";
export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, 10); //10 here is salt rounds, which is used to increase the security of hashed password
  return hashedPassword;
}

export async function comparePassword(
  hashedText: string,
  plainText: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(plainText, hashedText);
  return isMatch;
}
