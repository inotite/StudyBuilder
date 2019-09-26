import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FileUploadComponent} from './file-upload.component';
import {By} from '@angular/platform-browser';

xdescribe('FileUploadComponent', () => {
   let component: FileUploadComponent;
   let fixture: ComponentFixture<FileUploadComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [FileUploadComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(FileUploadComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should trigger file change event for input', () => {
      const input = fixture.debugElement.query(By.css('input[type=file]')).nativeElement;
      input.value = {name: 'file'};
      input.dispatchEvent(new Event('input'));

      spyOn(component, 'onFileChange');

      expect(component.onFileChange).toHaveBeenCalled();
   });

   it('should emit on click', () => {
      const input = fixture.debugElement.query(By.css('input[type=file]')).nativeElement;
      input.value = {name: 'file'};
      input.dispatchEvent(new Event('input'));

      spyOn(component, 'onFileChange');

      expect(component.fileSelectAction.emit).toHaveBeenCalled();
   });
});
