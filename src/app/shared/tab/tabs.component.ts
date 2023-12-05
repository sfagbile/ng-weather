import { Component, ContentChildren, QueryList, AfterContentInit, ChangeDetectorRef, Renderer2, ViewChild, ViewChildren, DoCheck, Output, EventEmitter } from '@angular/core';
import { TabComponent } from './tab.component';

/**
 * TabsComponent: container for managing and displaying tabs.
 */
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements DoCheck {
  // QueryList to hold child TabComponents
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> = new QueryList<TabComponent>();

  // EventEmitter for emitting close events
  @Output() closeEvent: EventEmitter<number> = new EventEmitter<number>();

  /*
  * Angular's DoCheck lifecycle hook.
  * Checks for changes and updates the selected tab accordingly.
  */
  ngDoCheck(): void {
    const activeTabs = this.tabs.filter(tab => tab.active);
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    } else {
      this.selectTab(activeTabs[activeTabs.length - 1]);
    }
  }

  /**
 * Selects the specified tab and updates the tab styles.
 * @param tab - The tab to be selected.
 */
  selectTab(tab: TabComponent) {
    this.tabs.toArray().forEach(t => (t.active = false, tab.tabstyte = "inactive"));
    if (tab != undefined && tab !== null) {
      tab.active = true;
      tab.tabstyte = "well flex";
    }
  }

  /**
  * Emits a close event with the specified tab ID.
  * @param id - The ID of the tab to be closed.
  */
  emitCloseEvent(id: number) {
    this.closeEvent.emit(id);
  }
}
