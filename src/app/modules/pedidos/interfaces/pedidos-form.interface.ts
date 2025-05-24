export interface ProductoForm {
    productoId: number;
    cantidad: number;
}

export interface PedidoForm {
    cliente: string;
    fechaPedido: string;
    usuarioId: number;
    productos: ProductoForm[];
}
