import { DepartmentModel } from './../../models/department';
import { MessageModel } from '../../models/message';
import { Injectable, ElementRef } from '@angular/core';
import { Globals } from '../../app/utils/globals';
import { ConversationModel } from '../models/conversation';
import { LoggerInstance } from '../providers/logger/loggerInstance';
import { LoggerService } from '../providers/abstract/logger.service';

@Injectable()
export class Triggerhandler {

    private el: ElementRef;
    private windowContext;
    private logger: LoggerService = LoggerInstance.getInstance()
    
    constructor() { }

    public setElement(el: ElementRef){
        this.el = el
    }

    public setWindowContext(windowContext){
        this.windowContext = windowContext
    }

    /**CONVERSATION-FOOTER.component */
    public triggerBeforeSendMessageEvent(messageModel){
        this.logger.printInfo(' ---------------- triggerBeforeSendMessageEvent ---------------- ', messageModel);
        try {
            const onBeforeMessageSend = new CustomEvent('onBeforeMessageSend', { detail: { messageModel } });
            const windowContext = this.windowContext;
            if (windowContext.tiledesk && windowContext.tiledesk.tiledeskroot) {
                windowContext.tiledesk.tiledeskroot.dispatchEvent(onBeforeMessageSend);
                this.windowContext = windowContext;
            } else {
              this.el.nativeElement.dispatchEvent(onBeforeMessageSend);
            }
        } catch (e) {
          this.logger.printError('> Error:' + e);
        }
    }

    /**CONVERSATION-FOOTER.component */
    public triggerAfterSendMessageEvent(messageSent: MessageModel){
        this.logger.printInfo(' ---------------- triggerAfterSendMessageEvent ---------------- ', messageSent);
        try {
            const onAfterMessageSend = new CustomEvent('onAfterMessageSend', { detail: { message: messageSent } });
            const windowContext = this.windowContext;
            if (windowContext.tiledesk && windowContext.tiledesk.tiledeskroot) {
                windowContext.tiledesk.tiledeskroot.dispatchEvent(onAfterMessageSend);
                this.windowContext = windowContext;
            } else {
              this.el.nativeElement.dispatchEvent(onAfterMessageSend);
            }
        } catch (e) {
          this.logger.printError('> Error:' + e);
        }
    }

    /**CONVERSATION.component */
    public triggerOnNewConversationInit(detailObj: {}){
        this.logger.printInfo(' ---------------- triggerOnNewConversationComponentInit ---------------- ', detailObj);
        const onNewConversation = new CustomEvent('onNewConversationComponentInit', { detail: detailObj });
        const windowContext = this.windowContext;
        if (windowContext.tiledesk && windowContext.tiledesk.tiledeskroot) {
            windowContext.tiledesk.tiledeskroot.dispatchEvent(onNewConversation);
            this.windowContext = windowContext;
        } else {
            this.el.nativeElement.dispatchEvent(onNewConversation);
        }
    }

    /**CONVERSATION.component */
    public triggerBeforeMessageRender(detailObj: {}) {
        //this.logger.printInfo(' ---------------- triggerBeforeMessageRender ---------------- ', detailObj]);
        try {
          const beforeMessageRender = new CustomEvent('beforeMessageRender', { detail: detailObj });
          const windowContext = this.windowContext;
          if (windowContext.tiledesk && windowContext.tiledesk.tiledeskroot) {
            windowContext.tiledesk.tiledeskroot.dispatchEvent(beforeMessageRender);
            this.windowContext = windowContext;
          } else {
            this.el.nativeElement.dispatchEvent(beforeMessageRender);
          }
        } catch (e) {
          this.logger.printError('> Error:' + e);
        }
      }

    /**CONVERSATION.component */
    public triggerAfterMessageRender(detailObj: {}) {
        //this.logger.printInfo(' ---------------- triggerAfterMessageRender ---------------- ', detailObj]);
        try {
            const afterMessageRender = new CustomEvent('afterMessageRender', { detail: detailObj });
            const windowContext = this.windowContext;
            if (windowContext.tiledesk && windowContext.tiledesk.tiledeskroot) {
                windowContext.tiledesk.tiledeskroot.dispatchEvent(afterMessageRender);
                this.windowContext = windowContext;
            } else {
                this.el.nativeElement.dispatchEvent(afterMessageRender);
            }
        } catch (e) {
            this.logger.printError('> Error:' + e);
        }
    }

    /**CONVERSATION.component */
    public triggerOnMessageCreated(message: MessageModel) {
        this.logger.printInfo(' ---------------- triggerOnMessageCreated ---------------- ', message);
        const onMessageCreated = new CustomEvent('onMessageCreated', { detail: { message: message } });
        const windowContext = this.windowContext;
        if (windowContext.tiledesk && windowContext.tiledesk.tiledeskroot) {
            windowContext.tiledesk.tiledeskroot.dispatchEvent(onMessageCreated);
            this.windowContext = windowContext;
        } else {
            this.el.nativeElement.dispatchEvent(onMessageCreated);
        }
    }

    /**APP-COMPONENT.component */  
    public triggerOnViewInit(detailObj: {}) {
        this.logger.printInfo(' ---------------- triggerOnInit ---------------- ', detailObj);
        const onInit = new CustomEvent('onInit', { detail: detailObj });
        const windowContext = this.windowContext;
        if (windowContext.tiledesk && windowContext.tiledesk.tiledeskroot) {
            windowContext.tiledesk.tiledeskroot.dispatchEvent(onInit);
            this.windowContext = windowContext;
        } else {
            this.el.nativeElement.dispatchEvent(onInit);
        }
    }

    /**APP-COMPONENT.component */
    public triggerOnOpenEvent(detailObj: {}) {
        this.logger.printInfo(' ---------------- triggerOnOpenEvent ---------------- ', detailObj);
        const onOpen = new CustomEvent('onOpen', { detail: detailObj });
        const windowContext = this.windowContext;
        if (windowContext.tiledesk && windowContext.tiledesk.tiledeskroot) {
            windowContext.tiledesk.tiledeskroot.dispatchEvent(onOpen);
            this.windowContext = windowContext;
        } else {
            this.el.nativeElement.dispatchEvent(onOpen);
        }
    }

    /**APP-COMPONENT.component */
    public triggerOnCloseEvent(detailObj: {}) {
        this.logger.printInfo(' ---------------- triggerOnCloseEvent ---------------- ', detailObj);
        const onClose = new CustomEvent('onClose', { detail: detailObj });
        const windowContext = this.windowContext;
        if (windowContext.tiledesk && windowContext.tiledesk.tiledeskroot) {
            windowContext.tiledesk.tiledeskroot.dispatchEvent(onClose);
            this.windowContext = windowContext;
        } else {
            this.el.nativeElement.dispatchEvent(onClose);
        }
    }

    /**APP-COMPONENT.component */
    public triggerOnOpenEyeCatcherEvent(detailObj: {}) {
        this.logger.printInfo(' ---------------- triggerOnOpenEyeCatcherEvent ---------------- ', detailObj);
        const onOpenEyeCatcher = new CustomEvent('onOpenEyeCatcher', { detail: detailObj });
        const windowContext = this.windowContext;
        if (windowContext.tiledesk && windowContext.tiledesk.tiledeskroot) {
            windowContext.tiledesk.tiledeskroot.dispatchEvent(onOpenEyeCatcher);
            this.windowContext = windowContext;
        } else {
            this.el.nativeElement.dispatchEvent(onOpenEyeCatcher);
        }
    }

    /**APP-COMPONENT.component */
    public triggerOnClosedEyeCatcherEvent() {
        this.logger.printInfo(' ---------------- triggerOnClosedEyeCatcherEvent ---------------- ');
        const onClosedEyeCatcher = new CustomEvent('onClosedEyeCatcher', { detail: { } });
        const windowContext = this.windowContext;
        if (windowContext.tiledesk && windowContext.tiledesk.tiledeskroot) {
            windowContext.tiledesk.tiledeskroot.dispatchEvent(onClosedEyeCatcher);
            this.windowContext = windowContext;
        } else {
            this.el.nativeElement.dispatchEvent(onClosedEyeCatcher);
        }
    }



    /**APP-COMPONENT.component */
    public triggerOnLoggedIn(detailObj: {}) {
        this.logger.printInfo(' ---------------- triggerOnLoggedIn ---------------- ', detailObj);
        const onLoggedIn = new CustomEvent('onLoggedIn', { detail: detailObj});
        const windowContext = this.windowContext;
        if (windowContext.tiledesk && windowContext.tiledesk.tiledeskroot) {
            windowContext.tiledesk.tiledeskroot.dispatchEvent(onLoggedIn);
            this.windowContext = windowContext;
        } else {
            this.el.nativeElement.dispatchEvent(onLoggedIn);
        }
    }

    /**APP-COMPONENT.component */
    public triggerOnLoggedOut(detailObj: {}) {
        this.logger.printInfo(' ---------------- triggerOnLoggedOut ---------------- ', detailObj);
        const onLoggedOut = new CustomEvent('onLoggedOut', { detail: detailObj});
        const windowContext = this.windowContext;
        if (windowContext.tiledesk && windowContext.tiledesk.tiledeskroot) {
            windowContext.tiledesk.tiledeskroot.dispatchEvent(onLoggedOut);
            this.windowContext = windowContext;
        } else {
            this.el.nativeElement.dispatchEvent(onLoggedOut);
        }
    }

    /**APP-COMPONENT.component */
    public triggerOnAuthStateChanged(detailObj: {}) {
        this.logger.printInfo(' ---------------- triggerOnAuthStateChanged ---------------- ', detailObj);
        const onAuthStateChanged = new CustomEvent('onAuthStateChanged', { detail: detailObj});
        const windowContext = this.windowContext;
        if (windowContext.tiledesk && windowContext.tiledesk.tiledeskroot) {
            windowContext.tiledesk.tiledeskroot.dispatchEvent(onAuthStateChanged);
            this.windowContext = windowContext;
        } else {
            this.el.nativeElement.dispatchEvent(onAuthStateChanged);
        }
    }

    public triggerNewConversationEvent(detailObj: {}) {
        this.logger.printInfo(' ---------------- triggerNewConversationEvent ---------------- ', detailObj);
        const onNewConversation = new CustomEvent('onNewConversation', { detail: detailObj });
        const windowContext = this.windowContext;
        if (windowContext.tiledesk && windowContext.tiledesk.tiledeskroot) {
            windowContext.tiledesk.tiledeskroot.dispatchEvent(onNewConversation);
            this.windowContext = windowContext;
        } else {
            this.el.nativeElement.dispatchEvent(onNewConversation);
        }

    }


    /**APP-COMPONENT.component */
    public triggerLoadParamsEvent(detailObj: {}) {
        this.logger.printInfo(' ---------------- triggerOnLoadParamsEvent ---------------- ', detailObj);
        const onLoadParams = new CustomEvent('onLoadParams', { detail: detailObj });
        const windowContext = this.windowContext;
        if (windowContext.tiledesk && windowContext.tiledesk.tiledeskroot) {
            windowContext.tiledesk.tiledeskroot.dispatchEvent(onLoadParams);
            this.windowContext = windowContext;
        } else {
            this.el.nativeElement.dispatchEvent(onLoadParams);
        }
    }

    /**APP-COMPONENT.component */
    public triggerOnConversationUpdated(conversation: ConversationModel) {
        this.logger.printInfo(' ---------------- triggerOnConversationUpdated ---------------- ', conversation);
        try {
            const triggerConversationUpdated = new CustomEvent('onConversationUpdated', { detail: { conversation: conversation } });
            const windowContext = this.windowContext;
            if (windowContext.tiledesk && windowContext.tiledesk.tiledeskroot) {
                windowContext.tiledesk.tiledeskroot.dispatchEvent(triggerConversationUpdated);
                this.windowContext = windowContext;
            } else {
                this.el.nativeElement.dispatchEvent(triggerConversationUpdated);
            }
        } catch (e) {
            this.logger.printError('> Error:' + e);
        }
    }

    /**APP-COMPONENT.component */
    public triggerOnCloseMessagePreview() {
        this.logger.printInfo(' ---------------- triggerOnCloseMessagePreview ---------------- ');
        try {
            const triggerCloseMessagePreview = new CustomEvent('onCloseMessagePreview', { detail: { } });
            const windowContext = this.windowContext;
            if (windowContext.tiledesk && windowContext.tiledesk.tiledeskroot) {
                windowContext.tiledesk.tiledeskroot.dispatchEvent(triggerCloseMessagePreview);
                this.windowContext = windowContext;
            } else {
                this.el.nativeElement.dispatchEvent(triggerCloseMessagePreview);
            }
        } catch (e) {
            this.logger.printError('> Error:' + e);
        }
    }

    /**SELECTION-DEPARTMENT.component */
    public triggerOnbeforeDepartmentsFormRender(departments: DepartmentModel[]) {
        this.logger.printInfo(' ---------------- triggerOnbeforeDepartmentsFormRender ---------------- ');
        const onOpen = new CustomEvent('onBeforeDepartmentsFormRender', { detail: { departments: departments } });
        const windowContext = this.windowContext;
        if (windowContext.tiledesk && windowContext.tiledesk.tiledeskroot) {
            windowContext.tiledesk.tiledeskroot.dispatchEvent(onOpen);
            this.windowContext = windowContext;
        } else {
            this.el.nativeElement.dispatchEvent(onOpen);
        }
    }

    /** */
    public triggerGetImageUrlThumb(message: MessageModel) {
        this.logger.printInfo(' ---------------- getImageUrlThumb ---------------- ');
        try {
            const triggerGetImageUrlThumb = new CustomEvent('getImageUrlThumb', { detail: { message: message } });
            const windowContext = this.windowContext;
            if (windowContext.tiledesk && windowContext.tiledesk.tiledeskroot) {
                windowContext.tiledesk.tiledeskroot.dispatchEvent(triggerGetImageUrlThumb);
            } else {
                // this.el.nativeElement.dispatchEvent(triggerGetImageUrlThumb);
            }
        } catch (e) {
          this.logger.printError('> Error:' + e);
        }
      }

    
}