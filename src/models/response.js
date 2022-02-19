const Response = function(data) {
    Object.defineProperties(this, {
        "success": {
            value: true,
            writable: true,
            enumerable: true
        },
        "message": {
            value: "",
            writable: true,
            enumerable: true
        },
        "data": {
            value: {},
            writable: true,
            enumerable: true
        }
    });

    data = data || {};
    Object.assign(this,data);
}

module.exports = Response;
