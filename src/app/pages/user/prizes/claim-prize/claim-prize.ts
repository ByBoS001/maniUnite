import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ClaimPrizeData {
  fullName: string;
  address: string;
  notes?: string;
}

export interface ClaimPrizeItem {
  title: string;
  donatedBy: string;
  image: string;
}

@Component({
  standalone: true,
  selector: 'app-claim-prize',
  imports: [CommonModule, FormsModule],
  templateUrl: './claim-prize.html',
})
export class ClaimPrize {
  @Input({ required: true }) prize!: ClaimPrizeItem;
  @Input() visible = false;

  @Input() defaultName = '';
  form: ClaimPrizeData = { fullName: '', address: '', notes: '' };

  @Output() cancel = new EventEmitter<void>();
  @Output() submit = new EventEmitter<ClaimPrizeData>();

  ngOnChanges() {
    // pre-rellena nombre cada vez que se abre
    if (this.visible) {
      this.form.fullName = this.defaultName || this.form.fullName || '';
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    if (!this.form.fullName?.trim() || !this.form.address?.trim()) return;
    this.submit.emit({ ...this.form });
  }
}