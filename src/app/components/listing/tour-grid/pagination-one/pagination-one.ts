import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-one',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pagination-one.html',
})
export class PaginationOne {
  @Input() currentPage = 1;
  @Input() totalPages = 5;
  @Input() maxVisiblePages = 5;
  @Input() compact = false;

  @Output() pageChange = new EventEmitter<number>();

  get normalizedTotalPages(): number {
    return Math.max(1, Math.floor(Number(this.totalPages) || 1));
  }

  get normalizedCurrentPage(): number {
    return Math.min(
      this.normalizedTotalPages,
      Math.max(1, Math.floor(Number(this.currentPage) || 1)),
    );
  }

  get visiblePages(): Array<number | 'ellipsis'> {
    const totalPages = this.normalizedTotalPages;
    const maxVisiblePages = Math.max(3, Math.floor(Number(this.maxVisiblePages) || 5));

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const currentPage = this.normalizedCurrentPage;
    const middlePageCount = Math.max(1, maxVisiblePages - 2);
    let startPage = Math.max(2, currentPage - Math.floor(middlePageCount / 2));
    let endPage = startPage + middlePageCount - 1;

    if (endPage >= totalPages) {
      endPage = totalPages - 1;
      startPage = Math.max(2, endPage - middlePageCount + 1);
    }

    const pages: Array<number | 'ellipsis'> = [1];

    if (startPage > 2) {
      pages.push('ellipsis');
    }

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    if (endPage < totalPages - 1) {
      pages.push('ellipsis');
    }

    pages.push(totalPages);
    return pages;
  }

  goToPage(page: number): void {
    const targetPage = Math.min(
      this.normalizedTotalPages,
      Math.max(1, Math.floor(Number(page) || 1)),
    );

    if (targetPage === this.normalizedCurrentPage) return;

    this.currentPage = targetPage;
    this.pageChange.emit(targetPage);
  }
}
