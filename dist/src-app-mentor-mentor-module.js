(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["src-app-mentor-mentor-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/mentor/mentor-page/mentor-page.component.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/mentor/mentor-page/mentor-page.component.html ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div  class=\"container min-vh-100\">\r\n  <p class=\"ml-1 mt-3\"><a [routerLink]=\"['/home']\">Home</a> > <a [routerLink]=\"['/guidance/find-a-mentor']\">Find A\r\n      Mentor</a> > <a [routerLink]=\"['/guidance/find-a-mentor',mentor.login]\">{{mentor.login}}</a></p>\r\n\r\n  <div class=\"row\">\r\n    <div class=\"col-md-4\">\r\n      <div class=\"sticky-top shadow-sm\">\r\n        <div class=\"card my-4 \">\r\n          <h3 class=\"bg-primary text-center p-2 text-white\">\r\n            <span><small>Mentor:</small></span> <br><span\r\n              class=\"font-weight-bold\">{{mentor.name}}</span>\r\n          </h3>\r\n          <p class=\"text-center m-0 \"><small><span class=\"text-info font-weight-bold\">&uArr; </span><span>{{mentor.followers}}</span>\r\n              <span class=\"text-danger font-weight-bold\"> &dArr; </span><span>{{mentor.following}}</span></small></p>\r\n          <hr class=\"\">\r\n          <div class=\"card-body px-0\">\r\n            <div class=\"row\">\r\n              <div class=\"col-lg-12 text-center\">\r\n                <img class=\"img-fluid rounded-circle\" [src]=\"mentor.avatar_url\" alt=\"mentor's picture\">\r\n                <h4 class=\"p-2 font-weight-bold\">{{mentor.location}}</h4>\r\n                <p class=\"bg-light p-3 \"><a [href]=\"mentor.html_url\">{{mentor.html_url}}</a></p>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n    <div class=\"col-md-6 mb-5\">\r\n      <div class=\"border rounded p-3 mt-4 bg-light shadow\">\r\n        <h3 class=\"font-weight-bold text-primary\">ChatBox</h3><span><small>{{strService.getDateTime()}}</small></span>\r\n        <!-- | <span id=\"cTime\"></span> -->\r\n        <hr>\r\n        <br><br><br><br><br><br><br><br><br>\r\n        <div id=\"chat\"></div>\r\n        <div  class=\"card my-4 \">\r\n          <div class=\"card-body\">\r\n            <form #chatForm=\"ngForm\" (ngSubmit)=\"sendChat(chatForm.value)\" autocomplete=\"off\" novalidate>\r\n              <div class=\"form-group mb-1\">\r\n                <textarea (ngModel)=\"chatIn\" name=\"chatIn\" id=\"chatIn\" class=\"form-control mb-0\" rows=\"2\"\r\n                  required></textarea>\r\n              </div>\r\n              <span (mouseenter)=\"mouseoverlogin=true\" (mouseleave)=\"mouseoverlogin=false\">\r\n                <button [disabled]=\"chatForm.invalid\" id=\"send\" type=\"submit\" class=\"btn btn-primary\">Send\r\n                  &rarr;</button>\r\n                  <em *ngIf=\"chatForm.controls.chatIn?.invalid && (chatForm.controls.chatIn.touched || mouseoverlogin) \"\r\n                  class=\"text-danger mb-2\"><small class=\"float-right\">can't send empty chat</small></em>\r\n              </span>\r\n            </form>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  \r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/mentor/mentor.component.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/mentor/mentor.component.html ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container-fluid min-vh-100\">\r\n  <div class=\"blog-home\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-1\"></div>\r\n      <!-- Blog Entries Column -->\r\n      <div class=\"col-md-6 blog-home p-4\">\r\n        <p><a [routerLink]=\"['/home']\">Home</a> > <a [routerLink]=\"['/guidance/find-a-mentor']\">Find A Mentor</a></p>\r\n        <h3 class=\"my-4\">{{title}}\r\n          <small>blog.WebTuitor</small>\r\n        </h3>\r\n        <!-- Blog Post -->\r\n        <div [routerLink]=\"['/guidance/find-a-mentor',mentor.login]\" *ngFor=\"let mentor of mentors\" class=\"card mb-2 mcard\">\r\n          <div class=\"row gx-0\">\r\n            <div class=\"col-md-4\">\r\n              <div class=\"mentor\">\r\n                <img class=\"card-img-top mcardpic img-fluid pb-1\" [src]=\"mentor.avatar_url\" alt=\"Card image cap\"><br>\r\n                <div class=\"text-center pb-2\">\r\n                  <span class=\"alert text-info\">{{mentor.html_url}}</span>\r\n                 <!-- <span> &uArr;</span><span class=\"text-light badge badge-info\">30k</span><span> &dArr;</span><span class=\"text-warning badge badge-danger\"> 1 </span> -->\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-8\">\r\n              <div class=\"card-body\">\r\n                <h2 class=\"card-title\">{{mentor.login}}</h2>\r\n                <p class=\"card-text pb-3\">Lorem, ipsum dolor sit amet consectetur adipisicing elit. \r\n                  Suscipit placeat dolore voluptatum! Illo \r\n                </p>\r\n                <details>\r\n                  <summary [routerLink]=\"['/guidance/find-a-mentor',mentor.login]\" class=\"btn btn-outline-info card-link\">\r\n                    Get in touch &rarr;\r\n                  </summary>\r\n                  <!-- <div class=\"guide\">\r\n                    <ul class=\"\" id=\"list\">\r\n                      <li>Tel: +233245053490</li>\r\n                      <li>Email: yjbdanquah@gmail.com</li>               \r\n                    </ul>\r\n                  </div>  -->\r\n                </details>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <!-- Pagination -->\r\n        <ul class=\"pagination justify-content-center mb-4\">\r\n          <li class=\"page-item mr-5\">\r\n            <a class=\"page-link\" href=\"#\">&larr; Prev</a>\r\n          </li>\r\n          <li class=\"page-item disabled ml-5\">\r\n            <a class=\"page-link\" href=\"#\">Next &rarr;</a>\r\n          </li>\r\n        </ul>\r\n\r\n      </div>\r\n    </div>\r\n    <!-- /.row -->\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/mentor/mentor-page/mentor-page.component.css":
/*!**************************************************************!*\
  !*** ./src/app/mentor/mentor-page/mentor-page.component.css ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21lbnRvci9tZW50b3ItcGFnZS9tZW50b3ItcGFnZS5jb21wb25lbnQuY3NzIn0= */");

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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var src_app_mentor_mentor_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/mentor/mentor.service */ "./src/app/mentor/mentor.service.ts");
/* harmony import */ var src_app_untility_string_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/untility/string.service */ "./src/app/untility/string.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");





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
    MentorPageComponent.ctorParameters = function () { return [
        { type: src_app_mentor_mentor_service__WEBPACK_IMPORTED_MODULE_2__["MentorService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: src_app_untility_string_service__WEBPACK_IMPORTED_MODULE_3__["StringService"] }
    ]; };
    MentorPageComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-mentor-page',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./mentor-page.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/mentor/mentor-page/mentor-page.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./mentor-page.component.css */ "./src/app/mentor/mentor-page/mentor-page.component.css")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [src_app_mentor_mentor_service__WEBPACK_IMPORTED_MODULE_2__["MentorService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            src_app_untility_string_service__WEBPACK_IMPORTED_MODULE_3__["StringService"]])
    ], MentorPageComponent);
    return MentorPageComponent;
}());



/***/ }),

/***/ "./src/app/mentor/mentor.component.css":
/*!*********************************************!*\
  !*** ./src/app/mentor/mentor.component.css ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("@media only screen and (min-width: 720px) {\r\n    .mcard {\r\n        width: 600px !important;\r\n    }\r\n    /* .mentor > img {\r\n        width: 150px;\r\n        display: inline!important;\r\n    } */\r\n}\r\n\r\n.mcard {\r\n    /* width: 500px !important; */\r\n    background-color: #f3f1f1;\r\n    border: none;\r\n    /* margin-right: 20px; */\r\n    display: inline-flex;\r\n    border-radius: 10px;\r\n  }\r\n\r\n.mcard:hover {\r\n    background-color: #d8d4d4;\r\n    transition: all 1.1s ease;\r\n    -webkit-transition: all 1.1s ease;\r\n    cursor: pointer;\r\n  }\r\n\r\n/* .mcardpic {\r\n    width: 200px;\r\n    height: 250px !important;\r\n  } */\r\n\r\n.mcard .card-body>a {\r\n    margin-top: 15px;\r\n  }\r\n\r\n.card-title {\r\n      text-transform: capitalize;\r\n  }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWVudG9yL21lbnRvci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0k7UUFDSSx1QkFBdUI7SUFDM0I7SUFDQTs7O09BR0c7QUFDUDs7QUFFQTtJQUNJLDZCQUE2QjtJQUM3Qix5QkFBeUI7SUFDekIsWUFBWTtJQUNaLHdCQUF3QjtJQUN4QixvQkFBb0I7SUFDcEIsbUJBQW1CO0VBQ3JCOztBQUVBO0lBQ0UseUJBQXlCO0lBQ3pCLHlCQUF5QjtJQUN6QixpQ0FBaUM7SUFDakMsZUFBZTtFQUNqQjs7QUFFQTs7O0tBR0c7O0FBRUg7SUFDRSxnQkFBZ0I7RUFDbEI7O0FBRUE7TUFDSSwwQkFBMEI7RUFDOUIiLCJmaWxlIjoic3JjL2FwcC9tZW50b3IvbWVudG9yLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDcyMHB4KSB7XHJcbiAgICAubWNhcmQge1xyXG4gICAgICAgIHdpZHRoOiA2MDBweCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gICAgLyogLm1lbnRvciA+IGltZyB7XHJcbiAgICAgICAgd2lkdGg6IDE1MHB4O1xyXG4gICAgICAgIGRpc3BsYXk6IGlubGluZSFpbXBvcnRhbnQ7XHJcbiAgICB9ICovXHJcbn1cclxuXHJcbi5tY2FyZCB7XHJcbiAgICAvKiB3aWR0aDogNTAwcHggIWltcG9ydGFudDsgKi9cclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmM2YxZjE7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICAvKiBtYXJnaW4tcmlnaHQ6IDIwcHg7ICovXHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5tY2FyZDpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDhkNGQ0O1xyXG4gICAgdHJhbnNpdGlvbjogYWxsIDEuMXMgZWFzZTtcclxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDEuMXMgZWFzZTtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICB9XHJcbiAgXHJcbiAgLyogLm1jYXJkcGljIHtcclxuICAgIHdpZHRoOiAyMDBweDtcclxuICAgIGhlaWdodDogMjUwcHggIWltcG9ydGFudDtcclxuICB9ICovXHJcbiAgXHJcbiAgLm1jYXJkIC5jYXJkLWJvZHk+YSB7XHJcbiAgICBtYXJnaW4tdG9wOiAxNXB4O1xyXG4gIH1cclxuICBcclxuICAuY2FyZC10aXRsZSB7XHJcbiAgICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xyXG4gIH0iXX0= */");

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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
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
        if (this.mentors === 'undefined' || !this.mentors) {
            this.router.navigate(['404']);
        }
    };
    MentorComponent.ctorParameters = function () { return [
        { type: _mentor_service__WEBPACK_IMPORTED_MODULE_3__["MentorService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] }
    ]; };
    MentorComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-mentor',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./mentor.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/mentor/mentor.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./mentor.component.css */ "./src/app/mentor/mentor.component.css")).default, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ../shared-css/page-css.css */ "./src/app/shared-css/page-css.css")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_mentor_service__WEBPACK_IMPORTED_MODULE_3__["MentorService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _mentor_routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mentor.routes */ "./src/app/mentor/mentor.routes.ts");
/* harmony import */ var _mentor_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mentor.component */ "./src/app/mentor/mentor.component.ts");
/* harmony import */ var _mentor_page_mentor_page_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mentor-page/mentor-page.component */ "./src/app/mentor/mentor-page/mentor-page.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");








var MentorModule = /** @class */ (function () {
    function MentorModule() {
    }
    MentorModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
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