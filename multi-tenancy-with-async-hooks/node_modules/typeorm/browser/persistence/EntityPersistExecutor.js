import { __awaiter, __generator, __values } from "tslib";
import { MustBeEntityError } from "../error/MustBeEntityError";
import { SubjectExecutor } from "./SubjectExecutor";
import { CannotDetermineEntityError } from "../error/CannotDetermineEntityError";
import { Subject } from "./Subject";
import { OneToManySubjectBuilder } from "./subject-builder/OneToManySubjectBuilder";
import { OneToOneInverseSideSubjectBuilder } from "./subject-builder/OneToOneInverseSideSubjectBuilder";
import { ManyToManySubjectBuilder } from "./subject-builder/ManyToManySubjectBuilder";
import { SubjectDatabaseEntityLoader } from "./SubjectDatabaseEntityLoader";
import { CascadesSubjectBuilder } from "./subject-builder/CascadesSubjectBuilder";
import { OrmUtils } from "../util/OrmUtils";
/**
 * Persists a single entity or multiple entities - saves or removes them.
 */
var EntityPersistExecutor = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function EntityPersistExecutor(connection, queryRunner, mode, target, entity, options) {
        this.connection = connection;
        this.queryRunner = queryRunner;
        this.mode = mode;
        this.target = target;
        this.entity = entity;
        this.options = options;
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Executes persistence operation ob given entity or entities.
     */
    EntityPersistExecutor.prototype.execute = function () {
        var _this = this;
        // check if entity we are going to save is valid and is an object
        if (!this.entity || typeof this.entity !== "object")
            return Promise.reject(new MustBeEntityError(this.mode, this.entity));
        // we MUST call "fake" resolve here to make sure all properties of lazily loaded relations are resolved
        return Promise.resolve().then(function () { return __awaiter(_this, void 0, void 0, function () {
            var queryRunner, entities, entitiesInChunks, executors, executorsWithExecutableOperations, isTransactionStartedByUs, executorsWithExecutableOperations_1, executorsWithExecutableOperations_1_1, executor, e_1_1, error_1, rollbackError_1;
            var e_1, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        queryRunner = this.queryRunner || this.connection.createQueryRunner();
                        // save data in the query runner - this is useful functionality to share data from outside of the world
                        // with third classes - like subscribers and listener methods
                        if (this.options && this.options.data)
                            queryRunner.data = this.options.data;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, , 21, 24]);
                        entities = Array.isArray(this.entity) ? this.entity : [this.entity];
                        entitiesInChunks = this.options && this.options.chunk && this.options.chunk > 0 ? OrmUtils.chunk(entities, this.options.chunk) : [entities];
                        return [4 /*yield*/, Promise.all(entitiesInChunks.map(function (entities) { return __awaiter(_this, void 0, void 0, function () {
                                var subjects, cascadesSubjectBuilder;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            subjects = [];
                                            // create subjects for all entities we received for the persistence
                                            entities.forEach(function (entity) {
                                                var entityTarget = _this.target ? _this.target : entity.constructor;
                                                if (entityTarget === Object)
                                                    throw new CannotDetermineEntityError(_this.mode);
                                                subjects.push(new Subject({
                                                    metadata: _this.connection.getMetadata(entityTarget),
                                                    entity: entity,
                                                    canBeInserted: _this.mode === "save",
                                                    canBeUpdated: _this.mode === "save",
                                                    mustBeRemoved: _this.mode === "remove",
                                                    canBeSoftRemoved: _this.mode === "soft-remove",
                                                    canBeRecovered: _this.mode === "recover"
                                                }));
                                            });
                                            cascadesSubjectBuilder = new CascadesSubjectBuilder(subjects);
                                            subjects.forEach(function (subject) {
                                                // next step we build list of subjects we will operate with
                                                // these subjects are subjects that we need to insert or update alongside with main persisted entity
                                                cascadesSubjectBuilder.build(subject, _this.mode);
                                            });
                                            // console.timeEnd("building cascades...");
                                            // load database entities for all subjects we have
                                            // next step is to load database entities for all operate subjects
                                            // console.time("loading...");
                                            return [4 /*yield*/, new SubjectDatabaseEntityLoader(queryRunner, subjects).load(this.mode)];
                                        case 1:
                                            // console.timeEnd("building cascades...");
                                            // load database entities for all subjects we have
                                            // next step is to load database entities for all operate subjects
                                            // console.time("loading...");
                                            _a.sent();
                                            // console.timeEnd("loading...");
                                            // console.time("other subjects...");
                                            // build all related subjects and change maps
                                            if (this.mode === "save" || this.mode === "soft-remove" || this.mode === "recover") {
                                                new OneToManySubjectBuilder(subjects).build();
                                                new OneToOneInverseSideSubjectBuilder(subjects).build();
                                                new ManyToManySubjectBuilder(subjects).build();
                                            }
                                            else {
                                                subjects.forEach(function (subject) {
                                                    if (subject.mustBeRemoved) {
                                                        new ManyToManySubjectBuilder(subjects).buildForAllRemoval(subject);
                                                    }
                                                });
                                            }
                                            // console.timeEnd("other subjects...");
                                            // console.timeEnd("building subjects...");
                                            // console.log("subjects", subjects);
                                            // create a subject executor
                                            return [2 /*return*/, new SubjectExecutor(queryRunner, subjects, this.options)];
                                    }
                                });
                            }); }))];
                    case 2:
                        executors = _b.sent();
                        executorsWithExecutableOperations = executors.filter(function (executor) { return executor.hasExecutableOperations; });
                        if (executorsWithExecutableOperations.length === 0)
                            return [2 /*return*/];
                        isTransactionStartedByUs = false;
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 15, , 20]);
                        if (!!queryRunner.isTransactionActive) return [3 /*break*/, 5];
                        if (!(!this.options || this.options.transaction !== false)) return [3 /*break*/, 5];
                        isTransactionStartedByUs = true;
                        return [4 /*yield*/, queryRunner.startTransaction()];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 10, 11, 12]);
                        executorsWithExecutableOperations_1 = __values(executorsWithExecutableOperations), executorsWithExecutableOperations_1_1 = executorsWithExecutableOperations_1.next();
                        _b.label = 6;
                    case 6:
                        if (!!executorsWithExecutableOperations_1_1.done) return [3 /*break*/, 9];
                        executor = executorsWithExecutableOperations_1_1.value;
                        return [4 /*yield*/, executor.execute()];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8:
                        executorsWithExecutableOperations_1_1 = executorsWithExecutableOperations_1.next();
                        return [3 /*break*/, 6];
                    case 9: return [3 /*break*/, 12];
                    case 10:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 12];
                    case 11:
                        try {
                            if (executorsWithExecutableOperations_1_1 && !executorsWithExecutableOperations_1_1.done && (_a = executorsWithExecutableOperations_1.return)) _a.call(executorsWithExecutableOperations_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 12:
                        if (!(isTransactionStartedByUs === true)) return [3 /*break*/, 14];
                        return [4 /*yield*/, queryRunner.commitTransaction()];
                    case 13:
                        _b.sent();
                        _b.label = 14;
                    case 14: return [3 /*break*/, 20];
                    case 15:
                        error_1 = _b.sent();
                        if (!isTransactionStartedByUs) return [3 /*break*/, 19];
                        _b.label = 16;
                    case 16:
                        _b.trys.push([16, 18, , 19]);
                        return [4 /*yield*/, queryRunner.rollbackTransaction()];
                    case 17:
                        _b.sent();
                        return [3 /*break*/, 19];
                    case 18:
                        rollbackError_1 = _b.sent();
                        return [3 /*break*/, 19];
                    case 19: throw error_1;
                    case 20: return [3 /*break*/, 24];
                    case 21:
                        if (!!this.queryRunner) return [3 /*break*/, 23];
                        return [4 /*yield*/, queryRunner.release()];
                    case 22:
                        _b.sent();
                        _b.label = 23;
                    case 23: return [7 /*endfinally*/];
                    case 24: return [2 /*return*/];
                }
            });
        }); });
    };
    return EntityPersistExecutor;
}());
export { EntityPersistExecutor };

//# sourceMappingURL=EntityPersistExecutor.js.map
