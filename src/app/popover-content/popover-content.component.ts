import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popover-content',
  templateUrl: './popover-content.component.html',
  styleUrls: ['./popover-content.component.scss'],
})
export class PopoverContentComponent {
  @Input() date?: string;
}