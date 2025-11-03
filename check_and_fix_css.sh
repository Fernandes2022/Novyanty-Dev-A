#!/bin/bash

echo "🔍 Checking CSS file..."
echo ""
echo "Last 30 lines of globals.css:"
tail -30 app/globals.css

echo ""
echo "=========================================="
echo "Checking for unclosed blocks..."
echo ""

# Count opening and closing braces
OPEN=$(grep -o "{" app/globals.css | wc -l)
CLOSE=$(grep -o "}" app/globals.css | wc -l)

echo "Opening braces: $OPEN"
echo "Closing braces: $CLOSE"
echo "Difference: $((OPEN - CLOSE))"

if [ $OPEN -gt $CLOSE ]; then
    echo ""
    echo "❌ Missing $((OPEN - CLOSE)) closing braces!"
    echo ""
    echo "Adding missing closing braces..."
    
    # Add the missing closing braces
    for i in $(seq 1 $((OPEN - CLOSE))); do
        echo "}" >> app/globals.css
    done
    
    echo "✅ Fixed!"
fi

echo ""
echo "🏗️  Testing build..."
npm run build

