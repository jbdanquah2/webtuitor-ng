(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["src-app-user-user-module"],{

/***/ "./src/app/user/login/login.component.css":
/*!************************************************!*\
  !*** ./src/app/user/login/login.component.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "em {\r\n    color: #da0f0f;\r\n    float: right;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdXNlci9sb2dpbi9sb2dpbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZUFBZTtJQUNmLGFBQWE7Q0FDaEIiLCJmaWxlIjoic3JjL2FwcC91c2VyL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJlbSB7XHJcbiAgICBjb2xvcjogI2RhMGYwZjtcclxuICAgIGZsb2F0OiByaWdodDtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/user/login/login.component.html":
/*!*************************************************!*\
  !*** ./src/app/user/login/login.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container min-vh-100\">\r\n  <h1 class=\"m-4\">Login</h1>\r\n  <hr>\r\n  <div class=\"col-lg-4 col-xs-6 m-md-5\">\r\n    <form #loginForm=\"ngForm\" (ngSubmit)=\"login(loginForm.value)\" autocomplete=\"off\" novalidate>\r\n      <div class=\"form-group\">\r\n        <label for=\"userName\">User Name:</label>\r\n        <em *ngIf=\"loginForm.controls.userName?.invalid && (loginForm.controls.userName.touched ||\r\n      mouseoverLogin) \">required</em>\r\n        <input required (ngModel)=\"userName\" name=\"userName\" id=\"userName\" type=\"text\" class=\"form-control\"\r\n          placeholder=\"User Name...\" />\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"password\">Password:</label>\r\n        <em *ngIf=\"loginForm.controls.password?.invalid && (loginForm.controls.password.touched || \r\n      mouseoverLogin)\">required</em>\r\n        <input required (ngModel)=\"password\" name=\"password\" id=\"password\" type=\"password\" class=\"form-control\"\r\n          placeholder=\"Password...\" />\r\n      </div>\r\n      <span (mouseenter)=\"mouseoverLogin=true\" (mouseleave)=\"mouseoverLogin=false\">\r\n        <button type=\"submit\" [disabled]=\"loginForm.invalid\" class=\"btn btn-outline-primary\">Login</button>\r\n      </span>\r\n      <button (click)=\"cancel()\" type=\"button\" class=\"btn btn-outline-danger ml-1\">Cancel</button>\r\n    </form>\r\n  </div>\r\n\r\n</div>\r\n"

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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../auth.service */ "./src/app/user/auth.service.ts");




var LoginComponent = /** @class */ (function () {
    function LoginComponent(route, authservice) {
        this.route = route;
        this.authservice = authservice;
    }
    LoginComponent.prototype.login = function (formValues) {
        this.authservice.loginUser(formValues.userName, formValues.password);
        this.route.navigate(['/home']);
    };
    LoginComponent.prototype.cancel = function () {
        this.route.navigate(['/home']);
    };
    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/user/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/user/login/login.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/user/profile/profile.component.css":
/*!****************************************************!*\
  !*** ./src/app/user/profile/profile.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "    em {\r\n      float: right;\r\n      color: #e05c65;\r\n      padding-left: 10px\r\n    }\r\n\r\n    .error input {\r\n      background-color: #e3c3c5;\r\n    }\r\n\r\n    .error ::-webkit-input-placeholder {\r\n      color: #fff\r\n    }\r\n\r\n    .error ::-moz-input-placeholder {\r\n      color: #fff\r\n    }\r\n\r\n    .error :-moz-input-placeholder {\r\n      color: #fff\r\n    }\r\n\r\n    .error :ms-input-placeholder {\r\n      color: #fff\r\n    }\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdXNlci9wcm9maWxlL3Byb2ZpbGUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiSUFBSTtNQUNFLGFBQWE7TUFDYixlQUFlO01BQ2Ysa0JBQWtCO0tBQ25COztJQUVEO01BQ0UsMEJBQTBCO0tBQzNCOztJQUVEO01BQ0UsV0FBVztLQUNaOztJQUVEO01BQ0UsV0FBVztLQUNaOztJQUVEO01BQ0UsV0FBVztLQUNaOztJQUVEO01BQ0UsV0FBVztLQUNaIiwiZmlsZSI6InNyYy9hcHAvdXNlci9wcm9maWxlL3Byb2ZpbGUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIiAgICBlbSB7XHJcbiAgICAgIGZsb2F0OiByaWdodDtcclxuICAgICAgY29sb3I6ICNlMDVjNjU7XHJcbiAgICAgIHBhZGRpbmctbGVmdDogMTBweFxyXG4gICAgfVxyXG5cclxuICAgIC5lcnJvciBpbnB1dCB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlM2MzYzU7XHJcbiAgICB9XHJcblxyXG4gICAgLmVycm9yIDo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7XHJcbiAgICAgIGNvbG9yOiAjZmZmXHJcbiAgICB9XHJcblxyXG4gICAgLmVycm9yIDo6LW1vei1pbnB1dC1wbGFjZWhvbGRlciB7XHJcbiAgICAgIGNvbG9yOiAjZmZmXHJcbiAgICB9XHJcblxyXG4gICAgLmVycm9yIDotbW96LWlucHV0LXBsYWNlaG9sZGVyIHtcclxuICAgICAgY29sb3I6ICNmZmZcclxuICAgIH1cclxuXHJcbiAgICAuZXJyb3IgOm1zLWlucHV0LXBsYWNlaG9sZGVyIHtcclxuICAgICAgY29sb3I6ICNmZmZcclxuICAgIH1cclxuIl19 */"

/***/ }),

/***/ "./src/app/user/profile/profile.component.html":
/*!*****************************************************!*\
  !*** ./src/app/user/profile/profile.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container min-vh-100\">\r\n  <h1 class=\"m-4\">Profile</h1>\r\n  <hr>\r\n  <div class=\"col-lg-4 col-xs-6 m-md-5\">\r\n    <form [formGroup]=\"profileForm\" (ngSubmit)=\"saveProfile(profileForm.value)\" autocomplete=\"off\" novalidate>\r\n      <div class=\"form-group\">\r\n        <label for=\"firstName\">First Name</label>\r\n        <em *ngIf=\"firstName?.invalid && (firstName.touched ||\r\n          mouseoverLogin) \">required</em>\r\n        <input required formControlName=\"firstName\" name=\"firstName\" id=\"firstName\" type=\"text\" class=\"form-control\"\r\n          placeholder=\"First Name...\" />\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"lastName\">Last Name</label>\r\n        <em *ngIf=\"lastName?.invalid && (lastName.touched ||\r\n          mouseoverLogin) \">required</em>\r\n        <input required formControlName=\"lastName\" name=\"lastName\" id=\"lastName\" type=\"text\" class=\"form-control\"\r\n          placeholder=\"Last Name...\" />\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"userName\">User Name:</label>\r\n        <em *ngIf=\"userName?.invalid && (userName.touched ||\r\n        mouseoverLogin) \">required</em>\r\n        <input required formControlName=\"userName\" name=\"userName\" id=\"userName\" type=\"text\" class=\"form-control\"\r\n          placeholder=\"User Name...\" />\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"password\">Password:</label>\r\n        <em *ngIf=\"password?.invalid && (password.touched || \r\n        mouseoverLogin)\">required</em>\r\n        <input required formControlName=\"password\" name=\"password\" id=\"password\" type=\"password\" class=\"form-control\"\r\n          placeholder=\"Password...\" />\r\n      </div>\r\n      <span (mouseenter)=\"mouseoverLogin=true\" (mouseleave)=\"mouseoverLogin=false\">\r\n        <button type=\"submit\" [disabled]=\"profileForm.invalid\" class=\"btn btn-outline-primary\">Save</button>\r\n      </span>\r\n      <button (click)=\"cancelEdit()\" type=\"button\" class=\"btn btn-outline-danger ml-1\">Cancel</button>\r\n    </form>\r\n  </div>\r\n\r\n</div>\r\n"

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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../auth.service */ "./src/app/user/auth.service.ts");





var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.firstName = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.authService.currentUser.firstName, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required);
        this.lastName = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.authService.currentUser.lastName, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required);
        this.userName = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.authService.currentUser.userName, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required);
        this.password = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.authService.currentUser.password, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required);
        // this.confirmPassword = new FormControl('', Validators.required)
        this.profileForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            password: this.password,
            confirmPassword: this.password
        });
    };
    ProfileComponent.prototype.saveProfile = function (formValues) {
        console.log(formValues);
        this.authService.updateCurrentUser(formValues.firstName, formValues.lastName, formValues.userName, formValues.password);
        this.router.navigate(['/home']);
        window.scrollTo(0, 0);
    };
    ProfileComponent.prototype.cancelEdit = function () {
        this.router.navigate(['/home']);
        window.scrollTo(0, 0);
    };
    ProfileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: __webpack_require__(/*! ./profile.component.html */ "./src/app/user/profile/profile.component.html"),
            styles: [__webpack_require__(/*! ./profile.component.css */ "./src/app/user/profile/profile.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"]])
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _user_routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user.routes */ "./src/app/user/user.routes.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login/login.component */ "./src/app/user/login/login.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./profile/profile.component */ "./src/app/user/profile/profile.component.ts");








var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
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
            providers: []
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
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login/login.component */ "./src/app/user/login/login.component.ts");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile/profile.component */ "./src/app/user/profile/profile.component.ts");


var userRoutes = [
    { path: 'user/login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_0__["LoginComponent"] },
    { path: 'user/profile', component: _profile_profile_component__WEBPACK_IMPORTED_MODULE_1__["ProfileComponent"] }
];


/***/ })

}]);
//# sourceMappingURL=src-app-user-user-module.js.map