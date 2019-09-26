import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DropdownComponent } from './dropdown.component';
import { DropdownContent } from './../../models/dropdown-content.model';
import { DropdownItem } from './../../models/dropdown-item.model';

xdescribe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  let items: DropdownItem<number>[];
  let content: DropdownContent<number>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    items = [
      {
        id: 1,
        name: 'item 1'
      }
    ];
    content = {
      placeholder: 'test placeholder',
      selectedItem: 1,
      items: items
    };

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    component.content = content;
    fixture.detectChanges();
  });

  it('should create the Component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the placeholder item when one is provided.',
    () => {
      const placeholder = 'this is not a placeholder, it is just a tribute';
      content.placeholder = placeholder;
      fixture.detectChanges();

      const element = fixture.debugElement.query(By.css('option:disabled')).nativeElement as HTMLSelectElement;

      expect(element.innerText).toEqual(placeholder);
    });

  it('should not add a placeholder when one is not provided.',
    () => {
      content.placeholder = '';
      fixture.detectChanges();

      const element = fixture.debugElement.query(By.css('option:disabled'));

      expect(element).toBeNull();
    });

  it('should create an active option for each item.',
    () => {
      content.items.push({
          id: 2,
          name: 'item 2'
        },
        {
          id: 3,
          name: 'last'
        });
      fixture.detectChanges();

      const elements = fixture.debugElement.queryAll(By.css('option:not([disabled])'));

      expect(elements.length).toEqual(content.items.length);
    });

  it('should not have any active options if none are provided.',
    () => {
      content.items = [];
      fixture.detectChanges();

      const elements = fixture.debugElement.queryAll(By.css('option:not([disabled])'));

      expect(elements.length).toEqual(0);
    });

  it('should assign the ID of the item to the value of the option',
    () => {
      const first = items[0];

      const element = fixture.debugElement.query(By.css('option:not([disabled])')).nativeElement as HTMLOptionElement;

      expect(element.value).toEqual(first.id.toString());
    });

  it('should assign the name of the item to the inner text of the option',
    () => {
      const first = items[0];

      const element = fixture.debugElement.query(By.css('option:not([disabled])')).nativeElement as HTMLOptionElement;

      expect(element.innerText.trim()).toEqual(first.name);
    });
});
