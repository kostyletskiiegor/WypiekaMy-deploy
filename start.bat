@echo off
start "" /B node serve.mjs
timeout /t 1 /nobreak >nul
start "" http://localhost:3001
