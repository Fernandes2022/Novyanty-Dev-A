#!/bin/bash

echo "🔧 FIXING BUILD ERRORS - Complete Solution"
echo "=========================================="
echo ""

# Step 1: Install ALL required dependencies
echo "📦 Step 1: Installing ALL required npm packages..."
echo ""

npm install @radix-ui/react-slot @radix-ui/react-select @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-toast class-variance-authority clsx tailwind-merge tailwindcss-animate

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ All dependencies installed successfully!"
echo ""

# Step 2: Verify directory structure
echo "📁 Step 2: Creating directory structure..."
mkdir -p src/components/ui
mkdir -p src/components/workspace
mkdir -p src/lib
mkdir -p src/hooks

echo "✅ Directory structure ready!"
echo ""

# Step 3: Verify files exist
echo "🔍 Step 3: Verifying all required files..."
echo ""

FILES_TO_CHECK=(
    "src/lib/utils.ts"
    "src/components/ui/button.tsx"
    "src/components/ui/textarea.tsx"
    "src/components/ui/select.tsx"
    "src/components/ui/sheet.tsx"
    "src/components/ui/panel.tsx"
    "src/components/ui/dropdown-menu.tsx"
    "src/components/ui/toast.tsx"
    "src/components/ui/toaster.tsx"
    "src/components/workspace/editor-panel.tsx"
    "src/components/workspace/preview-panel.tsx"
    "src/hooks/use-toast.ts"
    "src/hooks/useCompose.ts"
)

MISSING_FILES=()

for file in "${FILES_TO_CHECK[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ MISSING: $file"
        MISSING_FILES+=("$file")
    fi
done

echo ""

if [ ${#MISSING_FILES[@]} -ne 0 ]; then
    echo "⚠️  WARNING: ${#MISSING_FILES[@]} file(s) are missing!"
    echo ""
    echo "Missing files:"
    for file in "${MISSING_FILES[@]}"; do
        echo "  - $file"
    done
    echo ""
    echo "Please copy the missing files from the CORRECTED folder before deploying."
    echo ""
else
    echo "✅ All required files are present!"
    echo ""
fi

# Step 4: Test local build
echo "🏗️  Step 4: Testing local build..."
echo ""

npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 BUILD SUCCESSFUL!"
    echo ""
    echo "✅ Your project is ready to deploy to Vercel!"
    echo ""
    echo "Next steps:"
    echo "  1. git add ."
    echo "  2. git commit -m 'fix: Complete build error fixes with all components'"
    echo "  3. git push"
    echo "  4. vercel --prod"
    echo ""
else
    echo ""
    echo "❌ BUILD FAILED"
    echo ""
    echo "Please review the errors above and ensure all files are correctly copied."
    echo "Check that:"
    echo "  1. All files from the CORRECTED folder are in place"
    echo "  2. src/lib/utils.ts contains ONLY the cn function"
    echo "  3. All components are properly exported"
    echo ""
fi