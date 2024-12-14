"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vite_plugin_federation_1 = require("@originjs/vite-plugin-federation");
var remoteUrl = function (baseUrl) { return "".concat(baseUrl, "/assets/remoteEntry.js"); };
var ViteFederation = function (env) {
    var remotesUrl = {
        '@authRemote': remoteUrl(env.VITE_AUTH_REMOTE_URL),
    };
    var opt = {
        name: 'host-app',
        remotes: remotesUrl,
        shared: ['react', 'react-dom', 'zustand', 'react-router-dom'],
    };
    return (0, vite_plugin_federation_1.default)(opt);
};
exports.default = ViteFederation;
