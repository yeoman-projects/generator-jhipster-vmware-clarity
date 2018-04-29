import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';

import { VERSION } from 'app/app.constants';
import { <% if (enableTranslation) { %>JhiLanguageHelper, <% } %>Principal, LoginService } from 'app/core';
import { ProfileService } from '../profiles/profile.service';

@Component({
    selector: '<%= jhiPrefixDashed %>-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [
        <%_ if (useSass) { _%>
        'navbar.scss'
        <%_ } else { _%>
        'navbar.css'
        <%_ } _%>
    ]
})
export class NavbarComponent implements OnInit {
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    version: string;

    constructor(
    private loginService: LoginService,
    <%_ if (enableTranslation) { _%>
    private languageService: JhiLanguageService,
    private languageHelper: JhiLanguageHelper,
    <%_ } _%>
    private principal: Principal,
    private profileService: ProfileService,
    private router: Router
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
    }

    ngOnInit() {
        <%_ if (enableTranslation) { _%>
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });
            <%_ } _%>
        this.profileService.getProfileInfo().then((profileInfo) => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
    }

    <%_ if (enableTranslation) { _%>
    changeLanguage(languageKey: string) {
        this.languageService.changeLanguage(languageKey);
    }
        <%_ } _%>
    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        <%_ if (authenticationType !== 'oauth2') { _%>
        this.modalRef = this.loginModalService.open();
            <%_ } else { _%>
        this.loginService.login();
            <%_ } _%>
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }
}
