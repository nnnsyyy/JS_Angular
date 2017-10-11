import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})

export class HighlightDirective {

  constructor(private elem: ElementRef,
    private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter(){
    this.renderer.addClass(this.elem.nativeElement, 'highlight');
    // this.renderer.setElementClass(this.elem.nativeElement, 'hightlight', true);
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.renderer.removeClass(this.elem.nativeElement, 'highlight');
    // this.renderer.setElementClass(this.elem.nativeElement, 'hightlight', false);
  }
}
