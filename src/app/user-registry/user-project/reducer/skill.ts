import { Skill } from '../model/project';
import { SkillActions } from '../action/skill';

export interface SkillState {
    skills: Skill[]
};

export const SKILL_INITIAL_STATE: SkillState = {
    skills: []
};

export function skillReducer( lastState: SkillState, action: any ): SkillState {
    console.info ( 'input parameters - last state: <', lastState, '> action: <', action, '>' );
    switch ( action.type ) {
        case SkillActions.EVENT_SKILL_LOADED: return <SkillState> { skills: action.payload };
        default: {
            console.info ( 'unhandled action type for this reducer, returning last state' );
            return lastState;
        } 
    }
};
