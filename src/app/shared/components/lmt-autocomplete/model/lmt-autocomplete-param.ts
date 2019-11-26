import { Observable } from 'rxjs';

/**
 * Model that describe the input of LMT Autocomplete component
 */
export interface LmtAutocompleteParameter {
    datasource:     Observable<any[]>;
    attributeName:  string;
};
