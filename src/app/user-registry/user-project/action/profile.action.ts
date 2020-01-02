import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ProfileState } from '../reducer/profile.reducer';

@Injectable()
export class ProfileActions {
    public static readonly COMMAND_PROFILE_LOAD = 'COMMAND_PROFILE_LOAD';
    public static readonly EVENT_PROFILE_LOADED = 'EVENT_PROFILE_LOADED';

    constructor( readonly profileNgRedux: NgRedux<ProfileState> ) {}

    public load(): void {
        this.profileNgRedux.dispatch({ type: ProfileActions.COMMAND_PROFILE_LOAD, payload: null });
    }
}
