import { SkillService } from '../service/skill.service';
import { Injectable } from '@angular/core';
import { ActionsObservable, ofType } from 'redux-observable-es6-compat';
import { SkillActions } from '../action/skill.action';
import { Action } from 'redux';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class SkillEpics {
    constructor( readonly skillService: SkillService,
                 readonly skillActions: SkillActions ) {}

    load = ( action$: ActionsObservable<Action> ) => {
        return ( action$.pipe(
            ofType  ( SkillActions.COMMAND_SKILL_LOAD ),
            mergeMap( () => 
                this.skillService
                    .getSkills()
                    .pipe ( 
                        map( response => 
                            ({
                                type:       SkillActions.EVENT_SKILL_LOADED,
                                payload:    response
                            })
                        )
                    )
            )
        ));
    };
}
