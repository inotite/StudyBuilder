import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quill-rich-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './quill-rich-text.component.html',
  styleUrls: ['./quill-rich-text.component.scss']
})
export class QuillRichTextComponent implements OnInit {
  @Input() data: string;
  @Output() blur = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }
}
