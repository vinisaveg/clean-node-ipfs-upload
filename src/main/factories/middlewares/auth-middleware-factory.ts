import { AuthMiddleware } from "../../../presentation/middlewares/auth/auth-middleware";
import { makeTokenValidation } from "../validation/token-validation-factory";

export const makeAuthMiddleware = (): AuthMiddleware => {
  const tokenValidation = makeTokenValidation();
  return new AuthMiddleware(tokenValidation);
};
