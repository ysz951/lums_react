import axios from 'axios';
import config from '../config';
import TokenService from "../services/token-service";
const  { LUMS_API_URL } = config;
const option = {
    headers: {
        Authorization: 'Bearer ' + TokenService.getAuthToken()
    }
};
class LicenseRESTService {
    createLicense(license) {
        return axios.post(LUMS_API_URL + '/license', license, option);
    }

    purChaseLicense(id) {
        return axios.post(LUMS_API_URL + `/license/${id}/purchase`, {}, option);
    }

    setLicensePrice(id, price) {
        return axios.post(LUMS_API_URL + `/license/price/${id}/${price}`, {}, option);
    }

    listAllLicense() {
        return axios.get(LUMS_API_URL + '/license', option);
    }

    getLicenseById(id) {
        return axios.get(LUMS_API_URL + `/license/${id}`, option);
    }

    changeLicenseActive(id, newActive) {
        return axios.put(LUMS_API_URL + `/license/active/${id}/${newActive}`, {}, option);
    }

    listAllLicenseByDuration(duration) {
        return axios.get(LUMS_API_URL + `/license/duration?duration=${duration}`, option);
    }
}


export default new LicenseRESTService();
