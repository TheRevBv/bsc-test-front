import { IBaseRequest } from '~/shared';

export const validateQueryParams = (
    baseRequest: IBaseRequest | undefined,
): string => {
    if (!baseRequest) {
        return '';
    }

    const { limit, page, sortBy, order, filters, search, user, download } =
        baseRequest;
    let queryParams = '?';
    if (limit) {
        queryParams += `&limit=${limit}`;
    }
    if (page) {
        queryParams += `&page=${page}`;
    }
    if (sortBy) {
        queryParams += `&sortBy=${sortBy}`;
    }
    if (order) {
        queryParams += `&order=${order}`;
    }
    if (filters && Object.keys(filters).length > 0) {
        queryParams += `&filters=${encodeURIComponent(
            JSON.stringify(filters),
        )}`;
    }
    if (search) {
        queryParams += `&search=${encodeURIComponent(search)}`;
    }
    if (user) {
        queryParams += `&user=${encodeURIComponent(user)}`;
    }
    if (download) {
        queryParams += `&download=${download}`;
    }
    if (queryParams.charAt(1) === '&') {
        queryParams = queryParams.replace('?&', '?');
    }

    return queryParams;
};
