import { Injectable } from '@angular/core';
import { Action } from 'redux';

@Injectable()
export class SkillActions {
    private static LOAD = 'LOAD';

    public load(): Action {
        return {
            type: SkillActions.LOAD
        }
    }
}