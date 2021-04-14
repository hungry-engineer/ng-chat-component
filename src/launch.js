/** */
ready(function() {
    // console.log('DOM is ready, call initWidget');
    initWidget();
});

/** */
function ready(callbackFunction){
    if(document.readyState != 'loading')
      callbackFunction()
    else
      document.addEventListener("DOMContentLoaded", callbackFunction)
}
       

/** */
function loadIframe(tiledeskScriptBaseLocation) {

    var containerDiv = document.createElement('div');
    containerDiv.setAttribute('id','tiledesk-container');
    containerDiv.classList.add("closed");
    document.body.appendChild(containerDiv);
    
    var iDiv = document.createElement('div');
    iDiv.setAttribute('id','tiledeskdiv');
    containerDiv.appendChild(iDiv);

    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("frameborder", "0");
    ifrm.setAttribute("border", "0");
       
    var srcTileDesk = '<html lang="en">';
    srcTileDesk += '<head>';
    srcTileDesk += '<meta charset="utf-8">';
    srcTileDesk += '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />';
    srcTileDesk += '<title>Tilechat Widget</title>';
    srcTileDesk += '<base href="./">';
    srcTileDesk += '<link rel="icon" type="image/x-icon" href="favicon.ico">';
    srcTileDesk += '</head>';
    srcTileDesk += '<body>';
    srcTileDesk += '<tiledeskwidget-root></tiledeskwidget-root>';
    srcTileDesk += '<script type="text/javascript" src="'+tiledeskScriptBaseLocation+'/inline.bundle.js"></script>';
    srcTileDesk += '<script type="text/javascript" src="'+tiledeskScriptBaseLocation+'/polyfills.bundle.js"></script>';
    srcTileDesk += '<script type="text/javascript" src="'+tiledeskScriptBaseLocation+'/styles.bundle.css"></script>';
    srcTileDesk += '<script type="text/javascript" src="'+tiledeskScriptBaseLocation+'/vendor.bundle.js"></script>';
    srcTileDesk += '<script type="text/javascript" src="'+tiledeskScriptBaseLocation+'/main.bundle.js"></script>';
    srcTileDesk += '</body>';
    srcTileDesk += '</html>';
    
    ifrm.setAttribute('id','tiledeskiframe');
    ifrm.setAttribute('tiledesk_context','parent');
   
    /** */
    window.tiledesk.on('onInit', function(event_data) {
        // console.log("launch onInit isopen", tiledeskScriptBaseLocation, window.tiledesk.angularcomponent.component.g.isOpen);
        if (window.tiledesk.angularcomponent.component.g.isOpen) {
            containerDiv.classList.add("open");
            containerDiv.classList.remove("closed");
            iDiv.classList.remove("callout");
        } else {
            containerDiv.classList.add("closed");
            containerDiv.classList.remove("open");
            iDiv.classList.remove("messagePreview");
        }         
    });
    /** */
    window.tiledesk.on('onOpen', function(event_data) {
        // console.log("tiledesk onOpen");
        containerDiv.classList.add("open");
        containerDiv.classList.remove("closed");
        iDiv.classList.remove("callout");
        iDiv.classList.remove("messagePreview");
    });
    /** */
    window.tiledesk.on('onClose', function(event_data) {
        // console.log("tiledesk onClose");
        containerDiv.classList.add("closed");
        containerDiv.classList.remove("open");
    });

    /** */
    window.tiledesk.on('onOpenEyeCatcher', function(event_data) {
        // console.log("tiledesk onOpenEyeCatcher", event_data);
        iDiv.classList.add("callout");
    });
    /** */
    window.tiledesk.on('onClosedEyeCatcher', function(event_data) {
        // console.log("tiledesk onClosedEyeCatcher", event_data);
        iDiv.classList.remove("callout");
    });

    /** */
    window.tiledesk.on('onConversationUpdated', function(event_data) {
        // console.log("tiledesk onChangedConversation", event_data);
        try {
            if (!window.tiledesk.angularcomponent.component.g.isOpen) {
                iDiv.classList.add("messagePreview");
                iDiv.classList.remove("callout");
                // ----------------------------//
            }  
        } catch(er) {
            console.log("> error: " + er);
        }
    });

    window.tiledesk.on('onCloseMessagePreview', function(event_data) {
        // console.log("tiledesk onCloseMessagePreview", event_data);
        try {
            iDiv.classList.remove("messagePreview");
        } catch(er) {
            console.log("> error: " + er);
        }
    });


    /**** BEGIN EVENST ****/
    /** */
    window.tiledesk.on('onNewConversation', function(event_data) {
        console.log("test-custom-auth.html onNewConversation >>>",event_data);
        const tiledeskToken = window.tiledesk.angularcomponent.component.g.tiledeskToken;
        // console.log(">>>> tiledeskToken >>>> ",event_data.detail.appConfigs.apiUrl+event_data.detail.default_settings.projectid);
        if(tiledeskToken) {
          var httpRequest = createCORSRequest('POST', event_data.detail.appConfigs.apiUrl+event_data.detail.default_settings.projectid+'/events',true); //set async to false because loadParams must return when the get is complete
          httpRequest.setRequestHeader('Content-type', 'application/json');
          httpRequest.setRequestHeader('Authorization',tiledeskToken);
          httpRequest.send(JSON.stringify({"name":"new_conversation","attributes": {"request_id":event_data.detail.newConvId, "department": event_data.detail.global.departmentSelected.id, "language": event_data.detail.global.lang, "subtype":"info", "fullname":event_data.detail.global.attributes.userFullname, "email":event_data.detail.global.attributes.userEmail, "attributes":event_data.detail.global.attributes}}));
        }
    });

    /** */
    window.tiledesk.on('onLoggedIn', function(event_data) {
        console.log("test-custom-auth.html onLoggedIn",event_data);
        const tiledeskToken = window.tiledesk.angularcomponent.component.g.tiledeskToken;
        // console.log("------------------->>>> tiledeskToken: ",window.tiledesk.angularcomponent.component.g);
        if(tiledeskToken) {
            var httpRequest = createCORSRequest('POST', event_data.detail.appConfigs.apiUrl+event_data.detail.default_settings.projectid+'/events',true); //set async to false because loadParams must return when the get is complete
            httpRequest.setRequestHeader('Content-type','application/json');
            httpRequest.setRequestHeader('Authorization',tiledeskToken);
            httpRequest.send(JSON.stringify({"name":"logged_in","attributes": {"fullname":event_data.detail.global.attributes.userFullname, "email":event_data.detail.global.attributes.userEmail, "language": event_data.detail.global.lang, "attributes":event_data.detail.global.attributes}}));
        }
    });

    /** */
    window.tiledesk.on('onAuthStateChanged', function(event_data) {
        console.log("test-custom-auth.html onAuthStateChanged",event_data);
        const tiledeskToken = window.tiledesk.angularcomponent.component.g.tiledeskToken;
        // console.log("------------------->>>> tiledeskToken: ",window.tiledesk.angularcomponent.component.g);
        if(tiledeskToken) {
            var httpRequest = createCORSRequest('POST', event_data.detail.appConfigs.apiUrl+event_data.detail.default_settings.projectid+'/events',true); //set async to false because loadParams must return when the get is complete
            httpRequest.setRequestHeader('Content-type','application/json');
            httpRequest.setRequestHeader('Authorization',tiledeskToken);
            httpRequest.send(JSON.stringify({"name":"auth_state_changed","attributes": {"user_id":event_data.detail.global.senderId, "isLogged":event_data.detail.global.isLogged, "event":event_data.detail.event, "subtype":"info", "fullname":event_data.detail.global.attributes.userFullname, "email":event_data.detail.global.attributes.userEmail, "language":event_data.detail.global.lang, "attributes":event_data.detail.global.attributes}}));
        }
    });
    
    /**** END EVENST ****/

    iDiv.appendChild(ifrm);  
    ifrm.contentWindow.document.open();
    ifrm.contentWindow.document.write(srcTileDesk);
    ifrm.contentWindow.document.close();

}


/**
 * 
 */
function initWidget() {
    var tiledeskroot = document.createElement('tiledeskwidget-root');
    var tiledeskScriptLocation = document.getElementById("tiledesk-jssdk").src;
    //var currentScript = document.currentScript;
    //var tiledeskScriptLocation = '';
    //setInterval(function(){
        //tiledeskScriptLocation = currentScript.src;
        // console.log(tiledeskScriptLocation)
        var tiledeskScriptBaseLocation = tiledeskScriptLocation.replace("/launch.js","");
        window.tiledesk = new function() {
            //this.type = "macintosh";
            this.tiledeskroot = tiledeskroot;
            // console.log(" this.tiledeskroot",  this.tiledeskroot);
            this.on = function (event_name, handler) {
                //console.log("addEventListener for "+ event_name, handler);
                tiledeskroot.addEventListener(event_name, handler);
            };
            this.getBaseLocation = function() {
                return tiledeskScriptBaseLocation;
            }
        }
        // console.log('tiledeskScriptBaseLocation:: ', tiledeskScriptBaseLocation);

        try {
            window.tileDeskAsyncInit();
            //console.log("tileDeskAsyncInit() called");
        }catch(er) {
            if (typeof window.tileDeskAsyncInit == "undefined") { 
                console.log("tileDeskAsyncInit() doesn't exists");
            } else {
                console.log(er);
            }
        }
        document.body.appendChild(tiledeskroot);
        initCSSWidget(tiledeskScriptBaseLocation);
        loadIframe(tiledeskScriptBaseLocation);
    //},2000);
}





function initCSSWidget(tiledeskScriptBaseLocation) {
    var cssId = 'iframeCss';  // you could encode the css path itself to generate id..
    // if (!document.getElementById(cssId))
    // {
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.id   = cssId;
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = tiledeskScriptBaseLocation+'/iframe-style.css';
        link.media = 'all';
        head.appendChild(link);
    // }
}


//DEPRECATED
function signInWithCustomToken() {
    let json = JSON.stringify({
        "id_project": "5b55e806c93dde00143163dd"
    });
	var httpRequest = createCORSRequest('POST', 'https://tiledesk-server-pre.herokuapp.com/auth/signinAnonymously',true); 
    if (!httpRequest) {
        throw new Error('CORS not supported');
    }
    httpRequest.setRequestHeader('Content-type','application/json');
	httpRequest.send(json);
    httpRequest.onload = function() {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
                    try {
                        var response = JSON.parse(httpRequest.responseText);
                        window.tiledesk.signInWithCustomToken(response);
                    }
                    catch(err) {
                        console.error(err.message);
                    }
                    return true;
        } else {
            alert('There was a problem with the request.');
        }
      }
   	};
	httpRequest.onerror = function() {
		console.error('There was an error!');
        return false;
	};
}


function createCORSRequest(method, url, async) {
    // console.log("createCORSRequest");
	var xhr = new XMLHttpRequest();
	if ("withCredentials" in xhr) {
		xhr.open(method, url, async);
	} else if (typeof XDomainRequest != "undefined") {
		xhr = new XDomainRequest();
		xhr.open(method, url);
	} else {
		xhr = null;
	}
	return xhr;
}
