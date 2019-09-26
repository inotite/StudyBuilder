import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelperTextComponent } from './helper-text.component';
import { HelperTextService } from '../../services/helper-text.service';
import { TestHelper } from '../../helpers/test.helper';

describe('HelperTextComponent', () => {
  let component: HelperTextComponent;
  let fixture: ComponentFixture<HelperTextComponent>;
  let service: HelperTextService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelperTextComponent ],
      providers: [HelperTextService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelperTextComponent);
    service = TestBed.get(HelperTextService);
    component = fixture.componentInstance;
    service.setHelperText({
      heading: 'Test heading',
      content: 'Test content',
      example: 'Test example'
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it (`should display heading 'Test heading'`, () => {
    const element = TestHelper.getElementByCss(fixture, 'h2.helper-text-heading');
    expect(element.innerHTML).toEqual('Test heading');
  });

  it (`should display content 'Test content'`, () => {
    const element = TestHelper.getElementByCss(fixture, '.helper-text-content');
    expect(element.innerHTML).toEqual('Test content');
  });

  it (`should display example 'Test example'`, () => {
    const element = TestHelper.getElementByCss(fixture, '.helper-text-example b em');
    expect(element.innerHTML).toEqual('Test example');
  });
});
