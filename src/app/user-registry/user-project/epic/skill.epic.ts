import { SkillService } from '../service/skill.service';
import { Injectable } from '@angular/core';

@Injectable()
export class SkillEpics {
    constructor( readonly skillService: SkillService ) {}

}