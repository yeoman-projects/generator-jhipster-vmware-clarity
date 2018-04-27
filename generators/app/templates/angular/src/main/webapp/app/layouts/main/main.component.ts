import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

<%_ if (enableTranslation) { _%>
import { JhiLanguageHelper, AccountService, Principal } from 'app/core';
<%_ } else { _%>
import { AccountService, Principal } from 'app/core';
<%_ } _%>


@Component({
    selector: '<%= jhiPrefixDashed %>-main',
    templateUrl: './main.component.html'
})
export class <%=jhiPrefixCapitalized%>MainComponent implements OnInit {

    constructor(
        <%_ if (enableTranslation) { _%>
        private jhiLanguageHelper: JhiLanguageHelper,
        <%_ } else { _%>
        private titleService: Title,
        <%_ } _%>
        private principal: Principal,
        private accountSerivce: AccountService,
        private router: Router
    ) {}

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : '<%= angularAppName %>';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                <%_ if (enableTranslation) { _%>
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
                <%_ } else { _%>
                this.titleService.setTitle(this.getPageTitle(this.router.routerState.snapshot.root));
                <%_ } _%>
            }
        });
        this.accountSerivce
            .get()
            .toPromise()
            .then(response => {
                const account = response.body;
                if (!account) {
                    this.router.navigate(['/login']);
                }
            })
            .catch(err => {
                this.router.navigate(['/login']);
            });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }
}
