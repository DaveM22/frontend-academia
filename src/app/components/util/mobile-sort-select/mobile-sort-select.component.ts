import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
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
  imports: [CommonModule, SelectModule, FormsModule, ButtonModule],
  template: `
    <div class="block lg:hidden w-full">
      <p-select
        [options]="sortOptionsWithDefault" 
        [(ngModel)]="selectedSort"
        optionLabel="label" 
        optionValue="field"
        placeholder="Seleccionar columna..."
        (onChange)="onSortChange($event)"
        [showClear]="false"
        emptyFilterMessage="No hay registros"
        emptyMessage="No hay registros"
        class="text-md sm:text-base md:text-base lg:text-base xl:text-base"
        styleClass="text-md sm:text-base md:text-base lg:text-base xl:text-base w-full"
        appendTo="body">
      </p-select>
    </div>
  `,
  styles: []
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
