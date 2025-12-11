import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { Table } from 'primeng/table';

export interface SortOption {
  label: string;
  field: string;
}

@Component({
  selector: 'app-mobile-sort-select',
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule],
  template: `
    <div class="block md:hidden w-full">
      <label class="block text-xs font-semibold mb-2">Ordenar por:</label>
      <p-dropdown 
        [options]="sortOptions" 
        [(ngModel)]="selectedSort"
        optionLabel="label" 
        optionValue="field"
        placeholder="Seleccionar columna..."
        (onChange)="onSortChange($event)"
        styleClass="w-full text-xs"
        [style]="{ 'font-size': '0.75rem' }">
      </p-dropdown>
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
  
  selectedSort: string = '';

  ngOnInit() {
    if (this.sortOptions.length > 0) {
      this.selectedSort = this.sortOptions[0].field;
    }
  }

  onSortChange(event: any) {
    const field = event.value || event;
    if (this.table) {
      this.table.sort({ field: field, order: 1 });
    }
  }
}
