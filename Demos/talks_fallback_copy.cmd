@ECHO OFF

%~d0
CD "%~dp0"

copy talks_fallback.json CordovaBootstrapKnockoutDemo\CordovaBootstrapKnockoutDemo\scripts\
copy talks_fallback.json CordovajQueryMobile\CordovajQueryMobile\scripts\
copy talks_fallback.json CordovaKendoUiMobileDemo\CordovaKendoUiMobileDemo\scripts\

pause