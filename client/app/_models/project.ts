import {Stage} from "./stage";
import {Service} from "./service";

export class Project {
  projectName: string;
  gitUser: string;
  gitRemoteURI: string;
  gitToken: string;

  stages: Stage[];
  services: Service[];
}
