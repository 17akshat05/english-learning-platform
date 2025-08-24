#!/bin/bash

echo "🚀 English Learning Platform - Deployment Script"
echo "================================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: English Learning Platform"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo ""
    echo "🔗 Please add your GitHub repository as remote origin:"
    echo "git remote add origin https://github.com/YOUR_USERNAME/english-learning-platform.git"
    echo "git branch -M main"
    echo "git push -u origin main"
    echo ""
else
    echo "✅ Remote origin already configured"
    echo "📤 Pushing to GitHub..."
    git add .
    git commit -m "Update: Enhanced features and deployment ready"
    git push
fi

echo ""
echo "🎯 Deployment Options:"
echo "====================="
echo ""
echo "1. 🌟 Vercel (Recommended):"
echo "   - Go to https://vercel.com"
echo "   - Sign up with GitHub"
echo "   - Click 'New Project'"
echo "   - Import your repository"
echo "   - Click 'Deploy'"
echo ""
echo "2. 🌐 Netlify:"
echo "   - Go to https://netlify.com"
echo "   - Sign up with GitHub"
echo "   - Click 'New site from Git'"
echo "   - Choose your repository"
echo "   - Build command: npm run build"
echo "   - Publish directory: .next"
echo ""
echo "3. 📚 GitHub Pages:"
echo "   - Go to repository Settings → Pages"
echo "   - Source: Deploy from branch"
echo "   - Branch: main"
echo "   - Folder: / (root)"
echo ""
echo "✅ Your project is ready for deployment!"
echo "📱 Features included:"
echo "   - User Authentication"
echo "   - Dark Theme Toggle"
echo "   - Daily Words System"
echo "   - Speaking Practice"
echo "   - Learning Modules"
echo "   - Progress Tracking"
echo "   - Creator Credit (Akshat Jain)"
echo ""
echo "🎨 Footer includes:"
echo "   - Project created by Akshat Jain"
echo "   - Instagram: @17akshat05"
echo "   - Direct link to your Instagram profile"
echo ""
echo "🌍 After deployment, your website will be live and accessible worldwide!" 