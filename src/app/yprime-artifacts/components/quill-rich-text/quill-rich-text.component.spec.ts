import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuillRichTextComponent } from './quill-rich-text.component';

describe('QuillRichTextComponent', () => {
  let component: QuillRichTextComponent;
  let fixture: ComponentFixture<QuillRichTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuillRichTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuillRichTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
