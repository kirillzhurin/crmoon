import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, of, Observer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NzModalService, UploadFile, NzMessageService } from 'ng-zorro-antd';
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
  loadingImage = false;
  imagePreview: string;
  imageFile: File;
  form: FormGroup;
  category$: Observable<Category>;
  loading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<RootState>,
    private modalService: NzModalService,
    private messageService: NzMessageService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('')
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
    data.image = this.imageFile;
    if (this.id) {
      data.id = this.id;
      this.store.dispatch(new UpdateCategoryAction(data));
    } else {
      this.store.dispatch(new CreateCategoryAction(data));
    }
  }

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.messageService.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }

      this.checkImageDimension(file).then(dimensionRes => {
        if (!dimensionRes) {
          this.messageService.error('Image only 300x300 above');
          observer.complete();
          return;
        }
        this.imageFile = file;
        this.loadingImage = true;
        this.getBase64(file, (img: string) => {
          this.loadingImage = false;
          this.imagePreview = img;
        })
        observer.complete();
      });
    });
  }

  private checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src!);
        resolve(width === height && width >= 300);
      };
    });
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: '<i>Do you Want to delete these items?</i>',
      nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => this.store.dispatch(new DeleteCategoryAction(this.id))
    });
  }

}
