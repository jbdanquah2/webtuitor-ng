(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/zone.js/dist/zone.js":
/*!*******************************************!*\
  !*** ./node_modules/zone.js/dist/zone.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
* @license
* Copyright Google Inc. All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
(function (global, factory) {
	 true ? factory() :
	undefined;
}(this, (function () { 'use strict';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var Zone$1 = (function (global) {
    var performance = global['performance'];
    function mark(name) {
        performance && performance['mark'] && performance['mark'](name);
    }
    function performanceMeasure(name, label) {
        performance && performance['measure'] && performance['measure'](name, label);
    }
    mark('Zone');
    var checkDuplicate = global[('__zone_symbol__forceDuplicateZoneCheck')] === true;
    if (global['Zone']) {
        // if global['Zone'] already exists (maybe zone.js was already loaded or
        // some other lib also registered a global object named Zone), we may need
        // to throw an error, but sometimes user may not want this error.
        // For example,
        // we have two web pages, page1 includes zone.js, page2 doesn't.
        // and the 1st time user load page1 and page2, everything work fine,
        // but when user load page2 again, error occurs because global['Zone'] already exists.
        // so we add a flag to let user choose whether to throw this error or not.
        // By default, if existing Zone is from zone.js, we will not throw the error.
        if (checkDuplicate || typeof global['Zone'].__symbol__ !== 'function') {
            throw new Error('Zone already loaded.');
        }
        else {
            return global['Zone'];
        }
    }
    var Zone = /** @class */ (function () {
        function Zone(parent, zoneSpec) {
            this._parent = parent;
            this._name = zoneSpec ? zoneSpec.name || 'unnamed' : '<root>';
            this._properties = zoneSpec && zoneSpec.properties || {};
            this._zoneDelegate =
                new ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
        }
        Zone.assertZonePatched = function () {
            if (global['Promise'] !== patches['ZoneAwarePromise']) {
                throw new Error('Zone.js has detected that ZoneAwarePromise `(window|global).Promise` ' +
                    'has been overwritten.\n' +
                    'Most likely cause is that a Promise polyfill has been loaded ' +
                    'after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. ' +
                    'If you must load one, do so before loading zone.js.)');
            }
        };
        Object.defineProperty(Zone, "root", {
            get: function () {
                var zone = Zone.current;
                while (zone.parent) {
                    zone = zone.parent;
                }
                return zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Zone, "current", {
            get: function () {
                return _currentZoneFrame.zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Zone, "currentTask", {
            get: function () {
                return _currentTask;
            },
            enumerable: true,
            configurable: true
        });
        Zone.__load_patch = function (name, fn) {
            if (patches.hasOwnProperty(name)) {
                if (checkDuplicate) {
                    throw Error('Already loaded patch: ' + name);
                }
            }
            else if (!global['__Zone_disable_' + name]) {
                var perfName = 'Zone:' + name;
                mark(perfName);
                patches[name] = fn(global, Zone, _api);
                performanceMeasure(perfName, perfName);
            }
        };
        Object.defineProperty(Zone.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Zone.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Zone.prototype.get = function (key) {
            var zone = this.getZoneWith(key);
            if (zone)
                return zone._properties[key];
        };
        Zone.prototype.getZoneWith = function (key) {
            var current = this;
            while (current) {
                if (current._properties.hasOwnProperty(key)) {
                    return current;
                }
                current = current._parent;
            }
            return null;
        };
        Zone.prototype.fork = function (zoneSpec) {
            if (!zoneSpec)
                throw new Error('ZoneSpec required!');
            return this._zoneDelegate.fork(this, zoneSpec);
        };
        Zone.prototype.wrap = function (callback, source) {
            if (typeof callback !== 'function') {
                throw new Error('Expecting function got: ' + callback);
            }
            var _callback = this._zoneDelegate.intercept(this, callback, source);
            var zone = this;
            return function () {
                return zone.runGuarded(_callback, this, arguments, source);
            };
        };
        Zone.prototype.run = function (callback, applyThis, applyArgs, source) {
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
            }
            finally {
                _currentZoneFrame = _currentZoneFrame.parent;
            }
        };
        Zone.prototype.runGuarded = function (callback, applyThis, applyArgs, source) {
            if (applyThis === void 0) { applyThis = null; }
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                try {
                    return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                _currentZoneFrame = _currentZoneFrame.parent;
            }
        };
        Zone.prototype.runTask = function (task, applyThis, applyArgs) {
            if (task.zone != this) {
                throw new Error('A task can only be run in the zone of creation! (Creation: ' +
                    (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
            }
            // https://github.com/angular/zone.js/issues/778, sometimes eventTask
            // will run in notScheduled(canceled) state, we should not try to
            // run such kind of task but just return
            if (task.state === notScheduled && (task.type === eventTask || task.type === macroTask)) {
                return;
            }
            var reEntryGuard = task.state != running;
            reEntryGuard && task._transitionTo(running, scheduled);
            task.runCount++;
            var previousTask = _currentTask;
            _currentTask = task;
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                if (task.type == macroTask && task.data && !task.data.isPeriodic) {
                    task.cancelFn = undefined;
                }
                try {
                    return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                // if the task's state is notScheduled or unknown, then it has already been cancelled
                // we should not reset the state to scheduled
                if (task.state !== notScheduled && task.state !== unknown) {
                    if (task.type == eventTask || (task.data && task.data.isPeriodic)) {
                        reEntryGuard && task._transitionTo(scheduled, running);
                    }
                    else {
                        task.runCount = 0;
                        this._updateTaskCount(task, -1);
                        reEntryGuard &&
                            task._transitionTo(notScheduled, running, notScheduled);
                    }
                }
                _currentZoneFrame = _currentZoneFrame.parent;
                _currentTask = previousTask;
            }
        };
        Zone.prototype.scheduleTask = function (task) {
            if (task.zone && task.zone !== this) {
                // check if the task was rescheduled, the newZone
                // should not be the children of the original zone
                var newZone = this;
                while (newZone) {
                    if (newZone === task.zone) {
                        throw Error("can not reschedule task to " + this.name + " which is descendants of the original zone " + task.zone.name);
                    }
                    newZone = newZone.parent;
                }
            }
            task._transitionTo(scheduling, notScheduled);
            var zoneDelegates = [];
            task._zoneDelegates = zoneDelegates;
            task._zone = this;
            try {
                task = this._zoneDelegate.scheduleTask(this, task);
            }
            catch (err) {
                // should set task's state to unknown when scheduleTask throw error
                // because the err may from reschedule, so the fromState maybe notScheduled
                task._transitionTo(unknown, scheduling, notScheduled);
                // TODO: @JiaLiPassion, should we check the result from handleError?
                this._zoneDelegate.handleError(this, err);
                throw err;
            }
            if (task._zoneDelegates === zoneDelegates) {
                // we have to check because internally the delegate can reschedule the task.
                this._updateTaskCount(task, 1);
            }
            if (task.state == scheduling) {
                task._transitionTo(scheduled, scheduling);
            }
            return task;
        };
        Zone.prototype.scheduleMicroTask = function (source, callback, data, customSchedule) {
            return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, undefined));
        };
        Zone.prototype.scheduleMacroTask = function (source, callback, data, customSchedule, customCancel) {
            return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.scheduleEventTask = function (source, callback, data, customSchedule, customCancel) {
            return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.cancelTask = function (task) {
            if (task.zone != this)
                throw new Error('A task can only be cancelled in the zone of creation! (Creation: ' +
                    (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
            task._transitionTo(canceling, scheduled, running);
            try {
                this._zoneDelegate.cancelTask(this, task);
            }
            catch (err) {
                // if error occurs when cancelTask, transit the state to unknown
                task._transitionTo(unknown, canceling);
                this._zoneDelegate.handleError(this, err);
                throw err;
            }
            this._updateTaskCount(task, -1);
            task._transitionTo(notScheduled, canceling);
            task.runCount = 0;
            return task;
        };
        Zone.prototype._updateTaskCount = function (task, count) {
            var zoneDelegates = task._zoneDelegates;
            if (count == -1) {
                task._zoneDelegates = null;
            }
            for (var i = 0; i < zoneDelegates.length; i++) {
                zoneDelegates[i]._updateTaskCount(task.type, count);
            }
        };
        Zone.__symbol__ = __symbol__;
        return Zone;
    }());
    var DELEGATE_ZS = {
        name: '',
        onHasTask: function (delegate, _, target, hasTaskState) { return delegate.hasTask(target, hasTaskState); },
        onScheduleTask: function (delegate, _, target, task) {
            return delegate.scheduleTask(target, task);
        },
        onInvokeTask: function (delegate, _, target, task, applyThis, applyArgs) {
            return delegate.invokeTask(target, task, applyThis, applyArgs);
        },
        onCancelTask: function (delegate, _, target, task) { return delegate.cancelTask(target, task); }
    };
    var ZoneDelegate = /** @class */ (function () {
        function ZoneDelegate(zone, parentDelegate, zoneSpec) {
            this._taskCounts = { 'microTask': 0, 'macroTask': 0, 'eventTask': 0 };
            this.zone = zone;
            this._parentDelegate = parentDelegate;
            this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
            this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
            this._forkCurrZone = zoneSpec && (zoneSpec.onFork ? this.zone : parentDelegate.zone);
            this._interceptZS =
                zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
            this._interceptDlgt =
                zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
            this._interceptCurrZone =
                zoneSpec && (zoneSpec.onIntercept ? this.zone : parentDelegate.zone);
            this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
            this._invokeDlgt =
                zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
            this._invokeCurrZone = zoneSpec && (zoneSpec.onInvoke ? this.zone : parentDelegate.zone);
            this._handleErrorZS =
                zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
            this._handleErrorDlgt =
                zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
            this._handleErrorCurrZone =
                zoneSpec && (zoneSpec.onHandleError ? this.zone : parentDelegate.zone);
            this._scheduleTaskZS =
                zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
            this._scheduleTaskDlgt = zoneSpec &&
                (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
            this._scheduleTaskCurrZone =
                zoneSpec && (zoneSpec.onScheduleTask ? this.zone : parentDelegate.zone);
            this._invokeTaskZS =
                zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
            this._invokeTaskDlgt =
                zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
            this._invokeTaskCurrZone =
                zoneSpec && (zoneSpec.onInvokeTask ? this.zone : parentDelegate.zone);
            this._cancelTaskZS =
                zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
            this._cancelTaskDlgt =
                zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
            this._cancelTaskCurrZone =
                zoneSpec && (zoneSpec.onCancelTask ? this.zone : parentDelegate.zone);
            this._hasTaskZS = null;
            this._hasTaskDlgt = null;
            this._hasTaskDlgtOwner = null;
            this._hasTaskCurrZone = null;
            var zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask;
            var parentHasTask = parentDelegate && parentDelegate._hasTaskZS;
            if (zoneSpecHasTask || parentHasTask) {
                // If we need to report hasTask, than this ZS needs to do ref counting on tasks. In such
                // a case all task related interceptors must go through this ZD. We can't short circuit it.
                this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS;
                this._hasTaskDlgt = parentDelegate;
                this._hasTaskDlgtOwner = this;
                this._hasTaskCurrZone = zone;
                if (!zoneSpec.onScheduleTask) {
                    this._scheduleTaskZS = DELEGATE_ZS;
                    this._scheduleTaskDlgt = parentDelegate;
                    this._scheduleTaskCurrZone = this.zone;
                }
                if (!zoneSpec.onInvokeTask) {
                    this._invokeTaskZS = DELEGATE_ZS;
                    this._invokeTaskDlgt = parentDelegate;
                    this._invokeTaskCurrZone = this.zone;
                }
                if (!zoneSpec.onCancelTask) {
                    this._cancelTaskZS = DELEGATE_ZS;
                    this._cancelTaskDlgt = parentDelegate;
                    this._cancelTaskCurrZone = this.zone;
                }
            }
        }
        ZoneDelegate.prototype.fork = function (targetZone, zoneSpec) {
            return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) :
                new Zone(targetZone, zoneSpec);
        };
        ZoneDelegate.prototype.intercept = function (targetZone, callback, source) {
            return this._interceptZS ?
                this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) :
                callback;
        };
        ZoneDelegate.prototype.invoke = function (targetZone, callback, applyThis, applyArgs, source) {
            return this._invokeZS ? this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) :
                callback.apply(applyThis, applyArgs);
        };
        ZoneDelegate.prototype.handleError = function (targetZone, error) {
            return this._handleErrorZS ?
                this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) :
                true;
        };
        ZoneDelegate.prototype.scheduleTask = function (targetZone, task) {
            var returnTask = task;
            if (this._scheduleTaskZS) {
                if (this._hasTaskZS) {
                    returnTask._zoneDelegates.push(this._hasTaskDlgtOwner);
                }
                returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task);
                if (!returnTask)
                    returnTask = task;
            }
            else {
                if (task.scheduleFn) {
                    task.scheduleFn(task);
                }
                else if (task.type == microTask) {
                    scheduleMicroTask(task);
                }
                else {
                    throw new Error('Task is missing scheduleFn.');
                }
            }
            return returnTask;
        };
        ZoneDelegate.prototype.invokeTask = function (targetZone, task, applyThis, applyArgs) {
            return this._invokeTaskZS ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) :
                task.callback.apply(applyThis, applyArgs);
        };
        ZoneDelegate.prototype.cancelTask = function (targetZone, task) {
            var value;
            if (this._cancelTaskZS) {
                value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
            }
            else {
                if (!task.cancelFn) {
                    throw Error('Task is not cancelable');
                }
                value = task.cancelFn(task);
            }
            return value;
        };
        ZoneDelegate.prototype.hasTask = function (targetZone, isEmpty) {
            // hasTask should not throw error so other ZoneDelegate
            // can still trigger hasTask callback
            try {
                this._hasTaskZS &&
                    this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
            }
            catch (err) {
                this.handleError(targetZone, err);
            }
        };
        ZoneDelegate.prototype._updateTaskCount = function (type, count) {
            var counts = this._taskCounts;
            var prev = counts[type];
            var next = counts[type] = prev + count;
            if (next < 0) {
                throw new Error('More tasks executed then were scheduled.');
            }
            if (prev == 0 || next == 0) {
                var isEmpty = {
                    microTask: counts['microTask'] > 0,
                    macroTask: counts['macroTask'] > 0,
                    eventTask: counts['eventTask'] > 0,
                    change: type
                };
                this.hasTask(this.zone, isEmpty);
            }
        };
        return ZoneDelegate;
    }());
    var ZoneTask = /** @class */ (function () {
        function ZoneTask(type, source, callback, options, scheduleFn, cancelFn) {
            this._zone = null;
            this.runCount = 0;
            this._zoneDelegates = null;
            this._state = 'notScheduled';
            this.type = type;
            this.source = source;
            this.data = options;
            this.scheduleFn = scheduleFn;
            this.cancelFn = cancelFn;
            this.callback = callback;
            var self = this;
            // TODO: @JiaLiPassion options should have interface
            if (type === eventTask && options && options.useG) {
                this.invoke = ZoneTask.invokeTask;
            }
            else {
                this.invoke = function () {
                    return ZoneTask.invokeTask.call(global, self, this, arguments);
                };
            }
        }
        ZoneTask.invokeTask = function (task, target, args) {
            if (!task) {
                task = this;
            }
            _numberOfNestedTaskFrames++;
            try {
                task.runCount++;
                return task.zone.runTask(task, target, args);
            }
            finally {
                if (_numberOfNestedTaskFrames == 1) {
                    drainMicroTaskQueue();
                }
                _numberOfNestedTaskFrames--;
            }
        };
        Object.defineProperty(ZoneTask.prototype, "zone", {
            get: function () {
                return this._zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ZoneTask.prototype, "state", {
            get: function () {
                return this._state;
            },
            enumerable: true,
            configurable: true
        });
        ZoneTask.prototype.cancelScheduleRequest = function () {
            this._transitionTo(notScheduled, scheduling);
        };
        ZoneTask.prototype._transitionTo = function (toState, fromState1, fromState2) {
            if (this._state === fromState1 || this._state === fromState2) {
                this._state = toState;
                if (toState == notScheduled) {
                    this._zoneDelegates = null;
                }
            }
            else {
                throw new Error(this.type + " '" + this.source + "': can not transition to '" + toState + "', expecting state '" + fromState1 + "'" + (fromState2 ? ' or \'' + fromState2 + '\'' : '') + ", was '" + this._state + "'.");
            }
        };
        ZoneTask.prototype.toString = function () {
            if (this.data && typeof this.data.handleId !== 'undefined') {
                return this.data.handleId.toString();
            }
            else {
                return Object.prototype.toString.call(this);
            }
        };
        // add toJSON method to prevent cyclic error when
        // call JSON.stringify(zoneTask)
        ZoneTask.prototype.toJSON = function () {
            return {
                type: this.type,
                state: this.state,
                source: this.source,
                zone: this.zone.name,
                runCount: this.runCount
            };
        };
        return ZoneTask;
    }());
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    ///  MICROTASK QUEUE
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    var symbolSetTimeout = __symbol__('setTimeout');
    var symbolPromise = __symbol__('Promise');
    var symbolThen = __symbol__('then');
    var _microTaskQueue = [];
    var _isDrainingMicrotaskQueue = false;
    var nativeMicroTaskQueuePromise;
    function scheduleMicroTask(task) {
        // if we are not running in any task, and there has not been anything scheduled
        // we must bootstrap the initial task creation by manually scheduling the drain
        if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
            // We are not running in Task, so we need to kickstart the microtask queue.
            if (!nativeMicroTaskQueuePromise) {
                if (global[symbolPromise]) {
                    nativeMicroTaskQueuePromise = global[symbolPromise].resolve(0);
                }
            }
            if (nativeMicroTaskQueuePromise) {
                var nativeThen = nativeMicroTaskQueuePromise[symbolThen];
                if (!nativeThen) {
                    // native Promise is not patchable, we need to use `then` directly
                    // issue 1078
                    nativeThen = nativeMicroTaskQueuePromise['then'];
                }
                nativeThen.call(nativeMicroTaskQueuePromise, drainMicroTaskQueue);
            }
            else {
                global[symbolSetTimeout](drainMicroTaskQueue, 0);
            }
        }
        task && _microTaskQueue.push(task);
    }
    function drainMicroTaskQueue() {
        if (!_isDrainingMicrotaskQueue) {
            _isDrainingMicrotaskQueue = true;
            while (_microTaskQueue.length) {
                var queue = _microTaskQueue;
                _microTaskQueue = [];
                for (var i = 0; i < queue.length; i++) {
                    var task = queue[i];
                    try {
                        task.zone.runTask(task, null, null);
                    }
                    catch (error) {
                        _api.onUnhandledError(error);
                    }
                }
            }
            _api.microtaskDrainDone();
            _isDrainingMicrotaskQueue = false;
        }
    }
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    ///  BOOTSTRAP
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    var NO_ZONE = { name: 'NO ZONE' };
    var notScheduled = 'notScheduled', scheduling = 'scheduling', scheduled = 'scheduled', running = 'running', canceling = 'canceling', unknown = 'unknown';
    var microTask = 'microTask', macroTask = 'macroTask', eventTask = 'eventTask';
    var patches = {};
    var _api = {
        symbol: __symbol__,
        currentZoneFrame: function () { return _currentZoneFrame; },
        onUnhandledError: noop,
        microtaskDrainDone: noop,
        scheduleMicroTask: scheduleMicroTask,
        showUncaughtError: function () { return !Zone[__symbol__('ignoreConsoleErrorUncaughtError')]; },
        patchEventTarget: function () { return []; },
        patchOnProperties: noop,
        patchMethod: function () { return noop; },
        bindArguments: function () { return []; },
        patchThen: function () { return noop; },
        setNativePromise: function (NativePromise) {
            // sometimes NativePromise.resolve static function
            // is not ready yet, (such as core-js/es6.promise)
            // so we need to check here.
            if (NativePromise && typeof NativePromise.resolve === 'function') {
                nativeMicroTaskQueuePromise = NativePromise.resolve(0);
            }
        },
    };
    var _currentZoneFrame = { parent: null, zone: new Zone(null, null) };
    var _currentTask = null;
    var _numberOfNestedTaskFrames = 0;
    function noop() { }
    function __symbol__(name) {
        return '__zone_symbol__' + name;
    }
    performanceMeasure('Zone', 'Zone');
    return global['Zone'] = Zone;
})(typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || global);

var __values = (undefined && undefined.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Zone.__load_patch('ZoneAwarePromise', function (global, Zone, api) {
    var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var ObjectDefineProperty = Object.defineProperty;
    function readableObjectToString(obj) {
        if (obj && obj.toString === Object.prototype.toString) {
            var className = obj.constructor && obj.constructor.name;
            return (className ? className : '') + ': ' + JSON.stringify(obj);
        }
        return obj ? obj.toString() : Object.prototype.toString.call(obj);
    }
    var __symbol__ = api.symbol;
    var _uncaughtPromiseErrors = [];
    var symbolPromise = __symbol__('Promise');
    var symbolThen = __symbol__('then');
    var creationTrace = '__creationTrace__';
    api.onUnhandledError = function (e) {
        if (api.showUncaughtError()) {
            var rejection = e && e.rejection;
            if (rejection) {
                console.error('Unhandled Promise rejection:', rejection instanceof Error ? rejection.message : rejection, '; Zone:', e.zone.name, '; Task:', e.task && e.task.source, '; Value:', rejection, rejection instanceof Error ? rejection.stack : undefined);
            }
            else {
                console.error(e);
            }
        }
    };
    api.microtaskDrainDone = function () {
        while (_uncaughtPromiseErrors.length) {
            var _loop_1 = function () {
                var uncaughtPromiseError = _uncaughtPromiseErrors.shift();
                try {
                    uncaughtPromiseError.zone.runGuarded(function () {
                        throw uncaughtPromiseError;
                    });
                }
                catch (error) {
                    handleUnhandledRejection(error);
                }
            };
            while (_uncaughtPromiseErrors.length) {
                _loop_1();
            }
        }
    };
    var UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL = __symbol__('unhandledPromiseRejectionHandler');
    function handleUnhandledRejection(e) {
        api.onUnhandledError(e);
        try {
            var handler = Zone[UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL];
            if (handler && typeof handler === 'function') {
                handler.call(this, e);
            }
        }
        catch (err) {
        }
    }
    function isThenable(value) {
        return value && value.then;
    }
    function forwardResolution(value) {
        return value;
    }
    function forwardRejection(rejection) {
        return ZoneAwarePromise.reject(rejection);
    }
    var symbolState = __symbol__('state');
    var symbolValue = __symbol__('value');
    var symbolFinally = __symbol__('finally');
    var symbolParentPromiseValue = __symbol__('parentPromiseValue');
    var symbolParentPromiseState = __symbol__('parentPromiseState');
    var source = 'Promise.then';
    var UNRESOLVED = null;
    var RESOLVED = true;
    var REJECTED = false;
    var REJECTED_NO_CATCH = 0;
    function makeResolver(promise, state) {
        return function (v) {
            try {
                resolvePromise(promise, state, v);
            }
            catch (err) {
                resolvePromise(promise, false, err);
            }
            // Do not return value or you will break the Promise spec.
        };
    }
    var once = function () {
        var wasCalled = false;
        return function wrapper(wrappedFunction) {
            return function () {
                if (wasCalled) {
                    return;
                }
                wasCalled = true;
                wrappedFunction.apply(null, arguments);
            };
        };
    };
    var TYPE_ERROR = 'Promise resolved with itself';
    var CURRENT_TASK_TRACE_SYMBOL = __symbol__('currentTaskTrace');
    // Promise Resolution
    function resolvePromise(promise, state, value) {
        var onceWrapper = once();
        if (promise === value) {
            throw new TypeError(TYPE_ERROR);
        }
        if (promise[symbolState] === UNRESOLVED) {
            // should only get value.then once based on promise spec.
            var then = null;
            try {
                if (typeof value === 'object' || typeof value === 'function') {
                    then = value && value.then;
                }
            }
            catch (err) {
                onceWrapper(function () {
                    resolvePromise(promise, false, err);
                })();
                return promise;
            }
            // if (value instanceof ZoneAwarePromise) {
            if (state !== REJECTED && value instanceof ZoneAwarePromise &&
                value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) &&
                value[symbolState] !== UNRESOLVED) {
                clearRejectedNoCatch(value);
                resolvePromise(promise, value[symbolState], value[symbolValue]);
            }
            else if (state !== REJECTED && typeof then === 'function') {
                try {
                    then.call(value, onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, false)));
                }
                catch (err) {
                    onceWrapper(function () {
                        resolvePromise(promise, false, err);
                    })();
                }
            }
            else {
                promise[symbolState] = state;
                var queue = promise[symbolValue];
                promise[symbolValue] = value;
                if (promise[symbolFinally] === symbolFinally) {
                    // the promise is generated by Promise.prototype.finally
                    if (state === RESOLVED) {
                        // the state is resolved, should ignore the value
                        // and use parent promise value
                        promise[symbolState] = promise[symbolParentPromiseState];
                        promise[symbolValue] = promise[symbolParentPromiseValue];
                    }
                }
                // record task information in value when error occurs, so we can
                // do some additional work such as render longStackTrace
                if (state === REJECTED && value instanceof Error) {
                    // check if longStackTraceZone is here
                    var trace = Zone.currentTask && Zone.currentTask.data &&
                        Zone.currentTask.data[creationTrace];
                    if (trace) {
                        // only keep the long stack trace into error when in longStackTraceZone
                        ObjectDefineProperty(value, CURRENT_TASK_TRACE_SYMBOL, { configurable: true, enumerable: false, writable: true, value: trace });
                    }
                }
                for (var i = 0; i < queue.length;) {
                    scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
                }
                if (queue.length == 0 && state == REJECTED) {
                    promise[symbolState] = REJECTED_NO_CATCH;
                    try {
                        // try to print more readable error log
                        throw new Error('Uncaught (in promise): ' + readableObjectToString(value) +
                            (value && value.stack ? '\n' + value.stack : ''));
                    }
                    catch (err) {
                        var error_1 = err;
                        error_1.rejection = value;
                        error_1.promise = promise;
                        error_1.zone = Zone.current;
                        error_1.task = Zone.currentTask;
                        _uncaughtPromiseErrors.push(error_1);
                        api.scheduleMicroTask(); // to make sure that it is running
                    }
                }
            }
        }
        // Resolving an already resolved promise is a noop.
        return promise;
    }
    var REJECTION_HANDLED_HANDLER = __symbol__('rejectionHandledHandler');
    function clearRejectedNoCatch(promise) {
        if (promise[symbolState] === REJECTED_NO_CATCH) {
            // if the promise is rejected no catch status
            // and queue.length > 0, means there is a error handler
            // here to handle the rejected promise, we should trigger
            // windows.rejectionhandled eventHandler or nodejs rejectionHandled
            // eventHandler
            try {
                var handler = Zone[REJECTION_HANDLED_HANDLER];
                if (handler && typeof handler === 'function') {
                    handler.call(this, { rejection: promise[symbolValue], promise: promise });
                }
            }
            catch (err) {
            }
            promise[symbolState] = REJECTED;
            for (var i = 0; i < _uncaughtPromiseErrors.length; i++) {
                if (promise === _uncaughtPromiseErrors[i].promise) {
                    _uncaughtPromiseErrors.splice(i, 1);
                }
            }
        }
    }
    function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
        clearRejectedNoCatch(promise);
        var promiseState = promise[symbolState];
        var delegate = promiseState ?
            (typeof onFulfilled === 'function') ? onFulfilled : forwardResolution :
            (typeof onRejected === 'function') ? onRejected : forwardRejection;
        zone.scheduleMicroTask(source, function () {
            try {
                var parentPromiseValue = promise[symbolValue];
                var isFinallyPromise = chainPromise && symbolFinally === chainPromise[symbolFinally];
                if (isFinallyPromise) {
                    // if the promise is generated from finally call, keep parent promise's state and value
                    chainPromise[symbolParentPromiseValue] = parentPromiseValue;
                    chainPromise[symbolParentPromiseState] = promiseState;
                }
                // should not pass value to finally callback
                var value = zone.run(delegate, undefined, isFinallyPromise && delegate !== forwardRejection && delegate !== forwardResolution ?
                    [] :
                    [parentPromiseValue]);
                resolvePromise(chainPromise, true, value);
            }
            catch (error) {
                // if error occurs, should always return this error
                resolvePromise(chainPromise, false, error);
            }
        }, chainPromise);
    }
    var ZONE_AWARE_PROMISE_TO_STRING = 'function ZoneAwarePromise() { [native code] }';
    var ZoneAwarePromise = /** @class */ (function () {
        function ZoneAwarePromise(executor) {
            var promise = this;
            if (!(promise instanceof ZoneAwarePromise)) {
                throw new Error('Must be an instanceof Promise.');
            }
            promise[symbolState] = UNRESOLVED;
            promise[symbolValue] = []; // queue;
            try {
                executor && executor(makeResolver(promise, RESOLVED), makeResolver(promise, REJECTED));
            }
            catch (error) {
                resolvePromise(promise, false, error);
            }
        }
        ZoneAwarePromise.toString = function () {
            return ZONE_AWARE_PROMISE_TO_STRING;
        };
        ZoneAwarePromise.resolve = function (value) {
            return resolvePromise(new this(null), RESOLVED, value);
        };
        ZoneAwarePromise.reject = function (error) {
            return resolvePromise(new this(null), REJECTED, error);
        };
        ZoneAwarePromise.race = function (values) {
            var e_1, _a;
            var resolve;
            var reject;
            var promise = new this(function (res, rej) {
                resolve = res;
                reject = rej;
            });
            function onResolve(value) {
                promise && (promise =  false || resolve(value));
            }
            function onReject(error) {
                promise && (promise =  false || reject(error));
            }
            try {
                for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                    var value = values_1_1.value;
                    if (!isThenable(value)) {
                        value = this.resolve(value);
                    }
                    value.then(onResolve, onReject);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return promise;
        };
        ZoneAwarePromise.all = function (values) {
            var e_2, _a;
            var resolve;
            var reject;
            var promise = new this(function (res, rej) {
                resolve = res;
                reject = rej;
            });
            // Start at 2 to prevent prematurely resolving if .then is called immediately.
            var unresolvedCount = 2;
            var valueIndex = 0;
            var resolvedValues = [];
            var _loop_2 = function (value) {
                if (!isThenable(value)) {
                    value = this_1.resolve(value);
                }
                var curValueIndex = valueIndex;
                value.then(function (value) {
                    resolvedValues[curValueIndex] = value;
                    unresolvedCount--;
                    if (unresolvedCount === 0) {
                        resolve(resolvedValues);
                    }
                }, reject);
                unresolvedCount++;
                valueIndex++;
            };
            var this_1 = this;
            try {
                for (var values_2 = __values(values), values_2_1 = values_2.next(); !values_2_1.done; values_2_1 = values_2.next()) {
                    var value = values_2_1.value;
                    _loop_2(value);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (values_2_1 && !values_2_1.done && (_a = values_2.return)) _a.call(values_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            // Make the unresolvedCount zero-based again.
            unresolvedCount -= 2;
            if (unresolvedCount === 0) {
                resolve(resolvedValues);
            }
            return promise;
        };
        ZoneAwarePromise.prototype.then = function (onFulfilled, onRejected) {
            var chainPromise = new this.constructor(null);
            var zone = Zone.current;
            if (this[symbolState] == UNRESOLVED) {
                this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
            }
            else {
                scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
            }
            return chainPromise;
        };
        ZoneAwarePromise.prototype.catch = function (onRejected) {
            return this.then(null, onRejected);
        };
        ZoneAwarePromise.prototype.finally = function (onFinally) {
            var chainPromise = new this.constructor(null);
            chainPromise[symbolFinally] = symbolFinally;
            var zone = Zone.current;
            if (this[symbolState] == UNRESOLVED) {
                this[symbolValue].push(zone, chainPromise, onFinally, onFinally);
            }
            else {
                scheduleResolveOrReject(this, zone, chainPromise, onFinally, onFinally);
            }
            return chainPromise;
        };
        return ZoneAwarePromise;
    }());
    // Protect against aggressive optimizers dropping seemingly unused properties.
    // E.g. Closure Compiler in advanced mode.
    ZoneAwarePromise['resolve'] = ZoneAwarePromise.resolve;
    ZoneAwarePromise['reject'] = ZoneAwarePromise.reject;
    ZoneAwarePromise['race'] = ZoneAwarePromise.race;
    ZoneAwarePromise['all'] = ZoneAwarePromise.all;
    var NativePromise = global[symbolPromise] = global['Promise'];
    var ZONE_AWARE_PROMISE = Zone.__symbol__('ZoneAwarePromise');
    var desc = ObjectGetOwnPropertyDescriptor(global, 'Promise');
    if (!desc || desc.configurable) {
        desc && delete desc.writable;
        desc && delete desc.value;
        if (!desc) {
            desc = { configurable: true, enumerable: true };
        }
        desc.get = function () {
            // if we already set ZoneAwarePromise, use patched one
            // otherwise return native one.
            return global[ZONE_AWARE_PROMISE] ? global[ZONE_AWARE_PROMISE] : global[symbolPromise];
        };
        desc.set = function (NewNativePromise) {
            if (NewNativePromise === ZoneAwarePromise) {
                // if the NewNativePromise is ZoneAwarePromise
                // save to global
                global[ZONE_AWARE_PROMISE] = NewNativePromise;
            }
            else {
                // if the NewNativePromise is not ZoneAwarePromise
                // for example: after load zone.js, some library just
                // set es6-promise to global, if we set it to global
                // directly, assertZonePatched will fail and angular
                // will not loaded, so we just set the NewNativePromise
                // to global[symbolPromise], so the result is just like
                // we load ES6 Promise before zone.js
                global[symbolPromise] = NewNativePromise;
                if (!NewNativePromise.prototype[symbolThen]) {
                    patchThen(NewNativePromise);
                }
                api.setNativePromise(NewNativePromise);
            }
        };
        ObjectDefineProperty(global, 'Promise', desc);
    }
    global['Promise'] = ZoneAwarePromise;
    var symbolThenPatched = __symbol__('thenPatched');
    function patchThen(Ctor) {
        var proto = Ctor.prototype;
        var prop = ObjectGetOwnPropertyDescriptor(proto, 'then');
        if (prop && (prop.writable === false || !prop.configurable)) {
            // check Ctor.prototype.then propertyDescriptor is writable or not
            // in meteor env, writable is false, we should ignore such case
            return;
        }
        var originalThen = proto.then;
        // Keep a reference to the original method.
        proto[symbolThen] = originalThen;
        Ctor.prototype.then = function (onResolve, onReject) {
            var _this = this;
            var wrapped = new ZoneAwarePromise(function (resolve, reject) {
                originalThen.call(_this, resolve, reject);
            });
            return wrapped.then(onResolve, onReject);
        };
        Ctor[symbolThenPatched] = true;
    }
    api.patchThen = patchThen;
    if (NativePromise) {
        patchThen(NativePromise);
    }
    // This is not part of public API, but it is useful for tests, so we expose it.
    Promise[Zone.__symbol__('uncaughtPromiseErrors')] = _uncaughtPromiseErrors;
    return ZoneAwarePromise;
});

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Zone.__load_patch('fetch', function (global, Zone, api) {
    var fetch = global['fetch'];
    var ZoneAwarePromise = global.Promise;
    var symbolThenPatched = api.symbol('thenPatched');
    var fetchTaskScheduling = api.symbol('fetchTaskScheduling');
    var fetchTaskAborting = api.symbol('fetchTaskAborting');
    if (typeof fetch !== 'function') {
        return;
    }
    var OriginalAbortController = global['AbortController'];
    var supportAbort = typeof OriginalAbortController === 'function';
    var abortNative = null;
    if (supportAbort) {
        global['AbortController'] = function () {
            var abortController = new OriginalAbortController();
            var signal = abortController.signal;
            signal.abortController = abortController;
            return abortController;
        };
        abortNative = api.patchMethod(OriginalAbortController.prototype, 'abort', function (delegate) { return function (self, args) {
            if (self.task) {
                return self.task.zone.cancelTask(self.task);
            }
            return delegate.apply(self, args);
        }; });
    }
    var placeholder = function () { };
    global['fetch'] = function () {
        var _this = this;
        var args = Array.prototype.slice.call(arguments);
        var options = args.length > 1 ? args[1] : null;
        var signal = options && options.signal;
        return new Promise(function (res, rej) {
            var task = Zone.current.scheduleMacroTask('fetch', placeholder, args, function () {
                var fetchPromise;
                var zone = Zone.current;
                try {
                    zone[fetchTaskScheduling] = true;
                    fetchPromise = fetch.apply(_this, args);
                }
                catch (error) {
                    rej(error);
                    return;
                }
                finally {
                    zone[fetchTaskScheduling] = false;
                }
                if (!(fetchPromise instanceof ZoneAwarePromise)) {
                    var ctor = fetchPromise.constructor;
                    if (!ctor[symbolThenPatched]) {
                        api.patchThen(ctor);
                    }
                }
                fetchPromise.then(function (resource) {
                    if (task.state !== 'notScheduled') {
                        task.invoke();
                    }
                    res(resource);
                }, function (error) {
                    if (task.state !== 'notScheduled') {
                        task.invoke();
                    }
                    rej(error);
                });
            }, function () {
                if (!supportAbort) {
                    rej('No AbortController supported, can not cancel fetch');
                    return;
                }
                if (signal && signal.abortController && !signal.aborted &&
                    typeof signal.abortController.abort === 'function' && abortNative) {
                    try {
                        Zone.current[fetchTaskAborting] = true;
                        abortNative.call(signal.abortController);
                    }
                    finally {
                        Zone.current[fetchTaskAborting] = false;
                    }
                }
                else {
                    rej('cancel fetch need a AbortController.signal');
                }
            });
            if (signal && signal.abortController) {
                signal.abortController.task = task;
            }
        });
    };
});

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Suppress closure compiler errors about unknown 'Zone' variable
 * @fileoverview
 * @suppress {undefinedVars,globalThis,missingRequire}
 */
// issue #989, to reduce bundle size, use short name
/** Object.getOwnPropertyDescriptor */
var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
/** Object.defineProperty */
var ObjectDefineProperty = Object.defineProperty;
/** Object.getPrototypeOf */
var ObjectGetPrototypeOf = Object.getPrototypeOf;
/** Object.create */
var ObjectCreate = Object.create;
/** Array.prototype.slice */
var ArraySlice = Array.prototype.slice;
/** addEventListener string const */
var ADD_EVENT_LISTENER_STR = 'addEventListener';
/** removeEventListener string const */
var REMOVE_EVENT_LISTENER_STR = 'removeEventListener';
/** zoneSymbol addEventListener */
var ZONE_SYMBOL_ADD_EVENT_LISTENER = Zone.__symbol__(ADD_EVENT_LISTENER_STR);
/** zoneSymbol removeEventListener */
var ZONE_SYMBOL_REMOVE_EVENT_LISTENER = Zone.__symbol__(REMOVE_EVENT_LISTENER_STR);
/** true string const */
var TRUE_STR = 'true';
/** false string const */
var FALSE_STR = 'false';
/** __zone_symbol__ string const */
var ZONE_SYMBOL_PREFIX = '__zone_symbol__';
function wrapWithCurrentZone(callback, source) {
    return Zone.current.wrap(callback, source);
}
function scheduleMacroTaskWithCurrentZone(source, callback, data, customSchedule, customCancel) {
    return Zone.current.scheduleMacroTask(source, callback, data, customSchedule, customCancel);
}
var zoneSymbol = Zone.__symbol__;
var isWindowExists = typeof window !== 'undefined';
var internalWindow = isWindowExists ? window : undefined;
var _global = isWindowExists && internalWindow || typeof self === 'object' && self || global;
var REMOVE_ATTRIBUTE = 'removeAttribute';
var NULL_ON_PROP_VALUE = [null];
function bindArguments(args, source) {
    for (var i = args.length - 1; i >= 0; i--) {
        if (typeof args[i] === 'function') {
            args[i] = wrapWithCurrentZone(args[i], source + '_' + i);
        }
    }
    return args;
}
function patchPrototype(prototype, fnNames) {
    var source = prototype.constructor['name'];
    var _loop_1 = function (i) {
        var name_1 = fnNames[i];
        var delegate = prototype[name_1];
        if (delegate) {
            var prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, name_1);
            if (!isPropertyWritable(prototypeDesc)) {
                return "continue";
            }
            prototype[name_1] = (function (delegate) {
                var patched = function () {
                    return delegate.apply(this, bindArguments(arguments, source + '.' + name_1));
                };
                attachOriginToPatched(patched, delegate);
                return patched;
            })(delegate);
        }
    };
    for (var i = 0; i < fnNames.length; i++) {
        _loop_1(i);
    }
}
function isPropertyWritable(propertyDesc) {
    if (!propertyDesc) {
        return true;
    }
    if (propertyDesc.writable === false) {
        return false;
    }
    return !(typeof propertyDesc.get === 'function' && typeof propertyDesc.set === 'undefined');
}
var isWebWorker = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope);
// Make sure to access `process` through `_global` so that WebPack does not accidentally browserify
// this code.
var isNode = (!('nw' in _global) && typeof _global.process !== 'undefined' &&
    {}.toString.call(_global.process) === '[object process]');
var isBrowser = !isNode && !isWebWorker && !!(isWindowExists && internalWindow['HTMLElement']);
// we are in electron of nw, so we are both browser and nodejs
// Make sure to access `process` through `_global` so that WebPack does not accidentally browserify
// this code.
var isMix = typeof _global.process !== 'undefined' &&
    {}.toString.call(_global.process) === '[object process]' && !isWebWorker &&
    !!(isWindowExists && internalWindow['HTMLElement']);
var zoneSymbolEventNames = {};
var wrapFn = function (event) {
    // https://github.com/angular/zone.js/issues/911, in IE, sometimes
    // event will be undefined, so we need to use window.event
    event = event || _global.event;
    if (!event) {
        return;
    }
    var eventNameSymbol = zoneSymbolEventNames[event.type];
    if (!eventNameSymbol) {
        eventNameSymbol = zoneSymbolEventNames[event.type] = zoneSymbol('ON_PROPERTY' + event.type);
    }
    var target = this || event.target || _global;
    var listener = target[eventNameSymbol];
    var result;
    if (isBrowser && target === internalWindow && event.type === 'error') {
        // window.onerror have different signiture
        // https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror#window.onerror
        // and onerror callback will prevent default when callback return true
        var errorEvent = event;
        result = listener &&
            listener.call(this, errorEvent.message, errorEvent.filename, errorEvent.lineno, errorEvent.colno, errorEvent.error);
        if (result === true) {
            event.preventDefault();
        }
    }
    else {
        result = listener && listener.apply(this, arguments);
        if (result != undefined && !result) {
            event.preventDefault();
        }
    }
    return result;
};
function patchProperty(obj, prop, prototype) {
    var desc = ObjectGetOwnPropertyDescriptor(obj, prop);
    if (!desc && prototype) {
        // when patch window object, use prototype to check prop exist or not
        var prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, prop);
        if (prototypeDesc) {
            desc = { enumerable: true, configurable: true };
        }
    }
    // if the descriptor not exists or is not configurable
    // just return
    if (!desc || !desc.configurable) {
        return;
    }
    var onPropPatchedSymbol = zoneSymbol('on' + prop + 'patched');
    if (obj.hasOwnProperty(onPropPatchedSymbol) && obj[onPropPatchedSymbol]) {
        return;
    }
    // A property descriptor cannot have getter/setter and be writable
    // deleting the writable and value properties avoids this error:
    //
    // TypeError: property descriptors must not specify a value or be writable when a
    // getter or setter has been specified
    delete desc.writable;
    delete desc.value;
    var originalDescGet = desc.get;
    var originalDescSet = desc.set;
    // substr(2) cuz 'onclick' -> 'click', etc
    var eventName = prop.substr(2);
    var eventNameSymbol = zoneSymbolEventNames[eventName];
    if (!eventNameSymbol) {
        eventNameSymbol = zoneSymbolEventNames[eventName] = zoneSymbol('ON_PROPERTY' + eventName);
    }
    desc.set = function (newValue) {
        // in some of windows's onproperty callback, this is undefined
        // so we need to check it
        var target = this;
        if (!target && obj === _global) {
            target = _global;
        }
        if (!target) {
            return;
        }
        var previousValue = target[eventNameSymbol];
        if (previousValue) {
            target.removeEventListener(eventName, wrapFn);
        }
        // issue #978, when onload handler was added before loading zone.js
        // we should remove it with originalDescSet
        if (originalDescSet) {
            originalDescSet.apply(target, NULL_ON_PROP_VALUE);
        }
        if (typeof newValue === 'function') {
            target[eventNameSymbol] = newValue;
            target.addEventListener(eventName, wrapFn, false);
        }
        else {
            target[eventNameSymbol] = null;
        }
    };
    // The getter would return undefined for unassigned properties but the default value of an
    // unassigned property is null
    desc.get = function () {
        // in some of windows's onproperty callback, this is undefined
        // so we need to check it
        var target = this;
        if (!target && obj === _global) {
            target = _global;
        }
        if (!target) {
            return null;
        }
        var listener = target[eventNameSymbol];
        if (listener) {
            return listener;
        }
        else if (originalDescGet) {
            // result will be null when use inline event attribute,
            // such as <button onclick="func();">OK</button>
            // because the onclick function is internal raw uncompiled handler
            // the onclick will be evaluated when first time event was triggered or
            // the property is accessed, https://github.com/angular/zone.js/issues/525
            // so we should use original native get to retrieve the handler
            var value = originalDescGet && originalDescGet.call(this);
            if (value) {
                desc.set.call(this, value);
                if (typeof target[REMOVE_ATTRIBUTE] === 'function') {
                    target.removeAttribute(prop);
                }
                return value;
            }
        }
        return null;
    };
    ObjectDefineProperty(obj, prop, desc);
    obj[onPropPatchedSymbol] = true;
}
function patchOnProperties(obj, properties, prototype) {
    if (properties) {
        for (var i = 0; i < properties.length; i++) {
            patchProperty(obj, 'on' + properties[i], prototype);
        }
    }
    else {
        var onProperties = [];
        for (var prop in obj) {
            if (prop.substr(0, 2) == 'on') {
                onProperties.push(prop);
            }
        }
        for (var j = 0; j < onProperties.length; j++) {
            patchProperty(obj, onProperties[j], prototype);
        }
    }
}
var originalInstanceKey = zoneSymbol('originalInstance');
// wrap some native API on `window`
function patchClass(className) {
    var OriginalClass = _global[className];
    if (!OriginalClass)
        return;
    // keep original class in global
    _global[zoneSymbol(className)] = OriginalClass;
    _global[className] = function () {
        var a = bindArguments(arguments, className);
        switch (a.length) {
            case 0:
                this[originalInstanceKey] = new OriginalClass();
                break;
            case 1:
                this[originalInstanceKey] = new OriginalClass(a[0]);
                break;
            case 2:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
                break;
            case 3:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
                break;
            case 4:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
                break;
            default:
                throw new Error('Arg list too long.');
        }
    };
    // attach original delegate to patched function
    attachOriginToPatched(_global[className], OriginalClass);
    var instance = new OriginalClass(function () { });
    var prop;
    for (prop in instance) {
        // https://bugs.webkit.org/show_bug.cgi?id=44721
        if (className === 'XMLHttpRequest' && prop === 'responseBlob')
            continue;
        (function (prop) {
            if (typeof instance[prop] === 'function') {
                _global[className].prototype[prop] = function () {
                    return this[originalInstanceKey][prop].apply(this[originalInstanceKey], arguments);
                };
            }
            else {
                ObjectDefineProperty(_global[className].prototype, prop, {
                    set: function (fn) {
                        if (typeof fn === 'function') {
                            this[originalInstanceKey][prop] = wrapWithCurrentZone(fn, className + '.' + prop);
                            // keep callback in wrapped function so we can
                            // use it in Function.prototype.toString to return
                            // the native one.
                            attachOriginToPatched(this[originalInstanceKey][prop], fn);
                        }
                        else {
                            this[originalInstanceKey][prop] = fn;
                        }
                    },
                    get: function () {
                        return this[originalInstanceKey][prop];
                    }
                });
            }
        }(prop));
    }
    for (prop in OriginalClass) {
        if (prop !== 'prototype' && OriginalClass.hasOwnProperty(prop)) {
            _global[className][prop] = OriginalClass[prop];
        }
    }
}
function copySymbolProperties(src, dest) {
    if (typeof Object.getOwnPropertySymbols !== 'function') {
        return;
    }
    var symbols = Object.getOwnPropertySymbols(src);
    symbols.forEach(function (symbol) {
        var desc = Object.getOwnPropertyDescriptor(src, symbol);
        Object.defineProperty(dest, symbol, {
            get: function () {
                return src[symbol];
            },
            set: function (value) {
                if (desc && (!desc.writable || typeof desc.set !== 'function')) {
                    // if src[symbol] is not writable or not have a setter, just return
                    return;
                }
                src[symbol] = value;
            },
            enumerable: desc ? desc.enumerable : true,
            configurable: desc ? desc.configurable : true
        });
    });
}
var shouldCopySymbolProperties = false;

function patchMethod(target, name, patchFn) {
    var proto = target;
    while (proto && !proto.hasOwnProperty(name)) {
        proto = ObjectGetPrototypeOf(proto);
    }
    if (!proto && target[name]) {
        // somehow we did not find it, but we can see it. This happens on IE for Window properties.
        proto = target;
    }
    var delegateName = zoneSymbol(name);
    var delegate = null;
    if (proto && !(delegate = proto[delegateName])) {
        delegate = proto[delegateName] = proto[name];
        // check whether proto[name] is writable
        // some property is readonly in safari, such as HtmlCanvasElement.prototype.toBlob
        var desc = proto && ObjectGetOwnPropertyDescriptor(proto, name);
        if (isPropertyWritable(desc)) {
            var patchDelegate_1 = patchFn(delegate, delegateName, name);
            proto[name] = function () {
                return patchDelegate_1(this, arguments);
            };
            attachOriginToPatched(proto[name], delegate);
            if (shouldCopySymbolProperties) {
                copySymbolProperties(delegate, proto[name]);
            }
        }
    }
    return delegate;
}
// TODO: @JiaLiPassion, support cancel task later if necessary
function patchMacroTask(obj, funcName, metaCreator) {
    var setNative = null;
    function scheduleTask(task) {
        var data = task.data;
        data.args[data.cbIdx] = function () {
            task.invoke.apply(this, arguments);
        };
        setNative.apply(data.target, data.args);
        return task;
    }
    setNative = patchMethod(obj, funcName, function (delegate) { return function (self, args) {
        var meta = metaCreator(self, args);
        if (meta.cbIdx >= 0 && typeof args[meta.cbIdx] === 'function') {
            return scheduleMacroTaskWithCurrentZone(meta.name, args[meta.cbIdx], meta, scheduleTask);
        }
        else {
            // cause an error by calling it directly.
            return delegate.apply(self, args);
        }
    }; });
}

function attachOriginToPatched(patched, original) {
    patched[zoneSymbol('OriginalDelegate')] = original;
}
var isDetectedIEOrEdge = false;
var ieOrEdge = false;
function isIE() {
    try {
        var ua = internalWindow.navigator.userAgent;
        if (ua.indexOf('MSIE ') !== -1 || ua.indexOf('Trident/') !== -1) {
            return true;
        }
    }
    catch (error) {
    }
    return false;
}
function isIEOrEdge() {
    if (isDetectedIEOrEdge) {
        return ieOrEdge;
    }
    isDetectedIEOrEdge = true;
    try {
        var ua = internalWindow.navigator.userAgent;
        if (ua.indexOf('MSIE ') !== -1 || ua.indexOf('Trident/') !== -1 || ua.indexOf('Edge/') !== -1) {
            ieOrEdge = true;
        }
        return ieOrEdge;
    }
    catch (error) {
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// override Function.prototype.toString to make zone.js patched function
// look like native function
Zone.__load_patch('toString', function (global) {
    // patch Func.prototype.toString to let them look like native
    var originalFunctionToString = Function.prototype.toString;
    var ORIGINAL_DELEGATE_SYMBOL = zoneSymbol('OriginalDelegate');
    var PROMISE_SYMBOL = zoneSymbol('Promise');
    var ERROR_SYMBOL = zoneSymbol('Error');
    var newFunctionToString = function toString() {
        if (typeof this === 'function') {
            var originalDelegate = this[ORIGINAL_DELEGATE_SYMBOL];
            if (originalDelegate) {
                if (typeof originalDelegate === 'function') {
                    return originalFunctionToString.apply(this[ORIGINAL_DELEGATE_SYMBOL], arguments);
                }
                else {
                    return Object.prototype.toString.call(originalDelegate);
                }
            }
            if (this === Promise) {
                var nativePromise = global[PROMISE_SYMBOL];
                if (nativePromise) {
                    return originalFunctionToString.apply(nativePromise, arguments);
                }
            }
            if (this === Error) {
                var nativeError = global[ERROR_SYMBOL];
                if (nativeError) {
                    return originalFunctionToString.apply(nativeError, arguments);
                }
            }
        }
        return originalFunctionToString.apply(this, arguments);
    };
    newFunctionToString[ORIGINAL_DELEGATE_SYMBOL] = originalFunctionToString;
    Function.prototype.toString = newFunctionToString;
    // patch Object.prototype.toString to let them look like native
    var originalObjectToString = Object.prototype.toString;
    var PROMISE_OBJECT_TO_STRING = '[object Promise]';
    Object.prototype.toString = function () {
        if (this instanceof Promise) {
            return PROMISE_OBJECT_TO_STRING;
        }
        return originalObjectToString.apply(this, arguments);
    };
});

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
var passiveSupported = false;
if (typeof window !== 'undefined') {
    try {
        var options = Object.defineProperty({}, 'passive', {
            get: function () {
                passiveSupported = true;
            }
        });
        window.addEventListener('test', options, options);
        window.removeEventListener('test', options, options);
    }
    catch (err) {
        passiveSupported = false;
    }
}
// an identifier to tell ZoneTask do not create a new invoke closure
var OPTIMIZED_ZONE_EVENT_TASK_DATA = {
    useG: true
};
var zoneSymbolEventNames$1 = {};
var globalSources = {};
var EVENT_NAME_SYMBOL_REGX = /^__zone_symbol__(\w+)(true|false)$/;
var IMMEDIATE_PROPAGATION_SYMBOL = ('__zone_symbol__propagationStopped');
function patchEventTarget(_global, apis, patchOptions) {
    var ADD_EVENT_LISTENER = (patchOptions && patchOptions.add) || ADD_EVENT_LISTENER_STR;
    var REMOVE_EVENT_LISTENER = (patchOptions && patchOptions.rm) || REMOVE_EVENT_LISTENER_STR;
    var LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.listeners) || 'eventListeners';
    var REMOVE_ALL_LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.rmAll) || 'removeAllListeners';
    var zoneSymbolAddEventListener = zoneSymbol(ADD_EVENT_LISTENER);
    var ADD_EVENT_LISTENER_SOURCE = '.' + ADD_EVENT_LISTENER + ':';
    var PREPEND_EVENT_LISTENER = 'prependListener';
    var PREPEND_EVENT_LISTENER_SOURCE = '.' + PREPEND_EVENT_LISTENER + ':';
    var invokeTask = function (task, target, event) {
        // for better performance, check isRemoved which is set
        // by removeEventListener
        if (task.isRemoved) {
            return;
        }
        var delegate = task.callback;
        if (typeof delegate === 'object' && delegate.handleEvent) {
            // create the bind version of handleEvent when invoke
            task.callback = function (event) { return delegate.handleEvent(event); };
            task.originalDelegate = delegate;
        }
        // invoke static task.invoke
        task.invoke(task, target, [event]);
        var options = task.options;
        if (options && typeof options === 'object' && options.once) {
            // if options.once is true, after invoke once remove listener here
            // only browser need to do this, nodejs eventEmitter will cal removeListener
            // inside EventEmitter.once
            var delegate_1 = task.originalDelegate ? task.originalDelegate : task.callback;
            target[REMOVE_EVENT_LISTENER].call(target, event.type, delegate_1, options);
        }
    };
    // global shared zoneAwareCallback to handle all event callback with capture = false
    var globalZoneAwareCallback = function (event) {
        // https://github.com/angular/zone.js/issues/911, in IE, sometimes
        // event will be undefined, so we need to use window.event
        event = event || _global.event;
        if (!event) {
            return;
        }
        // event.target is needed for Samsung TV and SourceBuffer
        // || global is needed https://github.com/angular/zone.js/issues/190
        var target = this || event.target || _global;
        var tasks = target[zoneSymbolEventNames$1[event.type][FALSE_STR]];
        if (tasks) {
            // invoke all tasks which attached to current target with given event.type and capture = false
            // for performance concern, if task.length === 1, just invoke
            if (tasks.length === 1) {
                invokeTask(tasks[0], target, event);
            }
            else {
                // https://github.com/angular/zone.js/issues/836
                // copy the tasks array before invoke, to avoid
                // the callback will remove itself or other listener
                var copyTasks = tasks.slice();
                for (var i = 0; i < copyTasks.length; i++) {
                    if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                        break;
                    }
                    invokeTask(copyTasks[i], target, event);
                }
            }
        }
    };
    // global shared zoneAwareCallback to handle all event callback with capture = true
    var globalZoneAwareCaptureCallback = function (event) {
        // https://github.com/angular/zone.js/issues/911, in IE, sometimes
        // event will be undefined, so we need to use window.event
        event = event || _global.event;
        if (!event) {
            return;
        }
        // event.target is needed for Samsung TV and SourceBuffer
        // || global is needed https://github.com/angular/zone.js/issues/190
        var target = this || event.target || _global;
        var tasks = target[zoneSymbolEventNames$1[event.type][TRUE_STR]];
        if (tasks) {
            // invoke all tasks which attached to current target with given event.type and capture = false
            // for performance concern, if task.length === 1, just invoke
            if (tasks.length === 1) {
                invokeTask(tasks[0], target, event);
            }
            else {
                // https://github.com/angular/zone.js/issues/836
                // copy the tasks array before invoke, to avoid
                // the callback will remove itself or other listener
                var copyTasks = tasks.slice();
                for (var i = 0; i < copyTasks.length; i++) {
                    if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                        break;
                    }
                    invokeTask(copyTasks[i], target, event);
                }
            }
        }
    };
    function patchEventTargetMethods(obj, patchOptions) {
        if (!obj) {
            return false;
        }
        var useGlobalCallback = true;
        if (patchOptions && patchOptions.useG !== undefined) {
            useGlobalCallback = patchOptions.useG;
        }
        var validateHandler = patchOptions && patchOptions.vh;
        var checkDuplicate = true;
        if (patchOptions && patchOptions.chkDup !== undefined) {
            checkDuplicate = patchOptions.chkDup;
        }
        var returnTarget = false;
        if (patchOptions && patchOptions.rt !== undefined) {
            returnTarget = patchOptions.rt;
        }
        var proto = obj;
        while (proto && !proto.hasOwnProperty(ADD_EVENT_LISTENER)) {
            proto = ObjectGetPrototypeOf(proto);
        }
        if (!proto && obj[ADD_EVENT_LISTENER]) {
            // somehow we did not find it, but we can see it. This happens on IE for Window properties.
            proto = obj;
        }
        if (!proto) {
            return false;
        }
        if (proto[zoneSymbolAddEventListener]) {
            return false;
        }
        var eventNameToString = patchOptions && patchOptions.eventNameToString;
        // a shared global taskData to pass data for scheduleEventTask
        // so we do not need to create a new object just for pass some data
        var taskData = {};
        var nativeAddEventListener = proto[zoneSymbolAddEventListener] = proto[ADD_EVENT_LISTENER];
        var nativeRemoveEventListener = proto[zoneSymbol(REMOVE_EVENT_LISTENER)] =
            proto[REMOVE_EVENT_LISTENER];
        var nativeListeners = proto[zoneSymbol(LISTENERS_EVENT_LISTENER)] =
            proto[LISTENERS_EVENT_LISTENER];
        var nativeRemoveAllListeners = proto[zoneSymbol(REMOVE_ALL_LISTENERS_EVENT_LISTENER)] =
            proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER];
        var nativePrependEventListener;
        if (patchOptions && patchOptions.prepend) {
            nativePrependEventListener = proto[zoneSymbol(patchOptions.prepend)] =
                proto[patchOptions.prepend];
        }
        function checkIsPassive(task) {
            if (!passiveSupported && typeof taskData.options !== 'boolean' &&
                typeof taskData.options !== 'undefined' && taskData.options !== null) {
                // options is a non-null non-undefined object
                // passive is not supported
                // don't pass options as object
                // just pass capture as a boolean
                task.options = !!taskData.options.capture;
                taskData.options = task.options;
            }
        }
        var customScheduleGlobal = function (task) {
            // if there is already a task for the eventName + capture,
            // just return, because we use the shared globalZoneAwareCallback here.
            if (taskData.isExisting) {
                return;
            }
            checkIsPassive(task);
            return nativeAddEventListener.call(taskData.target, taskData.eventName, taskData.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, taskData.options);
        };
        var customCancelGlobal = function (task) {
            // if task is not marked as isRemoved, this call is directly
            // from Zone.prototype.cancelTask, we should remove the task
            // from tasksList of target first
            if (!task.isRemoved) {
                var symbolEventNames = zoneSymbolEventNames$1[task.eventName];
                var symbolEventName = void 0;
                if (symbolEventNames) {
                    symbolEventName = symbolEventNames[task.capture ? TRUE_STR : FALSE_STR];
                }
                var existingTasks = symbolEventName && task.target[symbolEventName];
                if (existingTasks) {
                    for (var i = 0; i < existingTasks.length; i++) {
                        var existingTask = existingTasks[i];
                        if (existingTask === task) {
                            existingTasks.splice(i, 1);
                            // set isRemoved to data for faster invokeTask check
                            task.isRemoved = true;
                            if (existingTasks.length === 0) {
                                // all tasks for the eventName + capture have gone,
                                // remove globalZoneAwareCallback and remove the task cache from target
                                task.allRemoved = true;
                                task.target[symbolEventName] = null;
                            }
                            break;
                        }
                    }
                }
            }
            // if all tasks for the eventName + capture have gone,
            // we will really remove the global event callback,
            // if not, return
            if (!task.allRemoved) {
                return;
            }
            return nativeRemoveEventListener.call(task.target, task.eventName, task.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, task.options);
        };
        var customScheduleNonGlobal = function (task) {
            checkIsPassive(task);
            return nativeAddEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
        };
        var customSchedulePrepend = function (task) {
            return nativePrependEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
        };
        var customCancelNonGlobal = function (task) {
            return nativeRemoveEventListener.call(task.target, task.eventName, task.invoke, task.options);
        };
        var customSchedule = useGlobalCallback ? customScheduleGlobal : customScheduleNonGlobal;
        var customCancel = useGlobalCallback ? customCancelGlobal : customCancelNonGlobal;
        var compareTaskCallbackVsDelegate = function (task, delegate) {
            var typeOfDelegate = typeof delegate;
            return (typeOfDelegate === 'function' && task.callback === delegate) ||
                (typeOfDelegate === 'object' && task.originalDelegate === delegate);
        };
        var compare = (patchOptions && patchOptions.diff) ? patchOptions.diff : compareTaskCallbackVsDelegate;
        var blackListedEvents = Zone[Zone.__symbol__('BLACK_LISTED_EVENTS')];
        var makeAddListener = function (nativeListener, addSource, customScheduleFn, customCancelFn, returnTarget, prepend) {
            if (returnTarget === void 0) { returnTarget = false; }
            if (prepend === void 0) { prepend = false; }
            return function () {
                var target = this || _global;
                var eventName = arguments[0];
                var delegate = arguments[1];
                if (!delegate) {
                    return nativeListener.apply(this, arguments);
                }
                if (isNode && eventName === 'uncaughtException') {
                    // don't patch uncaughtException of nodejs to prevent endless loop
                    return nativeListener.apply(this, arguments);
                }
                // don't create the bind delegate function for handleEvent
                // case here to improve addEventListener performance
                // we will create the bind delegate when invoke
                var isHandleEvent = false;
                if (typeof delegate !== 'function') {
                    if (!delegate.handleEvent) {
                        return nativeListener.apply(this, arguments);
                    }
                    isHandleEvent = true;
                }
                if (validateHandler && !validateHandler(nativeListener, delegate, target, arguments)) {
                    return;
                }
                var options = arguments[2];
                if (blackListedEvents) {
                    // check black list
                    for (var i = 0; i < blackListedEvents.length; i++) {
                        if (eventName === blackListedEvents[i]) {
                            return nativeListener.apply(this, arguments);
                        }
                    }
                }
                var capture;
                var once = false;
                if (options === undefined) {
                    capture = false;
                }
                else if (options === true) {
                    capture = true;
                }
                else if (options === false) {
                    capture = false;
                }
                else {
                    capture = options ? !!options.capture : false;
                    once = options ? !!options.once : false;
                }
                var zone = Zone.current;
                var symbolEventNames = zoneSymbolEventNames$1[eventName];
                var symbolEventName;
                if (!symbolEventNames) {
                    // the code is duplicate, but I just want to get some better performance
                    var falseEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + FALSE_STR;
                    var trueEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + TRUE_STR;
                    var symbol = ZONE_SYMBOL_PREFIX + falseEventName;
                    var symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
                    zoneSymbolEventNames$1[eventName] = {};
                    zoneSymbolEventNames$1[eventName][FALSE_STR] = symbol;
                    zoneSymbolEventNames$1[eventName][TRUE_STR] = symbolCapture;
                    symbolEventName = capture ? symbolCapture : symbol;
                }
                else {
                    symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
                }
                var existingTasks = target[symbolEventName];
                var isExisting = false;
                if (existingTasks) {
                    // already have task registered
                    isExisting = true;
                    if (checkDuplicate) {
                        for (var i = 0; i < existingTasks.length; i++) {
                            if (compare(existingTasks[i], delegate)) {
                                // same callback, same capture, same event name, just return
                                return;
                            }
                        }
                    }
                }
                else {
                    existingTasks = target[symbolEventName] = [];
                }
                var source;
                var constructorName = target.constructor['name'];
                var targetSource = globalSources[constructorName];
                if (targetSource) {
                    source = targetSource[eventName];
                }
                if (!source) {
                    source = constructorName + addSource +
                        (eventNameToString ? eventNameToString(eventName) : eventName);
                }
                // do not create a new object as task.data to pass those things
                // just use the global shared one
                taskData.options = options;
                if (once) {
                    // if addEventListener with once options, we don't pass it to
                    // native addEventListener, instead we keep the once setting
                    // and handle ourselves.
                    taskData.options.once = false;
                }
                taskData.target = target;
                taskData.capture = capture;
                taskData.eventName = eventName;
                taskData.isExisting = isExisting;
                var data = useGlobalCallback ? OPTIMIZED_ZONE_EVENT_TASK_DATA : undefined;
                // keep taskData into data to allow onScheduleEventTask to access the task information
                if (data) {
                    data.taskData = taskData;
                }
                var task = zone.scheduleEventTask(source, delegate, data, customScheduleFn, customCancelFn);
                // should clear taskData.target to avoid memory leak
                // issue, https://github.com/angular/angular/issues/20442
                taskData.target = null;
                // need to clear up taskData because it is a global object
                if (data) {
                    data.taskData = null;
                }
                // have to save those information to task in case
                // application may call task.zone.cancelTask() directly
                if (once) {
                    options.once = true;
                }
                if (!(!passiveSupported && typeof task.options === 'boolean')) {
                    // if not support passive, and we pass an option object
                    // to addEventListener, we should save the options to task
                    task.options = options;
                }
                task.target = target;
                task.capture = capture;
                task.eventName = eventName;
                if (isHandleEvent) {
                    // save original delegate for compare to check duplicate
                    task.originalDelegate = delegate;
                }
                if (!prepend) {
                    existingTasks.push(task);
                }
                else {
                    existingTasks.unshift(task);
                }
                if (returnTarget) {
                    return target;
                }
            };
        };
        proto[ADD_EVENT_LISTENER] = makeAddListener(nativeAddEventListener, ADD_EVENT_LISTENER_SOURCE, customSchedule, customCancel, returnTarget);
        if (nativePrependEventListener) {
            proto[PREPEND_EVENT_LISTENER] = makeAddListener(nativePrependEventListener, PREPEND_EVENT_LISTENER_SOURCE, customSchedulePrepend, customCancel, returnTarget, true);
        }
        proto[REMOVE_EVENT_LISTENER] = function () {
            var target = this || _global;
            var eventName = arguments[0];
            var options = arguments[2];
            var capture;
            if (options === undefined) {
                capture = false;
            }
            else if (options === true) {
                capture = true;
            }
            else if (options === false) {
                capture = false;
            }
            else {
                capture = options ? !!options.capture : false;
            }
            var delegate = arguments[1];
            if (!delegate) {
                return nativeRemoveEventListener.apply(this, arguments);
            }
            if (validateHandler &&
                !validateHandler(nativeRemoveEventListener, delegate, target, arguments)) {
                return;
            }
            var symbolEventNames = zoneSymbolEventNames$1[eventName];
            var symbolEventName;
            if (symbolEventNames) {
                symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
            }
            var existingTasks = symbolEventName && target[symbolEventName];
            if (existingTasks) {
                for (var i = 0; i < existingTasks.length; i++) {
                    var existingTask = existingTasks[i];
                    if (compare(existingTask, delegate)) {
                        existingTasks.splice(i, 1);
                        // set isRemoved to data for faster invokeTask check
                        existingTask.isRemoved = true;
                        if (existingTasks.length === 0) {
                            // all tasks for the eventName + capture have gone,
                            // remove globalZoneAwareCallback and remove the task cache from target
                            existingTask.allRemoved = true;
                            target[symbolEventName] = null;
                        }
                        existingTask.zone.cancelTask(existingTask);
                        if (returnTarget) {
                            return target;
                        }
                        return;
                    }
                }
            }
            // issue 930, didn't find the event name or callback
            // from zone kept existingTasks, the callback maybe
            // added outside of zone, we need to call native removeEventListener
            // to try to remove it.
            return nativeRemoveEventListener.apply(this, arguments);
        };
        proto[LISTENERS_EVENT_LISTENER] = function () {
            var target = this || _global;
            var eventName = arguments[0];
            var listeners = [];
            var tasks = findEventTasks(target, eventNameToString ? eventNameToString(eventName) : eventName);
            for (var i = 0; i < tasks.length; i++) {
                var task = tasks[i];
                var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                listeners.push(delegate);
            }
            return listeners;
        };
        proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER] = function () {
            var target = this || _global;
            var eventName = arguments[0];
            if (!eventName) {
                var keys = Object.keys(target);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var match = EVENT_NAME_SYMBOL_REGX.exec(prop);
                    var evtName = match && match[1];
                    // in nodejs EventEmitter, removeListener event is
                    // used for monitoring the removeListener call,
                    // so just keep removeListener eventListener until
                    // all other eventListeners are removed
                    if (evtName && evtName !== 'removeListener') {
                        this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, evtName);
                    }
                }
                // remove removeListener listener finally
                this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, 'removeListener');
            }
            else {
                var symbolEventNames = zoneSymbolEventNames$1[eventName];
                if (symbolEventNames) {
                    var symbolEventName = symbolEventNames[FALSE_STR];
                    var symbolCaptureEventName = symbolEventNames[TRUE_STR];
                    var tasks = target[symbolEventName];
                    var captureTasks = target[symbolCaptureEventName];
                    if (tasks) {
                        var removeTasks = tasks.slice();
                        for (var i = 0; i < removeTasks.length; i++) {
                            var task = removeTasks[i];
                            var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                            this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                        }
                    }
                    if (captureTasks) {
                        var removeTasks = captureTasks.slice();
                        for (var i = 0; i < removeTasks.length; i++) {
                            var task = removeTasks[i];
                            var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                            this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                        }
                    }
                }
            }
            if (returnTarget) {
                return this;
            }
        };
        // for native toString patch
        attachOriginToPatched(proto[ADD_EVENT_LISTENER], nativeAddEventListener);
        attachOriginToPatched(proto[REMOVE_EVENT_LISTENER], nativeRemoveEventListener);
        if (nativeRemoveAllListeners) {
            attachOriginToPatched(proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER], nativeRemoveAllListeners);
        }
        if (nativeListeners) {
            attachOriginToPatched(proto[LISTENERS_EVENT_LISTENER], nativeListeners);
        }
        return true;
    }
    var results = [];
    for (var i = 0; i < apis.length; i++) {
        results[i] = patchEventTargetMethods(apis[i], patchOptions);
    }
    return results;
}
function findEventTasks(target, eventName) {
    var foundTasks = [];
    for (var prop in target) {
        var match = EVENT_NAME_SYMBOL_REGX.exec(prop);
        var evtName = match && match[1];
        if (evtName && (!eventName || evtName === eventName)) {
            var tasks = target[prop];
            if (tasks) {
                for (var i = 0; i < tasks.length; i++) {
                    foundTasks.push(tasks[i]);
                }
            }
        }
    }
    return foundTasks;
}
function patchEventPrototype(global, api) {
    var Event = global['Event'];
    if (Event && Event.prototype) {
        api.patchMethod(Event.prototype, 'stopImmediatePropagation', function (delegate) { return function (self, args) {
            self[IMMEDIATE_PROPAGATION_SYMBOL] = true;
            // we need to call the native stopImmediatePropagation
            // in case in some hybrid application, some part of
            // application will be controlled by zone, some are not
            delegate && delegate.apply(self, args);
        }; });
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
var taskSymbol = zoneSymbol('zoneTask');
function patchTimer(window, setName, cancelName, nameSuffix) {
    var setNative = null;
    var clearNative = null;
    setName += nameSuffix;
    cancelName += nameSuffix;
    var tasksByHandleId = {};
    function scheduleTask(task) {
        var data = task.data;
        function timer() {
            try {
                task.invoke.apply(this, arguments);
            }
            finally {
                // issue-934, task will be cancelled
                // even it is a periodic task such as
                // setInterval
                if (!(task.data && task.data.isPeriodic)) {
                    if (typeof data.handleId === 'number') {
                        // in non-nodejs env, we remove timerId
                        // from local cache
                        delete tasksByHandleId[data.handleId];
                    }
                    else if (data.handleId) {
                        // Node returns complex objects as handleIds
                        // we remove task reference from timer object
                        data.handleId[taskSymbol] = null;
                    }
                }
            }
        }
        data.args[0] = timer;
        data.handleId = setNative.apply(window, data.args);
        return task;
    }
    function clearTask(task) {
        return clearNative(task.data.handleId);
    }
    setNative =
        patchMethod(window, setName, function (delegate) { return function (self, args) {
            if (typeof args[0] === 'function') {
                var options = {
                    isPeriodic: nameSuffix === 'Interval',
                    delay: (nameSuffix === 'Timeout' || nameSuffix === 'Interval') ? args[1] || 0 :
                        undefined,
                    args: args
                };
                var task = scheduleMacroTaskWithCurrentZone(setName, args[0], options, scheduleTask, clearTask);
                if (!task) {
                    return task;
                }
                // Node.js must additionally support the ref and unref functions.
                var handle = task.data.handleId;
                if (typeof handle === 'number') {
                    // for non nodejs env, we save handleId: task
                    // mapping in local cache for clearTimeout
                    tasksByHandleId[handle] = task;
                }
                else if (handle) {
                    // for nodejs env, we save task
                    // reference in timerId Object for clearTimeout
                    handle[taskSymbol] = task;
                }
                // check whether handle is null, because some polyfill or browser
                // may return undefined from setTimeout/setInterval/setImmediate/requestAnimationFrame
                if (handle && handle.ref && handle.unref && typeof handle.ref === 'function' &&
                    typeof handle.unref === 'function') {
                    task.ref = handle.ref.bind(handle);
                    task.unref = handle.unref.bind(handle);
                }
                if (typeof handle === 'number' || handle) {
                    return handle;
                }
                return task;
            }
            else {
                // cause an error by calling it directly.
                return delegate.apply(window, args);
            }
        }; });
    clearNative =
        patchMethod(window, cancelName, function (delegate) { return function (self, args) {
            var id = args[0];
            var task;
            if (typeof id === 'number') {
                // non nodejs env.
                task = tasksByHandleId[id];
            }
            else {
                // nodejs env.
                task = id && id[taskSymbol];
                // other environments.
                if (!task) {
                    task = id;
                }
            }
            if (task && typeof task.type === 'string') {
                if (task.state !== 'notScheduled' &&
                    (task.cancelFn && task.data.isPeriodic || task.runCount === 0)) {
                    if (typeof id === 'number') {
                        delete tasksByHandleId[id];
                    }
                    else if (id) {
                        id[taskSymbol] = null;
                    }
                    // Do not cancel already canceled functions
                    task.zone.cancelTask(task);
                }
            }
            else {
                // cause an error by calling it directly.
                delegate.apply(window, args);
            }
        }; });
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/*
 * This is necessary for Chrome and Chrome mobile, to enable
 * things like redefining `createdCallback` on an element.
 */
var _defineProperty = Object[zoneSymbol('defineProperty')] = Object.defineProperty;
var _getOwnPropertyDescriptor = Object[zoneSymbol('getOwnPropertyDescriptor')] =
    Object.getOwnPropertyDescriptor;
var _create = Object.create;
var unconfigurablesKey = zoneSymbol('unconfigurables');
function propertyPatch() {
    Object.defineProperty = function (obj, prop, desc) {
        if (isUnconfigurable(obj, prop)) {
            throw new TypeError('Cannot assign to read only property \'' + prop + '\' of ' + obj);
        }
        var originalConfigurableFlag = desc.configurable;
        if (prop !== 'prototype') {
            desc = rewriteDescriptor(obj, prop, desc);
        }
        return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
    };
    Object.defineProperties = function (obj, props) {
        Object.keys(props).forEach(function (prop) {
            Object.defineProperty(obj, prop, props[prop]);
        });
        return obj;
    };
    Object.create = function (obj, proto) {
        if (typeof proto === 'object' && !Object.isFrozen(proto)) {
            Object.keys(proto).forEach(function (prop) {
                proto[prop] = rewriteDescriptor(obj, prop, proto[prop]);
            });
        }
        return _create(obj, proto);
    };
    Object.getOwnPropertyDescriptor = function (obj, prop) {
        var desc = _getOwnPropertyDescriptor(obj, prop);
        if (desc && isUnconfigurable(obj, prop)) {
            desc.configurable = false;
        }
        return desc;
    };
}
function _redefineProperty(obj, prop, desc) {
    var originalConfigurableFlag = desc.configurable;
    desc = rewriteDescriptor(obj, prop, desc);
    return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
}
function isUnconfigurable(obj, prop) {
    return obj && obj[unconfigurablesKey] && obj[unconfigurablesKey][prop];
}
function rewriteDescriptor(obj, prop, desc) {
    // issue-927, if the desc is frozen, don't try to change the desc
    if (!Object.isFrozen(desc)) {
        desc.configurable = true;
    }
    if (!desc.configurable) {
        // issue-927, if the obj is frozen, don't try to set the desc to obj
        if (!obj[unconfigurablesKey] && !Object.isFrozen(obj)) {
            _defineProperty(obj, unconfigurablesKey, { writable: true, value: {} });
        }
        if (obj[unconfigurablesKey]) {
            obj[unconfigurablesKey][prop] = true;
        }
    }
    return desc;
}
function _tryDefineProperty(obj, prop, desc, originalConfigurableFlag) {
    try {
        return _defineProperty(obj, prop, desc);
    }
    catch (error) {
        if (desc.configurable) {
            // In case of errors, when the configurable flag was likely set by rewriteDescriptor(), let's
            // retry with the original flag value
            if (typeof originalConfigurableFlag == 'undefined') {
                delete desc.configurable;
            }
            else {
                desc.configurable = originalConfigurableFlag;
            }
            try {
                return _defineProperty(obj, prop, desc);
            }
            catch (error) {
                var descJson = null;
                try {
                    descJson = JSON.stringify(desc);
                }
                catch (error) {
                    descJson = desc.toString();
                }
                console.log("Attempting to configure '" + prop + "' with descriptor '" + descJson + "' on object '" + obj + "' and got error, giving up: " + error);
            }
        }
        else {
            throw error;
        }
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// we have to patch the instance since the proto is non-configurable
function apply(api, _global) {
    var WS = _global.WebSocket;
    // On Safari window.EventTarget doesn't exist so need to patch WS add/removeEventListener
    // On older Chrome, no need since EventTarget was already patched
    if (!_global.EventTarget) {
        patchEventTarget(_global, [WS.prototype]);
    }
    _global.WebSocket = function (x, y) {
        var socket = arguments.length > 1 ? new WS(x, y) : new WS(x);
        var proxySocket;
        var proxySocketProto;
        // Safari 7.0 has non-configurable own 'onmessage' and friends properties on the socket instance
        var onmessageDesc = ObjectGetOwnPropertyDescriptor(socket, 'onmessage');
        if (onmessageDesc && onmessageDesc.configurable === false) {
            proxySocket = ObjectCreate(socket);
            // socket have own property descriptor 'onopen', 'onmessage', 'onclose', 'onerror'
            // but proxySocket not, so we will keep socket as prototype and pass it to
            // patchOnProperties method
            proxySocketProto = socket;
            [ADD_EVENT_LISTENER_STR, REMOVE_EVENT_LISTENER_STR, 'send', 'close'].forEach(function (propName) {
                proxySocket[propName] = function () {
                    var args = ArraySlice.call(arguments);
                    if (propName === ADD_EVENT_LISTENER_STR || propName === REMOVE_EVENT_LISTENER_STR) {
                        var eventName = args.length > 0 ? args[0] : undefined;
                        if (eventName) {
                            var propertySymbol = Zone.__symbol__('ON_PROPERTY' + eventName);
                            socket[propertySymbol] = proxySocket[propertySymbol];
                        }
                    }
                    return socket[propName].apply(socket, args);
                };
            });
        }
        else {
            // we can patch the real socket
            proxySocket = socket;
        }
        patchOnProperties(proxySocket, ['close', 'error', 'message', 'open'], proxySocketProto);
        return proxySocket;
    };
    var globalWebSocket = _global['WebSocket'];
    for (var prop in WS) {
        globalWebSocket[prop] = WS[prop];
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {globalThis}
 */
var globalEventHandlersEventNames = [
    'abort',
    'animationcancel',
    'animationend',
    'animationiteration',
    'auxclick',
    'beforeinput',
    'blur',
    'cancel',
    'canplay',
    'canplaythrough',
    'change',
    'compositionstart',
    'compositionupdate',
    'compositionend',
    'cuechange',
    'click',
    'close',
    'contextmenu',
    'curechange',
    'dblclick',
    'drag',
    'dragend',
    'dragenter',
    'dragexit',
    'dragleave',
    'dragover',
    'drop',
    'durationchange',
    'emptied',
    'ended',
    'error',
    'focus',
    'focusin',
    'focusout',
    'gotpointercapture',
    'input',
    'invalid',
    'keydown',
    'keypress',
    'keyup',
    'load',
    'loadstart',
    'loadeddata',
    'loadedmetadata',
    'lostpointercapture',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'mousewheel',
    'orientationchange',
    'pause',
    'play',
    'playing',
    'pointercancel',
    'pointerdown',
    'pointerenter',
    'pointerleave',
    'pointerlockchange',
    'mozpointerlockchange',
    'webkitpointerlockerchange',
    'pointerlockerror',
    'mozpointerlockerror',
    'webkitpointerlockerror',
    'pointermove',
    'pointout',
    'pointerover',
    'pointerup',
    'progress',
    'ratechange',
    'reset',
    'resize',
    'scroll',
    'seeked',
    'seeking',
    'select',
    'selectionchange',
    'selectstart',
    'show',
    'sort',
    'stalled',
    'submit',
    'suspend',
    'timeupdate',
    'volumechange',
    'touchcancel',
    'touchmove',
    'touchstart',
    'touchend',
    'transitioncancel',
    'transitionend',
    'waiting',
    'wheel'
];
var documentEventNames = [
    'afterscriptexecute', 'beforescriptexecute', 'DOMContentLoaded', 'freeze', 'fullscreenchange',
    'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange', 'fullscreenerror',
    'mozfullscreenerror', 'webkitfullscreenerror', 'msfullscreenerror', 'readystatechange',
    'visibilitychange', 'resume'
];
var windowEventNames = [
    'absolutedeviceorientation',
    'afterinput',
    'afterprint',
    'appinstalled',
    'beforeinstallprompt',
    'beforeprint',
    'beforeunload',
    'devicelight',
    'devicemotion',
    'deviceorientation',
    'deviceorientationabsolute',
    'deviceproximity',
    'hashchange',
    'languagechange',
    'message',
    'mozbeforepaint',
    'offline',
    'online',
    'paint',
    'pageshow',
    'pagehide',
    'popstate',
    'rejectionhandled',
    'storage',
    'unhandledrejection',
    'unload',
    'userproximity',
    'vrdisplyconnected',
    'vrdisplaydisconnected',
    'vrdisplaypresentchange'
];
var htmlElementEventNames = [
    'beforecopy', 'beforecut', 'beforepaste', 'copy', 'cut', 'paste', 'dragstart', 'loadend',
    'animationstart', 'search', 'transitionrun', 'transitionstart', 'webkitanimationend',
    'webkitanimationiteration', 'webkitanimationstart', 'webkittransitionend'
];
var mediaElementEventNames = ['encrypted', 'waitingforkey', 'msneedkey', 'mozinterruptbegin', 'mozinterruptend'];
var ieElementEventNames = [
    'activate',
    'afterupdate',
    'ariarequest',
    'beforeactivate',
    'beforedeactivate',
    'beforeeditfocus',
    'beforeupdate',
    'cellchange',
    'controlselect',
    'dataavailable',
    'datasetchanged',
    'datasetcomplete',
    'errorupdate',
    'filterchange',
    'layoutcomplete',
    'losecapture',
    'move',
    'moveend',
    'movestart',
    'propertychange',
    'resizeend',
    'resizestart',
    'rowenter',
    'rowexit',
    'rowsdelete',
    'rowsinserted',
    'command',
    'compassneedscalibration',
    'deactivate',
    'help',
    'mscontentzoom',
    'msmanipulationstatechanged',
    'msgesturechange',
    'msgesturedoubletap',
    'msgestureend',
    'msgesturehold',
    'msgesturestart',
    'msgesturetap',
    'msgotpointercapture',
    'msinertiastart',
    'mslostpointercapture',
    'mspointercancel',
    'mspointerdown',
    'mspointerenter',
    'mspointerhover',
    'mspointerleave',
    'mspointermove',
    'mspointerout',
    'mspointerover',
    'mspointerup',
    'pointerout',
    'mssitemodejumplistitemremoved',
    'msthumbnailclick',
    'stop',
    'storagecommit'
];
var webglEventNames = ['webglcontextrestored', 'webglcontextlost', 'webglcontextcreationerror'];
var formEventNames = ['autocomplete', 'autocompleteerror'];
var detailEventNames = ['toggle'];
var frameEventNames = ['load'];
var frameSetEventNames = ['blur', 'error', 'focus', 'load', 'resize', 'scroll', 'messageerror'];
var marqueeEventNames = ['bounce', 'finish', 'start'];
var XMLHttpRequestEventNames = [
    'loadstart', 'progress', 'abort', 'error', 'load', 'progress', 'timeout', 'loadend',
    'readystatechange'
];
var IDBIndexEventNames = ['upgradeneeded', 'complete', 'abort', 'success', 'error', 'blocked', 'versionchange', 'close'];
var websocketEventNames = ['close', 'error', 'open', 'message'];
var workerEventNames = ['error', 'message'];
var eventNames = globalEventHandlersEventNames.concat(webglEventNames, formEventNames, detailEventNames, documentEventNames, windowEventNames, htmlElementEventNames, ieElementEventNames);
function filterProperties(target, onProperties, ignoreProperties) {
    if (!ignoreProperties || ignoreProperties.length === 0) {
        return onProperties;
    }
    var tip = ignoreProperties.filter(function (ip) { return ip.target === target; });
    if (!tip || tip.length === 0) {
        return onProperties;
    }
    var targetIgnoreProperties = tip[0].ignoreProperties;
    return onProperties.filter(function (op) { return targetIgnoreProperties.indexOf(op) === -1; });
}
function patchFilteredProperties(target, onProperties, ignoreProperties, prototype) {
    // check whether target is available, sometimes target will be undefined
    // because different browser or some 3rd party plugin.
    if (!target) {
        return;
    }
    var filteredProperties = filterProperties(target, onProperties, ignoreProperties);
    patchOnProperties(target, filteredProperties, prototype);
}
function propertyDescriptorPatch(api, _global) {
    if (isNode && !isMix) {
        return;
    }
    var supportsWebSocket = typeof WebSocket !== 'undefined';
    if (canPatchViaPropertyDescriptor()) {
        var ignoreProperties = _global['__Zone_ignore_on_properties'];
        // for browsers that we can patch the descriptor:  Chrome & Firefox
        if (isBrowser) {
            var internalWindow = window;
            var ignoreErrorProperties = isIE ? [{ target: internalWindow, ignoreProperties: ['error'] }] : [];
            // in IE/Edge, onProp not exist in window object, but in WindowPrototype
            // so we need to pass WindowPrototype to check onProp exist or not
            patchFilteredProperties(internalWindow, eventNames.concat(['messageerror']), ignoreProperties ? ignoreProperties.concat(ignoreErrorProperties) : ignoreProperties, ObjectGetPrototypeOf(internalWindow));
            patchFilteredProperties(Document.prototype, eventNames, ignoreProperties);
            if (typeof internalWindow['SVGElement'] !== 'undefined') {
                patchFilteredProperties(internalWindow['SVGElement'].prototype, eventNames, ignoreProperties);
            }
            patchFilteredProperties(Element.prototype, eventNames, ignoreProperties);
            patchFilteredProperties(HTMLElement.prototype, eventNames, ignoreProperties);
            patchFilteredProperties(HTMLMediaElement.prototype, mediaElementEventNames, ignoreProperties);
            patchFilteredProperties(HTMLFrameSetElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLBodyElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLFrameElement.prototype, frameEventNames, ignoreProperties);
            patchFilteredProperties(HTMLIFrameElement.prototype, frameEventNames, ignoreProperties);
            var HTMLMarqueeElement_1 = internalWindow['HTMLMarqueeElement'];
            if (HTMLMarqueeElement_1) {
                patchFilteredProperties(HTMLMarqueeElement_1.prototype, marqueeEventNames, ignoreProperties);
            }
            var Worker_1 = internalWindow['Worker'];
            if (Worker_1) {
                patchFilteredProperties(Worker_1.prototype, workerEventNames, ignoreProperties);
            }
        }
        patchFilteredProperties(XMLHttpRequest.prototype, XMLHttpRequestEventNames, ignoreProperties);
        var XMLHttpRequestEventTarget_1 = _global['XMLHttpRequestEventTarget'];
        if (XMLHttpRequestEventTarget_1) {
            patchFilteredProperties(XMLHttpRequestEventTarget_1 && XMLHttpRequestEventTarget_1.prototype, XMLHttpRequestEventNames, ignoreProperties);
        }
        if (typeof IDBIndex !== 'undefined') {
            patchFilteredProperties(IDBIndex.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBOpenDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBDatabase.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBTransaction.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBCursor.prototype, IDBIndexEventNames, ignoreProperties);
        }
        if (supportsWebSocket) {
            patchFilteredProperties(WebSocket.prototype, websocketEventNames, ignoreProperties);
        }
    }
    else {
        // Safari, Android browsers (Jelly Bean)
        patchViaCapturingAllTheEvents();
        patchClass('XMLHttpRequest');
        if (supportsWebSocket) {
            apply(api, _global);
        }
    }
}
function canPatchViaPropertyDescriptor() {
    if ((isBrowser || isMix) && !ObjectGetOwnPropertyDescriptor(HTMLElement.prototype, 'onclick') &&
        typeof Element !== 'undefined') {
        // WebKit https://bugs.webkit.org/show_bug.cgi?id=134364
        // IDL interface attributes are not configurable
        var desc = ObjectGetOwnPropertyDescriptor(Element.prototype, 'onclick');
        if (desc && !desc.configurable)
            return false;
    }
    var ON_READY_STATE_CHANGE = 'onreadystatechange';
    var XMLHttpRequestPrototype = XMLHttpRequest.prototype;
    var xhrDesc = ObjectGetOwnPropertyDescriptor(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE);
    // add enumerable and configurable here because in opera
    // by default XMLHttpRequest.prototype.onreadystatechange is undefined
    // without adding enumerable and configurable will cause onreadystatechange
    // non-configurable
    // and if XMLHttpRequest.prototype.onreadystatechange is undefined,
    // we should set a real desc instead a fake one
    if (xhrDesc) {
        ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, {
            enumerable: true,
            configurable: true,
            get: function () {
                return true;
            }
        });
        var req = new XMLHttpRequest();
        var result = !!req.onreadystatechange;
        // restore original desc
        ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, xhrDesc || {});
        return result;
    }
    else {
        var SYMBOL_FAKE_ONREADYSTATECHANGE_1 = zoneSymbol('fake');
        ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, {
            enumerable: true,
            configurable: true,
            get: function () {
                return this[SYMBOL_FAKE_ONREADYSTATECHANGE_1];
            },
            set: function (value) {
                this[SYMBOL_FAKE_ONREADYSTATECHANGE_1] = value;
            }
        });
        var req = new XMLHttpRequest();
        var detectFunc = function () { };
        req.onreadystatechange = detectFunc;
        var result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc;
        req.onreadystatechange = null;
        return result;
    }
}
var unboundKey = zoneSymbol('unbound');
// Whenever any eventListener fires, we check the eventListener target and all parents
// for `onwhatever` properties and replace them with zone-bound functions
// - Chrome (for now)
function patchViaCapturingAllTheEvents() {
    var _loop_1 = function (i) {
        var property = eventNames[i];
        var onproperty = 'on' + property;
        self.addEventListener(property, function (event) {
            var elt = event.target, bound, source;
            if (elt) {
                source = elt.constructor['name'] + '.' + onproperty;
            }
            else {
                source = 'unknown.' + onproperty;
            }
            while (elt) {
                if (elt[onproperty] && !elt[onproperty][unboundKey]) {
                    bound = wrapWithCurrentZone(elt[onproperty], source);
                    bound[unboundKey] = elt[onproperty];
                    elt[onproperty] = bound;
                }
                elt = elt.parentElement;
            }
        }, true);
    };
    for (var i = 0; i < eventNames.length; i++) {
        _loop_1(i);
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function eventTargetPatch(_global, api) {
    var WTF_ISSUE_555 = 'Anchor,Area,Audio,BR,Base,BaseFont,Body,Button,Canvas,Content,DList,Directory,Div,Embed,FieldSet,Font,Form,Frame,FrameSet,HR,Head,Heading,Html,IFrame,Image,Input,Keygen,LI,Label,Legend,Link,Map,Marquee,Media,Menu,Meta,Meter,Mod,OList,Object,OptGroup,Option,Output,Paragraph,Pre,Progress,Quote,Script,Select,Source,Span,Style,TableCaption,TableCell,TableCol,Table,TableRow,TableSection,TextArea,Title,Track,UList,Unknown,Video';
    var NO_EVENT_TARGET = 'ApplicationCache,EventSource,FileReader,InputMethodContext,MediaController,MessagePort,Node,Performance,SVGElementInstance,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebKitNamedFlow,Window,Worker,WorkerGlobalScope,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload,IDBRequest,IDBOpenDBRequest,IDBDatabase,IDBTransaction,IDBCursor,DBIndex,WebSocket'
        .split(',');
    var EVENT_TARGET = 'EventTarget';
    var apis = [];
    var isWtf = _global['wtf'];
    var WTF_ISSUE_555_ARRAY = WTF_ISSUE_555.split(',');
    if (isWtf) {
        // Workaround for: https://github.com/google/tracing-framework/issues/555
        apis = WTF_ISSUE_555_ARRAY.map(function (v) { return 'HTML' + v + 'Element'; }).concat(NO_EVENT_TARGET);
    }
    else if (_global[EVENT_TARGET]) {
        apis.push(EVENT_TARGET);
    }
    else {
        // Note: EventTarget is not available in all browsers,
        // if it's not available, we instead patch the APIs in the IDL that inherit from EventTarget
        apis = NO_EVENT_TARGET;
    }
    var isDisableIECheck = _global['__Zone_disable_IE_check'] || false;
    var isEnableCrossContextCheck = _global['__Zone_enable_cross_context_check'] || false;
    var ieOrEdge = isIEOrEdge();
    var ADD_EVENT_LISTENER_SOURCE = '.addEventListener:';
    var FUNCTION_WRAPPER = '[object FunctionWrapper]';
    var BROWSER_TOOLS = 'function __BROWSERTOOLS_CONSOLE_SAFEFUNC() { [native code] }';
    //  predefine all __zone_symbol__ + eventName + true/false string
    for (var i = 0; i < eventNames.length; i++) {
        var eventName = eventNames[i];
        var falseEventName = eventName + FALSE_STR;
        var trueEventName = eventName + TRUE_STR;
        var symbol = ZONE_SYMBOL_PREFIX + falseEventName;
        var symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
        zoneSymbolEventNames$1[eventName] = {};
        zoneSymbolEventNames$1[eventName][FALSE_STR] = symbol;
        zoneSymbolEventNames$1[eventName][TRUE_STR] = symbolCapture;
    }
    //  predefine all task.source string
    for (var i = 0; i < WTF_ISSUE_555.length; i++) {
        var target = WTF_ISSUE_555_ARRAY[i];
        var targets = globalSources[target] = {};
        for (var j = 0; j < eventNames.length; j++) {
            var eventName = eventNames[j];
            targets[eventName] = target + ADD_EVENT_LISTENER_SOURCE + eventName;
        }
    }
    var checkIEAndCrossContext = function (nativeDelegate, delegate, target, args) {
        if (!isDisableIECheck && ieOrEdge) {
            if (isEnableCrossContextCheck) {
                try {
                    var testString = delegate.toString();
                    if ((testString === FUNCTION_WRAPPER || testString == BROWSER_TOOLS)) {
                        nativeDelegate.apply(target, args);
                        return false;
                    }
                }
                catch (error) {
                    nativeDelegate.apply(target, args);
                    return false;
                }
            }
            else {
                var testString = delegate.toString();
                if ((testString === FUNCTION_WRAPPER || testString == BROWSER_TOOLS)) {
                    nativeDelegate.apply(target, args);
                    return false;
                }
            }
        }
        else if (isEnableCrossContextCheck) {
            try {
                delegate.toString();
            }
            catch (error) {
                nativeDelegate.apply(target, args);
                return false;
            }
        }
        return true;
    };
    var apiTypes = [];
    for (var i = 0; i < apis.length; i++) {
        var type = _global[apis[i]];
        apiTypes.push(type && type.prototype);
    }
    // vh is validateHandler to check event handler
    // is valid or not(for security check)
    patchEventTarget(_global, apiTypes, { vh: checkIEAndCrossContext });
    api.patchEventTarget = patchEventTarget;
    return true;
}
function patchEvent(global, api) {
    patchEventPrototype(global, api);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function patchCallbacks(target, targetName, method, callbacks) {
    var symbol = Zone.__symbol__(method);
    if (target[symbol]) {
        return;
    }
    var nativeDelegate = target[symbol] = target[method];
    target[method] = function (name, opts, options) {
        if (opts && opts.prototype) {
            callbacks.forEach(function (callback) {
                var source = targetName + "." + method + "::" + callback;
                var prototype = opts.prototype;
                if (prototype.hasOwnProperty(callback)) {
                    var descriptor = ObjectGetOwnPropertyDescriptor(prototype, callback);
                    if (descriptor && descriptor.value) {
                        descriptor.value = wrapWithCurrentZone(descriptor.value, source);
                        _redefineProperty(opts.prototype, callback, descriptor);
                    }
                    else if (prototype[callback]) {
                        prototype[callback] = wrapWithCurrentZone(prototype[callback], source);
                    }
                }
                else if (prototype[callback]) {
                    prototype[callback] = wrapWithCurrentZone(prototype[callback], source);
                }
            });
        }
        return nativeDelegate.call(target, name, opts, options);
    };
    attachOriginToPatched(target[method], nativeDelegate);
}
function registerElementPatch(_global) {
    if ((!isBrowser && !isMix) || !('registerElement' in _global.document)) {
        return;
    }
    var callbacks = ['createdCallback', 'attachedCallback', 'detachedCallback', 'attributeChangedCallback'];
    patchCallbacks(document, 'Document', 'registerElement', callbacks);
}
function patchCustomElements(_global) {
    if ((!isBrowser && !isMix) || !('customElements' in _global)) {
        return;
    }
    var callbacks = ['connectedCallback', 'disconnectedCallback', 'adoptedCallback', 'attributeChangedCallback'];
    patchCallbacks(_global.customElements, 'customElements', 'define', callbacks);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
Zone.__load_patch('util', function (global, Zone, api) {
    api.patchOnProperties = patchOnProperties;
    api.patchMethod = patchMethod;
    api.bindArguments = bindArguments;
});
Zone.__load_patch('timers', function (global) {
    var set = 'set';
    var clear = 'clear';
    patchTimer(global, set, clear, 'Timeout');
    patchTimer(global, set, clear, 'Interval');
    patchTimer(global, set, clear, 'Immediate');
});
Zone.__load_patch('requestAnimationFrame', function (global) {
    patchTimer(global, 'request', 'cancel', 'AnimationFrame');
    patchTimer(global, 'mozRequest', 'mozCancel', 'AnimationFrame');
    patchTimer(global, 'webkitRequest', 'webkitCancel', 'AnimationFrame');
});
Zone.__load_patch('blocking', function (global, Zone) {
    var blockingMethods = ['alert', 'prompt', 'confirm'];
    for (var i = 0; i < blockingMethods.length; i++) {
        var name_1 = blockingMethods[i];
        patchMethod(global, name_1, function (delegate, symbol, name) {
            return function (s, args) {
                return Zone.current.run(delegate, global, args, name);
            };
        });
    }
});
Zone.__load_patch('EventTarget', function (global, Zone, api) {
    // load blackListEvents from global
    var SYMBOL_BLACK_LISTED_EVENTS = Zone.__symbol__('BLACK_LISTED_EVENTS');
    if (global[SYMBOL_BLACK_LISTED_EVENTS]) {
        Zone[SYMBOL_BLACK_LISTED_EVENTS] = global[SYMBOL_BLACK_LISTED_EVENTS];
    }
    patchEvent(global, api);
    eventTargetPatch(global, api);
    // patch XMLHttpRequestEventTarget's addEventListener/removeEventListener
    var XMLHttpRequestEventTarget = global['XMLHttpRequestEventTarget'];
    if (XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype) {
        api.patchEventTarget(global, [XMLHttpRequestEventTarget.prototype]);
    }
    patchClass('MutationObserver');
    patchClass('WebKitMutationObserver');
    patchClass('IntersectionObserver');
    patchClass('FileReader');
});
Zone.__load_patch('on_property', function (global, Zone, api) {
    propertyDescriptorPatch(api, global);
    propertyPatch();
});
Zone.__load_patch('customElements', function (global, Zone, api) {
    registerElementPatch(global);
    patchCustomElements(global);
});
Zone.__load_patch('canvas', function (global) {
    var HTMLCanvasElement = global['HTMLCanvasElement'];
    if (typeof HTMLCanvasElement !== 'undefined' && HTMLCanvasElement.prototype &&
        HTMLCanvasElement.prototype.toBlob) {
        patchMacroTask(HTMLCanvasElement.prototype, 'toBlob', function (self, args) {
            return { name: 'HTMLCanvasElement.toBlob', target: self, cbIdx: 0, args: args };
        });
    }
});
Zone.__load_patch('XHR', function (global, Zone) {
    // Treat XMLHttpRequest as a macrotask.
    patchXHR(global);
    var XHR_TASK = zoneSymbol('xhrTask');
    var XHR_SYNC = zoneSymbol('xhrSync');
    var XHR_LISTENER = zoneSymbol('xhrListener');
    var XHR_SCHEDULED = zoneSymbol('xhrScheduled');
    var XHR_URL = zoneSymbol('xhrURL');
    var XHR_ERROR_BEFORE_SCHEDULED = zoneSymbol('xhrErrorBeforeScheduled');
    function patchXHR(window) {
        var XMLHttpRequestPrototype = XMLHttpRequest.prototype;
        function findPendingTask(target) {
            return target[XHR_TASK];
        }
        var oriAddListener = XMLHttpRequestPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
        var oriRemoveListener = XMLHttpRequestPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
        if (!oriAddListener) {
            var XMLHttpRequestEventTarget_1 = window['XMLHttpRequestEventTarget'];
            if (XMLHttpRequestEventTarget_1) {
                var XMLHttpRequestEventTargetPrototype = XMLHttpRequestEventTarget_1.prototype;
                oriAddListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
                oriRemoveListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
            }
        }
        var READY_STATE_CHANGE = 'readystatechange';
        var SCHEDULED = 'scheduled';
        function scheduleTask(task) {
            var data = task.data;
            var target = data.target;
            target[XHR_SCHEDULED] = false;
            target[XHR_ERROR_BEFORE_SCHEDULED] = false;
            // remove existing event listener
            var listener = target[XHR_LISTENER];
            if (!oriAddListener) {
                oriAddListener = target[ZONE_SYMBOL_ADD_EVENT_LISTENER];
                oriRemoveListener = target[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
            }
            if (listener) {
                oriRemoveListener.call(target, READY_STATE_CHANGE, listener);
            }
            var newListener = target[XHR_LISTENER] = function () {
                if (target.readyState === target.DONE) {
                    // sometimes on some browsers XMLHttpRequest will fire onreadystatechange with
                    // readyState=4 multiple times, so we need to check task state here
                    if (!data.aborted && target[XHR_SCHEDULED] && task.state === SCHEDULED) {
                        // check whether the xhr has registered onload listener
                        // if that is the case, the task should invoke after all
                        // onload listeners finish.
                        var loadTasks = target['__zone_symbol__loadfalse'];
                        if (loadTasks && loadTasks.length > 0) {
                            var oriInvoke_1 = task.invoke;
                            task.invoke = function () {
                                // need to load the tasks again, because in other
                                // load listener, they may remove themselves
                                var loadTasks = target['__zone_symbol__loadfalse'];
                                for (var i = 0; i < loadTasks.length; i++) {
                                    if (loadTasks[i] === task) {
                                        loadTasks.splice(i, 1);
                                    }
                                }
                                if (!data.aborted && task.state === SCHEDULED) {
                                    oriInvoke_1.call(task);
                                }
                            };
                            loadTasks.push(task);
                        }
                        else {
                            task.invoke();
                        }
                    }
                    else if (!data.aborted && target[XHR_SCHEDULED] === false) {
                        // error occurs when xhr.send()
                        target[XHR_ERROR_BEFORE_SCHEDULED] = true;
                    }
                }
            };
            oriAddListener.call(target, READY_STATE_CHANGE, newListener);
            var storedTask = target[XHR_TASK];
            if (!storedTask) {
                target[XHR_TASK] = task;
            }
            sendNative.apply(target, data.args);
            target[XHR_SCHEDULED] = true;
            return task;
        }
        function placeholderCallback() { }
        function clearTask(task) {
            var data = task.data;
            // Note - ideally, we would call data.target.removeEventListener here, but it's too late
            // to prevent it from firing. So instead, we store info for the event listener.
            data.aborted = true;
            return abortNative.apply(data.target, data.args);
        }
        var openNative = patchMethod(XMLHttpRequestPrototype, 'open', function () { return function (self, args) {
            self[XHR_SYNC] = args[2] == false;
            self[XHR_URL] = args[1];
            return openNative.apply(self, args);
        }; });
        var XMLHTTPREQUEST_SOURCE = 'XMLHttpRequest.send';
        var fetchTaskAborting = zoneSymbol('fetchTaskAborting');
        var fetchTaskScheduling = zoneSymbol('fetchTaskScheduling');
        var sendNative = patchMethod(XMLHttpRequestPrototype, 'send', function () { return function (self, args) {
            if (Zone.current[fetchTaskScheduling] === true) {
                // a fetch is scheduling, so we are using xhr to polyfill fetch
                // and because we already schedule macroTask for fetch, we should
                // not schedule a macroTask for xhr again
                return sendNative.apply(self, args);
            }
            if (self[XHR_SYNC]) {
                // if the XHR is sync there is no task to schedule, just execute the code.
                return sendNative.apply(self, args);
            }
            else {
                var options = { target: self, url: self[XHR_URL], isPeriodic: false, args: args, aborted: false };
                var task = scheduleMacroTaskWithCurrentZone(XMLHTTPREQUEST_SOURCE, placeholderCallback, options, scheduleTask, clearTask);
                if (self && self[XHR_ERROR_BEFORE_SCHEDULED] === true && !options.aborted &&
                    task.state === SCHEDULED) {
                    // xhr request throw error when send
                    // we should invoke task instead of leaving a scheduled
                    // pending macroTask
                    task.invoke();
                }
            }
        }; });
        var abortNative = patchMethod(XMLHttpRequestPrototype, 'abort', function () { return function (self, args) {
            var task = findPendingTask(self);
            if (task && typeof task.type == 'string') {
                // If the XHR has already completed, do nothing.
                // If the XHR has already been aborted, do nothing.
                // Fix #569, call abort multiple times before done will cause
                // macroTask task count be negative number
                if (task.cancelFn == null || (task.data && task.data.aborted)) {
                    return;
                }
                task.zone.cancelTask(task);
            }
            else if (Zone.current[fetchTaskAborting] === true) {
                // the abort is called from fetch polyfill, we need to call native abort of XHR.
                return abortNative.apply(self, args);
            }
            // Otherwise, we are trying to abort an XHR which has not yet been sent, so there is no
            // task
            // to cancel. Do nothing.
        }; });
    }
});
Zone.__load_patch('geolocation', function (global) {
    /// GEO_LOCATION
    if (global['navigator'] && global['navigator'].geolocation) {
        patchPrototype(global['navigator'].geolocation, ['getCurrentPosition', 'watchPosition']);
    }
});
Zone.__load_patch('PromiseRejectionEvent', function (global, Zone) {
    // handle unhandled promise rejection
    function findPromiseRejectionHandler(evtName) {
        return function (e) {
            var eventTasks = findEventTasks(global, evtName);
            eventTasks.forEach(function (eventTask) {
                // windows has added unhandledrejection event listener
                // trigger the event listener
                var PromiseRejectionEvent = global['PromiseRejectionEvent'];
                if (PromiseRejectionEvent) {
                    var evt = new PromiseRejectionEvent(evtName, { promise: e.promise, reason: e.rejection });
                    eventTask.invoke(evt);
                }
            });
        };
    }
    if (global['PromiseRejectionEvent']) {
        Zone[zoneSymbol('unhandledPromiseRejectionHandler')] =
            findPromiseRejectionHandler('unhandledrejection');
        Zone[zoneSymbol('rejectionHandledHandler')] =
            findPromiseRejectionHandler('rejectionhandled');
    }
});

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

})));


/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"src/app/about/about.module": [
		"./src/app/about/about.module.ts",
		"src-app-about-about-module"
	],
	"src/app/course/course.module": [
		"./src/app/course/course.module.ts",
		"common",
		"src-app-course-course-module"
	],
	"src/app/ebook/ebook.module": [
		"./src/app/ebook/ebook.module.ts",
		"common",
		"src-app-ebook-ebook-module"
	],
	"src/app/howto/howto.module": [
		"./src/app/howto/howto.module.ts",
		"common",
		"src-app-howto-howto-module"
	],
	"src/app/mentor/mentor.module": [
		"./src/app/mentor/mentor.module.ts",
		"common",
		"src-app-mentor-mentor-module"
	],
	"src/app/user/user.module": [
		"./src/app/user/user.module.ts",
		"src-app-user-user-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		var id = ids[0];
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/admin/admin.component.html":
/*!********************************************!*\
  !*** ./src/app/admin/admin.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Page Content -->\r\n<div class=\"container-fluid min-vh-100\">\r\n  <div class=\"admin-home\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-3 sd\">\r\n        <admin-sidebar></admin-sidebar>\r\n      </div>\r\n      <div class=\"col-md-8 \">\r\n        <hr class=\"mb-5\">\r\n        <form method=\"GET\" id=\"admin-create-form\" action=\"\">\r\n          <div class=\"form-group\">\r\n            <input id=\"title\" name=\"title\" type=\"text\" class=\"form-control-lg\" placeholder=\"Blog title\">\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <input id=\"description\" name=\"description\" type=\"text\" class=\"form-control-lg\" placeholder=\"Description\">\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <input id=\"title-image\" name=\"title-image\" type=\"file\" class=\"form-control-file\" placeholder=\"Title image\">\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <button name=\"submit\" type=\"submit\" class=\"form-control-lg btn-danger\"\r\n              aria-placeholder=\"submit form\">Submit</button>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <!-- /.row -->\r\n</div>\r\n<!-- /.container -->\r\n"

/***/ }),

/***/ "./src/app/admin/admin.component.ts":
/*!******************************************!*\
  !*** ./src/app/admin/admin.component.ts ***!
  \******************************************/
/*! exports provided: AdminComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminComponent", function() { return AdminComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AdminComponent = /** @class */ (function () {
    function AdminComponent() {
    }
    AdminComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-admin',
            template: __webpack_require__(/*! ./admin.component.html */ "./src/app/admin/admin.component.html"),
            styles: ["\n        \n    "]
        })
    ], AdminComponent);
    return AdminComponent;
}());



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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");



var AppComponent = /** @class */ (function () {
    // @Input() title:any = "Webtuitor"
    function AppComponent(titleService) {
        this.titleService = titleService;
    }
    AppComponent.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle(newTitle);
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: "\n    <title>WebTuitor</title>\n    <app-navbar></app-navbar>\n    <router-outlet></router-outlet>\n    <app-footer></app-footer>\n  "
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Title"]])
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routes */ "./src/app/routes.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _layouts_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./layouts/navbar/navbar.component */ "./src/app/layouts/navbar/navbar.component.ts");
/* harmony import */ var _webtuitor_webtuitor_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./webtuitor/webtuitor.component */ "./src/app/webtuitor/webtuitor.component.ts");
/* harmony import */ var _layouts_footer_footer_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./layouts/footer/footer.component */ "./src/app/layouts/footer/footer.component.ts");
/* harmony import */ var _layouts_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./layouts/sidebar/sidebar.component */ "./src/app/layouts/sidebar/sidebar.component.ts");
/* harmony import */ var _admin_admin_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./admin/admin.component */ "./src/app/admin/admin.component.ts");
/* harmony import */ var _layouts_admin_admin_sidebar_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./layouts/admin/admin-sidebar.component */ "./src/app/layouts/admin/admin-sidebar.component.ts");
/* harmony import */ var _webtuitor_nav_tabs_courses_tab_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./webtuitor/nav-tabs/courses-tab.component */ "./src/app/webtuitor/nav-tabs/courses-tab.component.ts");
/* harmony import */ var _course_course_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./course/course.service */ "./src/app/course/course.service.ts");
/* harmony import */ var _howto_howto_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./howto/howto.service */ "./src/app/howto/howto.service.ts");
/* harmony import */ var _ebook_ebook_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./ebook/ebook.service */ "./src/app/ebook/ebook.service.ts");
/* harmony import */ var _webtuitor_nav_tabs_ebook_tab_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./webtuitor/nav-tabs/ebook-tab.component */ "./src/app/webtuitor/nav-tabs/ebook-tab.component.ts");
/* harmony import */ var _errors_404_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./errors/404.component */ "./src/app/errors/404.component.ts");
/* harmony import */ var _course_course_post_course_route_activator_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./course/course-post/course-route-activator.service */ "./src/app/course/course-post/course-route-activator.service.ts");
/* harmony import */ var _webtuitor_nav_tabs_howto_tab_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./webtuitor/nav-tabs/howto-tab.component */ "./src/app/webtuitor/nav-tabs/howto-tab.component.ts");
/* harmony import */ var _ebook_ebook_post_ebook_route_activator_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./ebook/ebook-post/ebook-route-activator.service */ "./src/app/ebook/ebook-post/ebook-route-activator.service.ts");
/* harmony import */ var _howto_howto_post_howto_route_activator_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./howto/howto-post/howto-route-activator.service */ "./src/app/howto/howto-post/howto-route-activator.service.ts");
/* harmony import */ var _untility_string_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./untility/string.service */ "./src/app/untility/string.service.ts");
/* harmony import */ var _mentor_mentor_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./mentor/mentor.service */ "./src/app/mentor/mentor.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _mentor_mentor_resolver_service__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./mentor/mentor-resolver.service */ "./src/app/mentor/mentor-resolver.service.ts");
/* harmony import */ var _mentor_mentor_page_mentor_page_resolver_service__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./mentor/mentor-page/mentor-page-resolver.service */ "./src/app/mentor/mentor-page/mentor-page-resolver.service.ts");
/* harmony import */ var _user_auth_service__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./user/auth.service */ "./src/app/user/auth.service.ts");




























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _layouts_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_6__["NavbarComponent"],
                _layouts_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_9__["SidebarComponent"],
                _layouts_footer_footer_component__WEBPACK_IMPORTED_MODULE_8__["FooterComponent"],
                _webtuitor_webtuitor_component__WEBPACK_IMPORTED_MODULE_7__["WebtuitorComponent"],
                _admin_admin_component__WEBPACK_IMPORTED_MODULE_10__["AdminComponent"],
                _layouts_admin_admin_sidebar_component__WEBPACK_IMPORTED_MODULE_11__["AdminSidebarComponent"],
                _webtuitor_nav_tabs_courses_tab_component__WEBPACK_IMPORTED_MODULE_12__["CourseTabComponent"],
                _webtuitor_nav_tabs_howto_tab_component__WEBPACK_IMPORTED_MODULE_19__["HowtoTabComponent"],
                _webtuitor_nav_tabs_ebook_tab_component__WEBPACK_IMPORTED_MODULE_16__["EbookTabComponent"],
                _errors_404_component__WEBPACK_IMPORTED_MODULE_17__["Error404Component"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_24__["FormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forRoot(_routes__WEBPACK_IMPORTED_MODULE_4__["appRoutes"])
            ],
            providers: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["Title"], _course_course_service__WEBPACK_IMPORTED_MODULE_13__["CourseService"], _howto_howto_service__WEBPACK_IMPORTED_MODULE_14__["HowtoService"], _ebook_ebook_service__WEBPACK_IMPORTED_MODULE_15__["EbookService"], _course_course_post_course_route_activator_service__WEBPACK_IMPORTED_MODULE_18__["CourseRouteActivator"], _ebook_ebook_post_ebook_route_activator_service__WEBPACK_IMPORTED_MODULE_20__["EbookRouteActivator"],
                _howto_howto_post_howto_route_activator_service__WEBPACK_IMPORTED_MODULE_21__["HowtoRouteActivator"], _untility_string_service__WEBPACK_IMPORTED_MODULE_22__["StringService"], _mentor_mentor_service__WEBPACK_IMPORTED_MODULE_23__["MentorService"], _mentor_mentor_resolver_service__WEBPACK_IMPORTED_MODULE_25__["MentorResolver"], _mentor_mentor_page_mentor_page_resolver_service__WEBPACK_IMPORTED_MODULE_26__["MentorPageResolver"], _user_auth_service__WEBPACK_IMPORTED_MODULE_27__["AuthService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]],
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/course/course-post/course-route-activator.service.ts":
/*!**********************************************************************!*\
  !*** ./src/app/course/course-post/course-route-activator.service.ts ***!
  \**********************************************************************/
/*! exports provided: CourseRouteActivator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CourseRouteActivator", function() { return CourseRouteActivator; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _course_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../course.service */ "./src/app/course/course.service.ts");




var CourseRouteActivator = /** @class */ (function () {
    function CourseRouteActivator(courseService, router) {
        this.courseService = courseService;
        this.router = router;
    }
    CourseRouteActivator.prototype.canActivate = function (route) {
        var courseExist = !!this.courseService.getCourse(route.params['link']);
        if (!courseExist)
            this.router.navigate(['404']);
        return courseExist;
    };
    CourseRouteActivator = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_course_service__WEBPACK_IMPORTED_MODULE_3__["CourseService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], CourseRouteActivator);
    return CourseRouteActivator;
}());



/***/ }),

/***/ "./src/app/course/course.service.ts":
/*!******************************************!*\
  !*** ./src/app/course/course.service.ts ***!
  \******************************************/
/*! exports provided: CourseService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CourseService", function() { return CourseService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var CourseService = /** @class */ (function () {
    function CourseService() {
    }
    CourseService.prototype.getCourses = function () {
        return Courses;
    };
    CourseService.prototype.getCourse = function (link) {
        return Courses.find(function (course) { return course.link == link; });
    };
    CourseService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], CourseService);
    return CourseService;
}());

var Courses = [
    {
        id: 1,
        link: 'angular-2',
        name: 'Angular 2',
        img: '../../../assets/img/undraw_coding_6mjf.svg',
        published: '20th Oct, 2020',
        totalTime: '2 hours',
        description: "In this series, you'll learn how to use React Native to create page layouts commonly \n        used in mobile apps. The layouts you'll be creating won't be functional\u2014instead, the main focus of \n        this series is to get your hands dirty in laying out content in your React Native apps",
        created_by: 'yjbdanquah',
        level: 'Beginner',
        tags: 'web develpment, web design, angular, frameworks, javascript, javascript frameworks',
        related: 'Angular Routes',
        topics: [
            'Setting up environment',
            'Next Lesson',
            'Next Lesson',
            'Next Lesson',
            'Next Lesson',
            'Next Lesson',
            'Next Lesson',
            'Next Lesson',
            'Next Lesson'
        ],
        content: "Getting Started\n\n        In this tutorial, we will use the Expo CLI. Expo is a set of tools and services built around React Native and native platforms that help you develop, build, deploy, and quickly iterate on iOS, Android, and web apps from the same JavaScript or TypeScript codebase. \n        \n        Expo is the easiest and fastest way to build React Native apps. The official Expo get started guide contains detailed instructions on how to download and configure Expo CLI for the major operating systems.\n        \n        Create a new project\n        1\n            \n        expo init LoginLayout\n        \n        You will be prompted to choose the type of project to initialize. Choose Managed workflow and blank. Wait a few seconds for Expo to install the project files and change the directory into the new project.\n        1\n            \n        cd LoginLayout\n        \n        The project structure should look like this. ",
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus",
                subcomments: [
                    {
                        id: 1,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Kwame Boateng',
                        comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                        fringilla. Donec lacinia congue felis in faucibus"
                    },
                    {
                        id: 2,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Sarah Osei',
                        comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                        fringilla. Donec lacinia congue felis in faucibus"
                    }
                ]
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            }
        ]
    },
    {
        id: 2,
        link: 'vuejs',
        name: 'Vuejs',
        img: '../../../assets/img/undraw_coding_6mjf.svg',
        published: '9th Sept, 2019',
        totalTime: '4 hours',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? \n        Illum maiores cum dolorum error sit odit.",
        content: '',
        topics: [
            'Setting up environment',
            'Next Lesson',
            'Next Lesson',
            'Next Lesson',
            'Next Lesson',
            'Next Lesson',
            'Next Lesson',
            'Next Lesson',
            'Next Lesson'
        ],
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus",
                subcomments: [
                    {
                        id: 1,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Kwame Boateng',
                        comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                        fringilla. Donec lacinia congue felis in faucibus"
                    },
                    {
                        id: 2,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Sarah Osei',
                        comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                        fringilla. Donec lacinia congue felis in faucibus"
                    }
                ]
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            }
        ]
    },
    {
        id: 3,
        link: 'react-native-basis',
        name: 'React Native',
        img: '../../../assets/img/undraw_coding_6mjf.svg',
        published: '10th Jan, 2020',
        totalTime: '3.5 hours',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? \n        Illum maiores cum dolorum error sit odit.",
        content: ''
    },
    {
        id: 4,
        link: 'nodejs-basis',
        name: 'Node.Js',
        img: '../../../assets/img/undraw_coding_6mjf.svg',
        published: '27th Jan, 2020',
        totalTime: '2.5 hours',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? \n     Illum maiores cum dolorum error sit odit.",
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus",
                subcomments: [
                    {
                        id: 1,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Kwame Boateng',
                        comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                        fringilla. Donec lacinia congue felis in faucibus"
                    },
                    {
                        id: 2,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Sarah Osei',
                        comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                        fringilla. Donec lacinia congue felis in faucibus"
                    }
                ]
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            }
        ]
    },
    {
        id: 5,
        link: 'getting-started-with-angular-6',
        name: 'Getting started with Angular 6',
        img: '../../../assets/img/undraw_coding_6mjf.svg',
        published: '20th Oct, 2020',
        totalTime: '2 hours',
        description: "In this series, you'll learn how to use React Native to create page layouts commonly \n        used in mobile apps. The layouts you'll be creating won't be functional\u2014instead, the main focus of \n        this series is to get your hands dirty in laying out content in your React Native apps",
        created_by: 'yjbdanquah',
        level: 'Beginner',
        tags: 'web develpment, web design, angular, frameworks, javascript, javascript frameworks',
        related: 'Angular Routes',
        content: "Getting Started\n\n        In this tutorial, we will use the Expo CLI. Expo is a set of tools and services built around React Native and native platforms that help you develop, build, deploy, and quickly iterate on iOS, Android, and web apps from the same JavaScript or TypeScript codebase. \n        \n        Expo is the easiest and fastest way to build React Native apps. The official Expo get started guide contains detailed instructions on how to download and configure Expo CLI for the major operating systems.\n        \n        Create a new project\n        1\n            \n        expo init LoginLayout\n        \n        You will be prompted to choose the type of project to initialize. Choose Managed workflow and blank. Wait a few seconds for Expo to install the project files and change the directory into the new project.\n        1\n            \n        cd LoginLayout\n        \n        The project structure should look like this. ",
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus",
                subcomments: [
                    {
                        id: 1,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Kwame Boateng',
                        comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                        fringilla. Donec lacinia congue felis in faucibus"
                    },
                    {
                        id: 2,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Sarah Osei',
                        comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                        fringilla. Donec lacinia congue felis in faucibus"
                    }
                ]
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            }
        ]
    },
    {
        id: 6,
        link: 'javaScript-es6-sis',
        name: 'JavaScript ES6 Basis',
        img: '../../../assets/img/undraw_coding_6mjf.svg',
        published: '9th Sept, 2019',
        totalTime: '4 hours',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? \n        Illum maiores cum dolorum error sit odit.",
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus",
                subcomments: [
                    {
                        id: 1,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Kwame Boateng',
                        comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                        fringilla. Donec lacinia congue felis in faucibus"
                    },
                    {
                        id: 2,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Sarah Osei',
                        comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                        fringilla. Donec lacinia congue felis in faucibus"
                    }
                ]
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            }
        ]
    },
    {
        id: 7,
        link: 'all-about-java-8',
        name: 'All About Java 8',
        img: '../../../assets/img/undraw_coding_6mjf.svg',
        published: '10th Jan, 2020',
        totalTime: '3.5 hours',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? \n        Illum maiores cum dolorum error sit odit.",
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus",
                subcomments: [
                    {
                        id: 1,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Kwame Boateng',
                        comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                        fringilla. Donec lacinia congue felis in faucibus"
                    },
                    {
                        id: 2,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Sarah Osei',
                        comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                        fringilla. Donec lacinia congue felis in faucibus"
                    }
                ]
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            }
        ]
    },
    {
        id: 8,
        link: 'working-express-nodejs-and-mongoDb',
        name: 'Working Express Nodejs and MongoDb',
        img: '../../../assets/img/undraw_coding_6mjf.svg',
        published: '27th Jan, 2020',
        totalTime: '2.5 hours',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? \n     Illum maiores cum dolorum error sit odit.",
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus",
                subcomments: [
                    {
                        id: 1,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Kwame Boateng',
                        comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                        fringilla. Donec lacinia congue felis in faucibus"
                    },
                    {
                        id: 2,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Sarah Osei',
                        comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                        fringilla. Donec lacinia congue felis in faucibus"
                    }
                ]
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            }
        ]
    }
];


/***/ }),

/***/ "./src/app/ebook/ebook-post/ebook-route-activator.service.ts":
/*!*******************************************************************!*\
  !*** ./src/app/ebook/ebook-post/ebook-route-activator.service.ts ***!
  \*******************************************************************/
/*! exports provided: EbookRouteActivator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EbookRouteActivator", function() { return EbookRouteActivator; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ebook_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ebook.service */ "./src/app/ebook/ebook.service.ts");




var EbookRouteActivator = /** @class */ (function () {
    function EbookRouteActivator(ebookService, router) {
        this.ebookService = ebookService;
        this.router = router;
    }
    EbookRouteActivator.prototype.canActivate = function (route) {
        var ebookExist = !!this.ebookService.getEbook(route.params['link']);
        if (!ebookExist)
            this.router.navigate(['404']);
        return ebookExist;
    };
    EbookRouteActivator = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ebook_service__WEBPACK_IMPORTED_MODULE_3__["EbookService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], EbookRouteActivator);
    return EbookRouteActivator;
}());



/***/ }),

/***/ "./src/app/ebook/ebook.service.ts":
/*!****************************************!*\
  !*** ./src/app/ebook/ebook.service.ts ***!
  \****************************************/
/*! exports provided: EbookService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EbookService", function() { return EbookService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var EbookService = /** @class */ (function () {
    function EbookService() {
    }
    EbookService.prototype.getEbooks = function () {
        return Ebooks;
    };
    EbookService.prototype.getEbook = function (link) {
        return Ebooks.find(function (ebook) { return ebook.link == link; });
    };
    EbookService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], EbookService);
    return EbookService;
}());

var Ebooks = [
    {
        id: 1,
        link: 'javascript-the-good-parts',
        name: 'JavaScript the good parts',
        img: '../../../assets/img/undraw_reading_0re1.svg',
        published: '4th Aug, 2004',
        recommended: 3,
        totalTime: '5 hours read',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? \n        ",
        content: '',
        license: 'free',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus",
                subcomments: [
                    {
                        id: 1,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Kwame Boateng',
                        comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                        fringilla. Donec lacinia congue felis in faucibus"
                    },
                    {
                        id: 2,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Sarah Osei',
                        comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                        fringilla. Donec lacinia congue felis in faucibus"
                    }
                ]
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            }
        ]
    },
    {
        id: 2,
        link: 'basics-of-vuejs',
        name: 'Basics of Vuejs',
        img: '../../../assets/img/undraw_reading_0re1.svg',
        published: '1th Sept, 2012',
        recommended: 1,
        totalTime: '1.45 hours read',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? \n        ",
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus",
                subcomments: [
                    {
                        id: 1,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Kwame Boateng',
                        comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                        fringilla. Donec lacinia congue felis in faucibus"
                    },
                    {
                        id: 2,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Sarah Osei',
                        comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                        fringilla. Donec lacinia congue felis in faucibus"
                    }
                ]
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            }
        ]
    },
    {
        id: 3,
        link: 'think-and-grow-rich',
        name: 'Think and grow rich',
        img: '../../../assets/img/undraw_reading_0re1.svg',
        published: '9th Jun, 1990',
        recommended: 4,
        totalTime: '4.5 hours read',
        description: "Lorem ipsum, dolor sit amet consectetur  \n        Illum maiores cum dolorum error sit odit.",
        content: '',
        license: 'free',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus",
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            }
        ]
    },
    {
        id: 4,
        link: 'starting-a-new-online-business',
        name: 'Starting a new online business',
        img: '../../../assets/img/undraw_reading_0re1.svg',
        published: '21st Mar, 2015',
        recommended: 3,
        totalTime: '2.5 hours read',
        description: "Lorem ipsum, dolor sit amet consectetur \n     Illum maiores cum dolorum error sit odit.",
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus",
                subcomments: [
                    {
                        id: 1,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Kwame Boateng',
                        comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                        fringilla. Donec lacinia congue felis in faucibus"
                    },
                ]
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
        ]
    },
    {
        id: 5,
        link: 'working-with-a-bad-boss',
        name: 'Working with a bad Boss',
        img: '../../../assets/img/undraw_reading_0re1.svg',
        published: '4th Aug, 2004',
        recommended: 3,
        totalTime: '5 hours read',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? \n        ",
        content: '',
        license: 'free',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus",
                subcomments: [
                    {
                        id: 1,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Kwame Boateng',
                        comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                        fringilla. Donec lacinia congue felis in faucibus"
                    },
                    {
                        id: 2,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Sarah Osei',
                        comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                        fringilla. Donec lacinia congue felis in faucibus"
                    }
                ]
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
        ]
    },
    {
        id: 6,
        link: 'how-to-success-in-software-engineering-career',
        name: 'How to Success in Software Engineering Career',
        img: '../../../assets/img/undraw_reading_0re1.svg',
        published: '1th Sept, 2012',
        recommended: 5,
        totalTime: '1.45 hours read',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? \n        ",
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus",
                subcomments: [
                    {
                        id: 1,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Kwame Boateng',
                        comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                        fringilla. Donec lacinia congue felis in faucibus"
                    },
                    {
                        id: 2,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Sarah Osei',
                        comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                        fringilla. Donec lacinia congue felis in faucibus"
                    }
                ]
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            }
        ]
    },
    {
        id: 7,
        link: 'the-man-that-lived-again',
        name: 'The man that lived again',
        img: '../../../assets/img/undraw_reading_0re1.svg',
        published: '9th Jun, 1990',
        recommended: 3,
        totalTime: '4.5 hours read',
        description: "Lorem ipsum, dolor sit amet consectetur  \n        Illum maiores cum dolorum error sit odit.",
        content: '',
        license: 'free',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus",
                subcomments: []
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            }
        ]
    },
    {
        id: 8,
        link: 'growing-your-business-mind',
        name: 'Growing your business mind',
        img: '../../../assets/img/undraw_reading_0re1.svg',
        published: '21st Mar, 2015',
        recommended: 3,
        totalTime: '2.5 hours read',
        description: "Lorem ipsum, dolor sit amet consectetur \n     Illum maiores cum dolorum error sit odit.",
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus",
                subcomments: [
                    {
                        id: 1,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Kwame Boateng',
                        comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                        fringilla. Donec lacinia congue felis in faucibus"
                    },
                ]
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            }
        ]
    }
];


/***/ }),

/***/ "./src/app/errors/404.component.ts":
/*!*****************************************!*\
  !*** ./src/app/errors/404.component.ts ***!
  \*****************************************/
/*! exports provided: Error404Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Error404Component", function() { return Error404Component; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var Error404Component = /** @class */ (function () {
    function Error404Component() {
    }
    Error404Component = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: "\n    <h1 class=\"errorMessage\">404'd</h1>\n    <h3 class=\"p-5 mt-5 text-center\">The page or resource you are trying to access can not be found</h3>\n  ",
            styles: ["\n    .errorMessage { \n      margin-top:100px; \n      color: rgba(255,0,0,0.5);\n      font-size: 170px;\n      text-align: center; \n    }"]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], Error404Component);
    return Error404Component;
}());



/***/ }),

/***/ "./src/app/howto/howto-post/howto-route-activator.service.ts":
/*!*******************************************************************!*\
  !*** ./src/app/howto/howto-post/howto-route-activator.service.ts ***!
  \*******************************************************************/
/*! exports provided: HowtoRouteActivator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HowtoRouteActivator", function() { return HowtoRouteActivator; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _howto_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../howto.service */ "./src/app/howto/howto.service.ts");

// import { Route } from '@angular/compiler/src/core';



var HowtoRouteActivator = /** @class */ (function () {
    function HowtoRouteActivator(howtoService, router) {
        this.howtoService = howtoService;
        this.router = router;
    }
    HowtoRouteActivator.prototype.canActivate = function (route) {
        var howtoExist = !!this.howtoService.getHowto(route.params['link']);
        if (!howtoExist)
            this.router.navigate(['404']);
        return howtoExist;
    };
    HowtoRouteActivator = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_howto_service__WEBPACK_IMPORTED_MODULE_3__["HowtoService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], HowtoRouteActivator);
    return HowtoRouteActivator;
}());



/***/ }),

/***/ "./src/app/howto/howto.service.ts":
/*!****************************************!*\
  !*** ./src/app/howto/howto.service.ts ***!
  \****************************************/
/*! exports provided: HowtoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HowtoService", function() { return HowtoService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");



var HowtoService = /** @class */ (function () {
    function HowtoService() {
    }
    HowtoService.prototype.getHowtos = function () {
        var subject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        setTimeout(function () {
            subject.next(Howtos);
            subject.complete();
        }, 10);
        return subject;
    };
    HowtoService.prototype.getHowto = function (link) {
        return Howtos.find(function (howto) { return howto.link == link; });
    };
    HowtoService.prototype.getRelatedHowto = function (id) {
        return Howtos.find(function (howto) { return howto.id == id; });
    };
    HowtoService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], HowtoService);
    return HowtoService;
}());

var Howtos = [
    {
        id: 1,
        link: 'how-to-create-your-api-with-nodejs-and-express',
        name: 'How to create your API with Nodejs and Express',
        related: 5,
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        published: '20th Oct, 2020',
        created_by: 'Simons Gyabeng',
        totalTime: '2 hours',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? \n        Illum maiores cum dolorum error sit odit.",
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus",
                subcomments: [
                    {
                        id: 1,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Kwame Boateng',
                        comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                        fringilla. Donec lacinia congue felis in faucibus"
                    },
                    {
                        id: 2,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Sarah Osei',
                        comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                        fringilla. Donec lacinia congue felis in faucibus"
                    }
                ]
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            }
        ]
    },
    {
        id: 2,
        link: 'creating-your-first-webpage',
        name: 'Creating your first webpage',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        published: '9th Sept, 2019',
        related: 1,
        created_by: 'Simons Gyabeng',
        totalTime: '4 hours',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? \n        Illum maiores cum dolorum error sit odit.",
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            }
        ]
    },
    {
        id: 3,
        link: 'how-to-create-a-image-compressor-with-nodejs-and-express',
        name: 'How to create a image compressor with Nodejs and Express',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        published: '10th Jan, 2020',
        related: 1,
        created_by: 'Simons Gyabeng',
        totalTime: '3.5 hours',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? \n        Illum maiores cum dolorum error sit odit.",
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            }
        ]
    },
    {
        id: 4,
        link: 'how-to-grade-your-students-with-microsoft-excel',
        name: 'How to grade your students with Microsoft Excel',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        published: '27th Jan, 2020',
        related: 8,
        created_by: 'Simons Gyabeng',
        totalTime: '2.5 hours',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? \n     Illum maiores cum dolorum error sit odit.",
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            }
        ]
    },
    {
        id: 5,
        link: 'consuming-rest-apis-webapp',
        name: 'consuming REST APIs - webapp',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        published: '20th Oct, 2020',
        related: 3,
        created_by: 'Simons Gyabeng',
        totalTime: '2 hours',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? \n        Illum maiores cum dolorum error sit odit.",
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            }
        ]
    },
    {
        id: 6,
        link: 'building-a-javascript-develoment-environment',
        name: 'building a javascript develoment environment',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        published: '9th Sept, 2019',
        related: 1,
        created_by: 'Simons Gyabeng',
        totalTime: '4 hours',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? \n        Illum maiores cum dolorum error sit odit.",
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            }
        ]
    },
    {
        id: 7,
        link: 'angular-fundamentals-with-complete-project',
        name: 'angular fundamentals - with complete project',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        published: '10th Jan, 2020',
        related: 2,
        created_by: 'Simons Gyabeng',
        totalTime: '3.5 hours',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? \n        Illum maiores cum dolorum error sit odit.",
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            }
        ]
    },
    {
        id: 8,
        link: 'Step by Step guide to learning Microsoft Powerpoint',
        name: 'Step by Step guide to learning Microsoft Powerpoint',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        published: '27th Jan, 2020',
        related: 4,
        created_by: 'Simons Gyabeng',
        totalTime: '2.5 hours',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? \n     Illum maiores cum dolorum error sit odit.",
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. \n                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate \n                fringilla. Donec lacinia congue felis in faucibus"
            }
        ]
    }
];


/***/ }),

/***/ "./src/app/layouts/admin/admin-sidebar.component.html":
/*!************************************************************!*\
  !*** ./src/app/layouts/admin/admin-sidebar.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar sticky-top\">\r\n\r\n    <!-- Categories Widget -->\r\n    <div class=\"card my-4 \">\r\n        <!-- <h5 class=\"card-header\">Action</h5> -->\r\n        <div class=\"card-body px-0\">\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-12\">\r\n                    <ul class=\"list-unstyle mb-0\">\r\n                        <li class=\"p-2\">\r\n                            <a href=\"#\">Create New Blog</a>\r\n                        </li>\r\n                        <li class=\"p-2\">\r\n                            <a href=\"#\">Review Existing Blogs</a>\r\n                        </li>\r\n                        <li class=\"p-2\">\r\n                            <a class=\"card-link\" href=\"#\">Check Metrics</a>\r\n                        </li>\r\n                        <li class=\"p-2\">\r\n                            <a href=\"#\">Create New Blog</a>\r\n                        </li>\r\n                        <li class=\"p-2\">\r\n                            <a href=\"#\">Review Existing Blogs</a>\r\n                        </li>\r\n                        <li class=\"p-2\">\r\n                            <a class=\"card-link\" href=\"#\">Check Metrics</a>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/layouts/admin/admin-sidebar.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/layouts/admin/admin-sidebar.component.ts ***!
  \**********************************************************/
/*! exports provided: AdminSidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminSidebarComponent", function() { return AdminSidebarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AdminSidebarComponent = /** @class */ (function () {
    function AdminSidebarComponent() {
    }
    AdminSidebarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'admin-sidebar',
            template: __webpack_require__(/*! ./admin-sidebar.component.html */ "./src/app/layouts/admin/admin-sidebar.component.html"),
            styles: ["\n\n    "]
        })
    ], AdminSidebarComponent);
    return AdminSidebarComponent;
}());



/***/ }),

/***/ "./src/app/layouts/footer/footer.component.html":
/*!******************************************************!*\
  !*** ./src/app/layouts/footer/footer.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<footer class=\"py-2 bg-dark sticky-bottom \">\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-12 text-white\">\r\n        <p class=\"text-white text-center\">\r\n          <span><a href=\"\">Privacy Policy</a></span> |\r\n          <span><a href=\"\">Cookies Policy</a></span> |\r\n          <span><a href=\"\">Site Map</a></span>\r\n        </p>\r\n      </div>\r\n      <div class=\"col-md 6\">\r\n\r\n      </div>\r\n    </div>\r\n    <p class=\"m-0 text-center text-white\">Copyright &copy; WebTuitor 2020</p>\r\n  </div>\r\n  <!-- /.container -->\r\n</footer>\r\n"

/***/ }),

/***/ "./src/app/layouts/footer/footer.component.ts":
/*!****************************************************!*\
  !*** ./src/app/layouts/footer/footer.component.ts ***!
  \****************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/layouts/footer/footer.component.html"),
            styles: ["\n        footer {\n            // position: relative;\n            // top: 70vh!important;\n        }\n    "]
        })
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/layouts/navbar/navbar.component.css":
/*!*****************************************************!*\
  !*** ./src/app/layouts/navbar/navbar.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".top-header {\r\n  height: 56px;\r\n}\r\n\r\n#main-logo {\r\n  display: block;\r\n  margin: 0 auto !important;\r\n  margin-bottom: 10px !important;\r\n}\r\n\r\nnav {\r\n  background: #3a3d85;\r\n  padding: 0 0 0px 15px;\r\n  border-bottom: solid 0.1px #555 !important;\r\n}\r\n\r\n#top-search-box input[type='text'] {\r\n  border: none;\r\n  font-size: 18px;\r\n  border-top-left-radius: 20px;\r\n  border-bottom-left-radius: 20px;\r\n  background-color: #f0e8e8;\r\n}\r\n\r\n#top-search-box input[type='text']:hover,\r\n#top-search-box input[type='text']:focus {\r\n  background-color: #fff;\r\n}\r\n\r\n#top-search-box {\r\n  border-radius: 0% !important;\r\n  background: #3a3d85 !important;\r\n  display: block !important;\r\n  border-radius: 2%;\r\n  border-color: #aaa;\r\n}\r\n\r\n@media only screen and (max-width: 719px) {\r\n  #search-go {\r\n    margin-right: 5px !important;\r\n  }\r\n}\r\n\r\n.ml-auto a {\r\n  padding: 10px 10px;\r\n  margin-right: 25px;\r\n  color: #fefefe !important;\r\n  text-shadow: #382a2a;\r\n}\r\n\r\n.ml-auto a.nav-link:hover {\r\n  color: #d8d6e2 !important;\r\n}\r\n\r\n.ml-auto a.Active {\r\n  margin-bottom: 0;\r\n  border-bottom: solid 2px #fefefe !important;\r\n  color: #acacac !important;\r\n  font-weight: 600;\r\n}\r\n\r\n.ml-auto {\r\n  padding: 2px 15px !important;\r\n  font-weight: 500;\r\n  margin-top: 0 5px;\r\n}\r\n\r\n.dropdown-menu {\r\n  background: rgb(250, 250, 250);\r\n  padding: 5px 0px 20px 0px;\r\n  color: #333;\r\n  width: 250px !important;\r\n  border: none;\r\n  box-shadow: 5px 10px 10px #555;\r\n}\r\n\r\n.dropdown:hover>.dropdown-menu {\r\n  display: block;\r\n}\r\n\r\n.dropdown .dropdown-menu li {\r\n  padding: 10px 0 10px 10px;\r\n\r\n\r\n}\r\n\r\n.dropdown .dropdown-menu li a {\r\n  color: #333 !important;\r\n}\r\n\r\n.dropdown .dropdown-menu li:hover {\r\n  margin: 0;\r\n  background-color: #dedede;\r\n\r\n}\r\n\r\n.dropdown .dropdown-menu a:hover {\r\n  text-decoration: none;\r\n\r\n}\r\n\r\n#dropdownMenu  {\r\n  /* display: block; */\r\n  width: 3px!important;\r\n  overflow: hidden!important;\r\n  background-color: #3a3d85!important;\r\n  ;\r\n}\r\n\r\n#dropdownMenu a {\r\n  color: #fefefe!important\r\n}\r\n\r\n#dropdownMenu a:hover {\r\n  color: #333!important;\r\n}\r\n\r\n@media only screen and (min-width: 720px) {\r\n  nav {\r\n    padding: 5px 0 5px 20px;\r\n    border-bottom: solid 0.1px #555 !important;\r\n  }\r\n  #search-go {\r\n    margin-right: 15px !important;\r\n  }\r\n\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0cy9uYXZiYXIvbmF2YmFyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFhO0NBQ2Q7O0FBRUQ7RUFDRSxlQUFlO0VBQ2YsMEJBQTBCO0VBQzFCLCtCQUErQjtDQUNoQzs7QUFFRDtFQUNFLG9CQUFvQjtFQUNwQixzQkFBc0I7RUFDdEIsMkNBQTJDO0NBQzVDOztBQUVEO0VBQ0UsYUFBYTtFQUNiLGdCQUFnQjtFQUNoQiw2QkFBNkI7RUFDN0IsZ0NBQWdDO0VBQ2hDLDBCQUEwQjtDQUMzQjs7QUFFRDs7RUFFRSx1QkFBdUI7Q0FDeEI7O0FBRUQ7RUFDRSw2QkFBNkI7RUFDN0IsK0JBQStCO0VBQy9CLDBCQUEwQjtFQUMxQixrQkFBa0I7RUFDbEIsbUJBQW1CO0NBQ3BCOztBQUVEO0VBQ0U7SUFDRSw2QkFBNkI7R0FDOUI7Q0FDRjs7QUFFRDtFQUNFLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsMEJBQTBCO0VBQzFCLHFCQUFxQjtDQUN0Qjs7QUFFRDtFQUNFLDBCQUEwQjtDQUMzQjs7QUFFRDtFQUNFLGlCQUFpQjtFQUNqQiw0Q0FBNEM7RUFDNUMsMEJBQTBCO0VBQzFCLGlCQUFpQjtDQUNsQjs7QUFFRDtFQUNFLDZCQUE2QjtFQUM3QixpQkFBaUI7RUFDakIsa0JBQWtCO0NBQ25COztBQUVEO0VBQ0UsK0JBQStCO0VBQy9CLDBCQUEwQjtFQUMxQixZQUFZO0VBQ1osd0JBQXdCO0VBQ3hCLGFBQWE7RUFHYiwrQkFBK0I7Q0FDaEM7O0FBRUQ7RUFDRSxlQUFlO0NBQ2hCOztBQUVEO0VBQ0UsMEJBQTBCOzs7Q0FHM0I7O0FBRUQ7RUFDRSx1QkFBdUI7Q0FDeEI7O0FBRUQ7RUFDRSxVQUFVO0VBQ1YsMEJBQTBCOztDQUUzQjs7QUFFRDtFQUNFLHNCQUFzQjs7Q0FFdkI7O0FBQ0Q7RUFDRSxxQkFBcUI7RUFDckIscUJBQXFCO0VBQ3JCLDJCQUEyQjtFQUMzQixvQ0FBb0M7O0NBRXJDOztBQUNEO0VBQ0Usd0JBQXdCO0NBQ3pCOztBQUNEO0VBQ0Usc0JBQXNCO0NBQ3ZCOztBQUVEO0VBQ0U7SUFDRSx3QkFBd0I7SUFDeEIsMkNBQTJDO0dBQzVDO0VBQ0Q7SUFDRSw4QkFBOEI7R0FDL0I7O0NBRUYiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXRzL25hdmJhci9uYXZiYXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi50b3AtaGVhZGVyIHtcclxuICBoZWlnaHQ6IDU2cHg7XHJcbn1cclxuXHJcbiNtYWluLWxvZ28ge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIG1hcmdpbjogMCBhdXRvICFpbXBvcnRhbnQ7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTBweCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG5uYXYge1xyXG4gIGJhY2tncm91bmQ6ICMzYTNkODU7XHJcbiAgcGFkZGluZzogMCAwIDBweCAxNXB4O1xyXG4gIGJvcmRlci1ib3R0b206IHNvbGlkIDAuMXB4ICM1NTUgIWltcG9ydGFudDtcclxufVxyXG5cclxuI3RvcC1zZWFyY2gtYm94IGlucHV0W3R5cGU9J3RleHQnXSB7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAyMHB4O1xyXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDIwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YwZThlODtcclxufVxyXG5cclxuI3RvcC1zZWFyY2gtYm94IGlucHV0W3R5cGU9J3RleHQnXTpob3ZlcixcclxuI3RvcC1zZWFyY2gtYm94IGlucHV0W3R5cGU9J3RleHQnXTpmb2N1cyB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxufVxyXG5cclxuI3RvcC1zZWFyY2gtYm94IHtcclxuICBib3JkZXItcmFkaXVzOiAwJSAhaW1wb3J0YW50O1xyXG4gIGJhY2tncm91bmQ6ICMzYTNkODUgIWltcG9ydGFudDtcclxuICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xyXG4gIGJvcmRlci1yYWRpdXM6IDIlO1xyXG4gIGJvcmRlci1jb2xvcjogI2FhYTtcclxufVxyXG5cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3MTlweCkge1xyXG4gICNzZWFyY2gtZ28ge1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA1cHggIWltcG9ydGFudDtcclxuICB9XHJcbn1cclxuXHJcbi5tbC1hdXRvIGEge1xyXG4gIHBhZGRpbmc6IDEwcHggMTBweDtcclxuICBtYXJnaW4tcmlnaHQ6IDI1cHg7XHJcbiAgY29sb3I6ICNmZWZlZmUgIWltcG9ydGFudDtcclxuICB0ZXh0LXNoYWRvdzogIzM4MmEyYTtcclxufVxyXG5cclxuLm1sLWF1dG8gYS5uYXYtbGluazpob3ZlciB7XHJcbiAgY29sb3I6ICNkOGQ2ZTIgIWltcG9ydGFudDtcclxufVxyXG5cclxuLm1sLWF1dG8gYS5BY3RpdmUge1xyXG4gIG1hcmdpbi1ib3R0b206IDA7XHJcbiAgYm9yZGVyLWJvdHRvbTogc29saWQgMnB4ICNmZWZlZmUgIWltcG9ydGFudDtcclxuICBjb2xvcjogI2FjYWNhYyAhaW1wb3J0YW50O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuXHJcbi5tbC1hdXRvIHtcclxuICBwYWRkaW5nOiAycHggMTVweCAhaW1wb3J0YW50O1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgbWFyZ2luLXRvcDogMCA1cHg7XHJcbn1cclxuXHJcbi5kcm9wZG93bi1tZW51IHtcclxuICBiYWNrZ3JvdW5kOiByZ2IoMjUwLCAyNTAsIDI1MCk7XHJcbiAgcGFkZGluZzogNXB4IDBweCAyMHB4IDBweDtcclxuICBjb2xvcjogIzMzMztcclxuICB3aWR0aDogMjUwcHggIWltcG9ydGFudDtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiA1cHggMTBweCAxMHB4ICM1NTU7XHJcbiAgLW1vei1ib3gtc2hhZG93OiA1cHggMTBweCAxMHB4ICM1NTU7XHJcbiAgYm94LXNoYWRvdzogNXB4IDEwcHggMTBweCAjNTU1O1xyXG59XHJcblxyXG4uZHJvcGRvd246aG92ZXI+LmRyb3Bkb3duLW1lbnUge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG4uZHJvcGRvd24gLmRyb3Bkb3duLW1lbnUgbGkge1xyXG4gIHBhZGRpbmc6IDEwcHggMCAxMHB4IDEwcHg7XHJcblxyXG5cclxufVxyXG5cclxuLmRyb3Bkb3duIC5kcm9wZG93bi1tZW51IGxpIGEge1xyXG4gIGNvbG9yOiAjMzMzICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5kcm9wZG93biAuZHJvcGRvd24tbWVudSBsaTpob3ZlciB7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNkZWRlZGU7XHJcblxyXG59XHJcblxyXG4uZHJvcGRvd24gLmRyb3Bkb3duLW1lbnUgYTpob3ZlciB7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG5cclxufVxyXG4jZHJvcGRvd25NZW51ICB7XHJcbiAgLyogZGlzcGxheTogYmxvY2s7ICovXHJcbiAgd2lkdGg6IDNweCFpbXBvcnRhbnQ7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbiFpbXBvcnRhbnQ7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzNhM2Q4NSFpbXBvcnRhbnQ7XHJcbiAgO1xyXG59XHJcbiNkcm9wZG93bk1lbnUgYSB7XHJcbiAgY29sb3I6ICNmZWZlZmUhaW1wb3J0YW50XHJcbn1cclxuI2Ryb3Bkb3duTWVudSBhOmhvdmVyIHtcclxuICBjb2xvcjogIzMzMyFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzIwcHgpIHtcclxuICBuYXYge1xyXG4gICAgcGFkZGluZzogNXB4IDAgNXB4IDIwcHg7XHJcbiAgICBib3JkZXItYm90dG9tOiBzb2xpZCAwLjFweCAjNTU1ICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gICNzZWFyY2gtZ28ge1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAxNXB4ICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/layouts/navbar/navbar.component.html":
/*!******************************************************!*\
  !*** ./src/app/layouts/navbar/navbar.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- top search button -->\r\n\r\n<div id=\"top-search-box\" class=\"card-body bg-light\">\r\n  <div class=\"input-group \">\r\n    <a class=\"d-none d-lg-block btn btn-xs btn-outline-light mr-4\">Learning is a spice of life!</a>\r\n    <input type=\"text\" class=\"form-control pl-4\" placeholder=\"Search WebTuitor...\">\r\n    <span class=\"input-group-append m\">\r\n      <button id=\"search-go\" class=\"btn btn-danger\" type=\"button\">Go!</button>\r\n    </span>\r\n    <a *ngIf=\"!authService.isAuthenticated()\" [routerLink]=\"['/auth/user/login']\"\r\n      class=\"nav-link ml-auto btn btn-xs btn-outline-light\">Sign In </a>\r\n    <div *ngIf=\"authService.isAuthenticated()\" class=\"dropdown show\">\r\n      <button class=\"btn btn-xs btn-outline-light dropdown-toggle\" type=\"button\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n        {{authService.currentUser.firstName != ''?authService.currentUser.firstName : authService.currentUser.userName }}\r\n      </button>\r\n      <div id=\"dropdownMenu\" class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuLink\">\r\n        <a [routerLink]=\"['/auth/user/profile']\" class=\"dropdown-item\">Profile</a>\r\n        <a  href=\"#\" class=\"dropdown-item\">Logout</a>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<!-- </div> -->\r\n\r\n<!-- navigation / menu -->\r\n<nav class=\"navbar navbar-expand-lg sticky-op navbar-light shadow\">\r\n  <a class=\"navbar-brand img-fluid p-0\" href=\"/\"><img width=\"100\" height=\"40\" src=\"assets/icons/WebTuitor_Logo2.png\"\r\n      alt=\"company log\"></a>\r\n  <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNavAltMarkup\"\r\n    aria-controls=\"navbarNavAltMarkup\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n    <span class=\"navbar-toggler-icon\"></span>\r\n  </button>\r\n  <div class=\"collapse navbar-collapse \" id=\"navbarNavAltMarkup\">\r\n    <div class=\"navbar-nav ml-auto\">\r\n      <a [routerLink]=\"['/home']\" routerLinkActive=\"Active\" class=\"nav-link mr-4\">\r\n        Home</a>\r\n      <div class=\"dropdown\">\r\n        <a href=\"\" [routerLink]=\"['/quick/howtos']\" routerLinkActive=\"Active\" class=\"nav-link dropdown-toggl\"\r\n          data-toggle=\"dropdown\">How-To</a>\r\n        <!-- <span class=\"caret\"></span>\r\n        <ul class=\"dropdown-menu\">\r\n          <li><a href=\"#\">Design Illustration</a></li>\r\n          <li><a href=\"#\">Code</a></li>\r\n          <li><a href=\"#\">Web Design</a></li>\r\n          <li><a href=\"#\">Computer Skills</a></li>\r\n          <li><a href=\"#\">Microsoft Excel</a></li>\r\n        </ul> -->\r\n      </div>\r\n      <div class=\"dropdown\">\r\n        <a [routerLink]=\"['/learn/courses']\" routerLinkActive=\"Active\" class=\"nav-link dropdown-toggl\"\r\n          data-toggle=\"dropdown\">Courses </a>\r\n        <!-- <span class=\"caret\"></span>\r\n        <ul class=\"dropdown-menu\">\r\n          <li><a href=\"#\">Design Illustration</a></li>\r\n          <li><a href=\"#\">Code</a></li>\r\n          <li><a href=\"#\">Web Design</a></li>\r\n          <li><a href=\"#\">Computer Skills</a></li>\r\n          <li><a href=\"#\">Microsoft Excel</a></li>\r\n        </ul> -->\r\n      </div>\r\n      <div class=\"dropdown\">\r\n        <a [routerLink]=\"['/read/get-an-ebook']\" routerLinkActive=\"Active\" class=\"nav-link dropdown-toggl\"\r\n          data-toggle=\"dropdown\">eBooks </a>\r\n        <!-- <span class=\"caret\"></span> -->\r\n        <!-- <ul class=\"dropdown-menu\">\r\n          <li><a href=\"#\">Design Illustration</a></li>\r\n          <li><a href=\"#\">Code</a></li>\r\n          <li><a href=\"#\">Web Design</a></li>\r\n          <li><a href=\"#\">Computer Skills</a></li>\r\n          <li><a href=\"#\">Microsoft Excel</a></li>\r\n        </ul> -->\r\n      </div>\r\n      <div class=\"dropdown\">\r\n        <a [routerLink]=\"['/guidance/find-a-mentor']\" routerLinkActive=\"Active\" class=\"nav-link dropdown-toggl\">\r\n          Find A Mentor </a>\r\n      </div>\r\n      <a [routerLink]=\"['/us/about']\" routerLinkActive=\"Active\" class=\"nav-link mr-4\">\r\n        About</a>\r\n    </div>\r\n  </div>\r\n</nav>\r\n<hr class=\"m-0 p-0\">\r\n"

/***/ }),

/***/ "./src/app/layouts/navbar/navbar.component.ts":
/*!****************************************************!*\
  !*** ./src/app/layouts/navbar/navbar.component.ts ***!
  \****************************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_user_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/user/auth.service */ "./src/app/user/auth.service.ts");



var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(authService) {
        this.authService = authService;
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/layouts/navbar/navbar.component.html"),
            styles: [__webpack_require__(/*! ./navbar.component.css */ "./src/app/layouts/navbar/navbar.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_user_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/layouts/sidebar/sidebar.component.html":
/*!********************************************************!*\
  !*** ./src/app/layouts/sidebar/sidebar.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar sticky-top\">\r\n\r\n    <!-- Side Widget -->\r\n    <div class=\"card my-4\">\r\n        <h5 class=\"card-header\">Subscribe</h5>\r\n        <div class=\"card-body\">\r\n           <p class=\"mb-3\">Subscribe to get alert for our latest posts</p>\r\n           <div class=\"input-group\">\r\n            <input type=\"text\" class=\"form-control\" placeholder=\"Email address...\">\r\n            <span class=\"input-group-append\">\r\n                <button class=\"btn btn-danger\" type=\"button\">Submit!</button>\r\n            </span>\r\n            \r\n        </div>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- Categories Widget -->\r\n    <div class=\"card my-4\">\r\n        <h5 class=\"card-header\">Top Reads</h5>\r\n        <div class=\"card-body\">\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-12\">\r\n                    <ul class=\"list-unstyle mb-0\">\r\n                        <li class=\"p-2\">\r\n                            <a href=\"#\">How to upgrade to windows 10</a>\r\n                        </li>\r\n                        <li class=\"p-2\">\r\n                            <a href=\"#\">How to setup potmand to test APIs</a>\r\n                        </li>\r\n                        <li class=\"p-2\">\r\n                            <a class=\"card-link\" href=\"#\">Integrating your Blog with adsense</a>\r\n                        </li>\r\n                        <li class=\"p-2\">\r\n                            <a href=\"#\">The power of prayer to the believer</a>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n     <!-- Side Widget -->\r\n     <div class=\"card my-4\">\r\n        <h5 class=\"card-header\">Let's hear from you</h5>\r\n        <div class=\"card-body\">\r\n           <p class=\"mb-3\">Do you have a topic you will like us to write about</p>\r\n           <div class=\"inpt-group\">\r\n            <textarea type=\"textarea\" class=\"form-control\" placeholder=\"Let us know...\"></textarea>\r\n            <span class=\"input-group-append\">\r\n                <button class=\"btn btn-danger\" type=\"button\">Submit!</button>\r\n            </span>\r\n            \r\n        </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/layouts/sidebar/sidebar.component.ts":
/*!******************************************************!*\
  !*** ./src/app/layouts/sidebar/sidebar.component.ts ***!
  \******************************************************/
/*! exports provided: SidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarComponent", function() { return SidebarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var SidebarComponent = /** @class */ (function () {
    function SidebarComponent() {
    }
    SidebarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-sidebar',
            template: __webpack_require__(/*! ./sidebar.component.html */ "./src/app/layouts/sidebar/sidebar.component.html"),
            styles: ["\n        .sidebar {\n            background: rgba(250, 250, 250, 0.8);\n            padding: 80px 30px;\n        }\n        .sidebar {\n        /* background: rgba(250, 250, 250, 0.8); */\n        padding: 30px;\n        margin: 0 0 100px 0;\n        z-index: 1;\n        }\n\n    "]
        })
    ], SidebarComponent);
    return SidebarComponent;
}());



/***/ }),

/***/ "./src/app/mentor/mentor-page/mentor-page-resolver.service.ts":
/*!********************************************************************!*\
  !*** ./src/app/mentor/mentor-page/mentor-page-resolver.service.ts ***!
  \********************************************************************/
/*! exports provided: MentorPageResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MentorPageResolver", function() { return MentorPageResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _mentor_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../mentor.service */ "./src/app/mentor/mentor.service.ts");




var MentorPageResolver = /** @class */ (function () {
    function MentorPageResolver(mentorService) {
        this.mentorService = mentorService;
    }
    MentorPageResolver.prototype.resolve = function (route) {
        return this.mentorService.getMentor(route.params['login']).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (mentor) { return mentor; }));
    };
    MentorPageResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_mentor_service__WEBPACK_IMPORTED_MODULE_3__["MentorService"]])
    ], MentorPageResolver);
    return MentorPageResolver;
}());



/***/ }),

/***/ "./src/app/mentor/mentor-resolver.service.ts":
/*!***************************************************!*\
  !*** ./src/app/mentor/mentor-resolver.service.ts ***!
  \***************************************************/
/*! exports provided: MentorResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MentorResolver", function() { return MentorResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _mentor_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mentor.service */ "./src/app/mentor/mentor.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");




var MentorResolver = /** @class */ (function () {
    function MentorResolver(mentorService) {
        this.mentorService = mentorService;
    }
    MentorResolver.prototype.resolve = function () {
        return this.mentorService.getMentors().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (mentors) { return mentors; }));
    };
    MentorResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_mentor_service__WEBPACK_IMPORTED_MODULE_2__["MentorService"]])
    ], MentorResolver);
    return MentorResolver;
}());



/***/ }),

/***/ "./src/app/mentor/mentor.service.ts":
/*!******************************************!*\
  !*** ./src/app/mentor/mentor.service.ts ***!
  \******************************************/
/*! exports provided: MentorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MentorService", function() { return MentorService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");



var MentorService = /** @class */ (function () {
    function MentorService() {
        this.url = 'https://api.github.com/users';
    }
    MentorService.prototype.getMentors = function () {
        var subject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        fetch(this.url)
            .then(function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }
            // Examine the text in the response
            response.json().then(function (data) {
                subject.next(data);
                subject.complete();
                console.log('John', data);
            });
        })
            .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
        return subject;
    };
    MentorService.prototype.getMentor = function (login) {
        var subject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        console.log('heer: ' + login + ' love');
        fetch(this.url + "/" + login)
            .then(function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }
            // Examine the text in the response
            response.json().then(function (data) {
                subject.next(data);
                subject.complete();
                // console.log('Johnny boy',data);
                // return data
            });
        })
            .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
        return subject;
        // return Mentors.find(mentor => mentor.id == id)
    };
    MentorService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], MentorService);
    return MentorService;
}());

var Mentors = [
    {
        id: 1,
        link: 'emmanuel-osei-mensah',
        name: 'Emmanuel Osei Mensah',
        img: '../../../assets/img/passport-1.jpg',
        field: 'Web frontend engineering',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? \n        Illum maiores cum dolorum error sit odit.",
        content: ''
    },
    {
        id: 2,
        link: 'john-akwasi-wusu',
        name: 'john akwasi wusu',
        img: '../../../assets/img/passport-2.jpg',
        field: 'full stack developer - web',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? \n        Illum maiores cum dolorum error sit odit.",
        content: ''
    },
    {
        id: 3,
        link: 'jeffery-arthur',
        name: 'jeffery-arthur',
        img: '../../../assets/img/passport-1.jpg',
        field: 'DevOps',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? \n        Illum maiores cum dolorum error sit odit.",
        content: ''
    },
    {
        id: 4,
        link: 'frank-duah-simons',
        name: 'frank duah simons',
        img: '../../../assets/img/passport-2.jpg',
        field: 'Cloud Engineering',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? \n     Illum maiores cum dolorum error sit odit.",
        content: ''
    },
    {
        id: 5,
        link: 'steve-jones',
        name: 'Steve Jones',
        img: '../../../assets/img/passport-1.jpg',
        field: 'software engineering',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? \n        Illum maiores cum dolorum error sit odit.",
        content: ''
    },
    {
        id: 6,
        link: 'mark-zurkerberg',
        name: 'mark zurkerberg',
        img: '../../../assets/img/passport-2.jpg',
        field: 'facebook expert :)',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? \n        Illum maiores cum dolorum error sit odit.",
        content: ''
    },
    {
        id: 7,
        link: 'ernestina-danquah-boateng',
        name: 'ernestina d. boateng',
        img: '../../../assets/img/passport-1.jpg',
        field: 'career counseling',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? \n        Illum maiores cum dolorum error sit odit.",
        content: ''
    },
    {
        id: 8,
        link: 'bismark-arthur',
        name: 'bismark arthur',
        img: '../../../assets/img/passport-2.jpg',
        field: 'machine learning',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? \n     Illum maiores cum dolorum error sit odit.",
        content: ''
    }
];


/***/ }),

/***/ "./src/app/routes.ts":
/*!***************************!*\
  !*** ./src/app/routes.ts ***!
  \***************************/
/*! exports provided: appRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appRoutes", function() { return appRoutes; });
/* harmony import */ var _admin_admin_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./admin/admin.component */ "./src/app/admin/admin.component.ts");
/* harmony import */ var _errors_404_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errors/404.component */ "./src/app/errors/404.component.ts");
/* harmony import */ var _webtuitor_webtuitor_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./webtuitor/webtuitor.component */ "./src/app/webtuitor/webtuitor.component.ts");



var appRoutes = [
    { path: 'home', component: _webtuitor_webtuitor_component__WEBPACK_IMPORTED_MODULE_2__["WebtuitorComponent"] },
    { path: 'admin', component: _admin_admin_component__WEBPACK_IMPORTED_MODULE_0__["AdminComponent"] },
    { path: '404', component: _errors_404_component__WEBPACK_IMPORTED_MODULE_1__["Error404Component"] },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'us', loadChildren: 'src/app/about/about.module#AboutModule' },
    { path: 'learn', loadChildren: 'src/app/course/course.module#CourseModule' },
    { path: 'read', loadChildren: 'src/app/ebook/ebook.module#EbookModule' },
    { path: 'quick', loadChildren: 'src/app/howto/howto.module#HowtoModule' },
    { path: 'guidance', loadChildren: 'src/app/mentor/mentor.module#MentorModule' },
    { path: 'auth', loadChildren: 'src/app/user/user.module#UserModule' }
];


/***/ }),

/***/ "./src/app/untility/string.service.ts":
/*!********************************************!*\
  !*** ./src/app/untility/string.service.ts ***!
  \********************************************/
/*! exports provided: StringService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StringService", function() { return StringService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var StringService = /** @class */ (function () {
    function StringService() {
    }
    StringService.prototype.concatString = function (s, n) {
        var cut = s.indexOf(' ', n);
        if (cut == -1)
            return s;
        return s.substring(0, cut) + '...';
    };
    StringService.prototype.capitalizeFirstLetter = function (str) {
        return str.replace(/(^\w{1})|(\s{1}\w{1})/g, function (match) { return match.toUpperCase(); });
    };
    StringService.prototype.getDateTime = function () {
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        var date = new Date();
        var month = monthNames[date.getMonth()];
        var day = date.getDate();
        var year = date.getFullYear();
        var newDate = month + ' ' + day + ', ' + year;
        // let currentTime = this.time()
        return "" + newDate;
    };
    StringService.prototype.time = function () {
        var d = new Date();
        var s = d.getSeconds();
        var m = d.getMinutes();
        var h = d.getHours();
        return h + ":" + m + ":" + s;
    };
    StringService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], StringService);
    return StringService;
}());



/***/ }),

/***/ "./src/app/user/auth.service.ts":
/*!**************************************!*\
  !*** ./src/app/user/auth.service.ts ***!
  \**************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.prototype.loginUser = function (userName, password) {
        this.currentUser = {
            id: 1,
            firstName: '',
            lastName: '',
            userName: userName,
            password: password,
            confirmPassword: password
        };
    };
    AuthService.prototype.isAuthenticated = function () {
        return !!this.currentUser;
    };
    AuthService.prototype.updateCurrentUser = function (firstName, lastName, userName, password) {
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;
        this.currentUser.userName = userName;
        this.currentUser.password = password;
    };
    AuthService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/webtuitor/nav-tabs/courses-tab.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/webtuitor/nav-tabs/courses-tab.component.ts ***!
  \*************************************************************/
/*! exports provided: CourseTabComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CourseTabComponent", function() { return CourseTabComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_untility_string_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/untility/string.service */ "./src/app/untility/string.service.ts");
/* harmony import */ var _course_course_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../course/course.service */ "./src/app/course/course.service.ts");




var CourseTabComponent = /** @class */ (function () {
    function CourseTabComponent(courseService, stringService) {
        this.courseService = courseService;
        this.stringService = stringService;
    }
    CourseTabComponent.prototype.ngOnInit = function () {
        this.courses = this.courseService.getCourses();
        this.concStr = this.stringService;
    };
    CourseTabComponent.prototype.trimDesc = function (s, n) {
        var cut = s.indexOf(' ', n);
        if (cut == -1)
            return s;
        return s.substring(0, cut) + '...';
    };
    CourseTabComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'course-tab',
            template: "\n    <div class=\"card-group\">\n        <div [routerLink]=\"['/learn/courses/',course.link]\" *ngFor=\"let course of courses | slice:0:4; let i=index\" class=\"card\">\n        <img heigt=\"200\" class=\"card-img-top\" [src]=\"course.img\" alt=\"Card image cap\">\n        <div class=\"card-body\">\n            <h5 class=\"card-title\">{{concStr.capitalizeFirstLetter(course.name)}}</h5>\n            <p class=\"card-text\">{{trimDesc(course.description, 100)}}</p>\n            <button [routerLink]=\"['/learn/courses/',course.link]\" class=\"btn btn-md btn-outline-info\">Start</button>\n            <p class=\"card-text\">\n                <!-- <span><small class=\"text-muted\">{{course.published}}</small></span>&nbsp;&nbsp;&nbsp; -->\n                <!-- <span class=\"text-right\"><small class=\"text-muted\">{{course.totalTime}}</small></span> -->\n        </p>\n        </div>\n        </div>\n    </div>",
            styles: [__webpack_require__(/*! ./nav-tab.component.css */ "./src/app/webtuitor/nav-tabs/nav-tab.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_course_course_service__WEBPACK_IMPORTED_MODULE_3__["CourseService"], src_app_untility_string_service__WEBPACK_IMPORTED_MODULE_2__["StringService"]])
    ], CourseTabComponent);
    return CourseTabComponent;
}());



/***/ }),

/***/ "./src/app/webtuitor/nav-tabs/ebook-tab.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/webtuitor/nav-tabs/ebook-tab.component.ts ***!
  \***********************************************************/
/*! exports provided: EbookTabComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EbookTabComponent", function() { return EbookTabComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_ebook_ebook_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/ebook/ebook.service */ "./src/app/ebook/ebook.service.ts");
/* harmony import */ var src_app_untility_string_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/untility/string.service */ "./src/app/untility/string.service.ts");




var EbookTabComponent = /** @class */ (function () {
    function EbookTabComponent(ebookService, stringService) {
        this.ebookService = ebookService;
        this.stringService = stringService;
    }
    EbookTabComponent.prototype.ngOnInit = function () {
        this.ebooks = this.ebookService.getEbooks();
        this.concStr = this.stringService;
    };
    EbookTabComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'ebook-tab',
            template: "\n    <div class=\"card-group\">\n        <div [routerLink]=\"['/read/get-an-ebook/',ebook.link]\" *ngFor=\"let ebook of ebooks | slice:0:4; let i=index\" class=\"card\">\n        <img heigt=\"200\" class=\"card-img-top\" [src]=\"ebook.img\" alt=\"Card image cap\">\n        <div class=\"card-body\">\n            <h5 class=\"card-title\">{{concStr.capitalizeFirstLetter(ebook.name)}}</h5>\n            <p class=\"card-text\">{{concStr.concatString(ebook.description,50)}}</p>\n            <button [routerLink]=\"['/read/get-an-ebook/',ebook.link]\" class=\"btn btn-md btn-outline-info\">Get it</button>&nbsp;\n            <span class=\"text-warning\" *ngIf=\"ebook.license\">{{ebook.license}}</span>\n            \n        </div>\n        </div>\n    </div>",
            styles: [__webpack_require__(/*! ./nav-tab.component.css */ "./src/app/webtuitor/nav-tabs/nav-tab.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_ebook_ebook_service__WEBPACK_IMPORTED_MODULE_2__["EbookService"], src_app_untility_string_service__WEBPACK_IMPORTED_MODULE_3__["StringService"]])
    ], EbookTabComponent);
    return EbookTabComponent;
}());



/***/ }),

/***/ "./src/app/webtuitor/nav-tabs/howto-tab.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/webtuitor/nav-tabs/howto-tab.component.ts ***!
  \***********************************************************/
/*! exports provided: HowtoTabComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HowtoTabComponent", function() { return HowtoTabComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_howto_howto_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/howto/howto.service */ "./src/app/howto/howto.service.ts");
/* harmony import */ var src_app_untility_string_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/untility/string.service */ "./src/app/untility/string.service.ts");




var HowtoTabComponent = /** @class */ (function () {
    function HowtoTabComponent(howtoService, stringService) {
        this.howtoService = howtoService;
        this.stringService = stringService;
    }
    HowtoTabComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.howtoService.getHowtos().subscribe(function (howtos) { return _this.howtos = howtos; });
        this.concStr = this.stringService;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], HowtoTabComponent.prototype, "concStr", void 0);
    HowtoTabComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'howto-tab',
            template: "\n    <div class=\"card-group\">\n        <div [routerLink]=\"['/quick/howtos/',howto.link]\" *ngFor=\"let howto of howtos | slice:0:4; let i=index\" class=\"card\" >\n        <img heigt=\"200\" class=\"card-img-top\" [src]=\"howto.img\" alt=\"Card image cap\">\n        <div class=\"card-body\">\n            <h5 class=\"card-title\">{{concStr.capitalizeFirstLetter(howto.name)}}</h5>\n            <p class=\"card-text\">{{concStr.concatString(howto.description,50)}}</p>\n            <button [routerLink]=\"['/quick/howtos/',howto.link]\" class=\"btn btn-md btn-outline-info\">Start</button>\n            <p class=\"card-text\">\n                <span><small class=\"text-muted\">{{howto.published}}</small></span>&nbsp;&nbsp;&nbsp;\n                <span class=\"text-right\"><small class=\"text-muted\">{{howto.totalTime}}</small></span>\n        </p>\n        </div>\n        </div>\n    </div>",
            styles: [__webpack_require__(/*! ./nav-tab.component.css */ "./src/app/webtuitor/nav-tabs/nav-tab.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_howto_howto_service__WEBPACK_IMPORTED_MODULE_2__["HowtoService"], src_app_untility_string_service__WEBPACK_IMPORTED_MODULE_3__["StringService"]])
    ], HowtoTabComponent);
    return HowtoTabComponent;
}());



/***/ }),

/***/ "./src/app/webtuitor/nav-tabs/nav-tab.component.css":
/*!**********************************************************!*\
  !*** ./src/app/webtuitor/nav-tabs/nav-tab.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card {\r\n    border-top-right-radius: 0;\r\n    border-top-left-radius: 0;\r\n    cursor: pointer;\r\n    background-color: #eeeeee;\r\n}\r\n.card-group {\r\n    border: 1px solid #dedede;\r\n    padding: 0;\r\n}\r\n.card:last-child {\r\n    margin-bottom: 0;\r\n}\r\n.card {\r\n    border-top: none !important;\r\n    border:  none;\r\n    margin: 5px !important;\r\n}\r\n.card:hover {\r\n    background: #d6d6d6;\r\n    transition: all 1.1s ease;\r\n    -webkit-transition: all 1.1s ease;\r\n    /* -webkit-transition: background-color 0.8s;\r\n  -moz-transition: background-color 0.8s;\r\n  -o-transition: background-color 0.8s;\r\n  transition: background-color 0.8s; */\r\n}\r\n@media only screen and (min-width: 720px) {\r\n    .card {\r\n        border-top: none !important;\r\n    }\r\n    .card-group {\r\n        border: none;\r\n    }\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd2VidHVpdG9yL25hdi10YWJzL25hdi10YWIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLDJCQUEyQjtJQUMzQiwwQkFBMEI7SUFDMUIsZ0JBQWdCO0lBQ2hCLDBCQUEwQjtDQUM3QjtBQUNEO0lBQ0ksMEJBQTBCO0lBQzFCLFdBQVc7Q0FDZDtBQUNEO0lBQ0ksaUJBQWlCO0NBQ3BCO0FBQ0Q7SUFDSSw0QkFBNEI7SUFDNUIsY0FBYztJQUNkLHVCQUF1QjtDQUMxQjtBQUNEO0lBQ0ksb0JBQW9CO0lBQ3BCLDBCQUEwQjtJQUMxQixrQ0FBa0M7SUFDbEM7Ozt1Q0FHbUM7Q0FDdEM7QUFFRDtJQUNJO1FBQ0ksNEJBQTRCO0tBQy9CO0lBQ0Q7UUFDSSxhQUFhO0tBQ2hCO0NBQ0oiLCJmaWxlIjoic3JjL2FwcC93ZWJ0dWl0b3IvbmF2LXRhYnMvbmF2LXRhYi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNhcmQge1xyXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDA7XHJcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAwO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2VlZWVlZTtcclxufVxyXG4uY2FyZC1ncm91cCB7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZGVkZWRlO1xyXG4gICAgcGFkZGluZzogMDtcclxufVxyXG4uY2FyZDpsYXN0LWNoaWxkIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDA7XHJcbn1cclxuLmNhcmQge1xyXG4gICAgYm9yZGVyLXRvcDogbm9uZSAhaW1wb3J0YW50O1xyXG4gICAgYm9yZGVyOiAgbm9uZTtcclxuICAgIG1hcmdpbjogNXB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuLmNhcmQ6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZDogI2Q2ZDZkNjtcclxuICAgIHRyYW5zaXRpb246IGFsbCAxLjFzIGVhc2U7XHJcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAxLjFzIGVhc2U7XHJcbiAgICAvKiAtd2Via2l0LXRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC44cztcclxuICAtbW96LXRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC44cztcclxuICAtby10cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuOHM7XHJcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjhzOyAqL1xyXG59XHJcblxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDcyMHB4KSB7XHJcbiAgICAuY2FyZCB7XHJcbiAgICAgICAgYm9yZGVyLXRvcDogbm9uZSAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gICAgLmNhcmQtZ3JvdXAge1xyXG4gICAgICAgIGJvcmRlcjogbm9uZTtcclxuICAgIH1cclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/webtuitor/webtuitor.component.css":
/*!***************************************************!*\
  !*** ./src/app/webtuitor/webtuitor.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@import url('https://fonts.googleapis.com/css2?family=Grandstander:wght@100&display=swap');\r\n\r\nhtml {\r\n  height: 100%;\r\n}\r\n\r\n#top-search-box {\r\n  display: none !important;\r\n}\r\n\r\n.home {\r\n  background: rgba(250, 250, 250, 0.8);\r\n  background-repeat: no-repeat;\r\n}\r\n\r\n.demo-img,\r\n.demo-img2 {\r\n  position: relative;\r\n  top: -5px;\r\n  width: 300px;\r\n\r\n}\r\n\r\n.view-link {\r\n  z-index: +9999!important;\r\n}\r\n\r\n.register {\r\n  background: rgba(199, 61, 61, 0.8) url('undraw_Relaxing_at_home_re_mror.svg') top right;\r\n  background-repeat: no-repeat;\r\n}\r\n\r\n.about {\r\n  background: rgba(199, 61, 61, 0.7) url('undraw_Freelancer_re_irh4.svg') top left;\r\n  background-repeat: no-repeat;\r\n\r\n  min-height: 100vh !important;\r\n}\r\n\r\n.about .container h4 {\r\n  padding-top: 15%;\r\n}\r\n\r\n.reg-notice {\r\n  padding: 0 15px;\r\n  padding-top: 60px;\r\n  margin-left: 20px;\r\n  color: #fdfdfd;\r\n}\r\n\r\n.notice {\r\n  margin-top: auto;\r\n  position: relative;\r\n  font-size: x-large;\r\n  padding: 40px;\r\n  letter-spacing: 0.1em;\r\n  font-weight: 600;\r\n  background: #fdfdfd;\r\n  cursor: pointer;\r\n}\r\n\r\n.notice span {\r\n  margin-top: 10px;\r\n  padding: 10px;\r\n  display: block;\r\n}\r\n\r\nh1,\r\nh2,\r\nh3 {\r\n  font-family: 'Grandstander', cursive;\r\n}\r\n\r\n.bookme:hover {\r\n  background: rgba(108, 99, 255, 0.8) !important;\r\n  width: 160px;\r\n}\r\n\r\n.guide {\r\n  padding: 25px 10px;\r\n  margin-bottom: 10%;\r\n  background: rgba(216, 210, 210, 0.2);\r\n  border-radius: 5px;\r\n}\r\n\r\n#howitworks {\r\n  font-size: 2rem;\r\n  font-weight: 700;\r\n  padding-bottom: 10px;\r\n}\r\n\r\n#list li {\r\n  margin: 15px;\r\n}\r\n\r\niframe {\r\n  opacity: 0.8;\r\n}\r\n\r\nsummary {\r\n  font-weight: bold;\r\n  margin: -.5em -.5em 0;\r\n  padding: .5em;\r\n}\r\n\r\n.nav-tabs li a.nav-link {\r\n  margin-right: 5px;\r\n  padding: 15px 5px;\r\n  color: #797979;\r\n  text-decoration: none;\r\n  font-weight: 600 !important;\r\n}\r\n\r\n.nav-tabs li a.nav-link:hover {\r\n  color: #7b7dc5;\r\n}\r\n\r\n@media only screen and (min-width: 720px) {\r\n\r\n  .contentAds {\r\n    margin: 0 auto;\r\n    font-size: xx-large;\r\n    margin: 100px 0 0 0;\r\n    padding: 5px 80px 5px 2px;\r\n    text-align: justify;\r\n  }\r\n\r\n  .demo-img {\r\n    margin-top: 100px;\r\n    margin-left: 0px !important;\r\n    width: 600px !important;\r\n  }\r\n\r\n  .demo-img2 {\r\n    margin-top: 50px;\r\n    margin-left: -25px;\r\n    width: 400px !important;\r\n  }\r\n\r\n  .register {\r\n    background: rgba(199, 61, 61, 0.8) url('undraw_Relaxing_at_home_re_mror.svg') top right;\r\n  }\r\n\r\n  .home,\r\n  .register {\r\n    background-repeat: no-repeat;\r\n    background-attachment: fixed;\r\n  }\r\n\r\n  .notice {\r\n    margin-top: auto;\r\n    left: 100px;\r\n    position: relative;\r\n    font-size: xx-large;\r\n    padding: 40px;\r\n    letter-spacing: 0.2em;\r\n    font-weight: 600;\r\n    background: #fdfdfd;\r\n    cursor: pointer;\r\n  }\r\n\r\n  .reg-notice {\r\n    padding: 0 15px;\r\n    margin-left: 10%;\r\n    color: #f8f2f2;\r\n  }\r\n\r\n  #top-search-box {\r\n    display: none;\r\n  }\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd2VidHVpdG9yL3dlYnR1aXRvci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDJGQUEyRjs7QUFFM0Y7RUFDRSxhQUFhO0NBQ2Q7O0FBRUQ7RUFDRSx5QkFBeUI7Q0FDMUI7O0FBRUQ7RUFDRSxxQ0FBcUM7RUFDckMsNkJBQTZCO0NBQzlCOztBQUVEOztFQUVFLG1CQUFtQjtFQUNuQixVQUFVO0VBQ1YsYUFBYTs7Q0FFZDs7QUFFRDtFQUNFLHlCQUF5QjtDQUMxQjs7QUFFRDtFQUNFLHdGQUF5RztFQUN6Ryw2QkFBNkI7Q0FDOUI7O0FBRUQ7RUFDRSxpRkFBa0c7RUFDbEcsNkJBQTZCOztFQUU3Qiw2QkFBNkI7Q0FDOUI7O0FBRUQ7RUFDRSxpQkFBaUI7Q0FDbEI7O0FBRUQ7RUFDRSxnQkFBZ0I7RUFDaEIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixlQUFlO0NBQ2hCOztBQUVEO0VBQ0UsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsY0FBYztFQUNkLHNCQUFzQjtFQUN0QixpQkFBaUI7RUFDakIsb0JBQW9CO0VBQ3BCLGdCQUFnQjtDQUNqQjs7QUFFRDtFQUNFLGlCQUFpQjtFQUNqQixjQUFjO0VBQ2QsZUFBZTtDQUNoQjs7QUFFRDs7O0VBR0UscUNBQXFDO0NBQ3RDOztBQUVEO0VBQ0UsK0NBQStDO0VBQy9DLGFBQWE7Q0FDZDs7QUFFRDtFQUNFLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIscUNBQXFDO0VBQ3JDLG1CQUFtQjtDQUNwQjs7QUFFRDtFQUNFLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIscUJBQXFCO0NBQ3RCOztBQUVEO0VBQ0UsYUFBYTtDQUNkOztBQUVEO0VBQ0UsYUFBYTtDQUNkOztBQUVEO0VBQ0Usa0JBQWtCO0VBQ2xCLHNCQUFzQjtFQUN0QixjQUFjO0NBQ2Y7O0FBRUQ7RUFDRSxrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixzQkFBc0I7RUFDdEIsNEJBQTRCO0NBQzdCOztBQUVEO0VBQ0UsZUFBZTtDQUNoQjs7QUFFRDs7RUFFRTtJQUNFLGVBQWU7SUFDZixvQkFBb0I7SUFDcEIsb0JBQW9CO0lBQ3BCLDBCQUEwQjtJQUMxQixvQkFBb0I7R0FDckI7O0VBRUQ7SUFDRSxrQkFBa0I7SUFDbEIsNEJBQTRCO0lBQzVCLHdCQUF3QjtHQUN6Qjs7RUFFRDtJQUNFLGlCQUFpQjtJQUNqQixtQkFBbUI7SUFDbkIsd0JBQXdCO0dBQ3pCOztFQUVEO0lBQ0Usd0ZBQXlHO0dBQzFHOztFQUVEOztJQUVFLDZCQUE2QjtJQUM3Qiw2QkFBNkI7R0FDOUI7O0VBRUQ7SUFDRSxpQkFBaUI7SUFDakIsWUFBWTtJQUNaLG1CQUFtQjtJQUNuQixvQkFBb0I7SUFDcEIsY0FBYztJQUNkLHNCQUFzQjtJQUN0QixpQkFBaUI7SUFDakIsb0JBQW9CO0lBQ3BCLGdCQUFnQjtHQUNqQjs7RUFFRDtJQUNFLGdCQUFnQjtJQUNoQixpQkFBaUI7SUFDakIsZUFBZTtHQUNoQjs7RUFFRDtJQUNFLGNBQWM7R0FDZjtDQUNGIiwiZmlsZSI6InNyYy9hcHAvd2VidHVpdG9yL3dlYnR1aXRvci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9R3JhbmRzdGFuZGVyOndnaHRAMTAwJmRpc3BsYXk9c3dhcCcpO1xyXG5cclxuaHRtbCB7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcblxyXG4jdG9wLXNlYXJjaC1ib3gge1xyXG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcclxufVxyXG5cclxuLmhvbWUge1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMjUwLCAyNTAsIDI1MCwgMC44KTtcclxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG59XHJcblxyXG4uZGVtby1pbWcsXHJcbi5kZW1vLWltZzIge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB0b3A6IC01cHg7XHJcbiAgd2lkdGg6IDMwMHB4O1xyXG5cclxufVxyXG5cclxuLnZpZXctbGluayB7XHJcbiAgei1pbmRleDogKzk5OTkhaW1wb3J0YW50O1xyXG59XHJcblxyXG4ucmVnaXN0ZXIge1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMTk5LCA2MSwgNjEsIDAuOCkgdXJsKCcuLi8uLi9hc3NldHMvaW1nL3VuZHJhd19SZWxheGluZ19hdF9ob21lX3JlX21yb3Iuc3ZnJykgdG9wIHJpZ2h0O1xyXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbn1cclxuXHJcbi5hYm91dCB7XHJcbiAgYmFja2dyb3VuZDogcmdiYSgxOTksIDYxLCA2MSwgMC43KSB1cmwoJy4uLy4uL2Fzc2V0cy9pbWcvdW5kcmF3X0ZyZWVsYW5jZXJfcmVfaXJoNC5zdmcnKSB0b3AgbGVmdDtcclxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG5cclxuICBtaW4taGVpZ2h0OiAxMDB2aCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uYWJvdXQgLmNvbnRhaW5lciBoNCB7XHJcbiAgcGFkZGluZy10b3A6IDE1JTtcclxufVxyXG5cclxuLnJlZy1ub3RpY2Uge1xyXG4gIHBhZGRpbmc6IDAgMTVweDtcclxuICBwYWRkaW5nLXRvcDogNjBweDtcclxuICBtYXJnaW4tbGVmdDogMjBweDtcclxuICBjb2xvcjogI2ZkZmRmZDtcclxufVxyXG5cclxuLm5vdGljZSB7XHJcbiAgbWFyZ2luLXRvcDogYXV0bztcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgZm9udC1zaXplOiB4LWxhcmdlO1xyXG4gIHBhZGRpbmc6IDQwcHg7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMWVtO1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgYmFja2dyb3VuZDogI2ZkZmRmZDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5ub3RpY2Ugc3BhbiB7XHJcbiAgbWFyZ2luLXRvcDogMTBweDtcclxuICBwYWRkaW5nOiAxMHB4O1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG5oMSxcclxuaDIsXHJcbmgzIHtcclxuICBmb250LWZhbWlseTogJ0dyYW5kc3RhbmRlcicsIGN1cnNpdmU7XHJcbn1cclxuXHJcbi5ib29rbWU6aG92ZXIge1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMTA4LCA5OSwgMjU1LCAwLjgpICFpbXBvcnRhbnQ7XHJcbiAgd2lkdGg6IDE2MHB4O1xyXG59XHJcblxyXG4uZ3VpZGUge1xyXG4gIHBhZGRpbmc6IDI1cHggMTBweDtcclxuICBtYXJnaW4tYm90dG9tOiAxMCU7XHJcbiAgYmFja2dyb3VuZDogcmdiYSgyMTYsIDIxMCwgMjEwLCAwLjIpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG5cclxuI2hvd2l0d29ya3Mge1xyXG4gIGZvbnQtc2l6ZTogMnJlbTtcclxuICBmb250LXdlaWdodDogNzAwO1xyXG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4jbGlzdCBsaSB7XHJcbiAgbWFyZ2luOiAxNXB4O1xyXG59XHJcblxyXG5pZnJhbWUge1xyXG4gIG9wYWNpdHk6IDAuODtcclxufVxyXG5cclxuc3VtbWFyeSB7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgbWFyZ2luOiAtLjVlbSAtLjVlbSAwO1xyXG4gIHBhZGRpbmc6IC41ZW07XHJcbn1cclxuXHJcbi5uYXYtdGFicyBsaSBhLm5hdi1saW5rIHtcclxuICBtYXJnaW4tcmlnaHQ6IDVweDtcclxuICBwYWRkaW5nOiAxNXB4IDVweDtcclxuICBjb2xvcjogIzc5Nzk3OTtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4ubmF2LXRhYnMgbGkgYS5uYXYtbGluazpob3ZlciB7XHJcbiAgY29sb3I6ICM3YjdkYzU7XHJcbn1cclxuXHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzIwcHgpIHtcclxuXHJcbiAgLmNvbnRlbnRBZHMge1xyXG4gICAgbWFyZ2luOiAwIGF1dG87XHJcbiAgICBmb250LXNpemU6IHh4LWxhcmdlO1xyXG4gICAgbWFyZ2luOiAxMDBweCAwIDAgMDtcclxuICAgIHBhZGRpbmc6IDVweCA4MHB4IDVweCAycHg7XHJcbiAgICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xyXG4gIH1cclxuXHJcbiAgLmRlbW8taW1nIHtcclxuICAgIG1hcmdpbi10b3A6IDEwMHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDBweCAhaW1wb3J0YW50O1xyXG4gICAgd2lkdGg6IDYwMHB4ICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG5cclxuICAuZGVtby1pbWcyIHtcclxuICAgIG1hcmdpbi10b3A6IDUwcHg7XHJcbiAgICBtYXJnaW4tbGVmdDogLTI1cHg7XHJcbiAgICB3aWR0aDogNDAwcHggIWltcG9ydGFudDtcclxuICB9XHJcblxyXG4gIC5yZWdpc3RlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDE5OSwgNjEsIDYxLCAwLjgpIHVybCgnLi4vLi4vYXNzZXRzL2ltZy91bmRyYXdfUmVsYXhpbmdfYXRfaG9tZV9yZV9tcm9yLnN2ZycpIHRvcCByaWdodDtcclxuICB9XHJcblxyXG4gIC5ob21lLFxyXG4gIC5yZWdpc3RlciB7XHJcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gICAgYmFja2dyb3VuZC1hdHRhY2htZW50OiBmaXhlZDtcclxuICB9XHJcblxyXG4gIC5ub3RpY2Uge1xyXG4gICAgbWFyZ2luLXRvcDogYXV0bztcclxuICAgIGxlZnQ6IDEwMHB4O1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgZm9udC1zaXplOiB4eC1sYXJnZTtcclxuICAgIHBhZGRpbmc6IDQwcHg7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogMC4yZW07XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgYmFja2dyb3VuZDogI2ZkZmRmZDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICB9XHJcblxyXG4gIC5yZWctbm90aWNlIHtcclxuICAgIHBhZGRpbmc6IDAgMTVweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAxMCU7XHJcbiAgICBjb2xvcjogI2Y4ZjJmMjtcclxuICB9XHJcblxyXG4gICN0b3Atc2VhcmNoLWJveCB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG4gIH1cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/webtuitor/webtuitor.component.html":
/*!****************************************************!*\
  !*** ./src/app/webtuitor/webtuitor.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\" home text-whie pb-5\">\r\n  <div class=\"container \">\r\n    <div class=\"row \">\r\n      <div class=\"col-md-6 d-flex p-lg-5 p-sm-3 justify-content-center bg-light flex-column\">\r\n        <h4 class=\"notice border mt-4 shadow\">Hi there, WebTuitor makes it easy!\r\n          <br><br>\r\n          Learn by doing\r\n          <br>\r\n          <a href=\"home#howto\"><button class=\"btn btn-md btn-outline-dark mt-3\">Get Started!</button></a>\r\n        </h4>\r\n        <img class=\"postion-fixed demo-img d-lg-none d-sm-block mb-4\"\r\n          src=\"../../assets/img/undraw_pair_programming_njlp.svg\" alt=\"\">\r\n        <details closed>\r\n          <summary class=\"mt-3\">How it works</summary>\r\n        </details>\r\n        <h3>We are here for you</h3>\r\n        <a href=\"home#howto\"><button class=\"btn btn-sm btn-outline-dark\">Get Started!</button></a>\r\n      </div>\r\n      <div class=\"col-md-6\">\r\n        <img class=\"postion-fixed demo-img d-none d-lg-block\" src=\"../../assets/img/undraw_pair_programming_njlp.svg\"\r\n          alt=\"\">\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div id=\"howto\" class=\"container mb-5\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-12\">\r\n        <ul class=\"nav nav-tabs mt-5\">\r\n          <li class=\"nav-item\">\r\n            <a class=\"nav-link active\" href=\"/home#howto\">Popular How-Tos</a>\r\n          </li>\r\n          <li class=\"nav-item\">\r\n            <a class=\"nav-link\" href=\"/home#new-courses\">Popular Courses</a>\r\n          </li>\r\n          <li class=\"nav-item\">\r\n            <a class=\"nav-link\" href=\"/home#ebook\">eBooks</a>\r\n          </li>\r\n        </ul>\r\n        <howto-tab></howto-tab>\r\n        <a [routerLink]=\"['/quick/howtos']\" class=\"float-right view-link\">View all How-Tos</a>\r\n      </div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-md-4 mt-3\">\r\n        <img class=\"demo-img2\" src=\"../../assets/img/undraw_working_remotely_jh40 (1).svg\" alt=\"\">\r\n      </div>\r\n      <div class=\"col-md-8\">\r\n        <div class=\"contentAds\">\r\n          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam\r\n          corrupti odio, reiciendis natus minima voluptas perspiciatis unde pariatur corporis excepturi asperiores\r\n          perferendis!\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div id=\"new-courses\" class=\"container min-vh-100\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-12\">\r\n        <ul class=\"nav nav-tabs mt-5\">\r\n          <li class=\"nav-item\">\r\n            <a class=\"nav-link\" href=\"/home#howto\">Popular How-Tos</a>\r\n          </li>\r\n          <li class=\"nav-item\">\r\n            <a class=\"nav-link active\" href=\"/home#new-courses\">Popular Courses</a>\r\n          </li>\r\n          <li class=\"nav-item\">\r\n            <a class=\"nav-link\" href=\"/home#ebook\"> eBooks</a>\r\n          </li>\r\n        </ul>\r\n        <course-tab></course-tab>\r\n        <a [routerLink]=\"['/learn/courses']\" class=\"float-right view-link\">View all Courses</a>\r\n      </div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-md-4\">\r\n        <img class=\"demo-img2\" src=\"../../assets/img/undraw_laravel_and_vue_59tp.svg\" alt=\"\">\r\n      </div>\r\n      <div class=\"col-md-8\">\r\n        <div class=\"contentAds\">\r\n          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam\r\n          corrupti odio, reiciendis natus minima voluptas perspiciatis unde pariatur corporis excepturi asperiores\r\n          perferendis!\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div id=\"ebook\" class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-12\">\r\n        <ul class=\"nav nav-tabs mt-5\">\r\n          <li class=\"nav-item\">\r\n            <a class=\"nav-link\" href=\"/home#howto\">Popular How-Tos</a>\r\n          </li>\r\n          <li class=\"nav-item\">\r\n            <a class=\"nav-link \" href=\"/home#new-courses\">Popular Courses</a>\r\n          </li>\r\n          <li class=\"nav-item\">\r\n            <a class=\"nav-link active px-4\" href=\"/home#ebook\"> eBooks</a>\r\n          </li>\r\n        </ul>\r\n        <ebook-tab></ebook-tab>\r\n        <a [routerLink]=\"['/read/ebooks']\" class=\"float-right view-link\">View all eBooks</a>\r\n      </div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-md-4\">\r\n        <img class=\"demo-img2\" src=\"../../assets/img/undraw_reading_time_gvg0.svg\" alt=\"\">\r\n      </div>\r\n      <div class=\"col-md-8\">\r\n        <div class=\"contentAds\">\r\n          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam\r\n          corrupti odio, reiciendis natus minima voluptas perspiciatis unde pariatur corporis excepturi asperiores\r\n          perferendis!\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  \r\n  \r\n"

/***/ }),

/***/ "./src/app/webtuitor/webtuitor.component.ts":
/*!**************************************************!*\
  !*** ./src/app/webtuitor/webtuitor.component.ts ***!
  \**************************************************/
/*! exports provided: WebtuitorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebtuitorComponent", function() { return WebtuitorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_untility_string_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/untility/string.service */ "./src/app/untility/string.service.ts");



var WebtuitorComponent = /** @class */ (function () {
    function WebtuitorComponent(stringService) {
        this.stringService = stringService;
        this.title = 'Webtuitor | Home';
    }
    WebtuitorComponent.prototype.ngOnInit = function () {
        this.strService = this.stringService;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], WebtuitorComponent.prototype, "title", void 0);
    WebtuitorComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'webtuitor-home',
            template: __webpack_require__(/*! ./webtuitor.component.html */ "./src/app/webtuitor/webtuitor.component.html"),
            styles: [__webpack_require__(/*! ./webtuitor.component.css */ "./src/app/webtuitor/webtuitor.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_untility_string_service__WEBPACK_IMPORTED_MODULE_2__["StringService"]])
    ], WebtuitorComponent);
    return WebtuitorComponent;
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
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
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
/* harmony import */ var _polyfills__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polyfills */ "./src/polyfills.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ "./src/polyfills.ts":
/*!**************************!*\
  !*** ./src/polyfills.ts ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zone.js/dist/zone */ "./node_modules/zone.js/dist/zone.js");
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0__);
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/guide/browser-support
 */
/***************************************************************************************************
 * BROWSER POLYFILLS
 */
/** IE9, IE10 and IE11 requires all of the following polyfills. **/
// import 'core-js/es6/symbol';
// import 'core-js/es6/object';
// import 'core-js/es6/function';
// import 'core-js/es6/parse-int';
// import 'core-js/es6/parse-float';
// import 'core-js/es6/number';
// import 'core-js/es6/math';
// import 'core-js/es6/string';
// import 'core-js/es6/date';
// import 'core-js/es6/array';
// import 'core-js/es6/regexp';
// import 'core-js/es6/map';
// import 'core-js/es6/weak-map';
// import 'core-js/es6/set';
/**
 * If the application will be indexed by Google Search, the following is required.
 * Googlebot uses a renderer based on Chrome 41.
 * https://developers.google.com/search/docs/guides/rendering
 **/
// import 'core-js/es6/array';
/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run `npm install --save classlist.js`.
/** IE10 and IE11 requires the following for the Reflect API. */
// import 'core-js/es6/reflect';
/**
 * Web Animations `@angular/platform-browser/animations`
 * Only required if AnimationBuilder is used within the application and using IE/Edge or Safari.
 * Standard animation support in Angular DOES NOT require any polyfills (as of Angular 6.0).
 **/
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.
/**
 * By default, zone.js will patch all possible macroTask and DomEvents
 * user can disable parts of macroTask/DomEvents patch by setting following flags
 */
// (window as any).__Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
// (window as any).__Zone_disable_on_property = true; // disable patch onProperty such as onclick
// (window as any).__zone_symbol__BLACK_LISTED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames
/*
* in IE/Edge developer tools, the addEventListener will also be wrapped by zone.js
* with the following flag, it will bypass `zone.js` patch for IE/Edge
*/
// (window as any).__Zone_enable_cross_context_check = true;
/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
 // Included with Angular CLI.
/***************************************************************************************************
 * APPLICATION IMPORTS
 */


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\My Code\google\new-webtuitor\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map