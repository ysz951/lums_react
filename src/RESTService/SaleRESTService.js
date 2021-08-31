import axios from 'axios';
import config from '../config';
import TokenService from "../services/token-service";
const  { LUMS_API_URL } = config;
const option = {
    headers: {
        Authorization: 'Bearer ' + TokenService.getAuthToken()
    }
};
class SaleRESTService {
    
    listAllSales() {
        return axios.get(LUMS_API_URL + '/sale');
    }

    listUserSales(id) {
        return axios.get(LUMS_API_URL + '/sale/user?userId=' + id, option);
    }

    createNewSale(sale) {
        return axios.post(LUMS_API_URL + '/sale', sale, option);
    }

    changeSaleActive(id, newActive) {
        return axios.put(LUMS_API_URL + `/sale/active/${id}/${newActive}`, {}, option);
    }

    changeSaleExpiration(id, year, month, day) {
        const params = new URLSearchParams({
            year: year,
            month: month,
            day: day
        });
        console.log(LUMS_API_URL + `/sale/${id}/expirationdate` + '?' + params);
        return axios.put(LUMS_API_URL + `/sale/${id}/expirationdate` + '?' + params, {}, option);
    }

    findSaleById(id) {
        return axios.get(LUMS_API_URL + `/sale/${id}`)
    }

    checkSaleExpiration() {
        return axios.put(LUMS_API_URL + `/sale/expiration`);
    }

    deleteSale(id) {
        return axios.delete(LUMS_API_URL + `/sale/${id}`, option);
    }
    
}


export default new SaleRESTService();