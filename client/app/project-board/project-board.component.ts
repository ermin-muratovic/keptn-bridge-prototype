import {Component, OnDestroy, OnInit} from '@angular/core';
import {first, map} from "rxjs/operators";
import {Observable, Subscription} from "rxjs";
import {Project} from "../_models/project";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../_services/api.service";
import {Root} from "../_models/root";
import {Trace} from "../_models/trace";

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent implements OnInit, OnDestroy {

  private routeSub: Subscription = Subscription.EMPTY;
  public project: Observable<Project>;

  public currentRoot: Root;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      if(params['projectName']) {
        this.currentRoot = null;

        this.project = this.apiService.projects.pipe(
          map(projects => projects.find(project => {
            return project.projectName === params['projectName'];
          }))
        );

        this.project.pipe(first(project => !!project && !!project.services)).subscribe(project => {
          project.services.forEach(service => {
            this.apiService.loadRoots(project, service);
          });
        });
      }
    });
  }

  selectRoot(root) {
    this.currentRoot = root;
    this.apiService.loadTraces(root);
  }

  loadTraces(root) {
    this.apiService.loadTraces(root);
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}
