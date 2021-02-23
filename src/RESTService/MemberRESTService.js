import axios from 'axios';
import config from '../config';
import TokenService from "../services/token-service";

const  { LUMS_API_URL } = config;
const option = {
    headers: {
        Authorization: 'Bearer ' + TokenService.getAuthToken()
    }
};
class MemberRESTService {
    
    listAllMembers() {
        return axios.get(LUMS_API_URL + '/users');
    }

    lookupMemberById(id) {
        return axios.get(LUMS_API_URL + `/user/${id}`, option);
    }

    lookupMemberByEmail(email){
        return axios.get(LUMS_API_URL + `/members/email/${email}`);
    }

    getAdminMembers(){
        return axios.get(LUMS_API_URL + '/users/role/ROLE_ADMIN', option);
    }

    modifyUserRole(id, newRole) {
        const params = new URLSearchParams({
            newRole: newRole
        });
        return axios.post(LUMS_API_URL + `/users/${id}/modify_role` + '?' + params, {}, option);
    }

    createMember(member) {
        return axios.post(LUMS_API_URL + '/auth/signup', member);
    }

    changePassword(id, oldPassword, newPassword) {
        const data = {oldPassword, newPassword}
        const params = new URLSearchParams({
            user_id: id
        });
        console.log(data);
        return axios.post(LUMS_API_URL + `/users/password` + '?' + params, data, option);
    }

    block(id) {
        return axios.post(LUMS_API_URL + `/users/block/${id}`, {}, option);
    }

    countUser() {
        return axios.get(LUMS_API_URL + '/users/count');
    }

    unblock(id) {
        return axios.post(LUMS_API_URL + `/users/unblock/${id}`, {}, option);
    }

    updateMemberEmail(id, newEmail) {
        const params = new URLSearchParams({
            new_email: newEmail
        });
        return axios.post(LUMS_API_URL + `/users/email/${id}` + '?' + params, {}, option);
    }

    memberLogin(member) {
        return axios.post(LUMS_API_URL + '/auth/signin', member)
                    .then();
    }

}


export default new MemberRESTService();