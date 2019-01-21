"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const links_service_1 = require("./links.service");
const create_link_dto_1 = require("./dto/create-link.dto");
let LinksController = class LinksController {
    constructor(linksService) {
        this.linksService = linksService;
    }
    findOne(params, result) {
        return this.linksService
            .getOne(params.id)
            .then(res => result.json(res))
            .catch(err => result.json(err));
    }
    create(createLinkDto, result) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(createLinkDto);
            return this.linksService.createLink(new create_link_dto_1.CreateLinkDto(createLinkDto)).then(res => result.json(res));
        });
    }
};
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LinksController.prototype, "findOne", null);
__decorate([
    common_1.Post('/link'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_link_dto_1.CreateLinkDto, Object]),
    __metadata("design:returntype", Promise)
], LinksController.prototype, "create", null);
LinksController = __decorate([
    common_1.Controller('links'),
    __metadata("design:paramtypes", [links_service_1.LinksService])
], LinksController);
exports.LinksController = LinksController;
//# sourceMappingURL=links.controller.js.map