import {Component, OnInit} from '@angular/core';
import {Employee} from "../../models/employee";
import {EmployeeService} from "../../services/employee.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EditEmployeeComponent} from "../edit-employee/edit-employee.component";
import {StateService} from "../../services/state.service";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  newVal = '';

  constructor(private dialog: MatDialog,
              private stateService: StateService,
              private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(
      value => {
        console.log('success', value);
        this.employees = value;
      }, error => {
        console.log('error', error);
      }
    )
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(
      () => {
        this.employees = this.employees.filter(item => item.id != id);
      }, error => {
        console.log('error', error);
      }
    )
  }

  editEmployee(employee: Employee) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.height = 'auto';
    dialogConfig.width = 'auto';
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      data: {employee: employee},
    });
    dialogRef.afterClosed().subscribe(async dialogResult => {
      if (dialogResult) {
        this.getEmployees();
      }
    });
  }


  createEmployee() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.height = 'auto';
    dialogConfig.width = 'auto';
    const dialogRef = this.dialog.open(EditEmployeeComponent);
    dialogRef.afterClosed().subscribe(async dialogResult => {
      if (dialogResult) {
        this.getEmployees();
      }
    });
  }

  change() {
    this.stateService.setState(this.newVal);
  }
}
