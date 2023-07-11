import { api } from "..";
import { AxiosResponse } from "axios";

export class AuthService {
  public static login = async (credentials: ILoginRequest) => {
    try {
      const res = await api.post<ILoginRequest, AxiosResponse<ILoginResponse>>("/login", {
        ...credentials,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
}
