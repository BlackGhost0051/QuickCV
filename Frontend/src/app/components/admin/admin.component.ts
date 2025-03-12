import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [ CommonModule ],
  templateUrl: './admin.component.html',
  standalone: true,
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  users: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getAllUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  deleteUser(login: string) {
    this.adminService.deleteUser(login).subscribe(() => {
      this.loadUsers();
    });
  }
}
