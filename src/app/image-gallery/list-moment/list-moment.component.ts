import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatInput } from '@angular/material';
import { MyserviceService } from '../../myservice.service';
import Swal from 'sweetalert2' ;

@Component({
  selector: 'app-list-moment',
  templateUrl: './list-moment.component.html',
  styleUrls: ['./list-moment.component.css']
})
export class ListMomentComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:false}) sort: MatSort;

  constructor(private myservice: MyserviceService) {

  }
  displayedColumns: string[] = ['Sr_No', 'Image', 'Title', 'Tags','Action'];
  p: number;
  ngOnInit() {
   this.getList();
  }

getList(){
  this.myservice.getimagedetails().subscribe( (res: any) => {
    this.dataSource = new MatTableDataSource(res.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
}

  deleteRecord(id: string){

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.myservice.deleteImageDetails(id).subscribe((res: any) => {
          if(res.status == "success"){
            this.myservice.callToast('record has been deleted.','success');
            this.getList();
          }

        });
      }
    })

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
