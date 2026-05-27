"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissions = exports.RoleHierarchy = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role["RESEARCHER"] = "researcher";
    Role["FORMULATOR"] = "formulator";
    Role["COMPLIANCE"] = "compliance";
    Role["VIEWER"] = "viewer";
})(Role || (exports.Role = Role = {}));
exports.RoleHierarchy = {
    [Role.ADMIN]: 4,
    [Role.COMPLIANCE]: 3,
    [Role.FORMULATOR]: 2,
    [Role.RESEARCHER]: 1,
    [Role.VIEWER]: 0,
};
exports.RolePermissions = {
    materials: {
        [Role.ADMIN]: ['create', 'read', 'update', 'delete'],
        [Role.RESEARCHER]: ['create', 'read', 'update', 'delete'],
        [Role.FORMULATOR]: ['read'],
        [Role.COMPLIANCE]: ['read'],
        [Role.VIEWER]: ['read'],
    },
    health: {
        [Role.ADMIN]: ['create', 'read', 'update', 'delete'],
        [Role.RESEARCHER]: ['create', 'read', 'update', 'delete'],
        [Role.FORMULATOR]: ['read'],
        [Role.COMPLIANCE]: ['read'],
        [Role.VIEWER]: ['read'],
    },
    laws: {
        [Role.ADMIN]: ['create', 'read', 'update', 'delete'],
        [Role.RESEARCHER]: ['read'],
        [Role.FORMULATOR]: ['read'],
        [Role.COMPLIANCE]: ['create', 'read', 'update', 'delete'],
        [Role.VIEWER]: ['read'],
    },
    formulas: {
        [Role.ADMIN]: ['create', 'read', 'update', 'delete'],
        [Role.RESEARCHER]: ['read'],
        [Role.FORMULATOR]: ['create', 'read', 'update', 'delete'],
        [Role.COMPLIANCE]: ['read'],
        [Role.VIEWER]: ['read'],
    },
    books: {
        [Role.ADMIN]: ['create', 'read', 'update', 'delete'],
        [Role.RESEARCHER]: ['create', 'read', 'update', 'delete'],
        [Role.FORMULATOR]: ['read'],
        [Role.COMPLIANCE]: ['read'],
        [Role.VIEWER]: ['read'],
    },
    auditLogs: {
        [Role.ADMIN]: ['read'],
        [Role.RESEARCHER]: [],
        [Role.FORMULATOR]: [],
        [Role.COMPLIANCE]: [],
        [Role.VIEWER]: [],
    },
};
//# sourceMappingURL=roles.js.map