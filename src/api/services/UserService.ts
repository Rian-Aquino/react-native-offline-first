import { api } from "..";
import { AxiosResponse } from "axios";

export class UserService {
  public static list = async (page: number = 1, perPage: number = 6) => {
    const res = await api.get<any, AxiosResponse<IUserList>>("/users", {
      params: { page, per_page: perPage, delay: 1 },
    });

    return res.data;
  };

  public static save = async (user: IUserPostRequest) => {
    const res = await api.post<any, AxiosResponse<IUser>>("/users", user);

    if (!res.data.id) throw new Error("Failed to register user");

    return res.data;
  };
}
