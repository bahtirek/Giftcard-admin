import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  contentChild,
  effect,
  input,
  output,
  signal,
  model,
  HostListener,
  forwardRef,
} from '@angular/core';
import { DropdownTriggerDirective } from './dropdown-trigger.directive';
import { DROPDOWN_HOST } from './dropdown-host.token';
import { Option } from '../../interfaces/options';

@Component({
  selector: 'app-dropdown',
  imports: [],
  templateUrl: './dropdown.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './dropdown.scss',
  host: {
    class: 'dropdown-host',
    '[class.dropdown-host--open]': 'open()',
  },
  providers: [{ provide: DROPDOWN_HOST, useExisting: forwardRef(() => Dropdown) },],
})

export class Dropdown {
  /** All selectable options */
  options = input.required<Option[]>();

  /** Placeholder text shown when nothing is selected (built-in trigger only) */
  placeholder = input<string>('Select an option');

  /** Disable the whole control */
  disabled = input<boolean>(false);

  /** Two-way bindable selected value: [(value)]="selected" */
  value = model<string | number | boolean | null | undefined>(null);

  /**
   * Two-way bindable open state: [(open)]="isOpen".
   * A parent can read it, set it, or bind it to drive the panel externally
   * (e.g. open the dropdown from an unrelated button or keyboard shortcut).
   */
  open = model<boolean>(false);

  /** Emits the full option object whenever selection changes */
  readonly selectionChange = output<Option>();

  /**
   * Detects a projected [appDropdownTrigger] element. When present, the
   * built-in trigger button is not rendered — the button becomes optional.
   */
  protected readonly customTrigger = contentChild(DropdownTriggerDirective);
  protected readonly hasCustomTrigger = computed(() => !!this.customTrigger());

  /** Index currently highlighted via keyboard navigation */
  protected readonly activeIndex = signal(-1);

  protected readonly selectedOption = computed(() =>
    this.options().find((o) => o.value === this.value()) ?? null
  );

  private readonly enabledIndices = computed(() =>
    this.options()
      .map((o, i) => (o.disabled ? -1 : i))
      .filter((i) => i !== -1)
  );

  constructor(private readonly host: ElementRef<HTMLElement>) {
    // Reset the highlighted item every time the panel opens,
    // however it was opened (button, custom trigger, or parent binding).
    effect(() => {
      if (this.open()) {
        const currentIndex = this.options().findIndex(
          (o) => o.value === this.value()
        );
        this.activeIndex.set(
          currentIndex !== -1 ? currentIndex : (this.enabledIndices()[0] ?? -1)
        );
      }
    });
  }

  // --- Public API (used by the built-in button, the trigger directive,
  // and directly by a parent holding a template reference, e.g. #dd="appDropdown") ---

  toggleDropdown(): void {
    if (this.disabled()) return;
    this.open.update((isOpen) => !isOpen);
  }

  openDropdown(): void {
    if (this.disabled()) return;
    this.open.set(true);
  }

  closeDropdown(): void {
    this.open.set(false);
  }

  handleTriggerKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.openDropdown();
        break;
      case 'Escape':
        this.closeDropdown();
        break;
    }
  }

  protected select(option: Option): void {
    if (option.disabled) return;
    this.value.set(option.value);
    this.selectionChange.emit(option);
    this.closeDropdown();
  }

  protected onOptionHover(index: number): void {
    this.activeIndex.set(index);
  }

  // --- Keyboard interaction within the open panel ---------------------------

  protected onPanelKeydown(event: KeyboardEvent): void {
    const enabled = this.enabledIndices();
    if (enabled.length === 0) return;

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        this.activeIndex.set(this.nextEnabledIndex(enabled, 1));
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        this.activeIndex.set(this.nextEnabledIndex(enabled, -1));
        break;
      }
      case 'Home':
        event.preventDefault();
        this.activeIndex.set(enabled[0]);
        break;
      case 'End':
        event.preventDefault();
        this.activeIndex.set(enabled[enabled.length - 1]);
        break;
      case 'Enter':
      case ' ': {
        event.preventDefault();
        const option = this.options()[this.activeIndex()];
        if (option) this.select(option);
        break;
      }
      case 'Escape':
        event.preventDefault();
        this.closeDropdown();
        break;
      case 'Tab':
        this.closeDropdown();
        break;
    }
  }

  private nextEnabledIndex(enabled: number[], direction: 1 | -1): number {
    const current = this.activeIndex();
    const pos = enabled.indexOf(current);
    const nextPos = (pos + direction + enabled.length) % enabled.length;
    return enabled[nextPos];
  }

  // --- Outside click handling ------------------------------------------------

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.open()) return;
    const target = event.target as Node;
    if (!this.host.nativeElement.contains(target)) {
      this.closeDropdown();
    }
  }
}
