import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MusicControlComponent } from './pages/music-control/music-control.component';
import { FormatTimePipe } from './pipe/format-time.pipe';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { ContainerComponent } from './pages/container/container.component';
import { MyMusicListComponent } from './pages/container/my-music-list/my-music-list.component';
import {Router, RouterModule, Routes} from '@angular/router';
import {MusicEmitService} from './services/musicEmit/music-emit.service';
import { RecommendedMusicListComponent } from './pages/container/recommended-music-list/recommended-music-list.component';
import { SearchMusicComponent } from './pages/container/search-music/search-music.component';
import { SettingComponent } from './pages/container/setting/setting.component';
import { MusicListComponent } from './pages/container/music-list/music-list.component';
import { LoginComponent } from './pages/nav-bar/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

const routeConfig: Routes = [
  { path: '', component: MyMusicListComponent},
  { path: '#', component: MyMusicListComponent},
  { path: 'myMusicList', component: MyMusicListComponent, runGuardsAndResolvers: 'always'},
  { path: 'recommendedMusicList', component: RecommendedMusicListComponent},
  { path: 'musicList/:listId', component: MusicListComponent},
  { path: 'searchMusic', component: SearchMusicComponent},
  { path: 'setting', component: SettingComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    MusicControlComponent,
    FormatTimePipe,
    NavBarComponent,
    ContainerComponent,
    MyMusicListComponent,
    RecommendedMusicListComponent,
    SearchMusicComponent,
    SettingComponent,
    MusicListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    [RouterModule.forRoot(
      routeConfig,
      { onSameUrlNavigation: 'reload' }
      )],
  ],
  providers: [
    MusicEmitService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
