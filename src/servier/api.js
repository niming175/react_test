import axios from 'axios'

export const get = (resource, params) => {
  return axios.get(`https://api.github.com/${resource}`, {
    params
  });
} 

export default { get }
