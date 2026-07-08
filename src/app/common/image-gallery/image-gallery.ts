import { Component, computed, HostListener, input, signal } from '@angular/core';
import { ExistingImage } from '../../dashboard/gift-card/gift-card.interface';

@Component({
  selector: 'app-image-gallery',
  imports: [],
  templateUrl: './image-gallery.html',
  styleUrl: './image-gallery.scss',
})
export class ImageGallery {
  images = input.required<ExistingImage[]>();

  activeIndex = signal<number | null>(null);

  isOpen = computed(() => this.activeIndex() !== null);
  activeImage = computed(() => {
    const idx = this.activeIndex();
    return idx === null ? null : this.images()[idx];
  });

  open(index: number): void {
    this.activeIndex.set(index);
  }

  close(): void {
    this.activeIndex.set(null);
  }

  next(): void {
    const idx = this.activeIndex();
    if (idx === null) return;
    this.activeIndex.set((idx + 1) % this.images().length);
  }

  prev(): void {
    const idx = this.activeIndex();
    if (idx === null) return;
    const len = this.images().length;
    this.activeIndex.set((idx - 1 + len) % len);
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (!this.isOpen()) return;
    if (event.key === 'Escape') this.close();
    if (event.key === 'ArrowRight') this.next();
    if (event.key === 'ArrowLeft') this.prev();
  }
}
