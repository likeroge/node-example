export const QueryBuilder = {
    http_build_query: function (params:any, prefix?:any) {
        const query:any = Object.keys(params).map((key, idx) => {
            const value = params[key];

            if (params.constructor === Array) key = `${prefix}[${idx}]`;
            else if (params.constructor === Object)
                key = prefix ? `${prefix}[${key}]` : key;

            if (typeof value === "object") return this.http_build_query(value, key);
            else return `${key}=${encodeURIComponent(value)}`;
        });

        return [].concat.apply([], query).join("&");
    },
};