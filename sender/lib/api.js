"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TaskState;
(function (TaskState) {
    TaskState[TaskState["CREATION"] = 0] = "CREATION";
    TaskState[TaskState["OPTIMIZATION"] = 1] = "OPTIMIZATION";
    TaskState[TaskState["SUBMISSION"] = 2] = "SUBMISSION";
    TaskState[TaskState["COMPLETE"] = 3] = "COMPLETE";
})(TaskState = exports.TaskState || (exports.TaskState = {}));
