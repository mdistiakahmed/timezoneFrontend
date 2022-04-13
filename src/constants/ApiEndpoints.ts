export class ApiEndpoints {
    static BASE_URL: string = 'http://localhost:8080/api';

    static test = {
        testGet: `${ApiEndpoints.BASE_URL}/test`,
    };

    static auth = {
        signIn: `${ApiEndpoints.BASE_URL}/signin`,
        signUp: `${ApiEndpoints.BASE_URL}/signup`,
    };

    static user = {
        getUsers: '/api/users',
        deleteUser: (username:string)=> `${ApiEndpoints.BASE_URL}/users/${username}`,
        updateUser: '/api/users'
    };

}
