"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
const resize_1 = __importDefault(require("../utilities/resize"));
const resize = (req, res) => {
    //getting the filename ,width and height from the query-string
    const data = req.query;
    const filename = `${data.filename}`;
    const width = parseInt(`${data.width}`);
    const hight = parseInt(`${data.hight}`);
    const outPut = path_1.default.resolve(__dirname, `../../images/thumb/${filename}_${width}_${hight}.jpg`);
    (0, resize_1.default)(filename, width, hight);
    // checking if the image exists or not.
    if (fs.existsSync(outPut)) {
        //if it exists send the image directly.
        res.sendFile(outPut);
    }
    else {
        // if it does not exist call resize function to create a new resized image.
        (0, resize_1.default)(filename, width, hight);
        setTimeout(() => {
            res.sendFile(outPut);
        }, 500);
    }
};
exports.default = resize;
