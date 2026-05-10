@echo off
echo Starting ElectroShop...
echo.

start "ElectroShop Backend" cmd /k "cd /d "%~dp0backend" & node server.js"
timeout /t 3 /nobreak >nul
start "ElectroShop Frontend" cmd /k "cd /d "%~dp0frontend" & npm run dev"

echo Opening browser in 5 seconds...
timeout /t 5 /nobreak >nul
start http://localhost:3001
