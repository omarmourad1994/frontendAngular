import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EmployeeService} from "../../services/employee.service";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employeeForm = this.fb.group({
    id: [],
    name: ['', [Validators.required]],
    age: [0, [Validators.required]],
    address: ['', [Validators.required]],
    country: ['', [Validators.required]]
  });

  isEdit = false;

  constructor(private employeeService: EmployeeService,
              private fb: FormBuilder,
              private dialog: MatDialog,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<EditEmployeeComponent>) {
    if (data && data.employee) {
      this.isEdit = true;
      this.employeeForm.patchValue({
        id: data.employee.id,
        age: data.employee.age,
        name: data.employee.name,
        address: data.employee.address,
        country: data.employee.country
      });
    }
  }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close(false);
  }

  save() {
    if (this.isEdit) {
      this.employeeService.editEmployee(this.employeeForm.controls['id'].value, this.employeeForm.value).subscribe(
        value => {
          console.log('success', value);
          this.dialogRef.close(true);
        }, error => {
          console.log('error', error);
          this.dialogRef.close(false);
        }
      )
    } else {
      this.employeeService.createEmployee(this.employeeForm.value).subscribe(
        value => {
          console.log('success', value);
          this.dialogRef.close(true);
        }, error => {
          console.log('error', error);
          this.dialogRef.close(false);
        }
      )
    }
  }
}
