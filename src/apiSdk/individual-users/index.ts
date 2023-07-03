import axios from 'axios';
import queryString from 'query-string';
import { IndividualUserInterface, IndividualUserGetQueryInterface } from 'interfaces/individual-user';
import { GetQueryInterface } from '../../interfaces';

export const getIndividualUsers = async (query?: IndividualUserGetQueryInterface) => {
  const response = await axios.get(`/api/individual-users${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createIndividualUser = async (individualUser: IndividualUserInterface) => {
  const response = await axios.post('/api/individual-users', individualUser);
  return response.data;
};

export const updateIndividualUserById = async (id: string, individualUser: IndividualUserInterface) => {
  const response = await axios.put(`/api/individual-users/${id}`, individualUser);
  return response.data;
};

export const getIndividualUserById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/individual-users/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteIndividualUserById = async (id: string) => {
  const response = await axios.delete(`/api/individual-users/${id}`);
  return response.data;
};
