import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { NzModalService, NzMessageService, UploadFile } from 'ng-zorro-antd';
import { Observable, of, Observer, Subject } from 'rxjs';
import { switchMap, filter, take, takeUntil } from 'rxjs/operators';
import { pick } from 'lodash';
import { RootState } from 'src/app/core/store';
import { FileReaderService } from 'src/app/core/utils';
import Product from 'src/app/core/models/product';
import Category from 'src/app/core/models/category';
import { GetProductAction, CreateProductAction, CREATE_PRODUCT_SUCCESS, selectProductById } from 'src/app/core/store/products';
import { LoadCategoriesAction, selectAllCategories, UpdateCategoryAction } from 'src/app/core/store/categories';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  id: string;
  form: FormGroup;
  product$: Observable<Product>;
  categories$: Observable<Category[]>;
  fileList = [];
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  previewImage: string | undefined = '';
  previewVisible = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<RootState>,
    private messageService: NzMessageService,
    private actionSubject: ActionsSubject,
    private fileReaderService: FileReaderService
  ) {}

  ngOnInit() {
    this.store.dispatch(new LoadCategoriesAction());
    this.categories$ = this.store.select(selectAllCategories);

    this.actionSubject.pipe(
      takeUntil(this.destroy$),
      filter(action => action.type === CREATE_PRODUCT_SUCCESS)
    ).subscribe((action: any) => {
      this.messageService.success(CREATE_PRODUCT_SUCCESS);
      this.router.navigate([`/ecommerce/product-details/${ action.payload._id }`])
    })

    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      sku: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      shortDescription: new FormControl(''),
      fullDescription: new FormControl(''),
      price: new FormControl(1, [Validators.required, Validators.min(0.1)]),
      color: new FormControl(null),
      size: new FormControl(null)
    });

    this.route.params.pipe(
      switchMap(({ id, categoryId }) => {
        if (id) {
          this.id = id;
          this.store.dispatch(new GetProductAction(id));
          return this.store.pipe(select(selectProductById, {id}));
        }
        return of(null);
      })
    ).subscribe((product: Product) => {
      if (product) {
        this.form.patchValue(product);
      }
    });
  }

  formatterDollar(value: number) {
    return `$ ${value}`;
  }

  parserDollar(value: string) {
    return value.replace('$ ', '');
  }

  beforeUpload = (file: any) => {
    return new Observable((observer: Observer<boolean>) => {
      this.fileReaderService.getBase64(file, (result: string) => {
        file.thumbUrl = result;
        this.fileList = [...this.fileList, file];
        observer.complete();
        return;
      })
    });
  }

  handlePreview = (file: UploadFile) => {
    this.previewImage =  file.url || file.thumbUrl;
    this.previewVisible = true;
  }

  onSubmit() {
    const data = this.form.value;
    data.images = this.fileList.map(file => {
      if (file.status === 'done') {
        return { url: file.response.path }
      }
      return pick(file.url);
    });
    if (this.id) {
      this.store.dispatch(new UpdateCategoryAction(data));
    } else {
      this.store.dispatch(new CreateProductAction(data));
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
