import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { NgRedux } from '@angular-redux/store';
import { SkillState } from '../reducer/skill';

@Injectable()
export class SkillActions {
    static LOAD = 'LOAD';

    constructor( readonly skillNgRedux: NgRedux<SkillState> ) {}

    public load() {
        console.log( '*** SkillActions::load' );
        this.skillNgRedux.dispatch({ 
            type:    'LOAD',
            payload:  null 
        });
    }
}
