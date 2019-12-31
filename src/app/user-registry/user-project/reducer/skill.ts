import { Skill } from '../model/project';
import { Action } from 'redux';

export interface SkillState {
    skills: Skill[]
};

export const INITIAL_STATE: SkillState = {
    skills: []
};

export function skillReducer( lastState: SkillState, action: Action): SkillState {
    console.log ( '*** Skill Reducer working ***' );
    return lastState;
};

