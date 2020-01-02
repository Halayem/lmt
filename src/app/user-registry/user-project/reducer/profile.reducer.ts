import { Profile } from '../model/project';
import { ProfileActions } from '../action/profile.action';

export interface ProfileState {
    profiles: Profile[]
};

export const PROFILE_INITIAL_STATE: ProfileState = {
    profiles: []
};

export function profileReducer( lastState: ProfileState, action: any ): any {
    switch ( action.type ) {
        case ProfileActions.EVENT_PROFILE_LOADED: return action.payload;
        default: {
            return typeof lastState === 'undefined' ? null : lastState;
        } 
    }
};
