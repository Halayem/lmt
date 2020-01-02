import { ProfileService } from '../service/profile.service';
import { Injectable } from '@angular/core';
import { ActionsObservable, ofType } from 'redux-observable-es6-compat';
import { ProfileActions } from '../action/profile.action';
import { Action } from 'redux';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class ProfileEpics {
    constructor( readonly profileService: ProfileService,
                 readonly profileActions: ProfileActions ) {}

    load = ( action$: ActionsObservable<Action> ) => {
        return ( action$.pipe(
            ofType  ( ProfileActions.COMMAND_PROFILE_LOAD ),
            mergeMap( () => 
                this.profileService
                    .getProfiles()
                    .pipe ( 
                        map( response => 
                            ({
                                type:       ProfileActions.EVENT_PROFILE_LOADED,
                                payload:    response
                            })
                        )
                    )
            )
        ));
    };
}
