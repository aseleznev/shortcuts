"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const index_1 = require("../db/index");
const create_link_dto_1 = require("./dto/create-link.dto");
let LinksService = class LinksService {
    getOne(shortLink) {
        return new Promise((resolve, reject) => {
            const queryText = 'select short_link, long_link from links where short_link = $1';
            index_1.query(queryText, [shortLink], (err, res) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    console.log(res.long_link);
                    resolve(new create_link_dto_1.CreateLinkDto({ shortLink: res.rows[0].short_link, longLink: res.rows[0].long_link }));
                }
            });
        });
    }
    checkLinkAvailability(newLink) {
        return new Promise((resolve, reject) => {
            if (newLink.longLink) {
                const queryText = 'select short_link, long_link from links where long_link = $1';
                index_1.query(queryText, [newLink.longLink.trim()], (err, res) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    else {
                        console.log('long link:');
                        console.log(res);
                        if (res.rowCount > 0) {
                            resolve(new create_link_dto_1.CreateLinkDto({ shortLink: res.rows[0].short_link, longLink: res.rows[0].long_link }));
                        }
                        else {
                            resolve(new create_link_dto_1.CreateLinkDto({ shortLink: null, longLink: null }));
                        }
                    }
                });
            }
        });
    }
    createLink(newLink) {
        return this.checkLinkAvailability(newLink)
            .then(result => {
            if (result.shortLink) {
                const queryText = 'DELETE FROM links WHERE links.long_link = $1';
                index_1.query(queryText, [newLink.longLink], err => {
                    if (err) {
                        console.log(err);
                        return err.message;
                    }
                });
            }
            const shortLink = Buffer.from(newLink.longLink).toString('base64');
            const returnLink = new create_link_dto_1.CreateLinkDto({ longLink: newLink.longLink, shortLink });
            const queryText = 'insert into links(long_link, short_link) values ($1, $2)';
            const params = [newLink.longLink, shortLink];
            index_1.query(queryText, params, (err, res) => {
                if (err) {
                    console.log(err);
                    return err.message;
                }
            });
            return returnLink;
        })
            .catch(err => {
            console.log(err);
            return err;
        });
    }
};
LinksService = __decorate([
    common_1.Injectable()
], LinksService);
exports.LinksService = LinksService;
//# sourceMappingURL=links.service.js.map