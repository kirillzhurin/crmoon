import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootState } from 'src/app/core/store';
import { selectCountPositions } from 'src/app/core/store/cart';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  //$countPositions: Observable<number> = new Observable();
  count: number = 0;
  constructor(private store: Store<RootState>) {}

  ngOnInit() {
    this.store.select(selectCountPositions).subscribe(count => this.count = count);
  }

}
