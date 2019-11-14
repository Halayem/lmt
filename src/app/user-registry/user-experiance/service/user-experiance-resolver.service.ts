import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserExperiancenceService } from './user-experiancence.service';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserExperianceResolverService implements Resolve<any> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return forkJoin(
      // this.userExperiancenceService.getAllEntreprise(),
      this.userExperiancenceService.getAllRole(),
      this.userExperiancenceService.getAllTechnos()
    )
  }

  constructor(private userExperiancenceService: UserExperiancenceService) { }
}
