import { z } from "zod";
import { BaseError } from "../middleware/error-handler";
import { StatusCodes } from "http-status-codes";

const numFromString = z.string().transform((val) => {
  const num = Number(val);
  if (isNaN(num)) {
    throw new BaseError({
      message: "Invalid number",
      type: "client",
      status: StatusCodes.BAD_REQUEST,
    });
  }
  return num;
});

export const getNumFromString = (numAsString: string) => {
  const parsed = numFromString.safeParse(numAsString);
  if (parsed.success) {
    return parsed.data;
  } else {
    throw new BaseError({
      message: "Invalid number",
      type: "client",
      status: StatusCodes.BAD_REQUEST,
    });
  }
};
