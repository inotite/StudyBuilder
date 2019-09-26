import { AbstractFormGroupDirective } from '@angular/forms';

export interface SubmitActionItem {
    id: string;
    displayName: string;
    typeName: string;
    successPatientStatusTypeId: number;
    failurePatientStatusTypeId: number;
}
