import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { SkillState } from '../reducer/skill';

@Injectable()
export class SkillActions {
    public static readonly COMMAND_SKILL_LOAD = 'COMMAND_SKILL_LOAD';
    public static readonly EVENT_SKILL_LOADED = 'EVENT_SKILL_LOADED';

    constructor( readonly skillNgRedux: NgRedux<SkillState> ) {}

    public load(): void {
        this.skillNgRedux.dispatch({ type: SkillActions.COMMAND_SKILL_LOAD, payload: null });
    }
}
