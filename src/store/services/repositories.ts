import api from '../services/api';

export interface ReposParams {
  username: string;
}

export const fetchReposService = (params: ReposParams) =>
  api(`/users/${params.username}/repos`);
