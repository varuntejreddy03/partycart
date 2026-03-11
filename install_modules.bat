@echo off
SETLOCAL EnableDelayedExpansion

echo ==========================================
echo    PartyCart - Node Modules Installer
echo ==========================================
echo.

:: Check if node is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed! Please install it from https://nodejs.org/
    pause
    exit /b
)

echo [INFO] Installing dependencies...
call npm install

if %errorlevel% equ 0 (
    echo.
    echo [SUCCESS] Dependencies installed successfully!
) else (
    echo.
    echo [ERROR] An error occurred during installation.
)

echo.
echo Press any key to exit...
pause >nul
