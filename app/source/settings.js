const appKey = "";

export default {
    Session: App.createSession(appKey),
    Settings: App.createSettings(appKey),
    GlobalSettings: App.createSettings("global"),
    appKey
};
