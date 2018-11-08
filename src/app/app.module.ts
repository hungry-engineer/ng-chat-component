import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
// import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { HttpClientModule} from '@angular/common/http';



import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {MdButtonModule, MdListModule, MdToolbarModule} from '@angular/material';
// import { FlexLayoutModule } from '@angular/flex-layout';
// import {MdInputModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageModule } from 'angular-2-local-storage';
import { MomentModule } from 'angular2-moment';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';


import { AuthService } from './core/auth.service';
import { MessagingService } from './providers/messaging.service';
import { ConversationsService } from './providers/conversations.service';
import { UploadService } from './providers/upload.service';
import { ContactService } from './providers/contact.service';
import { StarRatingWidgetComponent } from './components/star-rating-widget/star-rating-widget.component';
import { StarRatingWidgetService } from './components/star-rating-widget/star-rating-widget.service';
import { AgentAvailabilityService } from './providers/agent-availability.service';
import { TranslatorService } from './providers/translator.service';
import { LinkyModule } from 'angular-linky';
import { SelectionDepartmentComponent } from './components/selection-department/selection-department.component';
// import { NewConversationComponent } from './components/new-conversation/new-conversation.component';
import { ListConversationsComponent } from './components/list-conversations/list-conversations.component';
import { HomeComponent } from './components/home/home.component';

import { Globals } from './utils/globals';
import { LauncherButtonComponent } from './components/launcher-button/launcher-button.component';
import { ConversationComponent } from './components/conversation/conversation.component';
import { PrechatFormComponent } from './components/prechat-form/prechat-form.component';
import { EyeeyeCatcherCardComponent } from './components/eyeeye-catcher-card/eyeeye-catcher-card.component';
import { PreviewLoadingFilesComponent } from './components/preview-loading-files/preview-loading-files.component';
import { MenuOptionsComponent } from './components/menu-options/menu-options.component';

import { ChatPresenceHandlerService } from './providers/chat-presence-handler.service';
import { ListArchivedConversationsComponent } from './components/list-archived-conversations/list-archived-conversations.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserProfileComponent,
    StarRatingWidgetComponent,
    SelectionDepartmentComponent,
    // NewConversationComponent,
    ListConversationsComponent,
    HomeComponent,
    LauncherButtonComponent,
    ConversationComponent,
    PrechatFormComponent,
    EyeeyeCatcherCardComponent,
    PreviewLoadingFilesComponent,
    MenuOptionsComponent,
    ListArchivedConversationsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LinkyModule,
    // https://medium.com/codingthesmartway-com-blog/using-bootstrap-with-angular-c83c3cee3f4a
    // NgbModule.forRoot(),
    LocalStorageModule.withConfig({
      prefix: 'chat21-web-widget',
      storageType: 'localStorage'
     }),
    MomentModule,
  ],
  providers: [
    AuthService,
    MessagingService,
    ConversationsService,
    UploadService,
    ContactService,
    StarRatingWidgetService,
    AgentAvailabilityService,
    TranslatorService,
    Globals,
    ChatPresenceHandlerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
