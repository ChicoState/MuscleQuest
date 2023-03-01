import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-orc-boss-info',
  templateUrl: './orc-boss-info.component.html',
  styleUrls: ['./orc-boss-info.component.scss']
})
export class OrcBossInfoComponent {
  constructor(
    public dialogRef: MatDialogRef<OrcBossInfoComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
