const localIP = '192.168.1.171:8080';
//const localIP = '192.168.1.202:8080';
//const localIP = '10.142.32.184:8080';
const apiEndpoint = '/api';


export const baseUrl = `http://${localIP}${apiEndpoint}`;
export const backlogUrl = `${baseUrl}/backlog`;

export const usersUrl = `${baseUrl}/users`;
export const authUrl = `${baseUrl}/auth`;