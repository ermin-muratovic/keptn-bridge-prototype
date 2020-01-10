import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {FlexLayoutModule} from "@angular/flex-layout";

import {AppRouting} from './app.routing';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AppHeaderComponent} from './app-header/app-header.component';
import {ProjectBoardComponent} from './project-board/project-board.component';

import {KtbSelectableTileComponent} from "./_components/ktb-selectable-tile/ktb-selectable-tile.component";
import {KtbHttpLoadingSpinnerComponent} from './_components/ktb-http-loading-spinner/ktb-http-loading-spinner.component';
import {KtbHorizontalSeparatorComponent, KtbHorizontalSeparatorTitle} from "./_components/ktb-horizontal-separator/ktb-horizontal-separator.component";
import {KtbExpandableTileComponent, KtbExpandableTileHeader} from './_components/ktb-expandable-tile/ktb-expandable-tile.component';

import {KtbShowHttpLoadingDirective} from './_directives/ktb-show-http-loading/ktb-show-http-loading.directive';
import {KtbHideHttpLoadingDirective} from "./_directives/ktb-hide-http-loading/ktb-hide-http-loading.directive";

import {HttpErrorInterceptor} from "./_interceptors/http-error-interceptor";
import {HttpLoadingInterceptor} from "./_interceptors/http-loading-interceptor";

import {
  DT_ICON_CONFIGURATION,
  DtButtonModule,
  DtCardModule,
  DtContextDialogModule,
  DtDrawerModule,
  DtEmptyStateModule, DtExpandablePanelModule,
  DtExpandableTextModule,
  DtIconModule,
  DtInfoGroupModule,
  DtInputModule,
  DtLoadingDistractorModule,
  DtMenuModule,
  DtProgressBarModule,
  DtSelectModule, DtShowMoreModule,
  DtTagModule,
  DtThemingModule,
  DtTileModule
} from '@dynatrace/angular-components';
import {MomentModule} from "ngx-moment";


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AppHeaderComponent,
    ProjectBoardComponent,
    KtbHttpLoadingSpinnerComponent,
    KtbShowHttpLoadingDirective,
    KtbHideHttpLoadingDirective,
    KtbExpandableTileComponent,
    KtbExpandableTileHeader,
    KtbSelectableTileComponent,
    KtbHorizontalSeparatorComponent,
    KtbHorizontalSeparatorTitle,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRouting,

    FlexLayoutModule,
    MomentModule,

    DtThemingModule,
    DtButtonModule,
    DtSelectModule,
    DtMenuModule,
    DtDrawerModule,
    DtContextDialogModule,
    DtInputModule,
    DtEmptyStateModule,
    DtCardModule,
    DtTileModule,
    DtInfoGroupModule,
    DtProgressBarModule,
    DtLoadingDistractorModule,
    DtTagModule,
    DtExpandableTextModule,
    DtExpandablePanelModule,
    DtShowMoreModule,
    DtIconModule.forRoot({
      svgIconLocation: `/assets/icons/{{name}}.svg`,
    }),
  ],
  providers: [
    {
      provide: DT_ICON_CONFIGURATION,
      useValue: {svgIconLocation: `/assets/icons/{{name}}.svg`},
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadingInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
