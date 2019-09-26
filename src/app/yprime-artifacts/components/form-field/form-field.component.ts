import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from '../../models/form-field.model';
import { FormFieldTextInputComponent } from './text-input/text-input.component';
import { FormFieldNumberInputComponent } from './number-input/number-input.component';
import { FormFieldDropdownSelectComponent } from './dropdown-select/dropdown-select.component';
import { FormFieldToggleButtonComponent } from './toggle-button/toggle-button.component';
import { ComingSoonComponent } from '../../../coming-soon/coming-soon.component';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit {

  @Input() formField: FormField;
  @Input() formGroup: FormGroup;
  @ViewChild('formFieldView', {read: ViewContainerRef}) formFieldView;
  @Output() showHelperText: EventEmitter<any> = new EventEmitter();

  fieldComponents = {
    'Text': FormFieldTextInputComponent,
    'Number': FormFieldNumberInputComponent,
    'Dropdown': FormFieldDropdownSelectComponent,
    'Toggle': FormFieldToggleButtonComponent,
    'ComingSoon': ComingSoonComponent
  };

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent() {
    if (this.formField && this.formField.properties) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.fieldComponents[this.formField.properties.type]);
      const componentRef = this.formFieldView.createComponent(componentFactory);
      componentRef.instance.formField = this.formField;
      componentRef.instance.formGroup = this.formGroup;
      componentRef.instance.showHelperText.subscribe(() => {
        this.onShowHelperText();
      });
    }
  }

  isFieldType(fieldType: string): boolean {
    return (this.formField &&
      this.formField.properties &&
      this.formField.properties.type === fieldType);
  }

  onShowHelperText() {
    this.showHelperText.emit({
      heading: this.formField.properties.label,
      content: this.formField.properties.description,
      example: 'Example'
    });
  }
}
