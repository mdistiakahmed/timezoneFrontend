export class ApiEndpoints {
    static auth = {
        signIn: `/api/sign-in`,
        signUp: `/api/sign-up`,
    };

    static user = {
        getUsers: '/api/users',
        createUser: '/api/users',
        deleteUser: (username: string) => `/api/user/${username}`,
        updateUser: '/api/user',
    };
}
