import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs'
import * as settingsActions from 'src/app/core/store/settings/settings.actions'
import * as settingsSelectors from 'src/app/core/store/settings/settings.selectors'

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  settings$: Observable<any>
  isLightTheme: boolean
  isMenuCollapsed: boolean
  isBorderless: boolean
  isSquaredBorders: boolean
  isFixedWidth: boolean
  isMenuShadow: boolean
  isMobileView: boolean
  isMenuTop: boolean
  isMobileMenuOpen: boolean

  coldLoad: boolean = true

  constructor(private store: Store<any>) {
    this.store.pipe(select(settingsSelectors.selectSettings)).subscribe(state => {
      this.isLightTheme = state.isLightTheme
      this.isMenuCollapsed = state.isMenuCollapsed
      this.isBorderless = state.isBorderless
      this.isSquaredBorders = state.isSquaredBorders
      this.isFixedWidth = state.isFixedWidth
      this.isMenuShadow = state.isMenuShadow
      this.isMobileView = state.isMobileView
      this.isMenuTop = state.isMenuTop
      this.isMobileMenuOpen = state.isMobileMenuOpen
    })
  }

  ngOnInit() {
  }

  onCollapse(value: any) {
    this.store.dispatch(
      new settingsActions.SetStateAction({
        isMenuCollapsed: value,
      }),
    )
  }

  toggleTheme() {
    this.store.dispatch(
      new settingsActions.SetStateAction({
        isLightTheme: !this.isLightTheme,
      }),
    )
  }

  toggleCollapsed() {
    this.store.dispatch(
      new settingsActions.SetStateAction({
        isMenuCollapsed: !this.isMenuCollapsed,
      }),
    )
  }

  toggleMobileMenu() {
    this.store.dispatch(
      new settingsActions.SetStateAction({
        isMobileMenuOpen: !this.isMobileMenuOpen,
      }),
    )
  }

}
