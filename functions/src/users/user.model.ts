export interface User {
  email: string;
  timeular?: {
    apiKey: string;
    apiSecret: string;
  };
  runn?: {
    personId?: string;
    roleId?: string;
  };
  projectsMapping?: Record<string, string>;
}
