import { Component, OnInit,AfterContentInit,Input } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
@Input() hidden:boolean;
    sampleObjectData: any[];
    assetNames: Array<any>;
    fieldNames: Array<any>;
    regions: Array<any>;
    assetCount: number;
    categories;
    constructor(private dataservice:DataService) {
    this.categories = ["Asset_Name","FieldName","Region"]
   }
    result: any[];
    filteredCategories = { 'assets': new Set(), 'fields': new Set(), 'regions': new Set() }

    ngOnInit(): void {
      // this.fetchDataService.getActualJSON()
      //   .subscribe(data => {
      //     this.sampleObjectData = data;

        //   console.log(this.categories)
        //   console.log(data);
        // });
      //  this.getData();
      
    }

    getData(){
      this.dataservice.getResultData().subscribe((data)=>{this.sampleObjectData = data;
        console.log("this is sampleobjectdata",this.sampleObjectData);
      })
      this.sortData(this.sampleObjectData)
    }

    sortData(sampleData) {
      let assetNames = new Set()
      let fieldNames = new Set()
      let regions = new Set()
      console.log("sampleData",sampleData);
      sampleData.map(obj => {

        assetNames.add(obj.Asset_Name);
        fieldNames.add(obj.FieldName);
        regions.add(obj.Region);
      })

      console.log("asset name",assetNames);
      console.log(fieldNames);
      console.log(regions);

      this.assetNames = Array.from(assetNames)
      this.assetNames = this.assetNames.map((el) => {
        return { name: el, count: this.countValues(this.categories[0], el) }
      })
      console.log(this.assetNames);

      this.fieldNames = Array.from(fieldNames)
      this.fieldNames = this.fieldNames.map((el) => {
        return { name: el, count: this.countValues(this.categories[1], el) }
      })

      this.regions = Array.from(regions)
      this.regions = this.regions.map((el) => {
        return { name: el, count: this.countValues(this.categories[2], el) }
      })
    }

    countValues(key: string, value: string) {
      let count = 0;
      this.sampleObjectData.map(el => { return el[key] === value ? count++ : count })
      return count;
    }

    clicked(event, category) {
      let value = event.target.value;
      if (event.target.checked) {
        this.filteredCategories['' + category].add(value)
      }
      else {
        this.filteredCategories['' + category].delete(value)
      }
      this.filterResultData(this.filteredCategories);
    }

    filterResultData(filteredCategories) {
      // this.result = this.sampleObjectData.map((row) => {
      //   if (filteredCategories['assets'].has(row.Asset_Name)|| filteredCategories['fields'].has(row.FieldName) || filteredCategories['regions'].has(row.Region)) {
      //     row.selected = true
      //     return row;
      //   }
      //   else {
      //     row.selected = false
      //     return row;
      //   }
      // })
      this.result = this.sampleObjectData.map((row) => {
      if (filteredCategories['assets'].has(row.Asset_Name) ) {
        row.selected = true
        return row;
      }
      else {
        if(filteredCategories['fields'].has(row.FieldName) ){
          row.selected = true
          return row;
        }
            else{
              if(filteredCategories['regions'].has(row.Region)){
                row.selected = true
                return row;
              }
              else{
                row.selected = false
                return row;
              }
            }
          }
        })
      //console.log(this.result);
      function isValid(obj){
      return (obj.selected || obj.selected==undefined)
    };
    let answer = this.result.filter(isValid);
    console.log("answer",answer);
    if(this.filteredCategories['assets'].size==0 && this.filteredCategories['fields'].size==0 && this.filteredCategories['regions'].size==0){
      console.log("filteredCategories", this.filteredCategories)
      this.reset();
    }else
      this.dataservice.dataComm(answer);
    }

    reset(){
      this.result.map((data)=>{data.selected=undefined})
      this.filteredCategories = { 'assets': new Set(), 'fields': new Set(), 'regions': new Set() };
      console.log("data",this.result)
      this.dataservice.dataComm(this.result);
       this.getData();
    }
}
