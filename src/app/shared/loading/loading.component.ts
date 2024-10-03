import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  template: `
    <div *ngIf="isLoading$ | async" class="loading-overlay">
      <div class="spinner"></div>
    </div>
  `,
  styleUrls: ['loading.component.css']
})
export class LoadingComponent {
  isLoading$ = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) {}
}
