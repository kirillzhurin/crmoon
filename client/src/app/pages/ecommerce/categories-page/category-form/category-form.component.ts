import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd';
import Category from 'src/app/core/models/category';
import { RootState } from 'src/app/core/store';
import {
  GetCategoryAction,
  DeleteCategoryAction,
  selectCategoryById,
  UpdateCategoryAction,
  CreateCategoryAction
} from 'src/app/core/store/categories';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  id: any;
  imagePreview: any = '';
  form: FormGroup;
  category$: Observable<Category>;
  loading$: Observable<boolean>;

  constructor(
    private modalService: NzModalService,
    private route: ActivatedRoute,
    private store: Store<RootState>) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null)
    });

    this.route.params
      .pipe(
        switchMap(({ id }) => {
          if (id) {
            this.id = id;
            this.store.dispatch(new GetCategoryAction(id));
            return this.store.pipe(select(selectCategoryById, { id }));
          }

          return of(null);
        })
      ).subscribe((category: Category) => {
        if (category) {
          this.form.patchValue(category);
          this.imagePreview = category.imageSrc;
        }
      });
  }

  onSubmit() {
    const data = this.form.value;
    if (this.id) {
      data.id = this.id;
      this.store.dispatch(new UpdateCategoryAction(data));
    } else {
      this.store.dispatch(new CreateCategoryAction(data));
    }
  }

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: '<i>Do you Want to delete these items?</i>',
      nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => this.store.dispatch(new DeleteCategoryAction(this.id))
    });
  }

}
