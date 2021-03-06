import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { reduce } from 'lodash';
import { MenuService } from 'src/app/core/utils/menu.service';
import { RootState } from 'src/app/core/store';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
  menuData: any[];
  breadcrumbs: any[];

  constructor(
    private menuService: MenuService,
    private store: Store<RootState>,
    private router: Router,
  ) {}

  ngOnInit() {
    this.menuService.getLeftMenuData().subscribe(menuData => this.menuData = menuData);
    this.generateBreadcrumbs(this.router.url)
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        this.generateBreadcrumbs(event.url ? event.url : null)
      })
  }

  generateBreadcrumbs(event: any) {
    this.breadcrumbs = this.getPath(this.menuData, event).reverse()
  }

  getPath(data: any[], url: string, parents = []) {
    const items = reduce(
      data,
      (result: any, entry: any) => {
        if (result.length) {
          return result
        }
        if (new RegExp(`^${entry.url}$`).test(url)) {
          return [entry].concat(parents)
        }
        if (entry.children) {
          const nested = this.getPath(entry.children, url, [entry].concat(parents))
          return (result || []).concat(nested.filter((e: any) => !!e))
        }
        return result
      },
      [],
    )
    return items.length > 0 ? items : [false]
  }
}
