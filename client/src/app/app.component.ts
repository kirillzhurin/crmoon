import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from './core/store'
import * as settingsActions from './core/store/settings/settings.actions'
import { SyncLocalStorageStartAction } from './core/store/cart';

declare var window;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private store: Store<RootState>) {}

  ngOnInit() {
    this.store.dispatch(new SyncLocalStorageStartAction);

    // detecting & set mobile/tablet/desktop viewports
    const setViewPort = (isMobileView: any = false, isTabletView: any = false) => {
      this.store.dispatch(
        new settingsActions.SetStateAction({
          isMobileView,
        }),
      )
      this.store.dispatch(
        new settingsActions.SetStateAction({
          isTabletView,
        }),
      )
    }
    const detectViewPort = (load = false) => {
      const _isMobileView = window.innerWidth < 768;
      const _isTabletView = window.innerWidth < 992;
      const _isDesktopView = !_isMobileView && !_isTabletView;
      const isMobileView = JSON.parse(window.localStorage.getItem('app.settings.isMobileView'));
      const isTabletView = JSON.parse(window.localStorage.getItem('app.settings.isTabletView'));
      const isDesktopView = !isMobileView && !isTabletView;
      if (_isDesktopView && (_isDesktopView !== isDesktopView || load)) {
        setViewPort(false, false);
      }
      if (_isTabletView && !_isMobileView && (_isTabletView !== isTabletView || load)) {
        setViewPort(false, true);
      }
      if (_isMobileView && (_isMobileView !== isMobileView || load)) {
        setViewPort(true, false);
      }
    }
    detectViewPort(true);
    window.addEventListener('resize', () => {
      detectViewPort();
    })
  }

}
