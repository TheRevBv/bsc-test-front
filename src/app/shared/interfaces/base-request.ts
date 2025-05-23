export interface IBaseRequest {
    limit?: number;
    page?: number;
    sortBy?: string;
    order?: string;
    filters?: any;
    search?: string;
    user?: string;
    download?: boolean;
}

export class BaseRequest implements IBaseRequest {
    page?: number = 1; // Número de página
    limit?: number = 20; // Máximo número de registros por página
    sortBy?: string = '_id'; // Campo por el que ordenar
    order?: 'asc' | 'desc' = 'desc'; // Orden ascendente o descendente
    filters?: Record<string, any> = {}; // Filtros personalizados
    search?: string; // Búsqueda por texto
    user?: string; // Usuario
    download?: boolean = false; // Descargar archivo

    constructor(
        page?: number,
        limit?: number,
        sortBy?: string,
        order?: 'asc' | 'desc',
        filters?: Record<string, any>,
        search?: string,
        user?: string,
        download?: boolean,
    ) {
        this.page = page;
        this.limit = limit;
        this.sortBy = sortBy;
        this.order = order;
        this.filters = filters;
        this.search = search;
        this.user = user;
        this.download = download;
    }
}
