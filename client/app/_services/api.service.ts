import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, of} from "rxjs";
import {catchError, map, retry} from "rxjs/operators";

import {environment} from "../../environments/environment";

import {Root} from "../_models/root";
import {Trace} from "../_models/trace";
import {Project} from "../_models/project";
import {Resource} from "../_models/resource";
import {Stage} from "../_models/stage";
import {Service} from "../_models/service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = environment.apiUrl;
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  private _projects = new BehaviorSubject<Project[]>([]);
  private dataStore: { projects: Project[]} = { projects: [] };

  constructor(private http: HttpClient) {
    this.loadProjects();
  }

  get projects(): Observable<Project[]> {
    return this._projects.asObservable();
  }

  public loadProjects() {
    this.getProjects()
      .subscribe((projects: Project[]) => {
        projects.forEach((project: Project) => {
          project.stages = [];
          project.services = [];
          this.getStages(project.projectName)
            .pipe(map(o => o.map(s => Stage.fromJSON(s))))
            .subscribe((stages: Stage[]) => {
              project.stages = stages;
              project.stages.forEach((stage: Stage) => {
                this.getServices(project.projectName, stage.stageName)
                  .subscribe((services: Service[]) => {
                    stage.services = services;
                    project.services = project.services.concat(stage.services.filter(s => !project.services.some(ss => ss.serviceName == s.serviceName)));

                    this.dataStore.projects = projects;
                    this._projects.next(Object.assign({}, this.dataStore).projects);
                  });
              });
            });
        });
      });
  }

  public loadRoots(project: Project, service: Service) {
    this.getRoots(project.projectName, service.serviceName)
      .pipe(map(o => o.map(r => Root.fromJSON(r))))
      .subscribe((roots: Root[]) => {
        service.roots = roots;
        roots.forEach((root: Root) => {
          this.loadTraces(root);
        });
      });
  }

  public loadTraces(root: Root) {
    this.getTraces(root.shkeptncontext)
      .pipe(map(o => o.map(t => Trace.fromJSON(t))))
      .subscribe((traces: Trace[]) => {
        root.traces = traces;
      });
  }

  private getProjects(): Observable<Project[]> {
    let url = `${this.baseUrl}/api/project`;
    return this.http
      .get<Project[]>(url, { headers: this.headers })
      .pipe(retry(3), catchError(this.handleError<Project[]>('getProjects')));
  }

  private getProjectResources(projectName): Observable<Resource[]> {
    let url = `${this.baseUrl}/api/project/${projectName}/resource`;
    return this.http
      .get<Resource[]>(url, { headers: this.headers })
      .pipe(retry(3), catchError(this.handleError<Resource[]>('getProjectResources')));
  }

  private getStages(projectName): Observable<Stage[]> {
    let url = `${this.baseUrl}/api/project/${projectName}/stage`;
    return this.http
      .get<Stage[]>(url, { headers: this.headers })
      .pipe(catchError(this.handleError<Stage[]>('getStages')));
  }

  private getServices(projectName, stageName): Observable<Service[]> {
    let url = `${this.baseUrl}/api/project/${projectName}/stage/${stageName}/service`;
    return this.http
      .get<Service[]>(url, { headers: this.headers })
      .pipe(catchError(this.handleError<Service[]>('getServices')));
  }

  private getRoots(projectName: string, serviceName: string): Observable<Root[]> {
    let url = `${this.baseUrl}/api/roots/${projectName}/${serviceName}`;
    return this.http
      .get<Root[]>(url, { headers: this.headers })
      .pipe(catchError(this.handleError<Root[]>('getRoots')));
  }

  private getTraces(contextId: string): Observable<Trace[]> {
    let url = `${this.baseUrl}/api/traces/${contextId}`;
    return this.http
      .get<Trace[]>(url, { headers: this.headers })
      .pipe(catchError(this.handleError<Trace[]>('getTraces')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: handel error and show to the user?!
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }

}
