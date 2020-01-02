import { Skill } from '../model/project';
import { Action } from 'redux';

export interface SkillState {
    skills: Skill[]
};

export const INITIAL_STATE: SkillState = {
    skills: []
};

export function skillReducer( lastState: SkillState, action: any): SkillState {
    console.log ( 'skill reducer, last state:', lastState, ' action: ', action );
    return action.payload;
};
