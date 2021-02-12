import axios from 'axios';
import config from '../config';
import TokenService from "../services/token-service"
const  { LUMS_API_URL } = config;
const option = {
    headers: {
        Authorization: 'Bearer ' + TokenService.getAuthToken()
    }
};
class LogRESTService {
    listAllLogs() {
        return axios.get(LUMS_API_URL + `/log`);
    }

    listAllLogsByUser(userId) {
        const params = new URLSearchParams({
            user_id: userId
        });
        return axios.get(LUMS_API_URL + `/log/by_user` + "?" + params, option);
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