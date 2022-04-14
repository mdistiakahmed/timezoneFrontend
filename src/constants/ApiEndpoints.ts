export class ApiEndpoints {
    static auth = {
        signIn: `/api/signin`,
        signUp: `/api/signup`,
    };

    static user = {
        getUsers: '/api/users',
        createUser: '/api/users',
        deleteUser: (username:string)=> `/api/users/${username}`,
        updateUser: '/api/users'
    };

}
