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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const tenant_service_1 = require("../tenant/tenant.service");
const student_entity_1 = require("./student.entity");
let StudentService = class StudentService {
    constructor(tenantService, connection) {
        this.tenantService = tenantService;
        this.connection = connection;
    }
    async findAll() {
        return await this.connection.transaction(async (manager) => {
            const repo = manager.getRepository(student_entity_1.Student);
            await this.tenantService.setCurrentTenantOnRepository(repo);
            return repo.find();
        });
    }
    async findOne(id) {
        return await this.connection.transaction(async (manager) => {
            const repo = manager.getRepository(student_entity_1.Student);
            await this.tenantService.setCurrentTenantOnRepository(repo);
            return repo.findOne(id);
        });
    }
    async create(student) {
        await this.connection.transaction(async (manager) => {
            const repo = manager.getRepository(student_entity_1.Student);
            await this.tenantService.setCurrentTenantOnRepository(repo);
            await repo.save(student);
        });
    }
};
StudentService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [tenant_service_1.TenantService,
        typeorm_1.Connection])
], StudentService);
exports.StudentService = StudentService;
//# sourceMappingURL=student.service.js.map