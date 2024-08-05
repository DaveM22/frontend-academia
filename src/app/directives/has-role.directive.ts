import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { RolService } from '../services/rol.service';

@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective {
  private currentRole: string = '';

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private roleService: RolService
  ) {}

  @Input()
  set appHasRole(role: string) {
    this.currentRole = role;
    this.updateView();
  }

  private updateView() {
    this.roleService.hasRole(this.currentRole).subscribe(hasRole => {
      if (hasRole) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
