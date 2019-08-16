import { Injectable } from '@angular/core';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MatDialog } from '@angular/material';

@Injectable()
export class ConfirmationDialogService {

    constructor(public matDialog: MatDialog) { }

    public confirm(title: string, message: string, btnOkText: string = 'Aceptar', btnCancelText: string = 'Cancelar'): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const modal = this.matDialog.open(ConfirmationDialogComponent, {
                panelClass: 'confirm-dialog',
                data: {
                    title,
                    message,
                    btnOkText,
                    btnCancelText,
                }
            });

            modal.afterClosed().subscribe(
                (response) => {
                    if (response) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
        });
    }

}
