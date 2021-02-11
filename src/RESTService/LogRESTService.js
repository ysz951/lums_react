import axios from 'axios';
import config from '../config';
const  { LUMS_API_URL } = config;

class LogRESTService {
    listAllLogs() {
        return axios.get(LUMS_API_URL + `/log`);
    }

    listAllLogsByUser(userId) {
        const params = new URLSearchParams({
            userId: userId
        });
        return axios.get(LUMS_API_URL + `/log/by_user` + "?" + params);
    }

    listAllLogsByUserAndLicense(userId, licenseId) {
        const params = new URLSearchParams({
            userId: userId,
            licenseId: licenseId
        });
        return axios.get(LUMS_API_URL + `/log/by_user_and_license` + "?" + params);
    }
    
}


export default new LogRESTService();