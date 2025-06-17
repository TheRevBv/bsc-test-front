import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITableConfig } from '~/shared';
import { GenericDataTableComponent } from '~/shared/components/generic-data-table/generic-data-table.component';
import { ExistenciaInventario } from '../../interfaces';
import { ReportsService } from '../../services';

@Component({
    selector: 'bsc-reporte-existencias',
    standalone: true,
    imports: [CommonModule, GenericDataTableComponent],
    templateUrl: './reporte-existencias.component.html',
})
export default class ReporteExistenciasComponent implements OnInit {
    data = signal<ExistenciaInventario[]>([]);
    tableConfig!: ITableConfig;

    ngOnInit(): void {
        this.tableConfig = {
            title: 'Existencia de Inventario',
            rows: 20,
            globalFilterFields: ['clave', 'nombre'],
            columns: [
                { field: 'clave', header: 'Clave' },
                { field: 'nombre', header: 'Nombre' },
                { field: 'existenciaInicial', header: 'Existencia Inicial' },
                { field: 'totalVendido', header: 'Vendidos' },
                { field: 'existenciaActual', header: 'Actual' },
                {
                    field: 'precio',
                    header: 'Precio',
                    currency: true,
                },
            ],
        };

        this.loadData();
    }

    constructor(private reportsSvc: ReportsService) {}

    loadData(exportar?: boolean) {
        if (exportar) {
            this.exportToExcel();
            return;
        }
        this.reportsSvc.getRptExistenciasData().subscribe((response) => {
            if (response.isSuccess) {
                this.data.set(response.data);
            } else {
                console.error('Error al cargar los datos:', response);
            }
        });
    }

    private exportToExcel() {
        this.reportsSvc.downloadRptExistenciasExcel().subscribe((res) => {
            const blob = res.body;
            if (!blob) {
                console.error('No blob data received.');
                return;
            }

            const contentDisposition = res.headers.get('Content-Disposition');
            let filename = 'reporte.xlsx';

            if (contentDisposition) {
                // Intenta capturar filename*=UTF-8''nombre
                const utf8Match = contentDisposition.match(
                    /filename\*\=UTF-8''(.+)/,
                );
                const fallbackMatch =
                    contentDisposition.match(/filename="?([^"]+)"?/);

                if (utf8Match?.[1]) {
                    filename = decodeURIComponent(utf8Match[1]);
                } else if (fallbackMatch?.[1]) {
                    filename = fallbackMatch[1];
                }
            }

            const blobUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(blobUrl);
        });
    }
}
