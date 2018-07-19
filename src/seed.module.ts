import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from './search-filter.pipe';
import { ClickOutsideModule } from 'ng4-click-outside';

import { SeedService } from './seed.service';
import { SeedComponent } from './seed.component';

export function seedServiceFactory() {
	return new SeedService();
}

@NgModule({
	imports: [CommonModule,FormsModule,ClickOutsideModule],
	providers: [
		{ provide: SeedService, useFactory: seedServiceFactory }
	],
	declarations: [SeedComponent,SearchFilterPipe],
	exports: [SeedComponent,SearchFilterPipe]
})
export class SeedModule { }
