import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// services
import { ConversationsService } from '../../providers/conversations.service';
import { Globals } from '../../utils/globals';
import { convertMessage } from '../../utils/utils';

// models
import { ConversationModel } from '../../../models/conversation';


@Component({
  selector: 'app-list-conversations',
  templateUrl: './list-conversations.component.html',
  styleUrls: ['./list-conversations.component.scss']
})

export class ListConversationsComponent implements OnInit {

  // ========= begin:: Input/Output values ============//
  @Output() eventNewConv = new EventEmitter<string>();
  @Output() eventSelctedConv = new EventEmitter<string>();
  @Output() eventClose = new EventEmitter();
  @Input() senderId: string; // uid utente ex: JHFFkYk2RBUn87LCWP2WZ546M7d2
  // ========= end:: Input/Output values ============//


  // ========= begin:: dichiarazione funzioni ======= //
  convertMessage = convertMessage;
  // ========= end:: dichiarazione funzioni ========= //


  // ========= begin:: variabili del componente ======= //
  conversations: ConversationModel[];
  tenant = '';
  themeColor = '';
  themeForegroundColor = '';
  LABEL_START_NW_CONV: string;
  // ========= end:: variabili del componente ======== //


  constructor(
    public g: Globals,
    public conversationsService: ConversationsService
  ) {
    //this.initialize();
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    console.log('initialize: ListConversationsComponent');
    this.senderId = this.g.senderId;
    this.tenant = this.g.tenant;
    this.LABEL_START_NW_CONV = this.g.LABEL_START_NW_CONV;

    console.log('senderId: ', this.senderId);
    console.log('tenant: ', this.tenant);
    console.log('themeColor: ', this.g.themeColor);
    console.log('themeForegroundColor: ', this.g.themeForegroundColor);

    this.conversationsService.initialize(this.senderId, this.tenant);
    this.conversations = this.conversationsService.conversations;
    this.conversationsService.checkListConversations();
  }


  // ========= begin:: ACTIONS ============//
  openNewConversation() {
    this.eventNewConv.emit();
  }

  private openConversationByID(conversation) {
    console.log('openConversationByID: ', conversation);
    if ( conversation ) {
      this.conversationsService.updateBadge(conversation, 0);
      this.conversationsService.updateConversationBadge();
      this.eventSelctedConv.emit(conversation);
    }
  }
  // ========= end:: ACTIONS ============//

}
