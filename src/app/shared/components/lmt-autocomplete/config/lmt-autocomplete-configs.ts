import { LmtAutocompleteConfigurationModel } from '../model/lmt-autocomplete-config';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

export const LMT_AUTO_COMPLETE_DEFAULT_CONFIGURATION: LmtAutocompleteConfigurationModel = 
    {
        visible:            true,
        selectable:         true,
        removable:          true,
        seperatorKeyCodes:  [ENTER, COMMA],
        placeholder:        'nouvel élément...'
    };