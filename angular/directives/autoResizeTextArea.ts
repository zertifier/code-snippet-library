import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  standalone: true,
  selector: 'textarea[autoResize]', // Applies only to <textarea> elements with the `autoResize` attribute
})
export class AutoResizeTextAreaDirective implements OnInit {
  constructor(private elementRef: ElementRef) {
  }

  private _textArea: HTMLTextAreaElement | undefined;
  get textArea() {
    if (!this._textArea) {
      this._textArea = this.elementRef.nativeElement as HTMLTextAreaElement;
    }
    return this._textArea;
  }

  // Recalculate height on user input
  @HostListener('input')
  onInput(): void {
    this.recalculateHeight();
  }

  // Initial height
  ngOnInit(): void {
    // 1 Frame delay to get real component height
    setTimeout(() => this.recalculateHeight());
  }

  private recalculateHeight(): void {
    if (this.textArea) {
      // Set max scrollHeight
      this.textArea.style.height = '0';
      // Set height to scrollHeight + padding to hide scrollbar
      this.textArea.style.height = this.textArea.scrollHeight + 5 + 'px';
    }
  }
}
