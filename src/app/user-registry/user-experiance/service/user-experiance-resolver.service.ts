import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserExperiancenceService } from './user-experiancence.service';
import { forkJoin } from 'rxjs';
import { SkillService } from './skill.service';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root'
})
export class UserExperianceResolverService implements Resolve<any> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return forkJoin(
      this.roleService.getRoles(),
      this.skillService.getSkills()
    );
  }

  constructor(
    readonly skillService: SkillService,
    readonly roleService: RoleService) { }
}
