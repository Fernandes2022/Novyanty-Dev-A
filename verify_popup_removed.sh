#!/bin/bash

echo "🔍 CHECKING IF POPUP IS REALLY GONE..."
echo ""

# Check if the modal is still in the code
if grep -q "showDemoVideo &&" app/page.tsx; then
    echo "❌ POPUP STILL IN CODE! Let me fix it properly..."
    echo ""
    
    # Backup
    cp app/page.tsx app/page.tsx.backup-fixpopup-$(date +%Y%m%d-%H%M%S)
    
    # Find the line number where the modal starts
    START_LINE=$(grep -n "showDemoVideo &&" app/page.tsx | cut -d: -f1)
    
    if [ ! -z "$START_LINE" ]; then
        echo "Found popup at line $START_LINE"
        echo ""
        echo "Showing the popup code:"
        sed -n "${START_LINE},$((START_LINE+50))p" app/page.tsx
        echo ""
        echo "This needs to be DELETED!"
        echo ""
        read -p "Delete the popup code? (y/n): " answer
        
        if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
            # Create a temp file without the modal
            awk '
                /showDemoVideo && \(/ { skip=1 }
                skip && /^      <\/motion\.div>$/ { skip=0; next }
                !skip { print }
            ' app/page.tsx > app/page.tsx.tmp
            
            mv app/page.tsx.tmp app/page.tsx
            
            echo "✅ Popup code DELETED!"
            echo ""
            
            echo "🏗️  Testing build..."
            npm run build
            
            if [ $? -eq 0 ]; then
                echo ""
                echo "✅ BUILD SUCCESSFUL!"
                echo ""
                read -p "Deploy? (y/n): " deploy
                
                if [ "$deploy" = "y" ] || [ "$deploy" = "Y" ]; then
                    git add .
                    git commit -m "fix: Actually remove How It Works popup from rendering"
                    git push origin main
                    echo ""
                    echo "🎉 DEPLOYED! Popup is GONE!"
                fi
            fi
        fi
    fi
else
    echo "✅ POPUP IS ALREADY GONE!"
    echo ""
    echo "Hard refresh your browser:"
    echo "  Mac: Cmd + Shift + R"
    echo "  Windows: Ctrl + Shift + R"
fi

