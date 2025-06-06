export const BASE_URL = "http://localhost:8000/"

export const API_PATHS = {
    AUTH: {
        SIGNUP: "/auth/signUp",
        LOGIN: "/auth/login",
        GET_USER_INFO: "/auth/me",
    },
    PRODUCT: {
        CREATE_PRODUCT: "/product",
        GET_ALL_PRODUCT: "/product",
    },
    CATEGORY: {
        CREATE_CATEGORY: "/category",
        GET_ALL_CATEGORY: "/category",
    }
}