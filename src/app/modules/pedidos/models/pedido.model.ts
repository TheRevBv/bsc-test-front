export interface PedidoProducto {
    productoId: number;
    productoNombre: string;
    cantidad: number;
    precio: number;
}

export interface Pedido {
    pedidoId: number;
    cliente: string;
    fechaPedido: string;
    usuarioId: number;
    totalProductos: number;
    productos: PedidoProducto[];
}
