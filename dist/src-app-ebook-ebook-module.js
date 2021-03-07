(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["src-app-ebook-ebook-module"],{

/***/ "./src/app/ebook/ebook-post/ebook-post.component.html":
/*!************************************************************!*\
  !*** ./src/app/ebook/ebook-post/ebook-post.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"ebookpost\" class=\"container min-vh-100\">\r\n  <div class=\"row\">\r\n    <!-- Post Content Column -->\r\n    <div class=\"col-lg-8 blog-post p-4\">\r\n      <p><a [routerLink]=\"['/home']\">Home</a> > <a [routerLink]=\"['/read/get-an-ebook']\">Ebooks </a> > <a\r\n          [routerLink]=\"['/read/get-an-ebook', ebook.link]\">{{ebook.name}}</a></p>\r\n      <!-- Title -->\r\n      <h1 class=\"mt-4\">{{strService.capitalizeFirstLetter(ebook.name)}}</h1>\r\n\r\n      <!-- Author -->\r\n      <p class=\"lead\">\r\n        by\r\n        <a href=\"#\">{{ebook.created_by}}</a>\r\n      </p>\r\n\r\n      <hr>\r\n\r\n      <!-- Date/Time -->\r\n      <p>Posted on {{ebook.published}}</p>\r\n\r\n      <hr>\r\n\r\n      <!-- Preview Image -->\r\n      <img width=\"400\" class=\"img-fluid rounded\" [src]=\"ebook.img\" alt=\"image\">\r\n\r\n      <hr>\r\n\r\n      <!-- Post Content -->\r\n      <p class=\"lead\">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error\r\n        quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus\r\n        inventore?</p>\r\n\r\n      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, doloribus, dolorem iusto blanditiis unde eius\r\n        illum consequuntur neque dicta incidunt ullam ea hic porro optio ratione repellat perspiciatis. Enim, iure!</p>\r\n\r\n      <blockquote class=\"blockquote\">\r\n        <p class=\"mb-0\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>\r\n        <footer class=\"blockquote-footer\">Someone famous in\r\n          <cite title=\"Source Title\">Source Title</cite>\r\n        </footer>\r\n      </blockquote>\r\n\r\n      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, nostrum, aliquid, animi, ut quas placeat totam\r\n        sunt tempora commodi nihil ullam alias modi dicta saepe minima ab quo voluptatem obcaecati?</p>\r\n\r\n      \r\n      <hr>\r\n\r\n      <!-- Comments Form -->\r\n      <div class=\"card my-4\">\r\n        <h5 class=\"card-header\">Leave a Comment:</h5>\r\n        <div class=\"card-body\">\r\n          <form>\r\n            <div class=\"form-group\">\r\n              <textarea class=\"form-control\" rows=\"3\"></textarea>\r\n            </div>\r\n            <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\r\n          </form>\r\n        </div>\r\n      </div>\r\n\r\n      <div *ngFor=\"let comment of ebook.comments\" class=\"media mb-4\">\r\n        <img width=\"50\" class=\"d-flex mr-3 rounded-circle\" [src]=\"comment.image\" alt=\"\">\r\n        <div class=\"media-body\">\r\n          <h5 class=\"mt-0\">{{comment.name}}</h5>\r\n          {{comment.comment}}\r\n          <div *ngFor=\"let subcomment of comment.subcomments\" class=\"media mt-4\">\r\n            <img width=\"60\" class=\"d-flex mr-3 rounded-circle\" [src]=\"subcomment.image\" alt=\"\">\r\n            <div class=\"media-body\">\r\n              <h5 class=\"mt-0\">{{subcomment.name}}</h5>\r\n              {{subcomment.comment}}\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Sidebar Widgets Column\r\n      <div class=\"col-md-4 sd\">\r\n        <app-sidebar></app-sidebar>\r\n      </div> -->\r\n\r\n  </div>\r\n  <!-- /.row -->\r\n\r\n</div>\r\n<!-- /.container -->\r\n"

/***/ }),

/***/ "./src/app/ebook/ebook-post/ebook-post.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/ebook/ebook-post/ebook-post.component.ts ***!
  \**********************************************************/
/*! exports provided: EbookPostComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EbookPostComponent", function() { return EbookPostComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ebook_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ebook.service */ "./src/app/ebook/ebook.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_untility_string_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/untility/string.service */ "./src/app/untility/string.service.ts");





var EbookPostComponent = /** @class */ (function () {
    function EbookPostComponent(ebookService, route, stringService) {
        this.ebookService = ebookService;
        this.route = route;
        this.stringService = stringService;
    }
    EbookPostComponent.prototype.ngOnInit = function () {
        this.ebook = this.ebookService.getEbook(this.route.snapshot.params['link']);
        this.strService = this.stringService;
        window.scrollTo(0, 0);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], EbookPostComponent.prototype, "strService", void 0);
    EbookPostComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'ebook-post',
            template: __webpack_require__(/*! ./ebook-post.component.html */ "./src/app/ebook/ebook-post/ebook-post.component.html"),
            styles: ["\n\n    "]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ebook_service__WEBPACK_IMPORTED_MODULE_2__["EbookService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            src_app_untility_string_service__WEBPACK_IMPORTED_MODULE_4__["StringService"]])
    ], EbookPostComponent);
    return EbookPostComponent;
}());



/***/ }),

/***/ "./src/app/ebook/ebook.component.css":
/*!*******************************************!*\
  !*** ./src/app/ebook/ebook.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".w-ebook {\r\n    width: 300px!important;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZWJvb2svZWJvb2suY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLHVCQUF1QjtDQUMxQiIsImZpbGUiOiJzcmMvYXBwL2Vib29rL2Vib29rLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudy1lYm9vayB7XHJcbiAgICB3aWR0aDogMzAwcHghaW1wb3J0YW50O1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/ebook/ebook.component.html":
/*!********************************************!*\
  !*** ./src/app/ebook/ebook.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid min-vh-100\">\r\n  <div class=\"blog-home\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-1\"></div>\r\n      <!-- Blog Entries Column -->\r\n      <div class=\"col-md-9 blog-home p-4\">\r\n        <p><a [routerLink]=\"['/home']\">Home</a> > <a [routerLink]=\"['/read/get-an-ebook']\">Ebooks</a></p>\r\n        <h3 class=\"my-4\">{{title}}\r\n          <small>blog.WebTuitor</small>\r\n        </h3>\r\n\r\n        <!-- Blog Post -->\r\n        <div [routerLink]=\"['/read/get-an-ebook/',ebook.link]\" *ngFor=\"let ebook of ebooks\" class=\"card mb-4 w-ebook wcard shadow\">\r\n          <img  class=\"card-img-top wcardpic img-fluid\" [src]=\"ebook.img\" alt=\"Card image cap\">\r\n          <div class=\"card-body\">\r\n            <h2 class=\"card-title\">{{strService.capitalizeFirstLetter(ebook.name)}}</h2>\r\n            <p class=\"card-text\">{{strService.concatString(ebook.description, 100)}}</p>\r\n            <a [routerLink]=\"['/read/get-an-ebook/',ebook.link]\" class=\"btn btn-outline-info\">Read More &rarr;</a>\r\n            <a [routerLink]=\"['/read/get-an-ebook/',ebook.link]\" class=\"btn btn-outline-info\">Add to Cart &rarr;</a>\r\n          </div>\r\n          <!-- <div class=\"card-footer text-muted\">\r\n            Posted on {{ebook.published}} by\r\n            <a href=\"#\">{{ebook.created_by}}</a>\r\n          </div> -->\r\n        </div>\r\n\r\n\r\n\r\n        <!-- Pagination -->\r\n        <ul class=\"pagination justify-content-center mb-5 mt-5\">\r\n          <li class=\"page-item mr-5\">\r\n            <a class=\"page-link\" href=\"#\">&larr; Prev</a>\r\n          </li>\r\n          <li class=\"page-item disabled ml-5\">\r\n            <a class=\"page-link\" href=\"#\">Next &rarr;</a>\r\n          </li>\r\n        </ul>\r\n\r\n      </div>\r\n    </div>\r\n    <!-- /.row -->\r\n  </div>\r\n</div>\r\n<!-- /.container -->\r\n"

/***/ }),

/***/ "./src/app/ebook/ebook.component.ts":
/*!******************************************!*\
  !*** ./src/app/ebook/ebook.component.ts ***!
  \******************************************/
/*! exports provided: EbookComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EbookComponent", function() { return EbookComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ebook_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ebook.service */ "./src/app/ebook/ebook.service.ts");
/* harmony import */ var src_app_untility_string_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/untility/string.service */ "./src/app/untility/string.service.ts");





var EbookComponent = /** @class */ (function () {
    function EbookComponent(ebookService, route, stringService) {
        this.ebookService = ebookService;
        this.route = route;
        this.stringService = stringService;
        this.title = 'Popular And Useful eBooks';
    }
    EbookComponent.prototype.ngOnInit = function (id) {
        this.ebooks = this.ebookService.getEbooks();
        this.strService = this.stringService;
        window.scrollTo(0, 0);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], EbookComponent.prototype, "strService", void 0);
    EbookComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-ebook',
            template: __webpack_require__(/*! ./ebook.component.html */ "./src/app/ebook/ebook.component.html"),
            styles: [__webpack_require__(/*! ../shared-css/page-css.css */ "./src/app/shared-css/page-css.css"), __webpack_require__(/*! ./ebook.component.css */ "./src/app/ebook/ebook.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ebook_service__WEBPACK_IMPORTED_MODULE_3__["EbookService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], src_app_untility_string_service__WEBPACK_IMPORTED_MODULE_4__["StringService"]])
    ], EbookComponent);
    return EbookComponent;
}());



/***/ }),

/***/ "./src/app/ebook/ebook.module.ts":
/*!***************************************!*\
  !*** ./src/app/ebook/ebook.module.ts ***!
  \***************************************/
/*! exports provided: EbookModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EbookModule", function() { return EbookModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ebook_routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ebook.routes */ "./src/app/ebook/ebook.routes.ts");
/* harmony import */ var _ebook_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ebook.component */ "./src/app/ebook/ebook.component.ts");
/* harmony import */ var _ebook_post_ebook_post_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ebook-post/ebook-post.component */ "./src/app/ebook/ebook-post/ebook-post.component.ts");







var EbookModule = /** @class */ (function () {
    function EbookModule() {
    }
    EbookModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(_ebook_routes__WEBPACK_IMPORTED_MODULE_4__["ebookRoutes"])
            ],
            declarations: [
                _ebook_component__WEBPACK_IMPORTED_MODULE_5__["EbookComponent"],
                _ebook_post_ebook_post_component__WEBPACK_IMPORTED_MODULE_6__["EbookPostComponent"]
            ],
            providers: []
        })
    ], EbookModule);
    return EbookModule;
}());



/***/ }),

/***/ "./src/app/ebook/ebook.routes.ts":
/*!***************************************!*\
  !*** ./src/app/ebook/ebook.routes.ts ***!
  \***************************************/
/*! exports provided: ebookRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ebookRoutes", function() { return ebookRoutes; });
/* harmony import */ var _ebook_post_ebook_post_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ebook-post/ebook-post.component */ "./src/app/ebook/ebook-post/ebook-post.component.ts");
/* harmony import */ var _ebook_post_ebook_route_activator_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ebook-post/ebook-route-activator.service */ "./src/app/ebook/ebook-post/ebook-route-activator.service.ts");
/* harmony import */ var _ebook_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ebook.component */ "./src/app/ebook/ebook.component.ts");



var ebookRoutes = [
    { path: 'get-an-ebook', component: _ebook_component__WEBPACK_IMPORTED_MODULE_2__["EbookComponent"] },
    { path: 'get-an-ebook/:link', component: _ebook_post_ebook_post_component__WEBPACK_IMPORTED_MODULE_0__["EbookPostComponent"], canActivate: [_ebook_post_ebook_route_activator_service__WEBPACK_IMPORTED_MODULE_1__["EbookRouteActivator"]] },
];


/***/ })

}]);
//# sourceMappingURL=src-app-ebook-ebook-module.js.map