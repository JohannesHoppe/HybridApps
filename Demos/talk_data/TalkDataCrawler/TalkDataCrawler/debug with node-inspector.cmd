@ECHO off

%~d0
CD "%~dp0"

rem echo Starting chrome...
rem %LOCALAPPDATA%\Google\Chrome\Application\chrome.exe 127.0.0.1:8080/debug?port=5858

node-inspector & node --debug crawler.js

pause
