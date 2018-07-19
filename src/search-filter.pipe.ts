import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any {
    if (!items) { return []; }
    if (!value) { return items; }
    return items.filter(function (node) {
      let found = false;
      for (const key in node) {
        if (node[key]) {
          const searchResult = node[key].toString().toLowerCase().indexOf(value.toLowerCase());
          if (searchResult > -1) {
            found = true;
            break;
          }
        }
      }
      return found;
    });
  }

}
