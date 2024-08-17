import { StatusCodes } from "http-status-codes";
import CustomError from "./customError.js";

class UnAuthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export default UnAuthorizedError;
