export class ApiEndpoints {
    static auth = {
        signIn: `/v1/signin`,
        signUp: `/v1/signup`,
    };

    static user = {
        getUsers: '/v1/users',
        createUser: '/v1/user',
        deleteUser: (username: string) => `/v1/users/${username}`,
        updateUser: '/v1/user',
    };
}

export const URLsWithoutAuthorization = [
    ApiEndpoints.auth.signIn,
    ApiEndpoints.auth.signUp,
];
