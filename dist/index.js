(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/extract-localize/extract-localize.ts":
/*!**************************************************!*\
  !*** ./src/extract-localize/extract-localize.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.extractLocalize = void 0;\r\nconst xlf_utils_1 = __webpack_require__(/*! ../xlf-utils */ \"./src/xlf-utils/index.ts\");\r\nfunction extractLocalize(fileContent) {\r\n    const localizeStrings = fileContent.match(xlf_utils_1.localizeRegex.id);\r\n    if (!localizeStrings) {\r\n        return [];\r\n    }\r\n    return localizeStrings.map(localizeString => localizeString.match(xlf_utils_1.localizeRegex.idDetails))\r\n        .map(match => ({\r\n        id: match.groups.id,\r\n        source: match.groups.source.replace(/\\${(?<variable>((?!}).)+)}/g, match => {\r\n            const matchDetails = match.match(/\\${(?<variable>((?!}).)+)}/);\r\n            return `<x id=\"INTERPOLATION\" equiv-text=\"{{${matchDetails.groups.variable}}}\"/>`;\r\n        })\r\n    }));\r\n}\r\nexports.extractLocalize = extractLocalize;\r\n// ToDo\r\n// $localize `some string to localize`\r\n// $localize`:meaning|description@@id:source message text`;\r\n// $localize`:meaning|:source message text`;\r\n// $localize`:description:source message text`;\r\n// $localize`:@@id:source message text`;\r\n// $localize `Hi ${name}! There are ${items.length} items.`;\r\n// will generate a message-source of Hi {$PH}! There are {$PH_1} items.\r\n// The recommended practice is to name the placeholder associated with each expression though.\r\n// Do this by providing the placeholder name wrapped in : characters directly after the expression. These placeholder names are stripped out of the rendered localized string.\r\n// For example, to name the items.length expression placeholder itemCount you write:\r\n// $localize `There are ${items.length}:itemCount: items`;\r\n// Escaping colon markers\r\n// If you need to use a : character directly at the start of a tagged string that has no metadata block, or directly after a substitution expression that has no name you must escape the : by preceding it with a backslash:\r\n// For example:\r\n// // message has a metadata block so no need to escape colon\r\n// $localize `:some description::this message starts with a colon (:)`;\r\n// // no metadata block so the colon must be escaped\r\n// $localize `\\:this message starts with a colon (:)`;\r\n// // named substitution so no need to escape colon\r\n// $localize `${label}:label:: ${}`\r\n// // anonymous substitution so colon must be escaped\r\n// $localize `${label}\\: ${}`\r\n// Processing localized strings:\r\n// There are three scenarios:\r\n// compile-time inlining: the $localize tag is transformed at compile time by a transpiler, removing the tag and replacing the template literal string with a translated literal string from a collection of translations provided to the transpilation tool.\r\n// run-time evaluation: the $localize tag is a run-time function that replaces and reorders the parts (static strings and expressions) of the template literal string with strings from a collection of translations loaded at run-time.\r\n// pass-through evaluation: the $localize tag is a run-time function that simply evaluates the original template literal string without applying any translations to the parts. This version is used during development or where there is no need to translate the localized template literals.\r\n// @param messageParts — a collection of the static parts of the template string.\r\n// @param expressions — a collection of the values of each placeholder in the template string.\r\n// @returns — the translated string, with the messageParts and expressions interleaved together.\r\n\n\n//# sourceURL=webpack:///./src/extract-localize/extract-localize.ts?");

/***/ }),

/***/ "./src/extract-localize/index.ts":
/*!***************************************!*\
  !*** ./src/extract-localize/index.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\r\n    for (var p in m) if (p !== \"default\" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n__exportStar(__webpack_require__(/*! ./extract-localize */ \"./src/extract-localize/extract-localize.ts\"), exports);\r\n\n\n//# sourceURL=webpack:///./src/extract-localize/index.ts?");

/***/ }),

/***/ "./src/extractor.ts":
/*!**************************!*\
  !*** ./src/extractor.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.extract = void 0;\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\nconst files_manager_1 = __webpack_require__(/*! ./files-manager */ \"./src/files-manager/index.ts\");\r\nconst extract_localize_1 = __webpack_require__(/*! ./extract-localize */ \"./src/extract-localize/index.ts\");\r\nconst xlf_utils_1 = __webpack_require__(/*! ./xlf-utils */ \"./src/xlf-utils/index.ts\");\r\nfunction extract(projectPath, messagesFilePath) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        // Get files names\r\n        const directoryPath = path.join(projectPath, '/src/app');\r\n        const filesPathes = yield files_manager_1.getAllFilesPathes(directoryPath);\r\n        // autogenerate ids\r\n        yield autoGenerateIds(filesPathes);\r\n        // get data from files\r\n        const localizeData = yield getFilesData(filesPathes);\r\n        // generate xlf from data\r\n        const xlf = xlf_utils_1.generateXlf(localizeData);\r\n        // append xlf to messages\r\n        files_manager_1.appendToFile(path.join(projectPath, messagesFilePath), xlf);\r\n        return Promise.resolve();\r\n    });\r\n}\r\nexports.extract = extract;\r\nfunction autoGenerateIds(filesPathes) {\r\n    return files_manager_1.updateFiles(filesPathes, xlf_utils_1.appendIdToLocalize);\r\n}\r\nfunction getFilesData(filesPathes) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const files = yield files_manager_1.readFiles(filesPathes);\r\n        const allExtractions = [];\r\n        for (let file of files) {\r\n            allExtractions.push(...extract_localize_1.extractLocalize(file));\r\n        }\r\n        return allExtractions;\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./src/extractor.ts?");

/***/ }),

/***/ "./src/files-manager/extract-files.ts":
/*!********************************************!*\
  !*** ./src/files-manager/extract-files.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.getAllFilesPathes = void 0;\r\nconst fs = __webpack_require__(/*! fs */ \"fs\");\r\nfunction getAllFilesPathes(path) {\r\n    return new Promise((resolve, reject) => {\r\n        fs.lstat(path, (err, stats) => {\r\n            if (err) {\r\n                reject(err);\r\n                return console.log(\" errors!\", err); //Handle error\r\n            }\r\n            else {\r\n                const isDir = stats.isDirectory();\r\n                if (isDir) {\r\n                    fs.readdir(path, function (err, files) {\r\n                        const promises = [];\r\n                        files.forEach(file => {\r\n                            promises.push(getAllFilesPathes(path + '\\\\' + file));\r\n                        });\r\n                        Promise.all(promises).then(files => {\r\n                            const result = [];\r\n                            files.forEach(f => result.push(...f));\r\n                            resolve(result);\r\n                        });\r\n                    });\r\n                }\r\n                else if (path.includes('.ts')) {\r\n                    resolve([path]);\r\n                }\r\n                else {\r\n                    resolve([]);\r\n                }\r\n            }\r\n        });\r\n    });\r\n}\r\nexports.getAllFilesPathes = getAllFilesPathes;\r\n\n\n//# sourceURL=webpack:///./src/files-manager/extract-files.ts?");

/***/ }),

/***/ "./src/files-manager/index.ts":
/*!************************************!*\
  !*** ./src/files-manager/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\r\n    for (var p in m) if (p !== \"default\" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n__exportStar(__webpack_require__(/*! ./extract-files */ \"./src/files-manager/extract-files.ts\"), exports);\r\n__exportStar(__webpack_require__(/*! ./read-write */ \"./src/files-manager/read-write.ts\"), exports);\r\n\n\n//# sourceURL=webpack:///./src/files-manager/index.ts?");

/***/ }),

/***/ "./src/files-manager/read-write.ts":
/*!*****************************************!*\
  !*** ./src/files-manager/read-write.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.appendToFile = exports.updateFiles = exports.updateFile = exports.writeFile = exports.readFiles = exports.readFile = void 0;\r\nconst fs = __webpack_require__(/*! fs */ \"fs\");\r\nfunction readFile(path) {\r\n    return new Promise((resolve, reject) => {\r\n        fs.readFile(path, 'utf8', (err, data) => {\r\n            if (err) {\r\n                return reject(err);\r\n            }\r\n            resolve(data);\r\n        });\r\n    });\r\n}\r\nexports.readFile = readFile;\r\nfunction readFiles(pathes) {\r\n    const promises = [];\r\n    pathes.forEach(path => {\r\n        promises.push(readFile(path));\r\n    });\r\n    return Promise.all(promises);\r\n}\r\nexports.readFiles = readFiles;\r\nfunction writeFile(path, content) {\r\n    return new Promise((resolve, reject) => {\r\n        fs.writeFile(path, content, 'utf8', (err) => {\r\n            if (err) {\r\n                return reject(err);\r\n            }\r\n            resolve();\r\n        });\r\n    });\r\n}\r\nexports.writeFile = writeFile;\r\nfunction updateFile(path, updater) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const fileContent = yield readFile(path);\r\n        const updatedFileContent = updater(fileContent);\r\n        return yield writeFile(path, updatedFileContent);\r\n    });\r\n}\r\nexports.updateFile = updateFile;\r\nfunction updateFiles(pathes, updater) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const promises = [];\r\n        pathes.forEach(path => {\r\n            promises.push(updateFile(path, updater));\r\n        });\r\n        return Promise.all(promises);\r\n    });\r\n}\r\nexports.updateFiles = updateFiles;\r\nfunction appendToFile(path, content) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        let fileContent = yield readFile(path);\r\n        fileContent = fileContent.replace('</file>', '');\r\n        fileContent = fileContent.replace('</body>', '');\r\n        fileContent = fileContent.replace('</xliff>', '');\r\n        fileContent += content;\r\n        fileContent += '\\n</body>\\n</file>\\n</xliff>';\r\n        return yield writeFile(path, fileContent);\r\n        // fs.appendFile(path, content + \"\\n\", function (err) {\r\n        //     if (err) throw err;\r\n        //     console.log('Saved!');\r\n        // });\r\n    });\r\n}\r\nexports.appendToFile = appendToFile;\r\n// export async function appendTansUnits(path: string, content: string): Promise<void> {\r\n//     const file = await readFile(path);\r\n//     const fileDom = new xmldom.DOMParser().parseFromString(file);\r\n//     const contentDom = new xmldom.DOMParser().parseFromString(content);\r\n//     const parent = fileDom.getElementsByTagName('body')[0] as HTMLElement;\r\n//     parent.appendChild(contentDom);\r\n//     const newCotent = new xmldom.DOMParser().serializeToString(fileDom);\r\n//     const newFile = await writeFile(path + '/test2.xlf', newCotent);\r\n//     console.log(newFile);\r\n// }\r\n\n\n//# sourceURL=webpack:///./src/files-manager/read-write.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.execute = void 0;\r\nconst extractor_1 = __webpack_require__(/*! ./extractor */ \"./src/extractor.ts\");\r\nfunction execute(projectPath = __dirname, messagesFilePath) {\r\n    extractor_1.extract(projectPath, messagesFilePath).then(() => {\r\n        console.log(\"Done\");\r\n    }).catch(err => {\r\n        throw err;\r\n    });\r\n}\r\nexports.execute = execute;\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/xlf-utils/index.ts":
/*!********************************!*\
  !*** ./src/xlf-utils/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\r\n    for (var p in m) if (p !== \"default\" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n__exportStar(__webpack_require__(/*! ./regex */ \"./src/xlf-utils/regex.ts\"), exports);\r\n__exportStar(__webpack_require__(/*! ./xlf-utils */ \"./src/xlf-utils/xlf-utils.ts\"), exports);\r\n\n\n//# sourceURL=webpack:///./src/xlf-utils/index.ts?");

/***/ }),

/***/ "./src/xlf-utils/regex.ts":
/*!********************************!*\
  !*** ./src/xlf-utils/regex.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.localizeRegex = void 0;\r\nexports.localizeRegex = {\r\n    localize: /\\$localize *`((?!`).)+`/g,\r\n    localizeDetails: /\\$localize *`(?<source>((?!`).)+)`/,\r\n    id: /\\$localize *`:@@(?<id>((?!:).)+):(?<source>((?!`).)+)`/g,\r\n    idDetails: /\\$localize *`:@@(?<id>((?!:).)+):(?<source>((?!`).)+)`/\r\n};\r\n\n\n//# sourceURL=webpack:///./src/xlf-utils/regex.ts?");

/***/ }),

/***/ "./src/xlf-utils/xlf-utils.ts":
/*!************************************!*\
  !*** ./src/xlf-utils/xlf-utils.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.generateXlf = exports.appendIdToLocalize = void 0;\r\nconst regex_1 = __webpack_require__(/*! ./regex */ \"./src/xlf-utils/regex.ts\");\r\nfunction appendIdToLocalize(content) {\r\n    return content && content.replace(regex_1.localizeRegex.localize, match => {\r\n        const haveId = match.match(regex_1.localizeRegex.id);\r\n        if (haveId) {\r\n            return match;\r\n        }\r\n        const id = generateId();\r\n        const source = match.match(regex_1.localizeRegex.localizeDetails).groups.source;\r\n        return `$localize \\`:@@${id}:${source}\\``;\r\n    });\r\n}\r\nexports.appendIdToLocalize = appendIdToLocalize;\r\nconst runTimePrefex = Date.now();\r\nlet count = -1;\r\nfunction generateId() {\r\n    count++;\r\n    return `ts-${runTimePrefex}-${count}`;\r\n}\r\nfunction generateXlf(data) {\r\n    return data.map(element => `\r\n    <trans-unit id=\"${element.id}\">\r\n        <source>${element.source}</source>\r\n    </trans-unit>\r\n    `).join('\\n');\r\n}\r\nexports.generateXlf = generateXlf;\r\n\n\n//# sourceURL=webpack:///./src/xlf-utils/xlf-utils.ts?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });
});