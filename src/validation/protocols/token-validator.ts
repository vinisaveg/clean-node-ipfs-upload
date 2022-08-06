export interface TokenValidator {
  isValid: (token: string) => boolean;
}
