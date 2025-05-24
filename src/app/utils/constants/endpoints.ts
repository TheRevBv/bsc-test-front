export const endpoints = {
    AUTH: {
        LOGIN: 'auth/login',
        REFRESH_TOKEN: 'auth/refresh-token',
        LOGOUT: 'auth/logout',
        FORGOT_PASSWORD: 'auth/forgot-password',
        RESET_PASSWORD: 'auth/reset-password',
    },
    USUARIOS: {
        LIST_USERS: 'usuarios',
        USER_BY_ID: 'usuarios/',
        USER_BY_SUB: 'usuarios/by-sub',
        LIST_SELECT_USERS: 'usuarios/select',
        CREATE_USERS: 'usuarios',
        UPDATE_USERS: 'usuarios/',
        DELETE_USERS: 'usuarios/',
        LIST_OFICINAS_BY_USER: 'usuarios/:id/oficinas',
        ASIGNAR_ROL: 'usuarios/asignar-roles/:id',
    },
    ARCHIVOS: {
        GET_BASE64_BY_ID: 'archivos/',
        UPLOAD_BASE64: 'archivos/upload/base64',
        UPLOAD_ATTACH: 'archivos/upload/attachment',
    },
    CATALOGOS: {
        PRODUCTOS: {
            LIST_PRODUCTOS: 'productos',
            AREA_BY_ID: 'productos/',
            LIST_SELECT_PRODUCTOS: 'productos/select',
            CREATE_PRODUCTOS: 'productos',
            UPDATE_PRODUCTOS: 'productos/',
            DELETE_PRODUCTOS: 'productos/',
        },
    },
};
