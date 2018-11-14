"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const index_1 = require("../db/index");
const create_link_dto_1 = require("./dto/create-link.dto");
let LinksService = class LinksService {
    getOne(id) {
        return 'getting one link';
    }
    checkShortLinkAvailability(newLink) {
        return new Promise((resolve, reject) => {
            if (newLink instanceof create_link_dto_1.CreateLinkDto) {
                const queryText = 'select short_link from links where short_link = $1';
                index_1.query(queryText, [newLink.shortLink.trim()], (err, res) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    else {
                        console.log(res);
                        resolve(res);
                    }
                });
            }
            else
                reject(new Error('неподдерживаемый тип параметра'));
        });
    }
    checkLongLinkAvailability(newLink) {
        return new Promise((resolve, reject) => {
            if (newLink instanceof create_link_dto_1.CreateLinkDto) {
                const queryText = 'select long_link from links where long_link = $1';
                index_1.query(queryText, [newLink.longLink.trim()], (err, res) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    else {
                        console.log(res);
                        resolve(res);
                    }
                });
            }
            else
                reject(new Error('неподдерживаемый тип параметра'));
        });
    }
    createLink(newLink) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all([this.checkLongLinkAvailability(newLink), this.checkShortLinkAvailability(newLink)])
                .then(values => {
                const longLinkQueryRes = values[0];
                const shortLinkQueryRes = values[1];
                if (longLinkQueryRes.rowCount === 0) {
                    const shortLink = Buffer.from(newLink.longLink).toString('base64');
                    newLink.shortLink = shortLink;
                    const queryText = 'insert into links(long_link, short_link) values ($1, $2)';
                    const params = [newLink.longLink.trim(), newLink.shortLink];
                    index_1.query(queryText, params, (err, res) => {
                        if (err) {
                            console.log(err);
                            return err;
                        }
                        else {
                            console.log(res);
                            return newLink;
                        }
                    });
                }
            })
                .catch(err => {
                console.log(err);
                return err;
            });
        });
    }
};
LinksService = __decorate([
    common_1.Injectable()
], LinksService);
exports.LinksService = LinksService;
//# sourceMappingURL=links.service.js.map