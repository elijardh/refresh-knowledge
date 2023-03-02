"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.find = exports.findAll = void 0;
let items = {
    1: {
        id: 1,
        name: "Burger",
        price: 599,
        description: "Tasty",
        image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
    },
    2: {
        id: 2,
        name: "Pizza",
        price: 299,
        description: "Cheesy",
        image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
    },
    3: {
        id: 3,
        name: "Tea",
        price: 199,
        description: "Informative",
        image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
    }
};
const findAll = () => __awaiter(void 0, void 0, void 0, function* () { return Object.values(items); });
exports.findAll = findAll;
const find = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const item = items[id];
    if (item != null) {
        return items[id];
    }
    else {
        return null;
    }
});
exports.find = find;
const create = (newItem) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(newItem);
    const id = new Date().valueOf();
    items[id] = Object.assign({ id }, newItem);
    return items[id];
});
exports.create = create;
const update = (updateItem, id) => __awaiter(void 0, void 0, void 0, function* () {
    const item = (0, exports.find)(id);
    if (item == null) {
        return null;
    }
    items[id] = Object.assign({ id }, updateItem);
    return items[id];
});
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const item = (0, exports.find)(id);
    if (item == null) {
        return "Item Does't exist";
    }
    delete items[id];
    return "Item deleted successfully";
});
exports.remove = remove;
