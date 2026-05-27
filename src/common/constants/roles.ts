export enum Role {
  ADMIN = 'admin',
  RESEARCHER = 'researcher',
  FORMULATOR = 'formulator',
  COMPLIANCE = 'compliance',
  VIEWER = 'viewer',
}

export const RoleHierarchy: Record<Role, number> = {
  [Role.ADMIN]: 4,
  [Role.COMPLIANCE]: 3,
  [Role.FORMULATOR]: 2,
  [Role.RESEARCHER]: 1,
  [Role.VIEWER]: 0,
};

export const RolePermissions: Record<string, Record<string, string[]>> = {
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
