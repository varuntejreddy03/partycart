@echo off
echo ==========================================
echo    PartyCart GitHub Auto-Deploy Script
echo ==========================================

echo [1/5] Configuring Remote...
git remote remove origin 2>nul
git remote add origin https://github.com/varuntejreddy03/partycart.git

echo [2/5] Staging Changes...
git add .

echo [3/5] Committing Changes...
git commit -m "Update: Footer Redesign, Premium Loading Screen, Mobile Menu Optimization"

echo [4/5] Setting Branch to Main...
git branch -M main

echo [5/5] Pushing to Remote Repository...
git push -u origin main

echo ==========================================
echo    SUCCESS! Changes pushed to GitHub.
echo ==========================================
pause
