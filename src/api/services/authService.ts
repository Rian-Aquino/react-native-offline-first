import { api } from "..";
import { AxiosResponse } from "axios";

export class AuthService {
  public static login = async (credentials: ILogin) => {
    try {
      const res = await api.post<ILogin, AxiosResponse<ILoginResponse>>("/login", {
        ...credentials,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
}
