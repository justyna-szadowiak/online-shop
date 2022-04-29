export interface Environment {
  production: boolean;
  apiUrl: string;
  cookieKey: string;
}

export const environment: Environment = {
  production: true,
  apiUrl: '',
  cookieKey: 'th'
};

