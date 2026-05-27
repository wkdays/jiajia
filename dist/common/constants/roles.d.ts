export declare enum Role {
    ADMIN = "admin",
    RESEARCHER = "researcher",
    FORMULATOR = "formulator",
    COMPLIANCE = "compliance",
    VIEWER = "viewer"
}
export declare const RoleHierarchy: Record<Role, number>;
export declare const RolePermissions: Record<string, Record<string, string[]>>;
