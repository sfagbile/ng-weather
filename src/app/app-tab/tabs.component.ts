import { Component, ContentChildren, QueryList, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> = new QueryList<TabComponent>();
  
  // Inject ChangeDetectorRef in the constructor
constructor(private cdr: ChangeDetectorRef) {}

// Call detectChanges in ngAfterViewInit or ngOnInit
ngAfterViewInit() {
  this.cdr.detectChanges();
}

  ngAfterContentInit() {
    const activeTabs = this.tabs.filter(tab => tab.active);
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabComponent) {
    this.tabs.toArray().forEach(t => (t.active = false));
    if (tab != undefined) {
      console.log(tab)
      tab.active = true;
    }
  }
}
