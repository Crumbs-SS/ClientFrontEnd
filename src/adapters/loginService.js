const url = 'http://localhost:8080';
const loginRoute = url + '/crumbs/customer/authenticate';

class LoginService {
  static loginPost(username, password, role){
    return fetch(loginRoute, {
      method: "POST",
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "username": username,
        "password": password,
        "role": role,
      }),
    });
  }
}

export default LoginService;
