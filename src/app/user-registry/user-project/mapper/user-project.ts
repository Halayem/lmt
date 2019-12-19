import { Project, Skill } from '../model/project';
import { Injectable } from '@angular/core';

@Injectable()
export class UserProjectMapper {

    constructor() {}

    public mapFromFormToModel( projectForm: any ): Project {
        console.warn( 'enterprise id is hard coded' );
        return <Project> {
            'entitle':      projectForm.entitle,
            'description':  projectForm.description,
            'startDate':    projectForm.startDate,
            'endDate':      projectForm.endDate,
            'skillIds':     projectForm.skills.map  ( skill     => skill.id     ),
            'profileIds':   projectForm.profiles.map( profile   => profile.id   ),
            'enterprise': {
                'id':   1,
                'name': projectForm.enterpriseName
            }
        };
    }
}
