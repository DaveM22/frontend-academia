import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

export interface SortOption {
  label: string;
  field: string;
}

@Component({
  selector: 'app-mobile-sort-select',
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule, ButtonModule],
  template: `
    <div class="block lg:hidden w-full">
      <label class="block text-xs font-semibold mb-2">Ordenar por:</label>
      <div class="flex gap-2">
        <p-dropdown 
          [options]="sortOptionsWithDefault" 
          [(ngModel)]="selectedSort"
          optionLabel="label" 
          optionValue="field"
          placeholder="Seleccionar columna..."
          (onChange)="onSortChange($event)"
          styleClass="w-full text-xs"
          [style]="{ 'font-size': '0.75rem' }">
        </p-dropdown>
        <p-button 
          icon="pi pi-times"
          [rounded]="true"
          [text]="true"
          severity="secondary"
          (onClick)="clearSort()"
          [style]="{ 'min-width': '38px', 'height': '38px' }">
        </p-button>
      </div>
    </div>
  `,
  styles: [`
    :host ::ng-deep .p-dropdown {
      height: 38px !important;
    }
    :host ::ng-deep .p-dropdown-trigger {
      width: 2rem !important;
    }
  `]
})
export class MobileSortSelectComponent implements OnInit {
  @Input() sortOptions: SortOption[] = [];
  @Input() table!: Table;
  
  selectedSort: string | null = null;
  sortOptionsWithDefault: SortOption[] = [];

  ngOnInit() {
    this.sortOptionsWithDefault = [
      { label: 'Seleccione una columna', field: '' },
      ...this.sortOptions
    ];
  }

  onSortChange(event: any) {
    const field = event.value || event;
    if (field && this.table) {
      this.table.sort({ field: field, order: 1 });
    }
  }

  clearSort() {
    this.selectedSort = null;
    if (this.table) {
      this.table.sortField = null;
      this.table.sortOrder = 1;
      this.table._value = this.table._value;
      this.table.first = 0;
      this.table.onLazyLoad.emit(this.table.createLazyLoadMetadata());
    }
  }
}
