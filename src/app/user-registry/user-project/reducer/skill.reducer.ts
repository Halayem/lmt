import { Skill } from '../model/project';
import { SkillActions } from '../action/skill.action';

export interface SkillState {
    skills: Skill[]
};

export const SKILL_INITIAL_STATE: SkillState = {
    skills: []
};

export function skillReducer( lastState: SkillState, action: any ): any {
    switch ( action.type ) {
        case SkillActions.EVENT_SKILL_LOADED: return action.payload ;
        default: {
            return typeof lastState === 'undefined' ? null : lastState;
        } 
    }
};
