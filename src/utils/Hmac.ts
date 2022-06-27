import crypto from 'crypto'

export const Hmac = {
    create: function (data:any, key:any, algo = "sha256"):string|false {
        if (!crypto.getHashes().includes(algo)) return false;

        data = Hmac._strValAndSort(data);

        return crypto
            .createHmac(algo, key)
            .update(JSON.stringify(data))
            .digest("hex");
    },

    verify: function (data:any, key:any, sign:any, algo = "sha256") {
        let _sign = Hmac.create(data, key, algo);
        return _sign && _sign.toLowerCase() == sign.toLowerCase();
    },

    _strValAndSort: function (data:any) {
        data = Hmac._sortObject(data);

        for (var item in data)
            if (data.hasOwnProperty(item))
                if (typeof data[item] === "object")
                    data[item] = Hmac._strValAndSort(data[item]);
                else data[item] = data[item]?.toString();

        return data;
    },

    _sortObject: function (obj:any) {
        if (Array.isArray(obj)) return obj;

        return Object.keys(obj)
            .sort()
            .reduce(function (result:any, key) {
                result[key] = obj[key];
                return result;
            }, {});
    },
};