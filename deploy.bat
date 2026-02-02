@echo off
echo Deploying Partycart to GitHub...

REM Initialize git if not already done
if not exist .git (
    git init
    git remote add origin https://github.com/varuntejreddy03/partycart.git
)

REM Add all files
git add .

REM Commit with timestamp
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YY=%dt:~2,2%" & set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"
set "timestamp=%YYYY%-%MM%-%DD% %HH%:%Min%:%Sec%"

git commit -m "Deploy: %timestamp%"

REM Push to GitHub
git branch -M main
git push -u origin main

echo.
echo Deployment complete!
echo Check: https://github.com/varuntejreddy03/partycart
pause