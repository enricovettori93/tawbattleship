(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _user_login_user_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user-login/user-login.component */ "./src/app/user-login/user-login.component.ts");
/* harmony import */ var _user_info_user_info_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user-info/user-info.component */ "./src/app/user-info/user-info.component.ts");
/* harmony import */ var _user_signup_user_signup_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user-signup/user-signup.component */ "./src/app/user-signup/user-signup.component.ts");
/* harmony import */ var _scoreboard_scoreboard_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scoreboard/scoreboard.component */ "./src/app/scoreboard/scoreboard.component.ts");
/* harmony import */ var _players_players_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./players/players.component */ "./src/app/players/players.component.ts");
/* harmony import */ var _list_chats_list_chats_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./list-chats/list-chats.component */ "./src/app/list-chats/list-chats.component.ts");
/* harmony import */ var _match_builder_match_builder_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./match-builder/match-builder.component */ "./src/app/match-builder/match-builder.component.ts");
/* harmony import */ var _chat_chat_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./chat/chat.component */ "./src/app/chat/chat.component.ts");
/* harmony import */ var _notfound_notfound_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./notfound/notfound.component */ "./src/app/notfound/notfound.component.ts");
/* harmony import */ var _list_matches_list_matches_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./list-matches/list-matches.component */ "./src/app/list-matches/list-matches.component.ts");
/* harmony import */ var _match_match_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./match/match.component */ "./src/app/match/match.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: _user_login_user_login_component__WEBPACK_IMPORTED_MODULE_2__["UserLoginComponent"] },
    { path: 'user', component: _user_info_user_info_component__WEBPACK_IMPORTED_MODULE_3__["UserInfoComponent"] },
    { path: 'user/:username', component: _user_info_user_info_component__WEBPACK_IMPORTED_MODULE_3__["UserInfoComponent"] },
    { path: 'user/:username/matches', component: _list_matches_list_matches_component__WEBPACK_IMPORTED_MODULE_11__["ListMatchesComponent"] },
    { path: 'signup', component: _user_signup_user_signup_component__WEBPACK_IMPORTED_MODULE_4__["UserSignupComponent"] },
    { path: 'scoreboard', component: _scoreboard_scoreboard_component__WEBPACK_IMPORTED_MODULE_5__["ScoreboardComponent"] },
    { path: 'players', component: _players_players_component__WEBPACK_IMPORTED_MODULE_6__["PlayersComponent"] },
    { path: 'chats', component: _list_chats_list_chats_component__WEBPACK_IMPORTED_MODULE_7__["ListChatsComponent"] },
    { path: 'chats/:id', component: _chat_chat_component__WEBPACK_IMPORTED_MODULE_9__["ChatComponent"] },
    { path: 'match', component: _list_matches_list_matches_component__WEBPACK_IMPORTED_MODULE_11__["ListMatchesComponent"] },
    { path: 'match/:id/board', component: _match_builder_match_builder_component__WEBPACK_IMPORTED_MODULE_8__["MatchBuilderComponent"] },
    { path: 'match/:id', component: _match_match_component__WEBPACK_IMPORTED_MODULE_12__["MatchComponent"] },
    { path: '**', component: _notfound_notfound_component__WEBPACK_IMPORTED_MODULE_10__["NotfoundComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h2{\n    text-align: center;\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Navigation -->\n<app-navbar></app-navbar>\n<!-- Page Content -->\n<div id=\"myModal\" class=\"modal fade\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-body\">\n        <p>Hai ricevuto un messaggio!</p>\n      </div>\n    </div>\n  </div>\n</div>\n<section class=\"py-5\">\n  <div class=\"container py-5\">\n    <router-outlet></router-outlet>\n  </div>\n</section>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user.service */ "./src/app/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent(us) {
        this.us = us;
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-root",
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! .//app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _user_login_user_login_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./user-login/user-login.component */ "./src/app/user-login/user-login.component.ts");
/* harmony import */ var _user_info_user_info_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./user-info/user-info.component */ "./src/app/user-info/user-info.component.ts");
/* harmony import */ var _user_signup_user_signup_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./user-signup/user-signup.component */ "./src/app/user-signup/user-signup.component.ts");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./navbar/navbar.component */ "./src/app/navbar/navbar.component.ts");
/* harmony import */ var _scoreboard_scoreboard_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./scoreboard/scoreboard.component */ "./src/app/scoreboard/scoreboard.component.ts");
/* harmony import */ var _players_players_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./players/players.component */ "./src/app/players/players.component.ts");
/* harmony import */ var _list_chats_list_chats_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./list-chats/list-chats.component */ "./src/app/list-chats/list-chats.component.ts");
/* harmony import */ var _match_builder_match_builder_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./match-builder/match-builder.component */ "./src/app/match-builder/match-builder.component.ts");
/* harmony import */ var _chat_chat_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./chat/chat.component */ "./src/app/chat/chat.component.ts");
/* harmony import */ var _notfound_notfound_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./notfound/notfound.component */ "./src/app/notfound/notfound.component.ts");
/* harmony import */ var _list_matches_list_matches_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./list-matches/list-matches.component */ "./src/app/list-matches/list-matches.component.ts");
/* harmony import */ var angular_font_awesome__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! angular-font-awesome */ "./node_modules/angular-font-awesome/dist/angular-font-awesome.es5.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./user.service */ "./src/app/user.service.ts");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./utilities.service */ "./src/app/utilities.service.ts");
/* harmony import */ var _socketio_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./socketio.service */ "./src/app/socketio.service.ts");
/* harmony import */ var _match_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./match.service */ "./src/app/match.service.ts");
/* harmony import */ var _match_match_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./match/match.component */ "./src/app/match/match.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// Components













// Services





var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _user_login_user_login_component__WEBPACK_IMPORTED_MODULE_6__["UserLoginComponent"],
                _user_info_user_info_component__WEBPACK_IMPORTED_MODULE_7__["UserInfoComponent"],
                _user_signup_user_signup_component__WEBPACK_IMPORTED_MODULE_8__["UserSignupComponent"],
                _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_9__["NavbarComponent"],
                _scoreboard_scoreboard_component__WEBPACK_IMPORTED_MODULE_10__["ScoreboardComponent"],
                _players_players_component__WEBPACK_IMPORTED_MODULE_11__["PlayersComponent"],
                _list_chats_list_chats_component__WEBPACK_IMPORTED_MODULE_12__["ListChatsComponent"],
                _match_builder_match_builder_component__WEBPACK_IMPORTED_MODULE_13__["MatchBuilderComponent"],
                _chat_chat_component__WEBPACK_IMPORTED_MODULE_14__["ChatComponent"],
                _notfound_notfound_component__WEBPACK_IMPORTED_MODULE_15__["NotfoundComponent"],
                _list_matches_list_matches_component__WEBPACK_IMPORTED_MODULE_16__["ListMatchesComponent"],
                _match_match_component__WEBPACK_IMPORTED_MODULE_22__["MatchComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                angular_font_awesome__WEBPACK_IMPORTED_MODULE_17__["AngularFontAwesomeModule"]
            ],
            providers: [
                { provide: _user_service__WEBPACK_IMPORTED_MODULE_18__["UserService"], useClass: _user_service__WEBPACK_IMPORTED_MODULE_18__["UserService"] },
                { provide: _utilities_service__WEBPACK_IMPORTED_MODULE_19__["UtilitiesService"], useClass: _utilities_service__WEBPACK_IMPORTED_MODULE_19__["UtilitiesService"] },
                { provide: _socketio_service__WEBPACK_IMPORTED_MODULE_20__["SocketioService"], useClass: _socketio_service__WEBPACK_IMPORTED_MODULE_20__["SocketioService"] },
                { provide: _match_service__WEBPACK_IMPORTED_MODULE_21__["MatchService"], useClass: _match_service__WEBPACK_IMPORTED_MODULE_21__["MatchService"] }
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/chat/chat.component.css":
/*!*****************************************!*\
  !*** ./src/app/chat/chat.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".me {\n    width: 60%;\n    text-align: right;\n    float: right;\n}\n\n.other {\n    width: 60%;\n    text-align: left;\n    float: left;\n}"

/***/ }),

/***/ "./src/app/chat/chat.component.html":
/*!******************************************!*\
  !*** ./src/app/chat/chat.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row col\">\n  <h1>Messaggi</h1>\n</div>\n<div class=\"container py-2\">\n  <div *ngIf=\"messages.length === 0\">Nessun messaggio presente nella chat</div>\n  <div *ngIf=\"-(showMessage) <= messages.length\" style=\"text-align: center\">\n    <a style=\"color: #083d8d\" (click)=\"showMoreMessages()\">Visualizza più messaggi</a>\n  </div>\n  <div *ngFor=\"let message of messagesToShow\">\n    <div *ngIf=\"message.senderID == id_user\">\n      <div class=\"alert alert-dark py-2 me\">\n        <span>{{message.text}}</span>\n        <br>\n        <span style=\"font-size: .8em\">{{message.sentAt}}</span>\n      </div>\n    </div>\n    <div *ngIf=\"message.senderID != id_user\">\n      <div class=\"alert alert-info py-2 other\">\n        <span>{{message.text}}</span>\n        <br>\n        <span style=\"font-size: .8em\">{{message.sentAt}}</span>\n      </div>\n    </div>\n  </div>\n  {{scrollDown()}}\n  <form>\n    <div class=\"form-group\">\n      <label for=\"messageTextArea\"></label>\n      <textarea class=\"form-control\" id=\"messageTextArea\" rows=\"3\" [(ngModel)] = \"textMessage\" maxlength=\"1000\" name=\"message\"></textarea>\n    </div>\n    <div *ngIf=\"error\"class=\"alert alert-danger\" role=\"alert\">\n        {{error}}\n    </div>\n    <div class=\"row col-sm-12\">\n      <button type=\"button\" class=\"btn btn-primary\" (click)=\"sendMessage()\">Invia il messaggio</button>\n    </div>\n  </form>\n</div>"

/***/ }),

/***/ "./src/app/chat/chat.component.ts":
/*!****************************************!*\
  !*** ./src/app/chat/chat.component.ts ***!
  \****************************************/
/*! exports provided: ChatComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatComponent", function() { return ChatComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities.service */ "./src/app/utilities.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _socketio_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../socketio.service */ "./src/app/socketio.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ChatComponent = /** @class */ (function () {
    function ChatComponent(userService, utilities, router, socketService) {
        this.userService = userService;
        this.utilities = utilities;
        this.router = router;
        this.socketService = socketService;
        this.messages = [];
        this.messagesToShow = [];
        this.error = undefined;
        this.textMessage = undefined;
        this.showMessage = -10;
    }
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.utilities.check_auth(this.userService.get_token());
        this.id_user = this.userService.get_userId();
        this.id_chat = this.router.url.split('/').pop();
        this.getMessagge();
        this.socketService.connect(this.id_chat).subscribe(function (m) {
            _this.getMessagge();
        });
    };
    ChatComponent.prototype.showMoreMessages = function () {
        this.showMessage -= 10;
        this.messagesToShow = this.messages.slice(this.showMessage);
    };
    ChatComponent.prototype.getMessagge = function () {
        var _this = this;
        this.userService.getUserSingleChat(this.router.url.split('/').pop()).subscribe(function (messages) {
            _this.messages = messages[0]['listMessage'];
            if (_this.messages.length <= 10) {
                _this.messagesToShow = _this.messages;
            }
            else {
                _this.messagesToShow = _this.messages.slice(_this.showMessage);
            }
            _this.scrollDown();
            // console.log('MESSAGGI: ' + JSON.stringify(this.messages) + ' num. messaggi' + this.messages.length);
        });
    };
    ChatComponent.prototype.scrollDown = function () {
        window.scrollTo(0, document.body.scrollHeight);
    };
    ChatComponent.prototype.sendMessage = function () {
        var _this = this;
        if (this.textMessage === '' || this.textMessage === undefined) {
            this.error = 'Impossibile inviare un messaggio vuoto';
        }
        else {
            //console.log(this.textMessage);
            this.userService.sendMessage(this.id_chat, this.textMessage).subscribe(function (data) {
                _this.textMessage = '';
                console.log(JSON.stringify(data));
            });
            this.error = undefined;
        }
    };
    ChatComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-chat',
            template: __webpack_require__(/*! ./chat.component.html */ "./src/app/chat/chat.component.html"),
            styles: [__webpack_require__(/*! ./chat.component.css */ "./src/app/chat/chat.component.css")]
        }),
        __metadata("design:paramtypes", [_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"],
            _utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _socketio_service__WEBPACK_IMPORTED_MODULE_4__["SocketioService"]])
    ], ChatComponent);
    return ChatComponent;
}());



/***/ }),

/***/ "./src/app/list-chats/list-chats.component.css":
/*!*****************************************************!*\
  !*** ./src/app/list-chats/list-chats.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/list-chats/list-chats.component.html":
/*!******************************************************!*\
  !*** ./src/app/list-chats/list-chats.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row col\">\n  <h1>Le tue chat</h1>\n</div>\n<div *ngIf=\"chats.length === 0\">\n  <h2>Nessuna chat presente</h2>\n  <p>\n    <a routerLink=\"/players\">Cerca</a> un giocatore per iniziare una chat con lui</p>\n</div>\n<div *ngFor=\"let chat of chats\">\n  <div class=\"row\">\n    <div class=\"col-8\">\n      <span class=\"align-middle\">\n        <a routerLink='/chats/{{chat._id}}'>Clicca</a> per visualizzare la tra l'utente\n        <span *ngIf=\"chat.user1ID == null\"><i>utente eliminato</i></span>\n        <a *ngIf=\"chat.user1ID != null && chat.user1ID.username != userService.get_username()\" routerLink='/user/{{chat.user1ID.username}}'>{{chat.user1ID.username}}</a>\n        <a *ngIf=\"chat.user1ID != null && chat.user1ID.username == userService.get_username()\" routerLink='/user'>{{chat.user1ID.username}}</a>\n        e l'utente\n        <span *ngIf=\"chat.user2ID == null\"><i>utente eliminato</i></span>\n        <a *ngIf=\"chat.user2ID != null && chat.user2ID.username != userService.get_username()\" routerLink='/user/{{chat.user2ID.username}}'>{{chat.user2ID.username}}</a>\n        <a *ngIf=\"chat.user2ID != null && chat.user2ID.username == userService.get_username()\" routerLink='/user'>{{chat.user2ID.username}}</a>\n      </span>\n    </div>\n    <div class=\"col-4\">\n      <button class=\"alert alert-danger align-middle\" style=\"padding:.3em\" (click)=\"deleteChat(chat._id)\">Cancella la chat</button>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/list-chats/list-chats.component.ts":
/*!****************************************************!*\
  !*** ./src/app/list-chats/list-chats.component.ts ***!
  \****************************************************/
/*! exports provided: ListChatsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListChatsComponent", function() { return ListChatsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities.service */ "./src/app/utilities.service.ts");
/* harmony import */ var _socketio_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../socketio.service */ "./src/app/socketio.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ListChatsComponent = /** @class */ (function () {
    function ListChatsComponent(userService, utilities, socket) {
        this.userService = userService;
        this.utilities = utilities;
        this.socket = socket;
        this.chats = [];
    }
    ListChatsComponent.prototype.ngOnInit = function () {
        this.utilities.check_auth(this.userService.get_token());
        this.getUserChats();
        this.socket.connect(this.userService.get_userId()).subscribe(function (m) {
            $('#myModal').modal('show');
            $('.modal-backdrop').removeClass('modal-backdrop');
            setTimeout(function () {
                $('#myModal').modal('hide');
            }, 2000);
        });
    };
    ListChatsComponent.prototype.getUserChats = function () {
        var _this = this;
        this.userService.getUserChats().subscribe(function (data) {
            // console.log('Chat trovate' + JSON.stringify(data));
            _this.chats = data[0]['chatList'];
        });
    };
    ListChatsComponent.prototype.deleteChat = function (id) {
        var _this = this;
        var answer = confirm('Sei sicuro di voler cancellare questa chat?');
        if (answer) {
            this.userService.deleteChat(id).subscribe(function (data) {
                //console.log(JSON.stringify(data));
                _this.getUserChats();
            });
        }
    };
    ListChatsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-list-chats',
            template: __webpack_require__(/*! ./list-chats.component.html */ "./src/app/list-chats/list-chats.component.html"),
            styles: [__webpack_require__(/*! ./list-chats.component.css */ "./src/app/list-chats/list-chats.component.css")]
        }),
        __metadata("design:paramtypes", [_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"], _utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"], _socketio_service__WEBPACK_IMPORTED_MODULE_3__["SocketioService"]])
    ], ListChatsComponent);
    return ListChatsComponent;
}());



/***/ }),

/***/ "./src/app/list-matches/list-matches.component.css":
/*!*********************************************************!*\
  !*** ./src/app/list-matches/list-matches.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/list-matches/list-matches.component.html":
/*!**********************************************************!*\
  !*** ./src/app/list-matches/list-matches.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"userRoutingMatch; then matchUser; else matchWaiting\"></div>\n\n<ng-template #matchUser>\n  <h1>Lista dei match</h1>\n  <div *ngIf=\"matches.length === 0\">\n    <h2>Il giocatore non ha giocato alcun match!</h2>\n  </div>\n  <div *ngFor=\"let match of matches\">\n    <p>Data della partita: {{match.timestamp}}</p>\n    <div [ngSwitch]=\"match.status\">\n      <p *ngSwitchCase=\"0\">Match in attesa del secondo partecipante, <a style=\"color: #0056b3\" (click)=\"matchService.joinMatch(match._id, userService.get_username())\">sfidalo!</a></p>\n      <p *ngSwitchCase=\"1\">Match in fase di costruzione</p>\n      <p *ngSwitchCase=\"2\">Match in fase di gioco</p>\n      <p *ngSwitchCase=\"3\">Match finito, <a style=\"color: #0056b3\" routerLink=\"/match/{{match._id}}\">guarda</a> com'è finita la partita</p>\n    </div>\n  </div>\n</ng-template>\n\n<ng-template #matchWaiting>\n  <h1>Lista dei match in attesa</h1>\n  <div *ngIf=\"matches.length === 0\">\n    <h2>Nessun match pronto per essere giocato!</h2>\n  </div>\n  <div *ngFor=\"let match of matches\">\n    <div *ngIf=\"match.owner != null\">\n      <p>\n        <b>Data di creazione</b> {{match.timestamp}}</p>\n      <p *ngIf=\"match.owner.username !== undefined && match.owner.username != userService.get_username()\">\n        <b>Entra nella partita di: </b>\n        <a routerLink=\"/user/{{match.owner.username}}\">{{match.owner.username}}</a>\n      </p>\n      <p *ngIf=\" match.owner.username !== undefined && match.owner.username == userService.get_username()\">\n        <b>Guarda lo stato della tua partita</b>\n      </p>\n      <p *ngIf=\" match.opponent !== undefined && ( match.owner == userService.get_userId() || match.opponent == userService.get_userId())\">\n        <b>Hai una partita in corso</b>\n      </p>\n      <button class=\"btn btn-primary\" (click)=\"enterMatch(match._id)\">Entra nella partita!</button>\n      <hr>\n    </div>\n  </div>\n  <div *ngIf=\"errormessage\" class=\"alert alert-primary-danger\">{{errormessage}}</div>\n  <button *ngIf=\"userHadAlreadyWaitingMatch != true\" class=\"btn btn-primary\" (click)=\"createMatch()\">Crea una nuova partita</button>\n</ng-template>\n"

/***/ }),

/***/ "./src/app/list-matches/list-matches.component.ts":
/*!********************************************************!*\
  !*** ./src/app/list-matches/list-matches.component.ts ***!
  \********************************************************/
/*! exports provided: ListMatchesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListMatchesComponent", function() { return ListMatchesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities.service */ "./src/app/utilities.service.ts");
/* harmony import */ var _match_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../match.service */ "./src/app/match.service.ts");
/* harmony import */ var _socketio_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../socketio.service */ "./src/app/socketio.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_6__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ListMatchesComponent = /** @class */ (function () {
    function ListMatchesComponent(userService, router, utilities, matchService, socketService) {
        this.userService = userService;
        this.router = router;
        this.utilities = utilities;
        this.matchService = matchService;
        this.socketService = socketService;
        this.matches = [];
        this.errormessage = undefined;
        this.userRoutingMatch = undefined;
        this.userHadAlreadyWaitingMatch = false;
    }
    ListMatchesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.utilities.check_auth(this.userService.get_token());
        this.socketService.connect(this.userService.get_userId()).subscribe(function (m) {
            $('#myModal').modal('show');
            $('.modal-backdrop').removeClass('modal-backdrop');
            setTimeout(function () {
                $('#myModal').modal('hide');
            }, 2000);
        });
        var socket = socket_io_client__WEBPACK_IMPORTED_MODULE_6__(this.userService.url);
        socket.on('new match added', function (m) {
            console.log(m);
            _this.getWaitingMatch();
        });
        if (this.router.url === '/match') {
            this.getWaitingMatch();
        }
        else {
            var arrayString = this.router.url.split('/');
            this.userRoutingMatch = arrayString[2];
            this.getUserMatch();
        }
    };
    ListMatchesComponent.prototype.getWaitingMatch = function () {
        var _this = this;
        this.matches = [];
        this.matchService.getUserActiveMatches(this.userService.get_username())
            .subscribe(function (match) {
            if (Object.keys(match).length === 0) {
                _this.matchService.getWaitingMatch().subscribe(function (matches) {
                    matches.forEach(function (element) {
                        if (element.owner != null) {
                            if (_this.userService.get_userId() === element.owner._id) {
                                _this.userHadAlreadyWaitingMatch = true;
                                _this.matchOwnedId = element._id;
                            }
                        }
                    });
                    _this.matches = matches;
                });
            }
            else {
                _this.userHadAlreadyWaitingMatch = true;
                _this.matchOwnedId = match._id;
                _this.matches = [match];
            }
        });
    };
    ListMatchesComponent.prototype.enterMatch = function (idMatch) {
        var _this = this;
        if (this.userHadAlreadyWaitingMatch) {
            this.router.navigate(['/match/' + this.matchOwnedId + '/board']);
        }
        else {
            var request = this.matchService.joinMatch(idMatch, this.userService.get_userId());
            request.subscribe(function (data) {
                //console.log(data);
                if (!data.error) {
                    _this.router.navigate(['/match/' + idMatch + '/board']);
                }
            }, function (error) {
                console.log('Impossibile entrare nella partita');
            });
        }
    };
    ListMatchesComponent.prototype.getUserMatch = function () {
        var _this = this;
        this.matches = [];
        this.matchService.getUserMatches(this.userRoutingMatch).subscribe(function (data) {
            _this.matches = data;
        });
    };
    ListMatchesComponent.prototype.createMatch = function () {
        var _this = this;
        this.matchService.createMatch().subscribe(function (data) {
            _this.errormessage = undefined;
            _this.router.navigate(['/match/' + data.id + '/board']);
        }, function (err) {
            _this.errormessage = err.error.errormessage;
        });
    };
    ListMatchesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-list-matches',
            template: __webpack_require__(/*! ./list-matches.component.html */ "./src/app/list-matches/list-matches.component.html"),
            styles: [__webpack_require__(/*! ./list-matches.component.css */ "./src/app/list-matches/list-matches.component.css")]
        }),
        __metadata("design:paramtypes", [_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"],
            _match_service__WEBPACK_IMPORTED_MODULE_3__["MatchService"],
            _socketio_service__WEBPACK_IMPORTED_MODULE_4__["SocketioService"]])
    ], ListMatchesComponent);
    return ListMatchesComponent;
}());



/***/ }),

/***/ "./src/app/match-builder/match-builder.component.css":
/*!***********************************************************!*\
  !*** ./src/app/match-builder/match-builder.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".vertical {\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.horizonatal {\n  -webkit-transform: none;\n          transform: none;\n}\n\n.ship-group {\n  display: inline-block;\n  margin: 10px 20px;\n}\n\n.fa-times, .fa-repeat {\n  position: absolute;\n}\n\n.destroyer .fa-repeat {\n  right: 15px;\n  top: 20px\n}\n\n.destroyer .fa-times {\n  right: 15px;\n  bottom: 30px\n}\n\n.submarine .fa-repeat {\n  right: 15px;\n  top: 30px\n}\n\n.submarine .fa-times {\n  right: 15px;\n  bottom: 45px\n}\n\n.battleship .fa-repeat {\n  right: 15px;\n  top: 50px\n}\n\n.battleship .fa-times {\n  right: 15px;\n  bottom: 45px\n}\n\n.aircraft-carrier .fa-repeat {\n  right: 15px;\n  top: 50px\n}\n\n.aircraft-carrier .fa-times {\n  right: 15px;\n  bottom: 75px\n}\n\n.ship {\n  position: relative;\n  display: block;\n  float: left;\n}\n\n.ship[draggable=\"false\"] {\n  opacity: 0.5;\n}\n\n.held {\n  border: solid 10px black;\n  background-color: black;\n}\n\n.holder {\n  height: 50px;\n  width: 50px;\n  border: solid 1px #666;\n  background-color: white;\n  display: inline-block;\n}\n\n.hovered {\n  border: dotted 5px black;\n}\n\n.invisible {\n  display: none;\n}\n\n#container {\n  margin: auto;\n  top: 100px;\n  width: 400px;\n  position: relative;\n}\n\n.board-row {\n  line-height: 0px;\n  max-width: 100%;\n  display: block;\n  text-align: center;\n}\n\n@media (max-width: 1025px) {\n  .holder {\n    width: 45px;\n    height: 45px;\n  }\n  .destroyer {\n    height: 50px;\n  }\n  .submarine {\n    height: 60px;\n  }\n  .battleship {\n    height: 70px;\n  }\n  .aircraft-carrier{\n    height: 80px;\n  }\n}\n\n@media screen and (max-width: 600px) {\n  .holder {\n    width: 30px;\n    height: 30px;\n  }\n}\n"

/***/ }),

/***/ "./src/app/match-builder/match-builder.component.html":
/*!************************************************************!*\
  !*** ./src/app/match-builder/match-builder.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1>Schermata del match</h1>\n<div *ngIf=\"match\">\n  <div [ngSwitch]=\"match.status\">\n    <h2 *ngSwitchCase=\"0\">Match in attesa del secondo partecipante</h2>\n    <h2 *ngSwitchCase=\"1\">Match in fase di costruzione</h2>\n    <h2 *ngSwitchCase=\"2\">Match in fase di gioco</h2>\n    <h2 *ngSwitchCase=\"3\">Match finito</h2>\n  </div>\n  <div *ngIf=\"match.status == 1\" >\n    <div class=\"row\">\n      <div class=\"col-lg-6\" #battlefieldDOM>\n        <h2>Posiziona le tue navi</h2>\n        <div class=\"board-row\" *ngFor=\"let row of board\">\n          <div class=\"holder\" [ngStyle]=\"{'background-color': cell.getStatus()}\" [attr.row]=\"cell.getRow()\" [attr.col]=\"cell.getCol()\" *ngFor=\"let cell of row\">\n          </div>\n        </div>\n      </div>\n      <div class=\"col-lg-6\" #shipsDOM>\n        <div class=\"ship-group\">\n          <h6>Cacciatorpediniere - grandezza: 2</h6>\n          <div class=\"ship destroyer\" [attr.draggable]=\"!ship.isUsed()\" *ngFor=\"let ship of destroyers\"  [attr.id]=\"ship.getId()\">\n            <img src=\"assets/images/destroyer.svg\" [ngClass]=\"{'horizontal': ship.getOrientation() == 0, 'vertical': ship.getOrientation() == 1, 'destroyers':true }\"/>\n            <i class=\"fa fa-repeat\" (click)=\"rotate(ship)\" aria-hidden=\"true\"></i>\n            <div *ngIf=\"ship.isUsed()\">\n              <i class=\"fa fa-times\" (click)=\"removeFromBoard(ship)\"aria-hidden=\"true\"></i>\n            </div>\n          </div>\n        </div>\n        <div class=\"ship-group\">\n          <h6>Sottomarino - grandezza: 3</h6>\n          <div class=\"ship submarine\" [attr.draggable]=\"!ship.isUsed()\" *ngFor=\"let ship of submarines\" [attr.id]=\"ship.getId()\">\n            <img src=\"assets/images/submarine.svg\" [ngClass]=\"{'horizontal': ship.getOrientation() == 0, 'vertical': ship.getOrientation() == 1, 'submarines':true }\"/>\n            <i class=\"fa fa-repeat\" (click)=\"rotate(ship)\" aria-hidden=\"true\"></i>\n            <div *ngIf=\"ship.isUsed()\">\n              <i class=\"fa fa-times\" (click)=\"removeFromBoard(ship)\" aria-hidden=\"true\"></i>\n            </div>\n          </div>\n        </div>\n        <div class=\"ship-group\">\n        <h6>Corazzata - grandezza: 4</h6>\n          <div class=\"ship battleship\" [attr.draggable]=\"!ship.isUsed()\" *ngFor=\"let ship of battleships\" [attr.id]=\"ship.getId()\">\n            <img src=\"assets/images/battleship.svg\" [ngClass]=\"{'horizontal': ship.getOrientation() == 0, 'vertical': ship.getOrientation() == 1, 'battleships':true }\"/>\n            <i class=\"fa fa-repeat\" (click)=\"rotate(ship)\" aria-hidden=\"true\"></i>\n            <div *ngIf=\"ship.isUsed()\">\n              <i class=\"fa fa-times\" (click)=\"removeFromBoard(ship)\" aria-hidden=\"true\"></i>\n            </div>\n          </div>\n        </div>\n        <div class=\"ship-group\">\n          <h6>Portaerei - grandezza: 5</h6>\n          <div class=\"ship aircraft-carrier\" [attr.draggable]=\"!ship.isUsed()\" *ngFor=\"let ship of aircraftCarriers\" [attr.id]=\"ship.getId()\">\n            <img src=\"assets/images/aircraft-carrier.svg\" [ngClass]=\"{'horizontal': ship.getOrientation() == 0, 'vertical': ship.getOrientation() == 1, 'aircraftCarriers':true }\"/>\n            <i class=\"fa fa-repeat\" (click)=\"rotate(ship)\" aria-hidden=\"true\"></i>\n            <i class=\"fa fa-times\" (click)=\"removeFromBoard(ship)\" aria-hidden=\"true\" *ngIf=\"ship.isUsed()\"></i>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-md-6\">\n        <button type=\"button\" [disabled]=\"!submitEnabled\" (click)=\"sendBoard()\" class=\"btn btn-primary\">Inizia la partita</button>\n      </div>\n      <div class=\"col-md-6\">\n        <div class=\"alert alert-success\" *ngIf=\"boardUpdated\">\n          <strong>Inviato!</strong> Non appena il tuo avversario posizionerà il campo inizierà la partita\n        </div>\n        <div class=\"alert alert-danger\" *ngIf=\"error\">\n          <strong>Errore</strong> {{errorMessage}}\n        </div>\n      </div>\n    </div>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/match-builder/match-builder.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/match-builder/match-builder.component.ts ***!
  \**********************************************************/
/*! exports provided: MatchBuilderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatchBuilderComponent", function() { return MatchBuilderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities.service */ "./src/app/utilities.service.ts");
/* harmony import */ var _match_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../match.service */ "./src/app/match.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_5__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MatchBuilderComponent = /** @class */ (function () {
    function MatchBuilderComponent(userService, utilities, matchService, activatedRoute, router) {
        this.userService = userService;
        this.utilities = utilities;
        this.matchService = matchService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.submitEnabled = false;
        this.boardUpdated = false;
        this.error = false;
        this.errorMessage = '';
    }
    MatchBuilderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.utilities.check_auth(this.userService.get_token());
        this.ships = this.matchService.initShips();
        this.aircraftCarriers = new Array();
        this.battleships = new Array();
        this.destroyers = new Array();
        this.submarines = new Array();
        this.ships.forEach(function (ship) {
            switch (ship.getType()) {
                case 5 /* AIRCRAFTCARRIER */:
                    _this.aircraftCarriers.push(ship);
                    break;
                case 4 /* BATTLESHIP */:
                    _this.battleships.push(ship);
                    break;
                case 2 /* DESTROYER */:
                    _this.destroyers.push(ship);
                    break;
                case 3 /* SUBMARINE */:
                    _this.submarines.push(ship);
                    break;
            }
        });
        this.shipsDict = new Object();
        this.ships.forEach(function (ship) {
            _this.shipsDict[ship.getId()] = ship;
        });
        this.board = new Array();
        for (var i = 0; i < 10; i++) {
            this.board.push(new Array());
            for (var j = 0; j < 10; j++) {
                var cell = new _match_service__WEBPACK_IMPORTED_MODULE_3__["Cell"](j, i);
                cell.setStatus("#0080FF" /* FREE */);
                this.board[i].push(cell);
            }
        }
        this.activatedRoute.paramMap.subscribe(function (data) {
            _this.id_match = data.get('id');
            var socket = socket_io_client__WEBPACK_IMPORTED_MODULE_5__(_this.userService.url);
            socket.on('broadcast ' + _this.id_match, function (m) {
                _this.matchService.getMatchInfo(_this.id_match).subscribe(function (match) {
                    _this.match = match;
                    if (match.status === 2) {
                        _this.router.navigate(['/match/' + _this.match._id]);
                    }
                }, function (err) {
                    console.log(JSON.stringify(err));
                });
            });
            _this.matchService.getMatchInfo(_this.id_match).subscribe(function (match) {
                _this.match = match;
                if (match.status === 2) {
                    _this.router.navigate(['/match/' + _this.match._id]);
                }
            }, function (err) {
                console.log(JSON.stringify(err));
            });
        });
    };
    MatchBuilderComponent.prototype.getElemAt = function (x, y, classID) {
        return $('body')
            .find('.' + classID)
            .filter(function () {
            if ($(this).offset().top < y && y < parseInt($(this).offset().top, 10) + $(this).height()
                && $(this).offset().left < x && x < parseInt($(this).offset().left, 10) + $(this).width()) {
                return true;
            }
            return false;
        });
    };
    MatchBuilderComponent.prototype.ngAfterViewChecked = function () {
        var component = this;
        $('.ship').draggable({
            start: function () {
                component.dragstart(component.shipsDict[$(this).attr('id')]);
            },
            drag: function (event) {
                component.dragover(component.getElemAt(event.pageX, event.pageY, 'holder'));
            },
            stop: function (event) {
                component.drop(component.getElemAt(event.pageX, event.pageY, 'holder'));
            },
            snap: '.holder', snapTolerance: 10
        });
    };
    MatchBuilderComponent.prototype.rotate = function (ship) {
        if (!ship.isUsed()) {
            if (ship.getOrientation() === 0 /* HORIZONTAL */) {
                ship.setOrientation(1 /* VERTICAL */);
            }
            else {
                ship.setOrientation(0 /* HORIZONTAL */);
            }
        }
    };
    MatchBuilderComponent.prototype.removeFromBoard = function (ship) {
        ship.removeFromBoard();
        for (var i = 0; i < this.board.length; i++) {
            for (var j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j].getStatus() === "#64FE2E" /* OCCUPIED */ && this.board[i][j].getShipRef() === ship.getId()) {
                    this.board[i][j].removeShipRef();
                }
            }
        }
        this.submitEnabled = false;
    };
    MatchBuilderComponent.prototype.dragstart = function (ship) {
        this.draggingShip = ship;
    };
    MatchBuilderComponent.prototype.validDraggingCheck = function (row, col) {
        if (this.draggingShip.getOrientation() === 0 /* HORIZONTAL */) {
            return col + Math.ceil(this.draggingShip.getLength() / 2) < 10 &&
                col + 1 - Math.floor(this.draggingShip.getLength() / 2) >= 0 &&
                this.checkOverlap(row, col);
        }
        else {
            return row + Math.ceil(this.draggingShip.getLength() / 2) < 10 &&
                row + 1 - Math.floor(this.draggingShip.getLength() / 2) >= 0 &&
                this.checkOverlap(row, col);
        }
    };
    MatchBuilderComponent.prototype.checkOverlap = function (row, col) {
        if (this.draggingShip.getOrientation() === 0 /* HORIZONTAL */) {
            for (var i = -1; i < 2; i++) {
                for (var j = -Math.floor(this.draggingShip.getLength() / 2) - 1; j < Math.ceil(this.draggingShip.getLength() / 2) + 1; j++) {
                    var rowAux = row + i;
                    var colAux = col + j + 1;
                    if (rowAux >= 0 && rowAux < 10 && colAux >= 0 && colAux < 10 && this.board[rowAux][colAux].getStatus() === "#64FE2E" /* OCCUPIED */) {
                        return false;
                    }
                }
            }
        }
        else {
            for (var i = -Math.floor(this.draggingShip.getLength() / 2) - 1; i < Math.ceil(this.draggingShip.getLength() / 2) + 1; i++) {
                for (var j = -1; j < 2; j++) {
                    var rowAux = row + i + 1;
                    var colAux = col + j;
                    if (rowAux >= 0 && rowAux < 10 && colAux >= 0 && colAux < 10 && this.board[rowAux][colAux].getStatus() === "#64FE2E" /* OCCUPIED */) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    MatchBuilderComponent.prototype.changeStatus = function (row, col, status) {
        if (this.draggingShip.getOrientation() === 0 /* HORIZONTAL */) {
            for (var i = 0; i < this.board.length; i++) {
                for (var j = 0; j < this.board[i].length; j++) {
                    if (this.board[i][j].getStatus() === "#0000FF" /* OVER */) {
                        this.board[i][j].setStatus("#0080FF" /* FREE */);
                    }
                    if (row === i && (j === col ||
                        ((col >= j) && (col - j) < Math.floor(this.draggingShip.getLength() / 2)) ||
                        ((col < j) && (j - col) <= Math.ceil(this.draggingShip.getLength() / 2)))) {
                        this.board[i][j].setStatus(status);
                        if (status === "#64FE2E" /* OCCUPIED */) {
                            this.board[i][j].setShipRef(this.draggingShip.getId());
                        }
                    }
                }
            }
        }
        else {
            for (var i = 0; i < this.board.length; i++) {
                for (var j = 0; j < this.board[i].length; j++) {
                    if (this.board[i][j].getStatus() === "#0000FF" /* OVER */) {
                        this.board[i][j].setStatus("#0080FF" /* FREE */);
                    }
                    if (col === j && (row === i ||
                        ((row > i) && (row - i) < Math.floor(this.draggingShip.getLength() / 2)) ||
                        ((row <= i) && (i - row) <= Math.ceil(this.draggingShip.getLength() / 2)))) {
                        this.board[i][j].setStatus(status);
                        if (status === "#64FE2E" /* OCCUPIED */) {
                            this.board[i][j].setShipRef(this.draggingShip.getId());
                        }
                    }
                }
            }
        }
        if (status === "#64FE2E" /* OCCUPIED */) {
            var allShipsOnBoard_1 = true;
            var shipNotUsed_1;
            this.ships.forEach(function (ship) {
                if (!ship.isUsed()) {
                    shipNotUsed_1 = ship;
                    allShipsOnBoard_1 = false;
                }
            });
            // console.log(shipNotUsed);
            this.submitEnabled = allShipsOnBoard_1;
        }
    };
    MatchBuilderComponent.prototype.dragover = function (elem) {
        var row = parseInt($(elem).attr('row'), 10);
        var col = parseInt($(elem).attr('col'), 10);
        this.validDragging = this.validDraggingCheck(row, col);
        if (this.validDragging) {
            this.changeStatus(row, col, "#0000FF" /* OVER */);
        }
    };
    MatchBuilderComponent.prototype.drop = function (elem) {
        var row = parseInt($(elem).attr('row'), 10);
        var col = parseInt($(elem).attr('col'), 10);
        if (this.validDragging) {
            this.draggingShip.setUsed();
            this.changeStatus(row, col, "#64FE2E" /* OCCUPIED */);
        }
    };
    // TODO: da implementare
    MatchBuilderComponent.prototype.sendBoard = function () {
        var _this = this;
        this.matchService.sendBoard(this.board, this.ships, this.id_match).subscribe(function (data) {
            _this.error = false;
            _this.boardUpdated = true;
        }, function (error) {
            _this.errorMessage = error.error.errormessage;
            _this.error = true;
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('battlefieldDOM'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], MatchBuilderComponent.prototype, "battlefieldDom", void 0);
    MatchBuilderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-match',
            template: __webpack_require__(/*! ./match-builder.component.html */ "./src/app/match-builder/match-builder.component.html"),
            styles: [__webpack_require__(/*! ./match-builder.component.css */ "./src/app/match-builder/match-builder.component.css")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"],
            _utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"],
            _match_service__WEBPACK_IMPORTED_MODULE_3__["MatchService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], MatchBuilderComponent);
    return MatchBuilderComponent;
}());



/***/ }),

/***/ "./src/app/match.service.ts":
/*!**********************************!*\
  !*** ./src/app/match.service.ts ***!
  \**********************************/
/*! exports provided: MatchService, Ship, Cell */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatchService", function() { return MatchService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ship", function() { return Ship; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cell", function() { return Cell; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user.service */ "./src/app/user.service.ts");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utilities.service */ "./src/app/utilities.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MatchService = /** @class */ (function () {
    function MatchService(http, router, utilities, userService) {
        this.http = http;
        this.router = router;
        this.utilities = utilities;
        this.userService = userService;
    }
    MatchService.prototype.getWaitingMatch = function () {
        return this.http.get(this.userService.url + '/matches', this.utilities.create_options(this.userService.get_token())).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (data) {
            //console.log('Waiting match: ' + JSON.stringify(data));
        }));
    };
    MatchService.prototype.getMatchInfo = function (match_id, fullInfo) {
        var request = this.userService.url + '/matches/' + match_id;
        if (fullInfo) {
            request += '?type=fullInfo';
        }
        return this.http.get(request, this.utilities.create_options(this.userService.get_token()));
    };
    MatchService.prototype.getUserActiveMatches = function (user) {
        return this.getUserMatches(user).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (matchArray) {
            var match = {};
            matchArray.forEach(function (matchAux) {
                if (matchAux.status === 1 || matchAux.status === 2) {
                    match = matchAux;
                }
            });
            return match;
        }));
    };
    MatchService.prototype.getUserMatches = function (user) {
        return this.http.get(this.userService.url + '/users/' + user + '/matches', this.utilities.create_options(this.userService.get_token())).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (data) {
            //console.log('Logged user match: ' + JSON.stringify(data));
        }));
    };
    MatchService.prototype.createMatch = function () {
        return this.http.post(this.userService.url + '/matches', {}, this.utilities.create_options(this.userService.get_token())).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (data) {
            //console.log('Creating match: ' + JSON.stringify(data));
        }));
    };
    MatchService.prototype.joinMatch = function (id, user_id) {
        return this.http.put(this.userService.url + '/matches/' + id + '/join', {}, this.utilities.create_options(this.userService.get_token())).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (data) {
            //console.log('Creating match: ' + JSON.stringify(data));
        }));
    };
    MatchService.prototype.initShips = function () {
        var ships = new Array();
        for (var i = 0; i < 4; i++) {
            ships.push(new Ship(2 /* DESTROYER */));
        }
        for (var i = 0; i < 2; i++) {
            ships.push(new Ship(3 /* SUBMARINE */));
        }
        for (var i = 0; i < 2; i++) {
            ships.push(new Ship(4 /* BATTLESHIP */));
        }
        for (var i = 0; i < 1; i++) {
            ships.push(new Ship(5 /* AIRCRAFTCARRIER */));
        }
        return ships;
    };
    MatchService.prototype.sendBoard = function (board, ships, matchId) {
        var res = new Object();
        var shipsArray = new Array();
        ships.forEach(function (ship) {
            var shipParts = new Array();
            for (var i = 0; i < board.length; i++) {
                for (var j = 0; j < board[i].length; j++) {
                    if (board[i][j].getStatus() === "#64FE2E" /* OCCUPIED */ && board[i][j].getShipRef() === ship.getId()) {
                        shipParts.push({ 'x': i, 'y': j });
                    }
                }
            }
            shipsArray.push(shipParts);
        });
        res['positioning'] = { 'ships': shipsArray };
        //console.log(JSON.stringify(res));
        return this.http.put(this.userService.url + '/matches/' + matchId + '/board', res, this.utilities.create_options(this.userService.get_token()));
    };
    MatchService.prototype.shoot = function (x, y, matchId) {
        //console.log({ position: { x: x, y: y } });
        return this.http.put(this.userService.url + '/matches/' + matchId, { position: { x: x, y: y } }, this.utilities.create_options(this.userService.get_token()));
    };
    MatchService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _utilities_service__WEBPACK_IMPORTED_MODULE_5__["UtilitiesService"], _user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"]])
    ], MatchService);
    return MatchService;
}());

var Ship = /** @class */ (function () {
    function Ship(type) {
        this.used = false;
        this.type = type;
        this.orientation = 0 /* HORIZONTAL */;
        this.id = Ship.getId();
    }
    Ship.getId = function () {
        return Ship.id++;
    };
    Ship.prototype.setOrientation = function (orientation) {
        this.orientation = orientation;
    };
    Ship.prototype.getOrientation = function () {
        return this.orientation;
    };
    Ship.prototype.getLength = function () {
        return this.type;
    };
    Ship.prototype.getPart = function () {
        return new Array(this.type);
    };
    Ship.prototype.getType = function () {
        return this.type;
    };
    Ship.prototype.setUsed = function () {
        this.used = true;
    };
    Ship.prototype.removeFromBoard = function () {
        this.used = false;
    };
    Ship.prototype.isUsed = function () {
        return this.used;
    };
    Ship.prototype.getId = function () {
        return this.id;
    };
    Ship.id = 0;
    return Ship;
}());

var Cell = /** @class */ (function () {
    function Cell(col, row) {
        this.status = "#0080FF" /* FREE */;
        this.col = col;
        this.row = row;
    }
    Cell.prototype.getCol = function () {
        return this.col;
    };
    Cell.prototype.getRow = function () {
        return this.row;
    };
    Cell.prototype.setStatus = function (status) {
        this.status = status;
    };
    Cell.prototype.getStatus = function () {
        return this.status;
    };
    Cell.prototype.setShipRef = function (shipRef) {
        this.shipRef = shipRef;
    };
    Cell.prototype.getShipRef = function () {
        return this.shipRef;
    };
    Cell.prototype.removeShipRef = function () {
        this.shipRef = null;
        this.status = "#0080FF" /* FREE */;
    };
    return Cell;
}());



/***/ }),

/***/ "./src/app/match/match.component.css":
/*!*******************************************!*\
  !*** ./src/app/match/match.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "img{\n  vertical-align: initial;\n}\n\n.my-board .cell{\n  width: 20px;\n  height: 20px;\n}\n\n.cell {\n  width: 40px;\n  height: 40px;\n  border: 1px solid;\n  border-color: #aaa;\n  display: inline-block;\n}\n\n.cell.opponent{\n  cursor: pointer;\n}\n\n.board-row {\n  line-height: 80%;\n}\n\n@media (min-width: 992px) {\n  .cell {\n    width: 45px;\n    height: 45px;\n  }\n}\n\n@media screen and (max-width: 600px) {\n  .cell {\n    width: 20px;\n    height: 20px;\n  }\n}\n"

/***/ }),

/***/ "./src/app/match/match.component.html":
/*!********************************************!*\
  !*** ./src/app/match/match.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"winner; then finish; else inGame\">\n\n</div>\n\n<ng-template #finish>\n  <div class=\"alert alert-primary\">{{winner_username}} ha vinto la partita</div>\n</ng-template>\n\n<ng-template #inGame>\n  <h1 *ngIf=\"opponentUsr != null\">Match vs:\n    <a routerLink=\"/user/{{opponentUsr}}\">{{opponentUsr}}</a>\n  </h1>\n  <h1 *ngIf=\"opponentUsr == null\">Match vs: giocatore eliminato</h1>\n  <div class=\"alert alert-warning\" *ngIf=\"last_attacker === userService.get_userId()\">Attendi, è il turno dell'avversario</div>\n  <div class=\"alert alert-primary\" *ngIf=\"last_attacker !== userService.get_userId()\">Tocca a te!</div>\n</ng-template>\n\n<div *ngIf=\"error\" class=\"alert alert-danger\">\n  {{error}}\n</div>\n\n<div class=\"col\" style=\"padding:0\">\n  <div class=\"accordion\" id=\"accordionExample\">\n    <div class=\"card\">\n      <div class=\"card-header\" id=\"headingThree\">\n        <h5 class=\"mb-0\">\n          <button class=\"btn btn-link collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\"#legenda\" aria-expanded=\"false\"\n            aria-controls=\"legenda\">\n            Legenda colori dei campi di gioco\n          </button>\n        </h5>\n      </div>\n      <div id=\"legenda\" class=\"collapse\" aria-labelledby=\"headingThree\" data-parent=\"#accordionExample\">\n        <div class=\"card-body\">\n          <div class=\"col\">\n            <div style=\"height:20px;width:20px;background-color:#00ffff;display: inline-block;\"></div>\n            <div style=\"display: inline-block;padding-left: 1em\">Avversario: Cella sconosciuta</div>\n          </div>\n          <div class=\"col\">\n            <div style=\"height:20px;width:20px;background-color:#000080;display: inline-block;\"></div>\n            <div style=\"display: inline-block;padding-left: 1em\">Avversario: Sparo in acqua - Player: Acqua</div>\n          </div>\n          <div class=\"col\">\n            <div style=\"height:20px;width:20px;background-color:#ff0000;display: inline-block;\"></div>\n            <div style=\"display: inline-block;padding-left: 1em\">Avversario: Colpita una nave</div>\n          </div>\n          <div class=\"col\">\n            <div style=\"height:20px;width:20px;background-color:#00ff00;display: inline-block;\"></div>\n            <div style=\"display: inline-block;padding-left: 1em\">Nave distrutta</div>\n          </div>\n          <div class=\"col\">\n            <div style=\"height:20px;width:20px;background-color:black;display: inline-block;\"></div>\n            <div style=\"display: inline-block;padding-left: 1em\">Player: Nave posizionata</div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"row\">\n  <div class=\"col-md-4 my-board\">\n    <h2>\n      Il tuo campo\n    </h2>\n    <div class=\"board-row\" *ngFor=\"let row of userBoard; let rowIndex = index\">\n      <div class=\"cell\" [ngStyle]=\"{'background-color': cell.color}\" [attr.row]=\"rowIndex\" [attr.col]=\"colIndex\" *ngFor=\"let cell of row; let rowIndex = index\">\n        <!--<span *ngIf=\"cell.hit == true\">x</span>-->\n        <img *ngIf=\"cell.hit == true\" src=\"http://www.onlygfx.com/wp-content/uploads/2017/07/x-brush-stroke-1-288x300.png\" style=\"width:100%;height:100%\">\n      </div>\n    </div>\n  </div>\n  <!--<div class=\"col-md-2 col-sm-6\">\n    <h2>Le tue navi</h2>\n\n  </div>-->\n  <div class=\"col-md-8\">\n    <h2>\n      Campo avversario\n    </h2>\n    <div class=\"board-row\" *ngFor=\"let row of opponentBoard; let rowIndex = index\">\n      <div (click)=\"shoot(rowIndex, colIndex, cell.color)\" class=\"cell opponent\" [ngStyle]=\"{'background-color': cell.color}\" *ngFor=\"let cell of row; let colIndex = index\">\n        <!--<span *ngIf=\"cell.hit == true\">x</span>-->\n        <img *ngIf=\"cell.hit == true\" src=\"http://www.onlygfx.com/wp-content/uploads/2017/07/x-brush-stroke-1-288x300.png\" style=\"width:100%;height:100%\">\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/match/match.component.ts":
/*!******************************************!*\
  !*** ./src/app/match/match.component.ts ***!
  \******************************************/
/*! exports provided: MatchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatchComponent", function() { return MatchComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities.service */ "./src/app/utilities.service.ts");
/* harmony import */ var _match_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../match.service */ "./src/app/match.service.ts");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_5__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MatchComponent = /** @class */ (function () {
    function MatchComponent(userService, router, activatedRoute, utilities, matchService) {
        this.userService = userService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.utilities = utilities;
        this.matchService = matchService;
        this.error = undefined;
        this.winner = undefined;
        this.winner_username = undefined;
    }
    MatchComponent.prototype.matchUpdate = function () {
        var _this = this;
        this.matchService.getMatchInfo(this.matchId, true).subscribe(function (match) {
            // console.log(match);
            _this.match = match;
            _this.winner = match.winnerId;
            _this.last_attacker = match.lastIdAttacker;
            _this.opponentUsr = match.opponentInfo.username;
            _this.userBoard = match.userBoard.matrix;
            _this.opponentBoard = match.opponentBoard.matrix;
            _this.userShips = match.userBoard.ships;
            if (match.winnerId !== undefined || match.winnerId != null) {
                if (match.winnerId === match.userInfo._id) {
                    _this.winner_username = match.userInfo.username;
                }
                else {
                    _this.winner_username = match.opponentInfo.username;
                }
            }
        });
    };
    MatchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.utilities.check_auth(this.userService.get_token());
        this.activatedRoute.paramMap.subscribe(function (data) {
            _this.matchId = data.get('id');
            var socket = socket_io_client__WEBPACK_IMPORTED_MODULE_5__(_this.userService.url);
            socket.on('match update ' + _this.matchId, function (m) {
                _this.error = undefined;
                _this.last_attacker = m.lastIdAttacker;
                // console.log("MESSAGE RECEIVED " + JSON.stringify(m));
                _this.matchUpdate();
            });
            _this.matchUpdate();
        });
    };
    MatchComponent.prototype.shoot = function (x, y, color) {
        var _this = this;
        if (color === '#00ffff') {
            this.error = undefined;
            this.matchService.shoot(x, y, this.matchId).subscribe(function (success) {
                _this.winner = success.winner;
                // console.log(success);
            }, function (error) {
                console.log(error);
            });
        }
        else {
            if (!this.winner) {
                this.error = 'Hai già sparato in quella cella';
            }
        }
    };
    MatchComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-match',
            template: __webpack_require__(/*! ./match.component.html */ "./src/app/match/match.component.html"),
            styles: [__webpack_require__(/*! ./match.component.css */ "./src/app/match/match.component.css")]
        }),
        __metadata("design:paramtypes", [_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _utilities_service__WEBPACK_IMPORTED_MODULE_3__["UtilitiesService"],
            _match_service__WEBPACK_IMPORTED_MODULE_4__["MatchService"]])
    ], MatchComponent);
    return MatchComponent;
}());



/***/ }),

/***/ "./src/app/navbar/navbar.component.css":
/*!*********************************************!*\
  !*** ./src/app/navbar/navbar.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/navbar/navbar.component.html":
/*!**********************************************!*\
  !*** ./src/app/navbar/navbar.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"is_logged(); then loggedUser; else noLoggedUser\">\n\n</div>\n\n<ng-template #noLoggedUser>\n  <nav class=\"navbar navbar-expand-lg navbar-dark bg-dark fixed-top\">\n    <div class=\"container\">\n      <a class=\"navbar-brand\" routerLink=\"/\">Battleship</a>\n      <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarResponsive\" aria-controls=\"navbarResponsive\"\n        aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n        <span class=\"navbar-toggler-icon\"></span>\n      </button>\n      <div class=\"collapse navbar-collapse\" id=\"navbarResponsive\">\n        <ul class=\"navbar-nav ml-auto\">\n          <li class=\"nav-item\">\n            <a class=\"nav-link\" routerLink=\"/login\">Log-in</a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\"nav-link\" routerLink=\"/signup\">Registrati</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </nav>\n</ng-template>\n\n<ng-template #loggedUser>\n  <nav class=\"navbar navbar-expand-lg navbar-dark bg-dark fixed-top\">\n    <script>\n      console.log(\"Display navbar for logged user\");\n    </script>\n    <div class=\"container\">\n      <a class=\"navbar-brand\" routerLink=\"/user\">Battleship</a>\n      <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarResponsive\" aria-controls=\"navbarResponsive\"\n        aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n        <span class=\"navbar-toggler-icon\"></span>\n      </button>\n      <div class=\"collapse navbar-collapse\" id=\"navbarResponsive\">\n        <ul class=\"navbar-nav ml-auto\">\n          <li class=\"nav-item\">\n            <a class=\"nav-link\" routerLink=\"/user\">Account</a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\"nav-link\" routerLink=\"/match\">Partite</a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\"nav-link\" routerLink=\"/players\">Giocatori</a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\"nav-link\" routerLink=\"/chats\">Chats</a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\"nav-link\" routerLink=\"/scoreboard\">Scoreboard</a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\"nav-link\" (click)=\"logout()\">Logout</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </nav>\n</ng-template>\n"

/***/ }),

/***/ "./src/app/navbar/navbar.component.ts":
/*!********************************************!*\
  !*** ./src/app/navbar/navbar.component.ts ***!
  \********************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(userService) {
        this.userService = userService;
    }
    NavbarComponent.prototype.ngOnInit = function () { };
    NavbarComponent.prototype.is_logged = function () {
        return this.userService.is_user_logged();
    };
    NavbarComponent.prototype.logout = function () {
        this.userService.logout();
    };
    NavbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-navbar",
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/navbar/navbar.component.html"),
            styles: [__webpack_require__(/*! ./navbar.component.css */ "./src/app/navbar/navbar.component.css")]
        }),
        __metadata("design:paramtypes", [_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"]])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/notfound/notfound.component.css":
/*!*************************************************!*\
  !*** ./src/app/notfound/notfound.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/notfound/notfound.component.html":
/*!**************************************************!*\
  !*** ./src/app/notfound/notfound.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1>Pagina non trovata</h1>\n"

/***/ }),

/***/ "./src/app/notfound/notfound.component.ts":
/*!************************************************!*\
  !*** ./src/app/notfound/notfound.component.ts ***!
  \************************************************/
/*! exports provided: NotfoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotfoundComponent", function() { return NotfoundComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities.service */ "./src/app/utilities.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NotfoundComponent = /** @class */ (function () {
    function NotfoundComponent(userService, utilities) {
        this.userService = userService;
        this.utilities = utilities;
    }
    NotfoundComponent.prototype.ngOnInit = function () {
        this.utilities.check_auth(this.userService.get_token());
    };
    NotfoundComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-notfound',
            template: __webpack_require__(/*! ./notfound.component.html */ "./src/app/notfound/notfound.component.html"),
            styles: [__webpack_require__(/*! ./notfound.component.css */ "./src/app/notfound/notfound.component.css")]
        }),
        __metadata("design:paramtypes", [_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"], _utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"]])
    ], NotfoundComponent);
    return NotfoundComponent;
}());



/***/ }),

/***/ "./src/app/players/players.component.css":
/*!***********************************************!*\
  !*** ./src/app/players/players.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/players/players.component.html":
/*!************************************************!*\
  !*** ./src/app/players/players.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row col\">\n  <h1>Giocatori presenti</h1>\n</div>\n<div class=\"row col py-3\">\n  <div class=\"col-4\">\n    Ricerca un giocatore\n  </div>\n  <div class=\"col-8\">\n    <input type=\"text\" #keyword class=\"form-control\" (input)='searchPlayer(keyword.value)'>\n  </div>\n</div>\n<div class=\"row col\">\n  <div class=\"col-4\">\n    <p>\n      <b>\n        Username\n      </b>\n    </p>\n  </div>\n  <div class=\"col-4\">\n    <p>\n      <b>\n        Nome\n      </b>\n    </p>\n  </div>\n  <div class=\"col-4\">\n    <p>\n      <b>\n        Cognome\n      </b>\n    </p>\n  </div>\n</div>\n<div *ngFor=\"let player of players\">\n  <div class=\"row col py-2\">\n    <div class=\"col-4\">\n      <a *ngIf=\"player.username != userLogged\" routerLink='/user/{{player.username}}'>{{player.username}}</a>\n      <a *ngIf=\"player.username == userLogged\" routerLink='/user'>{{player.username}}</a>\n    </div>\n    <div class=\"col-4\">\n      <a *ngIf=\"player.username != userLogged\" routerLink='/user/{{player.username}}'>{{player.name}}</a>\n      <a *ngIf=\"player.username == userLogged\" routerLink='/user'>{{player.name}}</a>\n    </div>\n    <div class=\"col-4\">\n      <a *ngIf=\"player.username != userLogged\" routerLink='/user/{{player.username}}'>{{player.surname}}</a>\n      <a *ngIf=\"player.username == userLogged\" routerLink='/user'>{{player.surname}}</a>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/players/players.component.ts":
/*!**********************************************!*\
  !*** ./src/app/players/players.component.ts ***!
  \**********************************************/
/*! exports provided: PlayersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayersComponent", function() { return PlayersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities.service */ "./src/app/utilities.service.ts");
/* harmony import */ var _socketio_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../socketio.service */ "./src/app/socketio.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PlayersComponent = /** @class */ (function () {
    function PlayersComponent(userService, utilities, socketService) {
        this.userService = userService;
        this.utilities = utilities;
        this.socketService = socketService;
        this.players = [];
    }
    PlayersComponent.prototype.ngOnInit = function () {
        this.utilities.check_auth(this.userService.get_token());
        this.userLogged = this.userService.get_username();
        this.searchPlayer('');
        this.socketService.connect(this.userService.get_userId()).subscribe(function (m) {
            $("#myModal").modal('show');
            $('.modal-backdrop').removeClass("modal-backdrop");
            setTimeout(function () {
                $('#myModal').modal('hide');
            }, 2000);
        });
    };
    PlayersComponent.prototype.searchPlayer = function (keyword) {
        var _this = this;
        //console.log('Search player with: ' + keyword);
        this.userService.searchUser(keyword).subscribe(function (value) {
            // console.log(JSON.stringify(d));
            _this.players = value;
        }, function (err) {
            console.log('Errore durante la ricerca: ' + err);
        });
    };
    PlayersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-players',
            template: __webpack_require__(/*! ./players.component.html */ "./src/app/players/players.component.html"),
            styles: [__webpack_require__(/*! ./players.component.css */ "./src/app/players/players.component.css")]
        }),
        __metadata("design:paramtypes", [_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"], _utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"], _socketio_service__WEBPACK_IMPORTED_MODULE_3__["SocketioService"]])
    ], PlayersComponent);
    return PlayersComponent;
}());



/***/ }),

/***/ "./src/app/scoreboard/scoreboard.component.css":
/*!*****************************************************!*\
  !*** ./src/app/scoreboard/scoreboard.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/scoreboard/scoreboard.component.html":
/*!******************************************************!*\
  !*** ./src/app/scoreboard/scoreboard.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row col\">\n  <h1>Scoreboard</h1>\n</div>\n<div *ngIf=\"scoreboard.length === 0\">\n  <h2>Nessun giocatore in classifica!</h2>\n</div>\n<!-- Header-->\n<div *ngIf=\"scoreboard.length !== 0\" class=\"row\">\n  <div class=\"col-8\">\n    <p>\n      <b>Username</b>\n    </p>\n  </div>\n  <div class=\"col-4\">\n    <p>\n      <b> {{tipologiaScoreboard}} </b>\n    </p>\n  </div>\n</div>\n<!-- Content-->\n<div *ngFor=\"let score of scoreboard\">\n  <div class=\"row\">\n    <div class=\"col-8\">\n      <p>\n        <a *ngIf=\"score.username != userService.get_username()\" routerLink='/user/{{score.username}}'>{{score.username}}</a>\n        <a *ngIf=\"score.username == userService.get_username()\" routerLink='/user'>{{score.username}}</a>\n      </p>\n    </div>\n    <div class=\"col-4\">\n      <div ng-switch=\"tipologiaScoreboard\">\n        <div ng-switch-when=\"Partite vinte\">\n          {{score.partiteVinte}}\n        </div>\n        <div ng-switch-when=\"Partite perse\">\n          {{score.partitePerse}}\n        </div>\n        <div ng-switch-when=\"Totali\">\n          {{score.total}}\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"row\">\n  <p>Mostra le prime posizioni nella classifica:</p>\n  <select class=\"form-control\" (click)=\"changeScoreboard(limitScoreboard.value, typeScoreboard.value)\" #limitScoreboard>\n    <option value=\"5\">5</option>\n    <option value=\"10\" selected>10</option>\n    <option value=\"20\">20</option>\n    <option value=\"100\">100</option>\n  </select>\n</div>\n<div class=\"row\">\n  <p>Ordina la classifica in base a:</p>\n  <select class=\"form-control\" (click)=\"changeScoreboard(limitScoreboard.value, typeScoreboard.value)\" #typeScoreboard>\n    <option value=\"partiteVinte\">Partite vinte</option>\n    <option value=\"partitePerse\">Partite perse</option>\n    <option value=\"total\">Totale delle partite</option>\n  </select>\n</div>"

/***/ }),

/***/ "./src/app/scoreboard/scoreboard.component.ts":
/*!****************************************************!*\
  !*** ./src/app/scoreboard/scoreboard.component.ts ***!
  \****************************************************/
/*! exports provided: ScoreboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScoreboardComponent", function() { return ScoreboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities.service */ "./src/app/utilities.service.ts");
/* harmony import */ var _socketio_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../socketio.service */ "./src/app/socketio.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ScoreboardComponent = /** @class */ (function () {
    function ScoreboardComponent(userService, utilities, socket) {
        this.userService = userService;
        this.utilities = utilities;
        this.socket = socket;
        this.scoreboard = [];
    }
    ScoreboardComponent.prototype.ngOnInit = function () {
        this.tipologiaScoreboard = 'Partite vinte';
        this.utilities.check_auth(this.userService.get_token());
        this.getScoreboard();
        this.socket.connect(this.userService.get_userId()).subscribe(function (m) {
            $("#myModal").modal('show');
            $('.modal-backdrop').removeClass("modal-backdrop");
            setTimeout(function () {
                $('#myModal').modal('hide');
            }, 2000);
        });
    };
    /**
     * Metodo che viene attivato quando si cambia il 'select' nella pagina, cambia dinamicamente il numero di utenti da visualizzare
     * @param n : numero di utenti da visualizzare
     */
    ScoreboardComponent.prototype.changeScoreboard = function (n, type) {
        switch (type) {
            case "partiteVinte": {
                this.tipologiaScoreboard = "Partite vinte";
                break;
            }
            case "partitePerse": {
                this.tipologiaScoreboard = "Partite perse";
                break;
            }
            case "total": {
                this.tipologiaScoreboard = "Totali";
                break;
            }
        }
        this.getScoreboard({ 'limit': n, 'type': type });
    };
    /**
     * Richiama il metodo getScoreboard in userService
     */
    ScoreboardComponent.prototype.getScoreboard = function (params) {
        var _this = this;
        if (params === void 0) { params = {}; }
        this.scoreboard = [];
        this.userService.getScoreboard(params).subscribe(function (scoreboard) {
            _this.scoreboard = scoreboard;
        });
    };
    ScoreboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-scoreboard',
            template: __webpack_require__(/*! ./scoreboard.component.html */ "./src/app/scoreboard/scoreboard.component.html"),
            styles: [__webpack_require__(/*! ./scoreboard.component.css */ "./src/app/scoreboard/scoreboard.component.css")]
        }),
        __metadata("design:paramtypes", [_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"], _utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"], _socketio_service__WEBPACK_IMPORTED_MODULE_3__["SocketioService"]])
    ], ScoreboardComponent);
    return ScoreboardComponent;
}());



/***/ }),

/***/ "./src/app/socketio.service.ts":
/*!*************************************!*\
  !*** ./src/app/socketio.service.ts ***!
  \*************************************/
/*! exports provided: SocketioService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocketioService", function() { return SocketioService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user.service */ "./src/app/user.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SocketioService = /** @class */ (function () {
    function SocketioService(userService) {
        this.userService = userService;
    }
    /**
     * Il parametro id serve per una connessione broadcast specifica a quell'id
     * Utile per far si che se un utente B scriva un messaggio ad un utente C
     * non si triggera il canale broadcast dell'utente A loggato e visitante una pagina
     * che richieda un canale broadcast
     */
    SocketioService.prototype.connect = function (id) {
        var _this = this;
        //console.log(id);
        this.socket = socket_io_client__WEBPACK_IMPORTED_MODULE_3__(this.userService.url);
        return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (observer) {
            _this.socket.on('broadcast ' + id, function (m) {
                //console.log('Received socket message: ' + JSON.stringify(m));
                observer.next(m);
            });
            _this.socket.on('error ' + id, function (err) {
                //console.log('Error socket received: ' + JSON.stringify(err));
                observer.error(err);
            });
            _this.socket.on('new_message_for ' + id, function (m) {
                //console.log('Received message message: ' + JSON.stringify(m));
                observer.next(m);
            });
            return {
                unsubscribe: function () {
                    this.socket.disconnect();
                }
            };
        });
    };
    SocketioService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"]])
    ], SocketioService);
    return SocketioService;
}());



/***/ }),

/***/ "./src/app/user-info/user-info.component.css":
/*!***************************************************!*\
  !*** ./src/app/user-info/user-info.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/user-info/user-info.component.html":
/*!****************************************************!*\
  !*** ./src/app/user-info/user-info.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"routingNotCurrentUser; then notThisUser; else thisUser\">\n\n</div>\n\n<ng-template #notThisUser>\n  <div class=\"row col\">\n    <h1 *ngIf=\"otherUser != null\">Stai visualizzando il profilo di {{otherUser.username}}</h1>\n  </div>\n  <div class=\"row col\">\n    <h1 *ngIf=\"otherUser == null\">Giocatore non trovato</h1>\n  </div>\n  <!-- Profile image\n  <div class=\"row\">\n    <div class=\"col text-center\">\n      <img src=\"https://pbs.twimg.com/profile_images/1532886460/He-man_400x400.jpg\" style=\"width:13em;border-radius:50%\" class=\"center-block\">\n    </div>\n  </div>-->\n  <!-- Info account-->\n  <div *ngIf=\"otherUser != null\" class=\"container py-5\">\n    <div class=\"row py-2\">\n      <div class=\"col-6\">\n        <b>Username</b>\n      </div>\n      <div class=\"col-6\">\n        <p>{{otherUser.username}}</p>\n      </div>\n    </div>\n    <div class=\"row py-2\">\n      <div class=\"col-6\">\n        <b>Nome</b>\n      </div>\n      <div class=\"col-6\">\n        <p>{{otherUser.name}}</p>\n      </div>\n    </div>\n    <div class=\"row py-2\">\n      <div class=\"col-6\">\n        <b>Cognome</b>\n      </div>\n      <div class=\"col-6\">\n        <p>{{otherUser.surname}}</p>\n      </div>\n    </div>\n    <div class=\"row py-2\">\n      <div class=\"col-6\">\n        <b>Email</b>\n      </div>\n      <div class=\"col-6\">\n        <p>{{otherUser.mail}}</p>\n      </div>\n    </div>\n    <div class=\"row py-2\">\n      <div class=\"col-6\">\n        <b>Partite vinte</b>\n      </div>\n      <div class=\"col-6\">\n        <p>{{otherUser.partiteVinte}}</p>\n      </div>\n    </div>\n    <div class=\"row py-2\">\n      <div class=\"col-6\">\n        <b>Partite perse</b>\n      </div>\n      <div class=\"col-6\">\n        <p>{{otherUser.partitePerse}}</p>\n      </div>\n    </div>\n    <div class=\"row py-2\">\n      <div class=\"col-6\">\n        <b>Partite giocate</b>\n      </div>\n      <div class=\"col-6\">\n        <p>{{totalePartite}}</p>\n      </div>\n    </div>\n    <div *ngIf=\"isAdmin\" style=\"padding-left:0\" class=\"col-12 py-2\">\n      <input type=\"checkbox\" [checked]=\"otherUserIsAdmin\" (click)=\"changeStatusAdminOtherAccount()\" #changeOtherAdmin> Amministratore\n    </div>\n    <div class=\"row py-2\">\n      <div class=\"col-12\">\n        <a routerLink=\"/user/{{otherUser.username}}/matches\">Partite giocate</a>\n      </div>\n    </div>\n    <div *ngIf=\"errmessage\" class=\"alert alert-danger\" role=\"alert\">\n      Errore: {{errmessage}}\n    </div>\n    <div *ngIf=\"okmessage\" class=\"alert alert-success\" role=\"alert\">\n      {{okmessage}}\n    </div>\n    <div class=\"row col py-2\">\n      <button *ngIf=\"isAdmin\" class=\"btn btn-primary\" (click)=\"updateInfoAdminOtherUser(otherUser.username, otherUser.isAdmin)\">Aggiorna le informazioni</button>\n    </div>\n    <div class=\"row col py-2\">\n      <button *ngIf=\"isAdmin\" type=\"button\" class=\"btn btn-danger\" (click)=\"deleteThisUser()\">Elimina l'utente</button>\n    </div>\n    <div class=\"row col py-2\">\n      <button class=\"btn btn-primary\" (click)=\"clickButtonSendMessageUserInfo()\">Invia un messaggio</button>\n    </div>\n  </div>\n</ng-template>\n\n<ng-template #thisUser>\n  <div class=\"row col\">\n    <h1>Il tuo profilo</h1>\n  </div>\n  <!-- Profile image\n  <div class=\"row\">\n    <div class=\"col text-center\">\n      <img src=\"https://pbs.twimg.com/profile_images/1532886460/He-man_400x400.jpg\" style=\"width:13em;border-radius:50%\" class=\"center-block\">\n    </div>\n  </div>-->\n  <!-- Info account-->\n  <div class=\"container py-5\">\n    <div class=\"row py-2\">\n      <div class=\"col-6\">\n        <b>Username</b>\n      </div>\n      <div class=\"col-6\">\n        <input type=\"text\" #usertxt required=\"true\" value=\"{{this.userService.get_name()}}\" class=\"form-control\">\n      </div>\n    </div>\n    <div class=\"row py-2\">\n      <div class=\"col-6\">\n        <b>Nome</b>\n      </div>\n      <div class=\"col-6\">\n        <input type=\"text\" #nametxt required=\"true\" value=\"{{this.userService.get_name()}}\" class=\"form-control\">\n      </div>\n    </div>\n    <div class=\"row py-2\">\n      <div class=\"col-6\">\n        <b>Cognome</b>\n      </div>\n      <div class=\"col-6\">\n        <input type=\"text\" #surnametxt required=\"true\" value=\"{{this.userService.get_surname()}}\" class=\"form-control\">\n      </div>\n    </div>\n    <div class=\"row py-2\">\n      <div class=\"col-6\">\n        <b>Email</b>\n      </div>\n      <div class=\"col-6\">\n        <input type=\"email\" #mailtxt required=\"true\" value=\"{{this.userService.get_mail()}}\" class=\"form-control\">\n      </div>\n    </div>\n    <div class=\"row py-2\">\n      <div class=\"col-6\">\n        <input type=\"password\" #newpassword1 required=\"true\" placeholder=\"Nuova password\" class=\"form-control\">\n      </div>\n      <div class=\"col-6\">\n        <input type=\"password\" #newpassword2 required=\"true\" placeholder=\"Ripeti nuova password\" class=\"form-control\">\n      </div>\n    </div>\n    <div *ngIf=\"userService.is_admin()\" style=\"padding-left:0\" class=\"col-12 py-2\">\n      <input type=\"checkbox\" [checked]=\"isAdmin\" #changeThisAdmin (click)=\"changeStatusAdminThisAccount()\"> Amministratore\n    </div>\n    <div class=\"row py-2\">\n      <div class=\"col-12\">\n        <a routerLink=\"/user/{{this.userService.get_username()}}/matches\">Partite giocate</a>\n      </div>\n    </div>\n    <div *ngIf=\"errmessage\" class=\"alert alert-danger\" role=\"alert\">\n      Errore: {{errmessage}}\n    </div>\n    <div *ngIf=\"okmessage\" class=\"alert alert-success\" role=\"alert\">\n      {{okmessage}}\n    </div>\n    <div class=\"row col py-2\">\n      <button type=\"button\" class=\"btn btn-primary\" (click)=\"updateInfo(usertxt.value, nametxt.value, surnametxt.value, mailtxt.value, newpassword1.value, newpassword2.value, admin)\">Aggiorna le informazioni</button>\n    </div>\n    <div class=\"row col py-2\">\n      <button type=\"button\" class=\"btn btn-danger\" (click)=\"deleteThisUser()\">Elimina l'utente</button>\n    </div>\n  </div>\n</ng-template>"

/***/ }),

/***/ "./src/app/user-info/user-info.component.ts":
/*!**************************************************!*\
  !*** ./src/app/user-info/user-info.component.ts ***!
  \**************************************************/
/*! exports provided: UserInfoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserInfoComponent", function() { return UserInfoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities.service */ "./src/app/utilities.service.ts");
/* harmony import */ var _socketio_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../socketio.service */ "./src/app/socketio.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserInfoComponent = /** @class */ (function () {
    function UserInfoComponent(userService, router, utilities, socket) {
        this.userService = userService;
        this.router = router;
        this.utilities = utilities;
        this.socket = socket;
        this.errmessage = undefined;
        this.okmessage = undefined;
        // Variabile per controllare se l"utente corrente è admin
        this.isAdmin = undefined;
        // Variabili usate per la view di altri utenti
        this.routingNotCurrentUser = undefined;
        this.otherUser = undefined;
        // Variabile per l"utente visualizzato
        this.username = undefined;
        this.totalePartite = undefined;
    }
    UserInfoComponent.prototype.ngOnInit = function () {
        // console.log(this.userService.get_token());
        this.utilities.check_auth(this.userService.get_token());
        //console.log("Routing in user component: " + this.router.url);
        if (this.router.url !== "/user") {
            this.routingNotCurrentUser = this.router.url.split("/").pop();
            //console.log("User: " + this.routingNotCurrentUser);
            this.getUser();
        }
        else {
            this.username = this.userService.get_username();
        }
        this.isAdmin = this.userService.is_admin();
        this.socket.connect(this.userService.get_userId()).subscribe(function (m) {
            $("#myModal").modal("show");
            $(".modal-backdrop").removeClass("modal-backdrop");
            setTimeout(function () {
                $("#myModal").modal("hide");
            }, 2000);
        });
    };
    UserInfoComponent.prototype.updateInfo = function (username, name, surname, mail, password1, password2) {
        var _this = this;
        if (username === "" || name === "" || surname === "" || mail === "" || password1 === "" || password2 === "") {
            this.errmessage = "riempire tutti i campi.";
            this.okmessage = undefined;
        }
        else {
            if (password1 !== password2) {
                this.errmessage = "le password sono diverse.";
                this.okmessage = undefined;
            }
            else {
                this.userService.updateInfo(username, name, surname, mail, password1, this.isAdmin).subscribe(function (d) {
                    _this.userService.renew().subscribe(function (returnData) {
                        //console.log(JSON.stringify(returnData));
                        //console.log("User info " + username + " update");
                        _this.username = username;
                        _this.errmessage = undefined;
                        _this.okmessage = "Account aggiornato con successo.";
                    }, function (err) {
                        console.log("User info " + username + " update error: " + err);
                        _this.errmessage = err.error.errormessage || err.error.message;
                        _this.okmessage = undefined;
                    }, function () {
                        //console.log("Completed");
                    });
                });
            }
        }
    };
    UserInfoComponent.prototype.updateInfoAdminOtherUser = function (username, isAdmin) {
        var _this = this;
        this.userService.updateInfoAdmin(username, isAdmin).subscribe(function (d) {
            //console.log("User info " + username + " update in status admin: " + isAdmin);
            _this.errmessage = undefined;
            _this.okmessage = "Account aggiornato con successo.";
        }, function (err) {
            //console.log("User info " + username + " update in status admin " + isAdmin + "error: " + err);
            _this.errmessage = err.error.errormessage || err.error.message;
            _this.okmessage = undefined;
        });
    };
    UserInfoComponent.prototype.changeStatusAdminOtherAccount = function () {
        //console.log("Stato vecchio: " + this.otherUser.isAdmin + " stato nuovo " + !this.otherUser.isAdmin);
        this.otherUser.isAdmin = !this.otherUser.isAdmin;
    };
    UserInfoComponent.prototype.changeStatusAdminThisAccount = function () {
        //console.log("Stato vecchio: " + this.isAdmin + " stato nuovo " + !this.isAdmin);
        this.isAdmin = !this.isAdmin;
    };
    UserInfoComponent.prototype.deleteThisUser = function () {
        var _this = this;
        var answer = confirm("Sei sicuro di cancellare l'utente ? ");
        var userToDelete = this.username;
        if (answer) {
            this.userService.deleteUser(userToDelete).subscribe(function (d) {
                //console.log("User " + userToDelete + " deleted");
                if (userToDelete === _this.userService.get_username()) {
                    _this.userService.logout();
                    _this.router.navigate(["/"]);
                }
                else {
                    _this.router.navigate(["/players"]);
                }
            }, function (err) {
                console.log("Delete user " + userToDelete + " error " + err);
            });
        }
    };
    UserInfoComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getInfoUser(this.routingNotCurrentUser).subscribe(function (d) {
            //console.log("Getting user " + JSON.stringify(d) + " OK");
            _this.otherUser = d;
            if (_this.otherUser != null) {
                _this.username = _this.otherUser.username;
                _this.totalePartite = _this.otherUser.partiteVinte + _this.otherUser.partitePerse;
            }
        }, function (err) {
            console.log("Error getting user " + err);
        });
    };
    /**
     * Click del pulsante "Invia messaggio" sulla scheda dell"utente
     * Inizialmente richiede al server la lista delle chat dell"utente loggato, se scorrendo la lista
     * trova la chat tra i 2 utenti, si viene reindirizzati a quella chat, altrimenti ne
     * viene creata una nuova
     */
    UserInfoComponent.prototype.clickButtonSendMessageUserInfo = function () {
        var _this = this;
        this.userService.getUserChats().subscribe(function (data) {
            var chats = data[0]["chatList"];
            var find = false;
            chats.forEach(function (element) {
                // console.log(JSON.stringify(element) + " ID 1 USER CHAT " +
                // element["user1ID"]["_id"] + " ID 2 USER " + element["user2ID"]["_id"]);
                // console.log("OTHER USER ID " + this.otherUser._id + " CURRENT ID " + this.userService.get_userId());
                if ((element["user1ID"]["_id"] === _this.otherUser._id &&
                    element["user2ID"]["_id"] === _this.userService.get_userId()) ||
                    (element["user2ID"]["_id"] === _this.otherUser._id && element["user1ID"]["_id"] === _this.userService.get_userId())) {
                    find = true;
                    _this.router.navigate(["/chats/" + element["_id"]]);
                }
            });
            if (!find) {
                _this.createChat();
            }
        }, function (err) {
            console.log("Error getting active user chat " + err);
        });
    };
    /**
     * Crea la chat tra l"utente loggato e l"utente visualizzato nella scheda, infine si viene reindirizzati alla nuova chat
     */
    UserInfoComponent.prototype.createChat = function () {
        var _this = this;
        this.userService.createChat(this.username).subscribe(function (newChat) {
            //console.log("CHAT CREATA " + JSON.stringify(newChat));
            _this.router.navigate(["/chats/" + newChat["id"]]);
        }, function (err) {
            console.log("Error creating user chat " + err);
        });
    };
    UserInfoComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-user-info",
            template: __webpack_require__(/*! ./user-info.component.html */ "./src/app/user-info/user-info.component.html"),
            styles: [__webpack_require__(/*! ./user-info.component.css */ "./src/app/user-info/user-info.component.css")]
        }),
        __metadata("design:paramtypes", [_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _utilities_service__WEBPACK_IMPORTED_MODULE_3__["UtilitiesService"],
            _socketio_service__WEBPACK_IMPORTED_MODULE_4__["SocketioService"]])
    ], UserInfoComponent);
    return UserInfoComponent;
}());



/***/ }),

/***/ "./src/app/user-login/user-login.component.css":
/*!*****************************************************!*\
  !*** ./src/app/user-login/user-login.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/user-login/user-login.component.html":
/*!******************************************************!*\
  !*** ./src/app/user-login/user-login.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row col\">\n  <h1>Log-in</h1>\n</div>\n<div class=\"row\">\n  <div class=\"col-12\">\n    <p>Inserisci le tue credenziali per accedere</p>\n  </div>\n</div>\n<form #loginForm=\"ngForm\">\n  <div class=\"row py-2\">\n    <div class=\"col-sm-6\">\n      <p>Username</p>\n    </div>\n    <div class=\"col-sm-6\">\n      <input type=\"text\" [(ngModel)]=\"username\" required placeholder=\"username\" id=\"inputuser\" class=\"form-control\" name=\"username\">\n    </div>\n  </div>\n  <div class=\"row py-2\">\n    <div class=\"col-sm-6\">\n      <p>Password</p>\n    </div>\n    <div class=\"col-sm-6\">\n      <input type=\"password\" [(ngModel)]=\"password\" required placeholder=\"password\" id=\"inputpassword\" class=\"form-control\" name=\"password\" (keyup.enter)=\"login()\" >\n    </div>\n  </div>\n  <div class=\"row col-sm-12\">\n    <label>\n      <input type=\"checkbox\" [(ngModel)]=\"rememberAccess\" name=\"rememberAccess\" value=\"{{rememberAccess}}\"> Ricordami\n    </label>\n  </div>\n</form>\n<div *ngIf=\"errmessage\" class=\"alert alert-danger\" role=\"alert\">\n  Errore di login: {{errmessage}}\n</div>\n<div class=\"row col-sm-12 py-2\">\n  <button type=\"button\" class=\"btn btn-primary\" (click)=\"login()\">Login</button>\n</div>\n<div class=\"row col-sm-12 py-2\">\n  <button type=\"button\" class=\"btn btn-primary\" routerLink=\"/signup\">Registrati</button>\n</div>\n"

/***/ }),

/***/ "./src/app/user-login/user-login.component.ts":
/*!****************************************************!*\
  !*** ./src/app/user-login/user-login.component.ts ***!
  \****************************************************/
/*! exports provided: UserLoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserLoginComponent", function() { return UserLoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserLoginComponent = /** @class */ (function () {
    function UserLoginComponent(userService, router) {
        this.userService = userService;
        this.router = router;
        this.errmessage = undefined;
        this.username = "";
        this.password = "";
        this.rememberAccess = "true";
    }
    UserLoginComponent.prototype.ngOnInit = function () {
        if (this.userService.is_user_logged()) {
            this.router.navigate(["/user"]);
        }
    };
    UserLoginComponent.prototype.login = function () {
        var _this = this;
        if (this.username === "" || this.username === "") {
            this.errmessage = "dati mancanti.";
        }
        else {
            //console.log(this.username + " try to login");
            this.userService.login(this.username, this.password, Boolean(this.rememberAccess)).subscribe(function (d) {
                _this.errmessage = undefined;
                _this.router.navigate(["/user"]);
            }, function (err) {
                console.log("Login error: " + JSON.stringify(err.error.errormessage));
                if (JSON.stringify(err.error.errormessage) === undefined) {
                    _this.errmessage = "impossibile contattare il server";
                }
                else {
                    _this.errmessage = err.error.errormessage;
                }
            });
        }
    };
    UserLoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-user-login",
            template: __webpack_require__(/*! ./user-login.component.html */ "./src/app/user-login/user-login.component.html"),
            styles: [__webpack_require__(/*! ./user-login.component.css */ "./src/app/user-login/user-login.component.css")]
        }),
        __metadata("design:paramtypes", [_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], UserLoginComponent);
    return UserLoginComponent;
}());



/***/ }),

/***/ "./src/app/user-signup/user-signup.component.css":
/*!*******************************************************!*\
  !*** ./src/app/user-signup/user-signup.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".form-group{\n    width: 50%;\n}\n.form-control{\n    width: 90%;\n}"

/***/ }),

/***/ "./src/app/user-signup/user-signup.component.html":
/*!********************************************************!*\
  !*** ./src/app/user-signup/user-signup.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row col\">\n  <h1>Registrazione</h1>\n</div>\n\n<div class=\"row col\">\n  <div class=\"form-group\">\n    <label for=\"inputName\">Nome</label>\n    <input type=\"text\" #name=\"ngModel\" class=\"form-control\" [(ngModel)]=\"user.name\" id=\"inputNewName\" placeholder=\"Inserisci il nome\">\n  </div>\n  <div class=\"form-group\">\n    <label for=\"inputSurname\">Cognome</label>\n    <input type=\"text\" #surname=\"ngModel\" class=\"form-control\" [(ngModel)]=\"user.surname\" id=\"inputNewSurname\" placeholder=\"Inserisci il cognome\">\n  </div>\n</div>\n<div class=\"row col\">\n  <div class=\"form-group\">\n    <label for=\"inputUsername\">Username</label>\n    <input type=\"text\" #username=\"ngModel\" class=\"form-control\" [(ngModel)]=\"user.username\" id=\"inputNewUsername\" placeholder=\"Inserisci lo Username\">\n  </div>\n  <div class=\"form-group\">\n    <label for=\"inputEmail1\">Indirizzo Email</label>\n    <input type=\"email\" #mail=\"ngModel\" class=\"form-control\" [(ngModel)]=\"user.mail\" id=\"inputNewEmail\" pattern=\"[^@\\s]+@[^@\\s]+\\.[^@\\s]+\"\n      placeholder=\"Inserisci l'email\">\n  </div>\n</div>\n<div class=\"row col\">\n  <div class=\"form-group\">\n    <label for=\"inputPassword1\">Password</label>\n    <input type=\"password\" #password1 class=\"form-control\" id=\"inputNewPassword1\" placeholder=\"Inserisci la password\" (input)='checkPassword(password1.value, password2.value)'>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"inputPassword2\">Password</label>\n    <input type=\"password\" #password2 class=\"form-control\" id=\"inputNewPassword2\" placeholder=\"Ripeti la password\" (input)='checkPassword(password1.value, password2.value)'>\n  </div>\n</div>\n<div *ngIf=\"!equalpassword && password1.value != ''\" class=\"alert alert-danger\" role=\"alert\">\n  Le password sono diverse.\n</div>\n<div *ngIf=\"errmessage\" class=\"alert alert-danger\" role=\"alert\">\n  Errore durante la registrazione: {{errmessage}}\n</div>\n<button [disabled]=\"!equalpassword\" class=\"btn btn-primary\" id=\"registerNewAccount\" (click)=\"signup();\">Crea l'account</button>"

/***/ }),

/***/ "./src/app/user-signup/user-signup.component.ts":
/*!******************************************************!*\
  !*** ./src/app/user-signup/user-signup.component.ts ***!
  \******************************************************/
/*! exports provided: UserSignupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserSignupComponent", function() { return UserSignupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserSignupComponent = /** @class */ (function () {
    function UserSignupComponent(userService, router) {
        this.userService = userService;
        this.router = router;
        this.errmessage = undefined;
        this.user = { mail: '', name: '', surname: '', username: '', password: '' };
        this.equalpassword = false;
    }
    UserSignupComponent.prototype.ngOnInit = function () { };
    UserSignupComponent.prototype.checkPassword = function (password1, password2) {
        if (password1 === password2) {
            this.equalpassword = true;
            this.user.password = password1;
        }
        else {
            this.equalpassword = false;
            this.user.password = undefined;
        }
    };
    UserSignupComponent.prototype.signup = function () {
        var _this = this;
        if (this.equalpassword == true) {
            this.userService.register(this.user).subscribe(function (result) {
                //console.log(this.user.username + " added");
                _this.errmessage = undefined;
                _this.router.navigate(['/login']);
            }, function (err) {
                console.log("Signup error: " + JSON.stringify(err));
                _this.errmessage = err.error.errormessage || err.error.message;
            });
        }
        else {
            this.errmessage = "password diverse";
        }
    };
    UserSignupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user-signup',
            template: __webpack_require__(/*! ./user-signup.component.html */ "./src/app/user-signup/user-signup.component.html"),
            styles: [__webpack_require__(/*! ./user-signup.component.css */ "./src/app/user-signup/user-signup.component.css")]
        }),
        __metadata("design:paramtypes", [_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], UserSignupComponent);
    return UserSignupComponent;
}());



/***/ }),

/***/ "./src/app/user.service.ts":
/*!*********************************!*\
  !*** ./src/app/user.service.ts ***!
  \*********************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jwt-decode */ "./node_modules/jwt-decode/lib/index.js");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jwt_decode__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utilities.service */ "./src/app/utilities.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// import {ErrorObservable} from 'rxjs/observable/ErrorObservable'
var token_name = 'battleship_token';
var UserService = /** @class */ (function () {
    function UserService(http, router, utilities) {
        this.http = http;
        this.router = router;
        this.utilities = utilities;
        this.token = '';
        this.url = _utilities_service__WEBPACK_IMPORTED_MODULE_5__["UtilitiesService"].getPublicUrl();
        this.is_logged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        // console.log('User Service istanziato');
    }
    UserService.prototype.handleError = function (error) {
        if (error.error instanceof ErrorEvent) {
            console.error('Errore generato: ', error.error.message);
        }
        else {
            console.error("Backend returned code " + error.status + ", " +
                'body was: ' + JSON.stringify(error.error));
        }
    };
    UserService.prototype.login = function (user, password, remember) {
        var _this = this;
        console.log(remember);
        var optionsLogin = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                authorization: 'Basic ' + btoa(user + ':' + password),
                'cache-control': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
        };
        if (remember === true) {
            optionsLogin['params'] = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('remindMe', 'true');
        }
        console.log('Login: ' + this.url + '/login ' + JSON.stringify(optionsLogin));
        return this.http.get(this.url + '/login', optionsLogin).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (data) {
            // console.log(JSON.stringify(data));
            _this.is_logged.emit(true);
            _this.token = data.token;
            localStorage.setItem(token_name, _this.token);
        }));
    };
    UserService.prototype.renew = function () {
        var _this = this;
        return this.http.get(this.url + '/renew', this.utilities.create_options(this.token)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (data) {
            _this.token = data.token;
            localStorage.setItem(token_name, _this.token);
            _this.is_logged.emit(true);
        }, function (error) {
            console.log('error: ' + error);
        }, function () {
            console.log('complete');
        }));
    };
    UserService.prototype.register = function (user) {
        console.log(JSON.stringify(user));
        return this.http.post(this.url + '/users', user, this.utilities.create_options(this.get_token())).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (data) {
            // console.log(JSON.stringify(data));
        }, function (error) {
            console.log('ERRORE REGISTRAZIONE ' + error.error.errormessage);
        }));
    };
    // Modifica le informazioni dell'utente
    UserService.prototype.updateInfo = function (username, name, surname, mail, password, isAdmin) {
        var user = {
            username: username,
            name: name,
            surname: surname,
            password: password,
            mail: mail,
            isAdmin: isAdmin
        };
        console.log('Updating at: ' + this.url + '/users/' + this.get_username() + ' user: ' + JSON.stringify(user));
        return this.http.put(this.url + '/users/' + this.get_username(), user, this.utilities.create_options(this.get_token())).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (data) {
            // console.log(JSON.stringify(data));
        }));
    };
    // Modifica lo status isAdmin dell'utente username
    UserService.prototype.updateInfoAdmin = function (username, isAdmin) {
        return this.http.put(this.url + '/users/' + username, { 'username': username, 'isAdmin': isAdmin }, this.utilities.create_options(this.get_token())).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (data) {
            // console.log(JSON.stringify(data));
        }));
    };
    UserService.prototype.deleteUser = function (username) {
        console.log('Deleting user ' + username);
        return this.http.delete(this.url + '/users/' + username, this.utilities.create_options(this.get_token())).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (data) {
            // console.log(JSON.stringify(data));
        }));
    };
    UserService.prototype.logout = function () {
        this.token = '';
        this.is_logged.emit(false);
        localStorage.setItem(token_name, this.token);
        this.router.navigate(['/']);
    };
    UserService.prototype.getInfoUser = function (user) {
        return this.http.get(this.url + '/users/' + user, this.utilities.create_options(this.get_token())).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (data) {
            // console.log('Getting info user: ' + JSON.stringify(data));
        }));
    };
    UserService.prototype.searchUser = function (keyword) {
        if (keyword === undefined || keyword === '') {
            return this.http.get(this.url + '/users', this.utilities.create_options(this.get_token())).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (data) {
                // console.log('Searching user: ' + JSON.stringify(data));
            }));
        }
        else {
            return this.http.get(this.url + '/users', this.utilities.create_options(this.get_token(), { 'keysearched': keyword })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (data) {
                // console.log('Searching user: ' + JSON.stringify(data));
            }));
        }
    };
    UserService.prototype.getScoreboard = function (params) {
        if (params === void 0) { params = {}; }
        return this.http.get(this.url + '/scoreboard', this.utilities.create_options(this.get_token(), params)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (data) {
            // console.log(JSON.stringify(data));
        }));
    };
    UserService.prototype.getUserChats = function () {
        return this.http.get(this.url + '/chats', this.utilities.create_options(this.get_token())).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (data) {
            // console.log(JSON.stringify(data));
        }));
    };
    UserService.prototype.getUserSingleChat = function (idChat) {
        return this.http.get(this.url + '/chats/' + idChat, this.utilities.create_options(this.get_token())).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (data) {
            // console.log(JSON.stringify(data));
        }));
    };
    UserService.prototype.createChat = function (username) {
        return this.http.post(this.url + '/chats', { 'destinatario': username }, this.utilities.create_options(this.get_token())).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (data) {
            // console.log(JSON.stringify(data));
        }));
    };
    UserService.prototype.sendMessage = function (idChat, text) {
        var date = Date.now();
        return this.http.post(this.url + '/chats/' + idChat, { 'sentAt': date, 'text': text }, this.utilities.create_options(this.get_token())).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (data) {
            // console.log(JSON.stringify(data));
        }));
    };
    UserService.prototype.deleteChat = function (id) {
        return this.http.delete(this.url + '/chats/' + id, this.utilities.create_options(this.get_token())).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (data) {
            // console.log(JSON.stringify(data));
        }));
    };
    UserService.prototype.getMatches = function (user) {
        return this.http.get(this.url + '/users/:user/matches', this.utilities.create_options(this.get_token())).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (data) {
            // console.log(JSON.stringify(data));
        }));
    };
    // ----------------- JTW GETTER -----------------
    UserService.prototype.get_token = function () {
        if (this.token === '' && localStorage.getItem(token_name) !== null) {
            this.token = localStorage.getItem(token_name);
            this.renew().subscribe(function (data) {
                console.log('Token renewed successfully');
            });
        }
        return this.token;
    };
    UserService.prototype.get_name = function () {
        return jwt_decode__WEBPACK_IMPORTED_MODULE_2__(this.token).name;
    };
    UserService.prototype.get_surname = function () {
        return jwt_decode__WEBPACK_IMPORTED_MODULE_2__(this.token).surname;
    };
    UserService.prototype.get_username = function () {
        return jwt_decode__WEBPACK_IMPORTED_MODULE_2__(this.token).username;
    };
    UserService.prototype.get_userId = function () {
        return jwt_decode__WEBPACK_IMPORTED_MODULE_2__(this.token).id;
    };
    UserService.prototype.get_mail = function () {
        return jwt_decode__WEBPACK_IMPORTED_MODULE_2__(this.token).mail;
    };
    UserService.prototype.is_admin = function () {
        return jwt_decode__WEBPACK_IMPORTED_MODULE_2__(this.token).isAdmin;
    };
    UserService.prototype.is_user_logged = function () {
        return !(this.token === '');
    };
    UserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], _utilities_service__WEBPACK_IMPORTED_MODULE_5__["UtilitiesService"]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/app/utilities.service.ts":
/*!**************************************!*\
  !*** ./src/app/utilities.service.ts ***!
  \**************************************/
/*! exports provided: UtilitiesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UtilitiesService", function() { return UtilitiesService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UtilitiesService = /** @class */ (function () {
    function UtilitiesService(router) {
        this.router = router;
    }
    UtilitiesService.getPublicUrl = function () {
        return 'http://10.0.2.2:8080';
    };
    UtilitiesService.prototype.create_options = function (token, params) {
        if (params === void 0) { params = {}; }
        // console.log('TOKEN: ' + JSON.stringify(token) + 'PARAMS QUERY ' + JSON.stringify(params));
        return {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'authorization': 'Bearer ' + token,
                'cache-control': 'no-cache',
                'Content-Type': 'application/json',
            }),
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]({ fromObject: params })
        };
    };
    UtilitiesService.prototype.check_auth = function (token) {
        if (token.length === 0) {
            this.router.navigate(['/']);
        }
    };
    UtilitiesService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], UtilitiesService);
    return UtilitiesService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
// Device bootstrap
document.addEventListener('deviceready', function () {
    Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"]).catch(function (err) {
        return console.log(err);
    });
}, false);


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/albertoveneri/Sites/Battleship/client/battleship-android/src/main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map