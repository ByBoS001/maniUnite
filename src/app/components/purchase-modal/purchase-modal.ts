import { Component, EventEmitter, Input, Output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

type PaymentMethod = 'transfer' | 'card';

@Component({
  selector: 'app-purchase-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './purchase-modal.html'
})
export class PurchaseModalComponent {
  @Input({ required: true }) open = false;
  @Input() selectedTables = 1;
  @Output() close = new EventEmitter<void>();
  @Output() completed = new EventEmitter<{ method: PaymentMethod, payload: any }>();

  
  submitted = signal(false);
  activeMethod = signal<PaymentMethod>('transfer');

  private fb = inject(FormBuilder);

  paymentForm = this.fb.group({
    tables: [this.selectedTables, [Validators.required, Validators.min(1)]],
    method: ['transfer' as PaymentMethod, Validators.required],

    // Transferencia
    transferNumber: ['', [Validators.minLength(4)]],
    proofFile: [null as File | null],

    // Tarjeta
    cardName: [''],
    cardNumber: [''],
    expMonth: [''],
    expYear: [''],
    cvv: [''],
  });

  ngOnChanges() {
    if (this.paymentForm && this.selectedTables > 0) {
      this.paymentForm.get('tables')?.setValue(this.selectedTables, { emitEvent: false });
    }
  }

  setMethod(m: PaymentMethod) {
    this.activeMethod.set(m);
    this.paymentForm.get('method')?.setValue(m);
    if (m === 'transfer') {
      this.paymentForm.get('transferNumber')?.addValidators([Validators.required, Validators.minLength(4)]);
      this.clearCardValidators();
    } else {
      this.setCardValidators();
      this.paymentForm.get('transferNumber')?.clearValidators();
      this.paymentForm.get('transferNumber')?.updateValueAndValidity();
    }
  }

  private setCardValidators() {
    this.paymentForm.get('cardName')?.setValidators([Validators.required, Validators.minLength(3)]);
    this.paymentForm.get('cardNumber')?.setValidators([Validators.required, Validators.pattern(/^\d{13,19}$/)]);
    this.paymentForm.get('expMonth')?.setValidators([Validators.required, Validators.pattern(/^(0?[1-9]|1[0-2])$/)]);
    this.paymentForm.get('expYear')?.setValidators([Validators.required, Validators.pattern(/^\d{2,4}$/)]);
    this.paymentForm.get('cvv')?.setValidators([Validators.required, Validators.pattern(/^\d{3,4}$/)]);

    this.paymentForm.get('cardName')?.updateValueAndValidity();
    this.paymentForm.get('cardNumber')?.updateValueAndValidity();
    this.paymentForm.get('expMonth')?.updateValueAndValidity();
    this.paymentForm.get('expYear')?.updateValueAndValidity();
    this.paymentForm.get('cvv')?.updateValueAndValidity();
  }

  private clearCardValidators() {
    ['cardName','cardNumber','expMonth','expYear','cvv'].forEach(ctrl => {
      this.paymentForm.get(ctrl)?.clearValidators();
      this.paymentForm.get(ctrl)?.updateValueAndValidity();
      this.paymentForm.get(ctrl)?.reset();
    });
  }

  onFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.item(0) ?? null;
    this.paymentForm.get('proofFile')?.setValue(file);
  }

  

  submit() {
    const method = this.activeMethod();
    if (method === 'transfer') {
      this.paymentForm.get('transferNumber')?.markAsTouched();
    } else {
      ['cardName','cardNumber','expMonth','expYear','cvv'].forEach(c => this.paymentForm.get(c)?.markAsTouched());
    }
    if (this.paymentForm.invalid) return;

    this.submitted.set(true);
    this.completed.emit({ method, payload: this.paymentForm.value });
  }
}