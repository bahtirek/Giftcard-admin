import { ChangeDetectorRef, Component, computed, effect, input, output, Signal, signal } from '@angular/core';
import { uniqueId } from '../../../helpers/uniqueid';
import { ExistingImage, UploadedFileItem } from '../../../dashboard/gift-card/gift-card.interface';

@Component({
  selector: 'app-multi-file-input',
  imports: [],
  templateUrl: './multi-file-input.html',
  styleUrl: './multi-file-input.scss',
})
export class MultiFileInput {
  constructor(private cdr: ChangeDetectorRef) {}

  private onTouched: () => void = () => {};
  inputFormField = input<any>();
  required = input<boolean>(false);
  label = input<string>('');
  placeholder = input<string>('');
  id = signal<string>(uniqueId());
  accept = signal<string[]>(['image/png', 'image/jpg']);
  disabled = input<boolean>(false)
  maxSizeBytes = input<number>(2 * 1024 * 1024);
  hint = input<string>('PNG or JPG, recommended 800x500px, up to 2MB')
  maxFiles = input<number>(6);
  existingImages = input<ExistingImage[]>()

  errorChange = output<string>()
  fileSelected = output<File>()
  fileRemoved = output<void>()
  filesChanged = output<UploadedFileItem[]>();
  imageFiles = input<File[]>()

  /** Emits the list of remaining existing files (after any removals) whenever it changes. */
  existingFilesChanged = output<ExistingImage[]>();
  existingFileRemoved= output<string>();

  isDragover = false;
  errorMessage: string | null = null;
  isDisabled = signal<boolean>(false)

  fileName: string | null = null;
  fileSizeLabel: string | null = null;
  previewUrl: string | null = null;

  items: UploadedFileItem[] = [];

  get remainingSlots(): number {
    return Math.max(0, this.maxFiles() - this.items.length);
  }

  canAddMore: Signal<boolean> = computed(() => {
    return this.remainingSlots > 0 && !this.isDisabled()
  })

  get acceptAttr(): string {
    return this.accept().join(',');
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    this.addFiles(files);
    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    if (!this.canAddMore()) return;
    event.preventDefault();
    this.isDragover = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragover = false;
  }

  onDrop(event: DragEvent): void {
    if (!this.canAddMore()) return;
    event.preventDefault();
    this.isDragover = false;
    const files = Array.from(event.dataTransfer?.files ?? []);
    this.addFiles(files);
  }

  onRemove(event: Event, item: UploadedFileItem): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.isDisabled()) return;

    if(item.previewUrl) this.existingFileRemoved.emit(item.id)
    this.items = this.items.filter((i) => i.id !== item.id);
    this.emitChanges();
  }

  private addFiles(files: File[]): void {
    if (!files.length) return;
    this.onTouched();

    let added = 0;
    for (const file of files) {
      if (this.items.length >= this.maxFiles()) {
        this.setError(`You can upload up to ${this.maxFiles} files`);
        break;
      }
      const ok = this.addFile(file, /* emit */ false);
      if (ok) added++;
    }

    if (added > 0) {
      this.emitChanges();
    }
  }

  private addFile(file: File, emit: boolean): boolean {
    const validationError = this.validate(file);
    if (validationError) {
      this.setError(validationError);
      return false;
    }

    this.clearError();

    const item: UploadedFileItem = {
      id: uniqueId(),
      file,
      name: file.name,
      sizeLabel: this.formatFileSize(file.size),
      previewUrl: null,
      isExisting: false,
    };
    this.items = [...this.items, item];

    const reader = new FileReader();
    reader.onload = () => {
      item.previewUrl = reader.result as string;
      this.cdr.markForCheck();
    };
    reader.readAsDataURL(file);

    if (emit) this.emitChanges();
    return true;
  }

  private emitChanges(): void {
    const newFiles = this.items
      .filter((i) => !i.isExisting && i.file)
      .map((i) => i.file as File);
    const remainingExisting = this.items
      .filter((i) => i.isExisting)
      .map((i) => ({ name: i.name, url: i.previewUrl ?? '', sizeLabel: i.sizeLabel }));

    this.filesChanged.emit(this.items);
    this.existingFilesChanged.emit(remainingExisting as ExistingImage[]);
  }

  private validate(file: File): string | null {
    if (this.accept.length && !this.accept().includes(file.type)) {
      const extensions = this.accept()
        .map((type) => type.split('/')[1]?.toUpperCase())
        .filter(Boolean)
        .join(' or ');
      return `${file.name}: unsupported file type — please use ${extensions}`;
    }
    if (file.size > this.maxSizeBytes()) {
      return `${file.name}: too large — max size is ${this.formatFileSize(this.maxSizeBytes())}`;
    }
    return null;
  }

  private setError(message: string): void {
    this.errorMessage = message;
    this.errorChange.emit(message);
  }

  private clearError(): void {
    if (this.errorMessage !== null) {
      this.errorMessage = null;
      this.errorChange.emit('');
    }
  }

  private formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  existingImagesWatchEffect = effect(() => {
    if(!this.existingImages()) return;
    if(this.existingImages()!.length === 0) return;

    this.items = this.existingImages()!.map((f) => ({
      id: f.id || uniqueId(),
      file: null,
      name: f.name,
      sizeLabel: f.sizeLabel ?? '',
      previewUrl: f.url,
      isExisting: true,
    }));
  });
}
