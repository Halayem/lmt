import { Profile } from '../model/project';
import { ProfileActions } from '../action/profile.action';

export interface ProfileState {
    profiles: Profile[]
};

export const PROFILE_INITIAL_STATE: ProfileState = {
    profiles: []
};

export function profileReducer( lastState: ProfileState, action: any ): any {
    console.info ( 'input parameters - last state: <', lastState, '> action: <', action, '>' );
    switch ( action.type ) {
        case ProfileActions.EVENT_PROFILE_LOADED: return action.payload;
        default: {
            console.info ( 'unhandled action type for this reducer, returning last state' );
            if ( typeof lastState === 'undefined' ) {
                return null;
            }
            return lastState;
        } 
    }
};
