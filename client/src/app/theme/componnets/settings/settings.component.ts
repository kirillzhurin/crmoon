import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as settingsActions from 'src/app/core/store/settings/settings.actions'
import * as settingsSelectors from 'src/app/core/store/settings/settings.selectors'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  isSettingsOpen: boolean
  isMenuTop: boolean = false
  isMenuCollapsed: boolean = false
  isMenuShadow: boolean = false
  isLightTheme: boolean = false
  isBorderless: boolean = false
  isSquaredBorders: boolean = false
  isFixedWidth: boolean = false

  constructor(private store: Store<any>) {
    this.store.pipe(select(settingsSelectors.selectSettings)).subscribe(state => {
      this.isSettingsOpen = state.isSettingsOpen
      this.isMenuTop = state.isMenuTop
      this.isMenuCollapsed = state.isMenuCollapsed
      this.isMenuShadow = state.isMenuShadow
      this.isLightTheme = state.isLightTheme
      this.isBorderless = state.isBorderless
      this.isSquaredBorders = state.isSquaredBorders
      this.isFixedWidth = state.isFixedWidth
    })
  }

  settingChange(value: boolean, setting: string) {
    this.store.dispatch(
      new settingsActions.SetStateAction({
        [setting]: value,
      }),
    )
  }

  toggle() {
    this.store.dispatch(
      new settingsActions.SetStateAction({
        isSettingsOpen: !this.isSettingsOpen,
      }),
    )
  }

  close() {
    this.store.dispatch(
      new settingsActions.SetStateAction({
        isSettingsOpen: false,
      }),
    )
  }
}
