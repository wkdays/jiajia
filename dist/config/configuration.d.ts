declare const _default: () => {
    port: number;
    apiPrefix: string;
    database: {
        url: string | undefined;
    };
    jwt: {
        secret: string | undefined;
        expiresIn: string;
    };
    encryption: {
        key: string | undefined;
    };
    redis: {
        url: string | undefined;
    };
    meilisearch: {
        host: string | undefined;
        apiKey: string | undefined;
    };
};
export default _default;
