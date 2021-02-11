import axios from 'axios';
import config from '../config';
const  { LUMS_API_URL } = config;

class MemberRESTService {
    
    listAllMembers() {
        return axios.get(LUMS_API_URL + '/users');
    }

    lookupMemberById(id) {
        return axios.get(LUMS_API_URL + `/members/${id}`);
    }

    lookupMemberByEmail(email){
        return axios.get(LUMS_API_URL + `/members/email/${email}`);
    }

    getAdminMembers(){
        return axios.get(LUMS_API_URL + '/members?role=ADMIN');
    }

    modifyUserRole(id, adminId, newRole) {
        const params = new URLSearchParams({
            adminId: adminId,
            newRole: newRole
        });
        return axios.post(LUMS_API_URL + `/members/${id}/modify_role` + '?' + params);
    }

    createMember(member) {
        return axios.post(LUMS_API_URL + '/auth/signup', member);
    }

    changePassword(id, oldPassword, newPassword) {
        return axios.post(LUMS_API_URL + `/members/password/${id}/${oldPassword}/${newPassword}`);
    }

    block(id, adminId) {
        const params = new URLSearchParams({
            adminId: adminId
        });
        return axios.post(LUMS_API_URL + `/members/block/${id}` + '?' + params);
    }

    countUser() {
        return axios.get(LUMS_API_URL + '/users/count');
    }

    unblock(id, adminId) {
        const params = new URLSearchParams({
            adminId: adminId
        });
        return axios.post(LUMS_API_URL + `/members/unblock/${id}` + '?' + params);
    }

    updateMemberEmail(id, newEmail) {
        return axios.put(LUMS_API_URL + `/members/email/${id}/${newEmail}`);
    }

    memberLogin(member) {
        return axios.post(LUMS_API_URL + '/auth/signin', member);
    }

}


export default new MemberRESTService();