export type UserDTO = {
    username: string;
    firstname?: string;
    lastname?: string;
    password: string;
    sysadmin?: boolean;
  };

  export type UserSignUpModel = {
    username: string;
    password: string;
  };
