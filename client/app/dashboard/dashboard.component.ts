import {Component, OnInit} from '@angular/core';
import {Project} from "../_models/project";
import {ApiService} from "../_services/api.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public projects: Observable<Project[]>;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.projects = this.apiService.projects;
  }

}
