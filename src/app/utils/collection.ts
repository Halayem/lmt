import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export class CollectionUtils {

    public static filter( datasource: Observable<any>, attributeCriteria: string, valueCriteria: string ): Observable<any[]> {
        return datasource.pipe(
            map ( items => items.filter ( item => item[attributeCriteria] === valueCriteria ) )
        );
    }
}
