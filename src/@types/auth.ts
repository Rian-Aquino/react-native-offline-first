interface ILoginRequest {
  email: string;
  password: string;
}

interface ILoginResponse {
  token: string;
}

interface ISession extends ILoginRequest, ILoginResponse {}
