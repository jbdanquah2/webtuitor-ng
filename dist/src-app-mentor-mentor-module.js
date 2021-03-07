(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["src-app-mentor-mentor-module"],{

/***/ "./src/app/mentor/mentor-page/mentor-page.component.css":
/*!**************************************************************!*\
  !*** ./src/app/mentor/mentor-page/mentor-page.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21lbnRvci9tZW50b3ItcGFnZS9tZW50b3ItcGFnZS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/mentor/mentor-page/mentor-page.component.html":
/*!***************************************************************!*\
  !*** ./src/app/mentor/mentor-page/mentor-page.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div  class=\"container min-vh-100\">\n  <p class=\"ml-1 mt-3\"><a [routerLink]=\"['/home']\">Home</a> > <a [routerLink]=\"['/guidance/find-a-mentor']\">Find A\n      Mentor</a> > <a [routerLink]=\"['/guidance/find-a-mentor',mentor.login]\">{{mentor.login}}</a></p>\n\n  <div class=\"row\">\n    <div class=\"col-md-4\">\n      <div class=\"sticky-top shadow-sm\">\n        <div class=\"card my-4 \">\n          <h3 class=\"bg-primary text-center p-2 text-white\">\n            <span><small>Mentor:</small></span> <br><span\n              class=\"font-weight-bold\">{{mentor.name}}</span>\n          </h3>\n          <p class=\"text-center m-0 \"><small><span class=\"text-info font-weight-bold\">&uArr; </span><span>{{mentor.followers}}</span>\n              <span class=\"text-danger font-weight-bold\"> &dArr; </span><span>{{mentor.following}}</span></small></p>\n          <hr class=\"\">\n          <div class=\"card-body px-0\">\n            <div class=\"row\">\n              <div class=\"col-lg-12 text-center\">\n                <img class=\"img-fluid rounded-circle\" [src]=\"mentor.avatar_url\" alt=\"mentor's picture\">\n                <h4 class=\"p-2 font-weight-bold\">{{mentor.location}}</h4>\n                <p class=\"bg-light p-3 \"><a [href]=\"mentor.html_url\">{{mentor.html_url}}</a></p>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n    <div class=\"col-md-6 mb-5\">\n      <div class=\"border rounded p-3 mt-4 bg-light shadow\">\n        <h3 class=\"font-weight-bold text-primary\">ChatBox</h3><span><small>{{strService.getDateTime()}}</small></span>\n        <!-- | <span id=\"cTime\"></span> -->\n        <hr>\n        <br><br><br><br><br><br><br><br><br>\n        <div id=\"chat\"></div>\n        <div  class=\"card my-4 \">\n          <div class=\"card-body\">\n            <form #chatForm=\"ngForm\" (ngSubmit)=\"sendChat(chatForm.value)\" autocomplete=\"off\" novalidate>\n              <div class=\"form-group mb-1\">\n                <textarea (ngModel)=\"chatIn\" name=\"chatIn\" id=\"chatIn\" class=\"form-control mb-0\" rows=\"2\"\n                  required></textarea>\n              </div>\n              <span (mouseenter)=\"mouseoverlogin=true\" (mouseleave)=\"mouseoverlogin=false\">\n                <button [disabled]=\"chatForm.invalid\" id=\"send\" type=\"submit\" class=\"btn btn-primary\">Send\n                  &rarr;</button>\n                  <em *ngIf=\"chatForm.controls.chatIn?.invalid && (chatForm.controls.chatIn.touched || mouseoverlogin) \"\n                  class=\"text-danger mb-2\"><small class=\"float-right\">can't send empty chat</small></em>\n              </span>\n            </form>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  \n"

/***/ }),

/***/ "./src/app/mentor/mentor-page/mentor-page.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/mentor/mentor-page/mentor-page.component.ts ***!
  \*************************************************************/
/*! exports provided: MentorPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MentorPageComponent", function() { return MentorPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_mentor_mentor_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/mentor/mentor.service */ "./src/app/mentor/mentor.service.ts");
/* harmony import */ var src_app_untility_string_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/untility/string.service */ "./src/app/untility/string.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");





var MentorPageComponent = /** @class */ (function () {
    function MentorPageComponent(mentorService, route, stringService) {
        this.mentorService = mentorService;
        this.route = route;
        this.stringService = stringService;
    }
    MentorPageComponent.prototype.ngOnInit = function () {
        this.mentor = this.route.snapshot.data['mentor'];
        window.scrollTo(0, 0);
        this.user = this.route.snapshot.params['login'];
        if (this.user != 'undefined' || this.user != null || this.user != '') {
            this.strService = this.stringService;
            this.strService.getDateTime();
            this.cTime = document.getElementById('cTime');
        }
    };
    MentorPageComponent.prototype.time = function () {
        var d = new Date();
        var s = d.getSeconds();
        var m = d.getMinutes();
        var h = d.getHours();
        if (this.mentor != 'undefined' || this.mentor != null || this.mentor != '') {
            // console.log('hiiiiii');
            document.getElementById('cTime').innerHTML = "<small>" + h + ":" + m + ":" + s + "</small>";
        }
    };
    MentorPageComponent.prototype.sendChat = function (chatForm) {
        var p = document.createElement("p");
        p.classList.add('alert', 'alert-primary', 'text-right', 'clearfix', 'mb-1');
        if (this.mentor != 'undefined' || this.mentor != null || this.mentor != '') {
            p.innerHTML = chatForm.chatIn + "<br><small class=\"float-left text-info\"> [ " + this.stringService.getDateTime() + " | " + this.stringService.time() + " ]</small>";
            document.querySelector('#chat').appendChild(p);
        }
    };
    MentorPageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-mentor-page',
            template: __webpack_require__(/*! ./mentor-page.component.html */ "./src/app/mentor/mentor-page/mentor-page.component.html"),
            styles: [__webpack_require__(/*! ./mentor-page.component.css */ "./src/app/mentor/mentor-page/mentor-page.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_mentor_mentor_service__WEBPACK_IMPORTED_MODULE_2__["MentorService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            src_app_untility_string_service__WEBPACK_IMPORTED_MODULE_3__["StringService"]])
    ], MentorPageComponent);
    return MentorPageComponent;
}());



/***/ }),

/***/ "./src/app/mentor/mentor.component.css":
/*!*********************************************!*\
  !*** ./src/app/mentor/mentor.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@media only screen and (min-width: 720px) {\r\n    .mcard {\r\n        width: 600px !important;\r\n    }\r\n    /* .mentor > img {\r\n        width: 150px;\r\n        display: inline!important;\r\n    } */\r\n}\r\n\r\n.mcard {\r\n    /* width: 500px !important; */\r\n    background-color: #f3f1f1;\r\n    border: none;\r\n    /* margin-right: 20px; */\r\n    display: inline-flex;\r\n    border-radius: 10px;\r\n  }\r\n\r\n.mcard:hover {\r\n    background-color: #d8d4d4;\r\n    transition: all 1.1s ease;\r\n    -webkit-transition: all 1.1s ease;\r\n    cursor: pointer;\r\n  }\r\n\r\n/* .mcardpic {\r\n    width: 200px;\r\n    height: 250px !important;\r\n  } */\r\n\r\n.mcard .card-body>a {\r\n    margin-top: 15px;\r\n  }\r\n\r\n.card-title {\r\n      text-transform: capitalize;\r\n  }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWVudG9yL21lbnRvci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0k7UUFDSSx3QkFBd0I7S0FDM0I7SUFDRDs7O1FBR0k7Q0FDUDs7QUFFRDtJQUNJLDhCQUE4QjtJQUM5QiwwQkFBMEI7SUFDMUIsYUFBYTtJQUNiLHlCQUF5QjtJQUN6QixxQkFBcUI7SUFDckIsb0JBQW9CO0dBQ3JCOztBQUVEO0lBQ0UsMEJBQTBCO0lBQzFCLDBCQUEwQjtJQUMxQixrQ0FBa0M7SUFDbEMsZ0JBQWdCO0dBQ2pCOztBQUVEOzs7TUFHSTs7QUFFSjtJQUNFLGlCQUFpQjtHQUNsQjs7QUFFRDtNQUNJLDJCQUEyQjtHQUM5QiIsImZpbGUiOiJzcmMvYXBwL21lbnRvci9tZW50b3IuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzIwcHgpIHtcclxuICAgIC5tY2FyZCB7XHJcbiAgICAgICAgd2lkdGg6IDYwMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbiAgICAvKiAubWVudG9yID4gaW1nIHtcclxuICAgICAgICB3aWR0aDogMTUwcHg7XHJcbiAgICAgICAgZGlzcGxheTogaW5saW5lIWltcG9ydGFudDtcclxuICAgIH0gKi9cclxufVxyXG5cclxuLm1jYXJkIHtcclxuICAgIC8qIHdpZHRoOiA1MDBweCAhaW1wb3J0YW50OyAqL1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YzZjFmMTtcclxuICAgIGJvcmRlcjogbm9uZTtcclxuICAgIC8qIG1hcmdpbi1yaWdodDogMjBweDsgKi9cclxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICB9XHJcbiAgXHJcbiAgLm1jYXJkOmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkOGQ0ZDQ7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMS4xcyBlYXNlO1xyXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMS4xcyBlYXNlO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxuICBcclxuICAvKiAubWNhcmRwaWMge1xyXG4gICAgd2lkdGg6IDIwMHB4O1xyXG4gICAgaGVpZ2h0OiAyNTBweCAhaW1wb3J0YW50O1xyXG4gIH0gKi9cclxuICBcclxuICAubWNhcmQgLmNhcmQtYm9keT5hIHtcclxuICAgIG1hcmdpbi10b3A6IDE1cHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5jYXJkLXRpdGxlIHtcclxuICAgICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XHJcbiAgfSJdfQ== */"

/***/ }),

/***/ "./src/app/mentor/mentor.component.html":
/*!**********************************************!*\
  !*** ./src/app/mentor/mentor.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid min-vh-100\">\n  <div class=\"blog-home\">\n    <div class=\"row\">\n      <div class=\"col-md-1\"></div>\n      <!-- Blog Entries Column -->\n      <div class=\"col-md-6 blog-home p-4\">\n        <p><a [routerLink]=\"['/home']\">Home</a> > <a [routerLink]=\"['/guidance/find-a-mentor']\">Find A Mentor</a></p>\n        <h3 class=\"my-4\">{{title}}\n          <small>blog.WebTuitor</small>\n        </h3>\n        <!-- Blog Post -->\n        <div [routerLink]=\"['/guidance/find-a-mentor',mentor.login]\" *ngFor=\"let mentor of mentors\" class=\"card mb-2 mcard\">\n          <div class=\"row gx-0\">\n            <div class=\"col-md-4\">\n              <div class=\"mentor\">\n                <img class=\"card-img-top mcardpic img-fluid pb-1\" [src]=\"mentor.avatar_url\" alt=\"Card image cap\"><br>\n                <div class=\"text-center pb-2\">\n                  <span class=\"alert text-info\">{{mentor.html_url}}</span>\n                 <!-- <span> &uArr;</span><span class=\"text-light badge badge-info\">30k</span><span> &dArr;</span><span class=\"text-warning badge badge-danger\"> 1 </span> -->\n                </div>\n              </div>\n            </div>\n            <div class=\"col-md-8\">\n              <div class=\"card-body\">\n                <h2 class=\"card-title\">{{mentor.login}}</h2>\n                <p class=\"card-text pb-3\">Lorem, ipsum dolor sit amet consectetur adipisicing elit. \n                  Suscipit placeat dolore voluptatum! Illo \n                </p>\n                <details>\n                  <summary [routerLink]=\"['/guidance/find-a-mentor',mentor.login]\" class=\"btn btn-outline-info card-link\">\n                    Get in touch &rarr;\n                  </summary>\n                  <!-- <div class=\"guide\">\n                    <ul class=\"\" id=\"list\">\n                      <li>Tel: +233245053490</li>\n                      <li>Email: yjbdanquah@gmail.com</li>               \n                    </ul>\n                  </div>  -->\n                </details>\n              </div>\n            </div>\n          </div>\n        </div>\n        <!-- Pagination -->\n        <ul class=\"pagination justify-content-center mb-4\">\n          <li class=\"page-item mr-5\">\n            <a class=\"page-link\" href=\"#\">&larr; Prev</a>\n          </li>\n          <li class=\"page-item disabled ml-5\">\n            <a class=\"page-link\" href=\"#\">Next &rarr;</a>\n          </li>\n        </ul>\n\n      </div>\n    </div>\n    <!-- /.row -->\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/mentor/mentor.component.ts":
/*!********************************************!*\
  !*** ./src/app/mentor/mentor.component.ts ***!
  \********************************************/
/*! exports provided: MentorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MentorComponent", function() { return MentorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _mentor_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mentor.service */ "./src/app/mentor/mentor.service.ts");




var MentorComponent = /** @class */ (function () {
    function MentorComponent(mentorService, router, route) {
        this.mentorService = mentorService;
        this.router = router;
        this.route = route;
        this.title = 'Mentors';
    }
    MentorComponent.prototype.ngOnInit = function () {
        // this.mentorService.getMentors().subscribe(mentors => {
        this.mentors = this.route.snapshot.data['mentors'];
        console.log(this.mentors);
        // })
        window.scrollTo(0, 0);
        if (this.mentors == 'undefined' || !this.mentors)
            this.router.navigate(['404']);
    };
    MentorComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-mentor',
            template: __webpack_require__(/*! ./mentor.component.html */ "./src/app/mentor/mentor.component.html"),
            styles: [__webpack_require__(/*! ./mentor.component.css */ "./src/app/mentor/mentor.component.css"), __webpack_require__(/*! ../shared-css/page-css.css */ "./src/app/shared-css/page-css.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_mentor_service__WEBPACK_IMPORTED_MODULE_3__["MentorService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], MentorComponent);
    return MentorComponent;
}());



/***/ }),

/***/ "./src/app/mentor/mentor.module.ts":
/*!*****************************************!*\
  !*** ./src/app/mentor/mentor.module.ts ***!
  \*****************************************/
/*! exports provided: MentorModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MentorModule", function() { return MentorModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _mentor_routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mentor.routes */ "./src/app/mentor/mentor.routes.ts");
/* harmony import */ var _mentor_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mentor.component */ "./src/app/mentor/mentor.component.ts");
/* harmony import */ var _mentor_page_mentor_page_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mentor-page/mentor-page.component */ "./src/app/mentor/mentor-page/mentor-page.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");








var MentorModule = /** @class */ (function () {
    function MentorModule() {
    }
    MentorModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(_mentor_routes__WEBPACK_IMPORTED_MODULE_4__["mentorRoutes"])
            ],
            declarations: [
                _mentor_component__WEBPACK_IMPORTED_MODULE_5__["MentorComponent"],
                _mentor_page_mentor_page_component__WEBPACK_IMPORTED_MODULE_6__["MentorPageComponent"]
            ],
            providers: []
        })
    ], MentorModule);
    return MentorModule;
}());



/***/ }),

/***/ "./src/app/mentor/mentor.routes.ts":
/*!*****************************************!*\
  !*** ./src/app/mentor/mentor.routes.ts ***!
  \*****************************************/
/*! exports provided: mentorRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mentorRoutes", function() { return mentorRoutes; });
/* harmony import */ var _mentor_page_mentor_page_resolver_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mentor-page/mentor-page-resolver.service */ "./src/app/mentor/mentor-page/mentor-page-resolver.service.ts");
/* harmony import */ var _mentor_page_mentor_page_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mentor-page/mentor-page.component */ "./src/app/mentor/mentor-page/mentor-page.component.ts");
/* harmony import */ var _mentor_resolver_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mentor-resolver.service */ "./src/app/mentor/mentor-resolver.service.ts");
/* harmony import */ var _mentor_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mentor.component */ "./src/app/mentor/mentor.component.ts");




var mentorRoutes = [
    { path: 'find-a-mentor', component: _mentor_component__WEBPACK_IMPORTED_MODULE_3__["MentorComponent"], resolve: { mentors: _mentor_resolver_service__WEBPACK_IMPORTED_MODULE_2__["MentorResolver"] } },
    { path: 'find-a-mentor/:login', component: _mentor_page_mentor_page_component__WEBPACK_IMPORTED_MODULE_1__["MentorPageComponent"], resolve: { mentor: _mentor_page_mentor_page_resolver_service__WEBPACK_IMPORTED_MODULE_0__["MentorPageResolver"] } },
];


/***/ })

}]);
//# sourceMappingURL=src-app-mentor-mentor-module.js.map