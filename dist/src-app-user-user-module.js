(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["src-app-user-user-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/user/login/login.component.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/user/login/login.component.html ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container min-vh-100\">\r\n  <h1 class=\"m-4\">Login</h1>\r\n  <hr>\r\n  <div class=\"col-lg-4 col-xs-6 m-md-5\">\r\n    <form #loginForm=\"ngForm\" (ngSubmit)=\"login(loginForm.value)\" autocomplete=\"off\" novalidate>\r\n      <div class=\"form-group\">\r\n        <label for=\"userName\">User Name:</label>\r\n        <em *ngIf=\"loginForm.controls.userName?.invalid && (loginForm.controls.userName.touched ||\r\n      mouseoverLogin) \">required</em>\r\n        <input required (ngModel)=\"userName\" name=\"userName\" id=\"userName\" type=\"text\" class=\"form-control\"\r\n          placeholder=\"User Name...\" />\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"password\">Password:</label>\r\n        <em *ngIf=\"loginForm.controls.password?.invalid && (loginForm.controls.password.touched || \r\n      mouseoverLogin)\">required</em>\r\n        <input required (ngModel)=\"password\" name=\"password\" id=\"password\" type=\"password\" class=\"form-control\"\r\n          placeholder=\"Password...\" />\r\n      </div>\r\n      <span (mouseenter)=\"mouseoverLogin=true\" (mouseleave)=\"mouseoverLogin=false\">\r\n        <button type=\"submit\" [disabled]=\"loginForm.invalid\" class=\"btn btn-outline-primary\">Login</button>\r\n      </span>\r\n      <button (click)=\"cancel()\" type=\"button\" class=\"btn btn-outline-danger ml-1\">Cancel</button>\r\n    </form>\r\n  </div>\r\n\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/user/profile/profile.component.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/user/profile/profile.component.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container min-vh-100\">\r\n  <h1 class=\"m-4\">Profile</h1>\r\n  <hr>\r\n  <div class=\"col-lg-4 col-xs-6 m-md-5\">\r\n    <form [formGroup]=\"profileForm\" (ngSubmit)=\"saveProfile(profileForm.value)\" autocomplete=\"off\" novalidate>\r\n      <div class=\"form-group\">\r\n        <label for=\"firstName\">First Name</label>\r\n        <em *ngIf=\"firstName?.invalid && (firstName.touched ||\r\n          mouseoverLogin) \">required</em>\r\n        <input required formControlName=\"firstName\" name=\"firstName\" id=\"firstName\" type=\"text\" class=\"form-control\"\r\n          placeholder=\"First Name...\" />\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"lastName\">Last Name</label>\r\n        <em *ngIf=\"lastName?.invalid && (lastName.touched ||\r\n          mouseoverLogin) \">required</em>\r\n        <input required formControlName=\"lastName\" name=\"lastName\" id=\"lastName\" type=\"text\" class=\"form-control\"\r\n          placeholder=\"Last Name......\" />\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"userName\">User Name:</label>\r\n        <em *ngIf=\"userName?.invalid && (userName.touched ||\r\n        mouseoverLogin) \">required</em>\r\n        <input required formControlName=\"userName\" name=\"userName\" id=\"userName\" type=\"text\" class=\"form-control\"\r\n          placeholder=\"User Name...\" />\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"password\">Password:</label>\r\n        <em *ngIf=\"password?.invalid && (password.touched || \r\n        mouseoverLogin)\">required</em>\r\n        <input required formControlName=\"password\" name=\"password\" id=\"password\" type=\"password\" class=\"form-control\"\r\n          placeholder=\"Password...\" />\r\n      </div>\r\n      <span (mouseenter)=\"mouseoverLogin=true\" (mouseleave)=\"mouseoverLogin=false\">\r\n        <button type=\"submit\" [disabled]=\"profileForm.invalid\" class=\"btn btn-outline-primary\">Save</button>\r\n      </span>\r\n      <button (click)=\"cancelEdit()\" type=\"button\" class=\"btn btn-outline-danger ml-1\">Cancel</button>\r\n    </form>\r\n  </div>\r\n\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/user/login/login-route-activator.service.ts":
/*!*************************************************************!*\
  !*** ./src/app/user/login/login-route-activator.service.ts ***!
  \*************************************************************/
/*! exports provided: LoginRouteActivator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginRouteActivator", function() { return LoginRouteActivator; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../auth.service */ "./src/app/user/auth.service.ts");

// import { Route } from '@angular/compiler/src/core';



var LoginRouteActivator = /** @class */ (function () {
    function LoginRouteActivator(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    LoginRouteActivator.prototype.canActivate = function () {
        var authenticated = this.authService.isAuthenticated;
        if (authenticated)
            this.router.navigate(['home']);
        return !authenticated;
    };
    LoginRouteActivator.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"] }
    ]; };
    LoginRouteActivator = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]])
    ], LoginRouteActivator);
    return LoginRouteActivator;
}());



/***/ }),

/***/ "./src/app/user/login/login.component.css":
/*!************************************************!*\
  !*** ./src/app/user/login/login.component.css ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("em {\r\n    color: #da0f0f;\r\n    float: right;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdXNlci9sb2dpbi9sb2dpbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksY0FBYztJQUNkLFlBQVk7QUFDaEIiLCJmaWxlIjoic3JjL2FwcC91c2VyL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJlbSB7XHJcbiAgICBjb2xvcjogI2RhMGYwZjtcclxuICAgIGZsb2F0OiByaWdodDtcclxufSJdfQ== */");

/***/ }),

/***/ "./src/app/user/login/login.component.ts":
/*!***********************************************!*\
  !*** ./src/app/user/login/login.component.ts ***!
  \***********************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../auth.service */ "./src/app/user/auth.service.ts");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/__ivy_ngcc__/ngx-cookie-service.es5.js");





var LoginComponent = /** @class */ (function () {
    function LoginComponent(route, authservice, cookieService) {
        this.route = route;
        this.authservice = authservice;
        this.cookieService = cookieService;
    }
    LoginComponent.prototype.login = function (formValues) {
        var domain = 'localhost';
        var path = '/';
        var secure = true;
        var oldDate = new Date();
        var expiry = new Date();
        expiry.setTime(oldDate.getTime() + (30 * 60 * 1000));
        // expiry.setDate(expiry.getDate() + 1);
        this.authservice.loginUser(formValues.userName, formValues.password);
        this.cookieService.set('currentUser', JSON.stringify(this.authservice.currentUser), expiry, path, domain, secure, 'None');
        this.cookieService.set('token', JSON.stringify(this.authservice.currentUser.password), expiry, path, domain, secure, 'None');
        this.route.navigate(['/home']);
    };
    LoginComponent.prototype.cancel = function () {
        this.route.navigate(['/home']);
    };
    LoginComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"] },
        { type: ngx_cookie_service__WEBPACK_IMPORTED_MODULE_4__["CookieService"] }
    ]; };
    LoginComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./login.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/user/login/login.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./login.component.css */ "./src/app/user/login/login.component.css")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_4__["CookieService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/user/profile/profile.component.css":
/*!****************************************************!*\
  !*** ./src/app/user/profile/profile.component.css ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("    em {\r\n      float: right;\r\n      color: #e05c65;\r\n      padding-left: 10px\r\n    }\r\n\r\n    .error input {\r\n      background-color: #e3c3c5;\r\n    }\r\n\r\n    .error ::-webkit-input-placeholder {\r\n      color: #fff\r\n    }\r\n\r\n    .error ::-moz-input-placeholder {\r\n      color: #fff\r\n    }\r\n\r\n    .error :-moz-input-placeholder {\r\n      color: #fff\r\n    }\r\n\r\n    .error :ms-input-placeholder {\r\n      color: #fff\r\n    }\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdXNlci9wcm9maWxlL3Byb2ZpbGUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiSUFBSTtNQUNFLFlBQVk7TUFDWixjQUFjO01BQ2Q7SUFDRjs7SUFFQTtNQUNFLHlCQUF5QjtJQUMzQjs7SUFFQTtNQUNFO0lBQ0Y7O0lBRUE7TUFDRTtJQUNGOztJQUVBO01BQ0U7SUFDRjs7SUFFQTtNQUNFO0lBQ0YiLCJmaWxlIjoic3JjL2FwcC91c2VyL3Byb2ZpbGUvcHJvZmlsZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiICAgIGVtIHtcclxuICAgICAgZmxvYXQ6IHJpZ2h0O1xyXG4gICAgICBjb2xvcjogI2UwNWM2NTtcclxuICAgICAgcGFkZGluZy1sZWZ0OiAxMHB4XHJcbiAgICB9XHJcblxyXG4gICAgLmVycm9yIGlucHV0IHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2UzYzNjNTtcclxuICAgIH1cclxuXHJcbiAgICAuZXJyb3IgOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcclxuICAgICAgY29sb3I6ICNmZmZcclxuICAgIH1cclxuXHJcbiAgICAuZXJyb3IgOjotbW96LWlucHV0LXBsYWNlaG9sZGVyIHtcclxuICAgICAgY29sb3I6ICNmZmZcclxuICAgIH1cclxuXHJcbiAgICAuZXJyb3IgOi1tb3otaW5wdXQtcGxhY2Vob2xkZXIge1xyXG4gICAgICBjb2xvcjogI2ZmZlxyXG4gICAgfVxyXG5cclxuICAgIC5lcnJvciA6bXMtaW5wdXQtcGxhY2Vob2xkZXIge1xyXG4gICAgICBjb2xvcjogI2ZmZlxyXG4gICAgfVxyXG4iXX0= */");

/***/ }),

/***/ "./src/app/user/profile/profile.component.ts":
/*!***************************************************!*\
  !*** ./src/app/user/profile/profile.component.ts ***!
  \***************************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return ProfileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/__ivy_ngcc__/ngx-cookie-service.es5.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../auth.service */ "./src/app/user/auth.service.ts");






var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(router, authService, cookieService) {
        this.router = router;
        this.authService = authService;
        this.cookieService = cookieService;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        // this.firstName = new FormControl(this.authService.currentUser.firstName, Validators.required)
        // this.lastName = new FormControl(this.authService.currentUser.lastName, Validators.required)
        // this.userName = new FormControl(this.authService.currentUser.userName, Validators.required)
        // this.password = new FormControl(this.authService.currentUser.password, Validators.required)
        // // this.confirmPassword = new FormControl('', Validators.required)
        //   ***************************************************
        //   fills profile form with current user details
        //   ***************************************************
        this.profileForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            firstName: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.authService.currentUser.firstName, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            lastName: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.authService.currentUser.lastName, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            userName: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.authService.currentUser.userName, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.authService.currentUser.password, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            confirmPassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.authService.currentUser.password, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required)
        });
    };
    // **************************************************
    // save profile details from profile form
    // *************************************************
    ProfileComponent.prototype.saveProfile = function (formValues) {
        // console.log(formValues)
        // let domain = 'localhost';
        var path = '/';
        var secure = true;
        var oldDate = new Date();
        var expiry = new Date();
        expiry.setTime(oldDate.getTime() + (30 * 60 * 1000));
        this.cookieService.set('currentUser', JSON.stringify(this.authService.currentUser), expiry, path, '', secure, 'None');
        this.cookieService.set('token', JSON.stringify(this.authService.currentUser.password), expiry, path, '', secure, 'None');
        this.authService.updateCurrentUser(formValues.firstName, formValues.lastName, formValues.userName, formValues.password);
        this.router.navigate(['/home']);
        window.scrollTo(0, 0);
    };
    ProfileComponent.prototype.cancelEdit = function () {
        this.router.navigate(['/home']);
        window.scrollTo(0, 0);
    };
    ProfileComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"] },
        { type: ngx_cookie_service__WEBPACK_IMPORTED_MODULE_4__["CookieService"] }
    ]; };
    ProfileComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./profile.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/user/profile/profile.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./profile.component.css */ "./src/app/user/profile/profile.component.css")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"], ngx_cookie_service__WEBPACK_IMPORTED_MODULE_4__["CookieService"]])
    ], ProfileComponent);
    return ProfileComponent;
}());



/***/ }),

/***/ "./src/app/user/user.module.ts":
/*!*************************************!*\
  !*** ./src/app/user/user.module.ts ***!
  \*************************************/
/*! exports provided: UserModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserModule", function() { return UserModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _user_routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user.routes */ "./src/app/user/user.routes.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login/login.component */ "./src/app/user/login/login.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./profile/profile.component */ "./src/app/user/profile/profile.component.ts");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/__ivy_ngcc__/ngx-cookie-service.es5.js");
/* harmony import */ var _login_login_route_activator_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./login/login-route-activator.service */ "./src/app/user/login/login-route-activator.service.ts");










var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(_user_routes__WEBPACK_IMPORTED_MODULE_4__["userRoutes"])
            ],
            declarations: [
                _login_login_component__WEBPACK_IMPORTED_MODULE_5__["LoginComponent"],
                _profile_profile_component__WEBPACK_IMPORTED_MODULE_7__["ProfileComponent"]
            ],
            providers: [ngx_cookie_service__WEBPACK_IMPORTED_MODULE_8__["CookieService"], _login_login_route_activator_service__WEBPACK_IMPORTED_MODULE_9__["LoginRouteActivator"]
            ]
        })
    ], UserModule);
    return UserModule;
}());



/***/ }),

/***/ "./src/app/user/user.routes.ts":
/*!*************************************!*\
  !*** ./src/app/user/user.routes.ts ***!
  \*************************************/
/*! exports provided: userRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userRoutes", function() { return userRoutes; });
/* harmony import */ var _login_login_route_activator_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login/login-route-activator.service */ "./src/app/user/login/login-route-activator.service.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login/login.component */ "./src/app/user/login/login.component.ts");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profile/profile.component */ "./src/app/user/profile/profile.component.ts");



var userRoutes = [
    { path: 'user/login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_1__["LoginComponent"], canActivate: [_login_login_route_activator_service__WEBPACK_IMPORTED_MODULE_0__["LoginRouteActivator"]] },
    { path: 'user/profile', component: _profile_profile_component__WEBPACK_IMPORTED_MODULE_2__["ProfileComponent"] }
];


/***/ })

}]);
//# sourceMappingURL=src-app-user-user-module.js.map