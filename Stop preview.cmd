@echo off
setlocal
cd /d "%~dp0"
set "TOOLWIKI_NODE=node"
where node >nul 2>nul
if errorlevel 1 set "TOOLWIKI_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
"%TOOLWIKI_NODE%" scripts\preview.mjs --stop
if errorlevel 1 pause
