import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read', () => {
    const year = (new Date).getFullYear().toString();
    const spans = fixture.debugElement.nativeElement.querySelectorAll('span');
    expect(spans[0].innerHTML).toEqual(`Copyright ${year}`);
    expect(spans[1].innerHTML).toEqual('Powered by YPrime, Inc.');
  });
});
