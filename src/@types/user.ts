interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface IUserList {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IUser[];
}

interface IUserPostRequest extends Omit<IUser, "id"> {}
