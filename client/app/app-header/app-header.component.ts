import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RoutesRecognized} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {Project} from "../_models/project";
import {ApiService} from "../_services/api.service";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {

  private routeSub: Subscription = Subscription.EMPTY;
  public projects: Observable<Project[]>;
  public project: Observable<Project>;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.projects = this.apiService.projects;

    this.routeSub = this.router.events.subscribe(event => {
      if(event instanceof RoutesRecognized) {
        let projectName = event.state.root.children[0].params['projectName'];
        this.project = this.apiService.projects.pipe(
          map(projects => projects.find(p => {
            return p.projectName === projectName;
          }))
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}
