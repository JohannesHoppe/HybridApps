# TalkDataCrawler

A simple crawler to get the events from DWX 2014

## Before npm install

The crawler requires node-gyp (Node.js native addon build tool)
For Windows 7/8 apply these steps:

1. install Python (v2.7.x recommended, v3.x.x is not supported)
   http://www.python.org/getit/windows
   Set up **python environment variable** during setup!

2. install Microsoft Visual Studio C++ 2012 for Windows Desktop (Express version works well)
   http://go.microsoft.com/?linkid=9816758

3. start "VS2012 x64 Cross Tools Command Prompt:
       CALL: "npm install -g node-gyp"
       CD to TalkDataCrawler folder
       CALL: "npm install"

4. see https://github.com/TooTallNate/node-gyp for more information