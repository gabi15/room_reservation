class AuthService {
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getIsAdmin(){
    if (localStorage.getItem('isAdmin') == true){
      return true;
    }
    return false;
  }
}
export default new AuthService();