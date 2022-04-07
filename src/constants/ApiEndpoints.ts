export class ApiEndpoints {
    static BASE_URL: string = 'http://localhost:8080/api';

    static test = {
        testGet: `${ApiEndpoints.BASE_URL}/test`,
    };

    static user = {
        signIn: `${ApiEndpoints.BASE_URL}/user/signin`,
        createUser: `${ApiEndpoints.BASE_URL}/users`,
        getUsers: `${ApiEndpoints.BASE_URL}/user/users`,
    };

    static service = {
        baseEndpoint: `${ApiEndpoints.BASE_URL}/service`,
        getDetails: `${ApiEndpoints.BASE_URL}/service/get-details`,
        getFilteredServices: `${ApiEndpoints.BASE_URL}/service/filter`,
    };

    static order = {
        placeOrder: `${ApiEndpoints.BASE_URL}/order/place`,
        getOrders: `${ApiEndpoints.BASE_URL}/order/orders`,
        changeStatus: `${ApiEndpoints.BASE_URL}/order/change-status`,
        giveReview: `${ApiEndpoints.BASE_URL}/order/give-review`,
        getReviews: `${ApiEndpoints.BASE_URL}/order/reviews`,
    };
}
