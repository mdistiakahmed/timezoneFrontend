export class ApiEndpoints {
    static auth = {
        signIn: `/v1/sign-in`,
        signUp: `/v1/sign-up`,
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
