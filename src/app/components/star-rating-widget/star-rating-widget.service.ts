import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// services
import { Response } from '@angular/http/src/static_response';
import { environment } from '../../../environments/environment';


import { Globals } from '../../utils/globals';
import { AppConfigService } from '../../providers/app-config.service';
import { LoggerInstance } from '../../../chat21-core/providers/logger/loggerInstance';
import { LoggerService } from '../../../chat21-core/providers/abstract/logger.service';


@Injectable()
export class StarRatingWidgetService {
  // private BASE_URL_SEND_RATE: string;
  public obsCloseConversation: any;
  private API_URL;
  public senderId: any;
  public requestid: any;
  private logger: LoggerService = LoggerInstance.getInstance();
  // private requestid: String = 'LKfJrBCk6G5up3uNH1L';
  // private projectid: String = '5b55e806c93dde00143163dd';

  constructor(
    public http: Http,
    public g: Globals,
    public appConfigService: AppConfigService
  ) {

    this.API_URL = this.appConfigService.getConfig().apiUrl;
    //  that.g.wdLog(['AgentAvailabilityService:: this.API_URL',  this.API_URL );
    if (!this.API_URL) {
      throw new Error('apiUrl is not defined');
    }
    this.obsCloseConversation = new BehaviorSubject<boolean>(null);

    // this.observable = new BehaviorSubject<boolean>(null);
    // this.auth.obsLoggedUser.subscribe((current_user) => {
    //    that.g.wdLog(['»»» START-RATING-WIDGET SERVICE - USER GET FROM AUTH SUBSCRIPTION ', current_user);
    //   if (current_user) {
    //     this.senderId = current_user.user.uid;
    //      that.g.wdLog(['»»» START-RATING-WIDGET SERVICE - USER UID (alias SENDER ID) ', this.senderId);
    //     setTimeout(() => {
    //       this.requestid = sessionStorage.getItem(this.senderId);
    //       this.requestid = this.appStorageService.getItem(this.senderId);
    //        that.g.wdLog(['»»» START-RATING-WIDGET SERVICE - REQUEST ID GET FRO STORAGE', this.requestid);
    //     }, 100);
    //   }
    // });
  }

  httpSendRate(rate, message): Observable<string> {
    const headers = new Headers();
    const token = this.g.tiledeskToken;
    const projectId = this.g.projectid;
    const recipientId = this.g.recipientId;
    if (rate && token && projectId && recipientId) {
      headers.append('Authorization', token);
      headers.append('Content-Type', 'application/json');
      const options = new RequestOptions({ headers: headers });
      // const url = this.API_URL + this.projectid + '/requests/' + this.requestid;
      // const url = this.API_URL + 'chat/support/tilechat/requests/' + recipientId + '/rate?token=chat21-secret-orgAa,&rating=' 
      // tslint:disable-next-line:max-line-length
      const url = this.API_URL + projectId + '/requests/' + recipientId + '/rating';
      // 'chat/support/tilechat/requests/' + recipientId + '/rate?token=chat21-secret-orgAa,&rating=' + rate + '&rating_message=' + message;
      // project_id/requests/:id/rating
      this.logger.debug('[STAR-RATING-SERVICE] ------------------> url: ', url);
      const body = {
        'rating': rate,
        'rating_message': message
      };
      this.logger.debug('[STAR-RATING-SERVICE] ------------------> options: ', options);
      this.logger.debug('[STAR-RATING-SERVICE] ------------------> body: ', JSON.stringify(body));
      return this.http
        .patch(url, JSON.stringify(body), options)
        .map(res => (res.json()));
    }
  }

  //  setProjectid(projectid: String) {
  //    this.projectid = projectid;
  //  }

  //  setRequestid(requestid: String) {
  //   this.requestid = requestid;
  // }

  setOsservable(bool) {
    this.logger.debug('[STAR-RATING-SERVICE] ------------------> setOsservable: ', bool);
    this.obsCloseConversation.next(bool);
  }

  _dowloadTranscript(recipientId) {
    const url = this.API_URL + 'public/requests/' + recipientId + '/messages.html';
    const windowContext = this.g.windowContext;
    windowContext.open(url, '_blank');
    // windowContext.location.reload(true);
  }

}
