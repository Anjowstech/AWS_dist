import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  //transform(items: any[], filter: string): any {
  //  if (!items || !filter) {
  //    return items;
  //  }
  // //  To search values only of "name" variable of your object(item)
  ////  return items.filter(item => item.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);

  // //  To search in values of every variable of your object(item)
  //  return items.filter(item => JSON.stringify(item.toLowerCase()).indexOf(filter.toLowerCase()) !== -1);
  //}
  //transform(items: any[], filter: string): any {
  //  if (!items || !filter) {
  //    return items;
  //  }
  //  // To search values only of "name" variable of your object(item)
  //  //return items.filter(item => item.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);



  //  // To search in values of every variable of your object(item)
  //return items.filter(item => JSON.stringify(item).toLowerCase().indexOf(filter.toLowerCase()) !== -1);


  //}
  transform(items: any[], searchText: string, filterMetadata: any): any[] {

    if (!items) return [];
    if (!searchText) {
      filterMetadata.count = items.length;
      return items;
    }
    searchText = searchText.toLowerCase();

    let filteredItems = items.filter(item => JSON.stringify(item).toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
    filterMetadata.count = filteredItems.length;
    return filteredItems;

  }


  //transform(items: any[], searchText: string): any[] {
  //  if (!items) {
  //    return [];
  //  }
  //  if (!searchText) {
  //    return items;
  //  }
  //  searchText = searchText.toLocaleLowerCase();

  //  return items.filter(it =>
  //   it.INCIName.toLowerCase().startsWith(searchText));

  //}

}
