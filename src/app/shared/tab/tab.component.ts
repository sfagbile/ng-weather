import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent {
  @Input() title: string = '';
  @Input() active: boolean = false;
  @Input() tabstyte: string = '';
  @Input() id: string = '';
}
