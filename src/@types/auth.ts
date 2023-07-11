interface ILoginRequest {
  email: string;
  password: string;
}

interface ILoginResponse {
  token: string;
}

interface ILogin extends ILoginRequest, ILoginResponse {}
