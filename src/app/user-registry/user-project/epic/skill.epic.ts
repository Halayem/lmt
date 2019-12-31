import { SkillService } from '../service/skill.service';
import { Injectable } from '@angular/core';
import { ActionsObservable, ofType } from 'redux-observable-es6-compat';
import { SkillActions } from '../action/skill';
import { HttpClient } from '@angular/common/http';
import { Skill } from '../model/project';
import { environment } from 'src/environments/environment';
import { Action } from 'redux';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class SkillEpics {
    constructor( readonly skillService: SkillService,
                 readonly http: HttpClient,
                 readonly skillActions: SkillActions ) {}

    load = ( action$: ActionsObservable<Action> ) => {
        return ( action$.pipe(
            ofType  ( SkillActions.LOAD ),
            mergeMap( action$ => 
                this.http.get<Skill[]>( `${environment.baseUrl}/skills` )
                         .pipe ( 
                            map( response => ({
                                    type:       'LOADED',
                                    payload:    response
                                })
                            )
                        )
            )
        ));
    }
}
