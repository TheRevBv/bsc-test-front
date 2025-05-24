import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { GenericDataTableComponent } from '~/shared/components/generic-data-table/generic-data-table.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ITableConfig } from '~/shared';
import { UsuariosService } from './services/usuarios.service';
import { Usuario } from './models/usuario.model';
import { getTableConfig } from './usuarios.settings';
import { ManagerUsuariosDialogComponent } from './manager-usuarios-dialog/manager-usuarios-dialog.component';

@Component({
    selector: 'bsc-usuarios',
    standalone: true,
    templateUrl: './usuarios.component.html',
    imports: [GenericDataTableComponent],
    providers: [DialogService],
})
export default class UsuariosComponent implements OnInit {
    usuarios = signal<Usuario[]>([]);
    tableConfig!: ITableConfig;

    @ViewChild(GenericDataTableComponent) dataTable!: GenericDataTableComponent;

    constructor(
        private usuariosSvc: UsuariosService,
        private dialog: DialogService,
    ) {}

    ngOnInit(): void {
        this.tableConfig = getTableConfig(this.onActionClicked.bind(this));
        this.loadUsuarios();
    }

    onActionClicked(action: string, row: Usuario | null) {
        switch (action) {
            case 'edit':
                this.openDialog('editar', row!);
                break;
            case 'delete':
                this.usuariosSvc
                    .remove(row!.usuarioId?.toString() || '')
                    .subscribe(() => this.dataTable.getData());
                break;
            case 'add':
                this.openDialog('agregar');
                break;
        }
    }

    loadUsuarios() {
        this.usuariosSvc.getAll().subscribe((res) => {
            if (res.isSuccess && res.data) {
                this.usuarios.set(res.data);
            }
        });
    }

    handlePageChange(event: any) {
        console.log('page change', event);
    }

    private openDialog(action: 'agregar' | 'editar', usuario?: Usuario) {
        const ref = this.dialog.open(ManagerUsuariosDialogComponent, {
            header: '',
            data: { action, usuario },
            styleClass: 'w-[95vw] sm:w-[450px]',
        });

        ref.onClose.subscribe((res) => {
            if (res === 'refresh') {
                this.dataTable.getData();
            }
        });
    }
}
