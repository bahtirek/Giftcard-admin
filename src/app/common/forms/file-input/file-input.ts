import { ChangeDetectorRef, Component, input, output, signal } from '@angular/core';
import { uniqueId } from '../../../helpers/uniqueid';

@Component({
  selector: 'app-file-input',
  imports: [],
  templateUrl: './file-input.html',
  styleUrl: './file-input.scss',
})
export class FileInput {

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.existingFileName || this.existingPreviewUrl) {
      this.hasFile = true;
      this.fileName = this.existingFileName();
      this.fileSizeLabel = this.existingFileSize();
      this.previewUrl = this.existingPreviewUrl();
    }
  }

  private onChange: (value: File | null) => void = () => {};
  private onTouched: () => void = () => {};
  inputFormField = input<any>();
  required = input<boolean>(false);
  label = input<string>('');
  placeholder = input<string>('');
  id = signal<string>(uniqueId());
  accept = signal<string[]>(['image/png', 'image/jpg']);
  existingFileName = input<string | null>(null);
  existingPreviewUrl = input<string | null>(null);
  existingFileSize = input<string | null>(null);
  disabled = input<boolean>(false)
  maxSizeBytes = input<number>(2 * 1024 * 1024);
  hint = input<string>('PNG or JPG, recommended 800x500px, up to 2MB')

  errorChange = output<string>()
  fileSelected = output<File>()
  fileRemoved = output<void>()

  hasFile = false;
  hasError = false;
  isDragover = false;
  errorMessage: string | null = null;
  isDisabled = false

  fileName: string | null = null;
  fileSizeLabel: string | null = null;
  previewUrl: string | null = null;

  // ── ControlValueAccessor ──
  writeValue(file: File | null): void {
    if (file) {
      this.applyFile(file, /* emit */ false);
    } else {
      this.clear(/* emit */ false);
    }
  }

  registerOnChange(fn: (value: File | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled= isDisabled;
  }

  // ── Template event handlers ──

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    console.log(file);

    if (file) {
      this.applyFile(file, /* emit */ true);
    }
    // Reset the native input so selecting the same file twice still fires `change`.
    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    if (this.isDisabled) return;
    event.preventDefault();
    this.isDragover = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragover = false;
  }

  onDrop(event: DragEvent): void {
    if (this.isDisabled) return;
    event.preventDefault();
    this.isDragover = false;
    const file = event.dataTransfer?.files?.[0] ?? null;
    if (file) {
      this.applyFile(file, /* emit */ true);
    }
  }

  onRemove(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.isDisabled) return;
    this.clear(/* emit */ true);
  }

  // ── Core logic ──

  private applyFile(file: File, emit: boolean): void {
    this.onTouched();

    const validationError = this.validate(file);
    if (validationError) {
      this.hasError = true;
      this.hasFile = false;
      this.errorMessage = validationError;
      this.errorChange.emit(validationError);
      this.cdr.markForCheck();
      return;
    }

    this.hasError = false;
    this.errorMessage = null;
    this.hasFile = true;
    this.fileName = file.name;
    this.fileSizeLabel = this.formatFileSize(file.size);

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
      this.cdr.markForCheck();
    };
    reader.readAsDataURL(file);

    if (emit) {
      this.onChange(file);
      this.fileSelected.emit(file);
      this.errorChange.emit('');
    }
  }

  private clear(emit: boolean): void {
    this.hasFile = false;
    this.hasError = false;
    this.errorMessage = null;
    this.fileName = null;
    this.fileSizeLabel = null;
    this.previewUrl = null;

    if (emit) {
      this.onChange(null);
      this.fileRemoved.emit();
      this.errorChange.emit('');
    }
  }

  private validate(file: File): string | null {
    if (this.accept().length && !this.accept().includes(file.type)) {
      const extensions = this.accept()
        .map((type: string) => type.split('/')[1]?.toUpperCase())
        .filter(Boolean)
        .join(' or ');
      return `Unsupported file type — please use ${extensions}`;
    }
    if (file.size > this.maxSizeBytes()) {
      return `File too large — max size is ${this.formatFileSize(this.maxSizeBytes())}`;
    }
    return null;
  }

  private formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  get acceptAttr(): string {
    return this.accept().join(',');
  }
}

/*
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function applyFileToDropzone(file, dropzoneId) {
  const zone = document.getElementById(dropzoneId);
  if (!zone || !file) return;

  if (!['image/png', 'image/jpeg'].includes(file.type)) {
    zone.classList.add('has-error');
    zone.classList.remove('has-file');
    return;
  }
  if (file.size > MAX_FILE_SIZE) {
    zone.classList.add('has-error');
    zone.classList.remove('has-file');
    return;
  }

  zone.classList.remove('has-error');
  zone.classList.add('has-file');

  const nameEl = zone.querySelector('.z-file-upload__filename');
  const sizeEl = zone.querySelector('.z-file-upload__filesize');
  const imgEl = zone.querySelector('.z-file-upload__thumb img');

  if (nameEl) nameEl.textContent = file.name;
  if (sizeEl) sizeEl.textContent = formatFileSize(file.size);

  if (imgEl) {
    const reader = new FileReader();
    reader.onload = e => {
      imgEl.src = e.target.result;
      imgEl.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
}

function handleFileSelect(input, dropzoneId) {
  const file = input.files && input.files[0];
  if (file) applyFileToDropzone(file, dropzoneId);
}

function removeFile(event, dropzoneId, inputId) {
  event.preventDefault();
  event.stopPropagation();
  const zone = document.getElementById(dropzoneId);
  const input = document.getElementById(inputId);
  if (zone) { zone.classList.remove('has-file', 'has-error'); }
  if (input) { input.value = ''; }
  const imgEl = zone ? zone.querySelector('.z-file-upload__thumb img') : null;
  if (imgEl) { imgEl.removeAttribute('src'); imgEl.style.display = 'none'; }
}

document.querySelectorAll('.z-file-upload').forEach(zone => {
  const input = zone.querySelector('input[type="file"]');
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('is-dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('is-dragover'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('is-dragover');
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file && input) {
      input.files = e.dataTransfer.files;
      applyFileToDropzone(file, zone.id);
    }
  });
});
 */
