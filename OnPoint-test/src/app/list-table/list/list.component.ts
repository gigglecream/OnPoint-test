import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { SortService } from '../sort.service';
import { Data } from 'src/app/models/data';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  dataList: Data[];
  showList: Data[];
  page: number;
  maxPage: number;
  nextDisabled: boolean;
  prevDisabled: boolean;
  idSorted: boolean;
  valueSorted: boolean;

  constructor(
    private listService: ListService
  ) { }

  ngOnInit() {
    this.getList();
  }

  showDataList() {
    this.nextDisabled = true;
  
    if (!this.page) {
      this.page = 1;
    }
    if (this.page < this.maxPage) {
      this.nextDisabled = false
    }
    if (this.page == 1) {
      this.prevDisabled = true;
    }
    this.showList = this.dataList.slice(Math.floor((this.page * 5) - 5), Math.floor((this.page * 5)));
  }

  nextPage() {
    if (this.page < this.maxPage) {
      this.page++
      this.showDataList();
      this.prevDisabled = false;
    } else if (this.page == this.maxPage) {
      this.nextDisabled = true;
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--
      this.showDataList();
    }
  }

  getList() {
    if (!this.page) {
      this.page = 1;
      this.prevDisabled = true;
    }
    this.listService.getData()
    .subscribe(data => {
      this.dataList = data;
      if (Math.floor(this.dataList.length / 5) < this.dataList.length / 5) {
        this.maxPage = Math.floor(this.dataList.length / 5) + 1;
      } else {
        this.maxPage = Math.floor(this.dataList.length / 5);
      }
      this.showList = this.dataList.slice(Math.floor((this.page * 5) - 5), Math.floor((this.page * 5)));
    })
  }

  sortList(value) {
    if (value == 1) {
      if (!this.idSorted) {
        this.dataList.sort(function(obj1, obj2) {
          return obj1.id - obj2.id
        })
      } else {
        this.dataList.sort(function(obj1, obj2) {
          return obj2.id - obj1.id
        })
      }
      this.idSorted = !this.idSorted
    } else if (value ==2) {
      if (!this.valueSorted) {
        this.dataList.sort(function(obj1, obj2) {
          return obj1.value - obj2.value
        })
      } else {
        this.dataList.sort(function(obj1, obj2) {
          return obj2.value - obj1.value
        })
      }
      this.valueSorted = !this.valueSorted
    }
    this.showList = this.dataList.slice(Math.floor((this.page * 5) - 5), Math.floor((this.page * 5)));
  }

}
