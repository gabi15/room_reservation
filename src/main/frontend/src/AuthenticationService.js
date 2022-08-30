class AuthService {
  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getIsAdmin(){
    return localStorage.getItem('isAdmin');
  }
}
export default new AuthService();