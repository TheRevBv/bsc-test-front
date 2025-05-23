export interface Producto {
    productoId?: number;
    clave: string;
    nombre: string;
    existencia: number;
    precio: number;
    fechaAlta?: Date;
    estado: number;
    estatus?: string;
}
