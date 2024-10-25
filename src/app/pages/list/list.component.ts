import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user.interfaces';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  apiService = inject(ApiService)
  fb = inject(FormBuilder);

  users: User[] = [];
  usersFiltered: User[] = [];
  
  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      search: new FormControl('')
    });

    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((input) => {
      if (input.search === "") {
        this.usersFiltered = this.users;
      }else{
        // Filter the array of users
      this.usersFiltered = this.users.filter((user) => user.name.includes(input.search));
      }
    })
  }

  ngOnInit(): void {
    // Call the service with get the data
    this.apiService.getUsers().pipe(take(1)).subscribe({
      next: (users) => {
        this.users = users;

        // Array to support search
        this.usersFiltered = users;
      },
      error: () => {
        console.error('Something wrong happens')
      }
    })
  }
}
