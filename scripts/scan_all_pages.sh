#!/bin/bash

echo "🔍 SCANNING ALL PAGES..."
echo ""
echo "=========================================="
echo "1. PRIVACY PAGE"
echo "=========================================="
head -50 app/privacy/page.tsx 2>/dev/null || echo "❌ File not found or doesn't exist"

echo ""
echo "=========================================="
echo "2. TERMS PAGE"
echo "=========================================="
head -50 app/terms/page.tsx 2>/dev/null || echo "❌ File not found or doesn't exist"

echo ""
echo "=========================================="
echo "3. CONTACT SALES PAGE"
echo "=========================================="
head -50 app/contact-sales/page.tsx 2>/dev/null || echo "❌ File not found or doesn't exist"

echo ""
echo "=========================================="
echo "4. ADMIN PAGE"
echo "=========================================="
head -50 app/admin/page.tsx 2>/dev/null || echo "❌ File not found or doesn't exist"

echo ""
echo "=========================================="
echo "5. WORKSPACE PAGE (first 100 lines)"
echo "=========================================="
head -100 app/workspace/page.tsx 2>/dev/null || echo "❌ File not found or doesn't exist"

echo ""
echo "=========================================="
echo "SUMMARY"
echo "=========================================="
echo ""
echo "Pages found:"
ls -la app/ | grep -E "privacy|terms|contact-sales|admin|workspace" | grep -v ".backup"

echo ""
echo "Next: We'll upgrade all these to agency standard! 🚀"

