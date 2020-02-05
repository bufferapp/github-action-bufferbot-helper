module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(34);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 6:
/***/ (function() {

eval("require")("@actions/core");


/***/ }),

/***/ 34:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

const core = __webpack_require__(6);
const github = __webpack_require__(304);

async function run() {
  const myToken = core.getInput('repo-token');
  const octokit = new github.GitHub(myToken);

  console.log('github event => ', github.event);
  console.log('github event pr => ', github.event.pull_request);
  console.log('github context => ', github.context);
  console.log('github context pr => ', github.context.pull_request);

  // const result = await octokit.request(`POST /repos/:owner/:repo/issues/:issue_number/comments`, {
  //   headers: {
  //     authorization: `token ${myToken}`,
  //   },
  //   // owner: 'hamstu',
  //   // repo: 'testing',
  //   // issue_number: github.event.number,
  //   body: core.getInput('comment'),
  // });

  // console.log(result.data);
}

run();


/***/ }),

/***/ 304:
/***/ (function() {

eval("require")("@actions/github");


/***/ })

/******/ });