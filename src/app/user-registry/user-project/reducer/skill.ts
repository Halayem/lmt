import { Skill } from '../model/project';
import { Action } from 'redux';

export interface SkillState {
    skills: Skill[]
};

export const INITIAL_STATE: SkillState = {
    skills: []
};

export function skillReducer( lastState: SkillState, action: any): SkillState {
    console.log ( '*** Skill Reducer working ***, state:', lastState, ' action: ', action.payload );
    return action.payload;
};

