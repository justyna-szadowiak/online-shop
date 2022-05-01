import {environment as prodEnvironment, Environment} from './environment.prod';

export const environment: Environment = {
  ...prodEnvironment,
  production: false,
  apiUrl: 'https://fakestoreapi.com'
};
