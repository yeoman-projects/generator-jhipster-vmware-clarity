import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { <%=angularXAppName%>SharedModule } from 'app/shared';

import {
    Register,
    ActivateService,
    PasswordService,
    PasswordResetInitService,
    PasswordResetFinishService,
<%_ if (authenticationType === 'session') { _%>
SessionsService,
    SessionsComponent,
<%_ } _%>
PasswordStrengthBarComponent,
    RegisterComponent,
    ActivateComponent,
    PasswordComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    LoginComponent,
    SettingsComponent,
    accountState
} from './';

@NgModule({
    imports: [
        <%=angularXAppName%>SharedModule,
        RouterModule.forChild(accountState)
    ],
    declarations: [
        ActivateComponent,
        RegisterComponent,
        PasswordComponent,
        PasswordStrengthBarComponent,
        PasswordResetInitComponent,
        PasswordResetFinishComponent,
        LoginComponent,
        <%_ if (authenticationType === 'session') { _%>
SessionsComponent,
<%_ } _%>
SettingsComponent
],
providers: [
    <%_ if (authenticationType === 'session') { _%>
SessionsService,
<%_ } _%>
Register,
    ActivateService,
    PasswordService,
    PasswordResetInitService,
    PasswordResetFinishService
],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class <%=angularXAppName%>AccountModule {}
