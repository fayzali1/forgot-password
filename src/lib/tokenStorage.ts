export const tokens: Map<string, string> = new Map();

export function setToken(token: string, email: string) {
  tokens.set(token, email);
}

export function getEmail(token: string): string | undefined {
  return tokens.get(token);
}

export function deleteToken(token: string) {
  tokens.delete(token);
}
