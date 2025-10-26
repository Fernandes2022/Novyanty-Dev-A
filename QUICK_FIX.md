# ⚡ QUICK FIX COMMANDS

## 🔥 Fast Track (Copy & Paste All at Once)

```bash
# Navigate to project
cd /workspaces/my-creative-workspace

# Remove corrupted files
rm src/lib/utils.ts

# Install ALL dependencies (including the missing toast package)
npm install @radix-ui/react-slot @radix-ui/react-select @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-toast class-variance-authority clsx tailwind-merge tailwindcss-animate

# After copying files from CORRECTED folder, test build
npm run build

# If build succeeds, deploy
git add . && git commit -m "fix: Replace corrupted files with corrected components" && git push && vercel --prod
```

---

## 📋 Step-by-Step Commands

### 1. Clean Up Corrupted Files
```bash
rm src/lib/utils.ts
```

### 2. Install Missing Dependencies
```bash
npm install @radix-ui/react-toast
```

### 3. Install All Other Dependencies
```bash
npm install @radix-ui/react-slot @radix-ui/react-select @radix-ui/react-dialog @radix-ui/react-dropdown-menu class-variance-authority clsx tailwind-merge tailwindcss-animate
```

### 4. Copy Files from CORRECTED Folder

**IMPORTANT:** Copy ALL files from the CORRECTED folder to your project:

```
CORRECTED/src/lib/utils.ts                           → src/lib/utils.ts
CORRECTED/src/components/ui/*.tsx                    → src/components/ui/
CORRECTED/src/components/workspace/*.tsx             → src/components/workspace/
CORRECTED/src/hooks/use-toast.ts                     → src/hooks/use-toast.ts
```

### 5. Verify Files Are in Place
```bash
# Check utils.ts
cat src/lib/utils.ts

# Should output only:
# import { type ClassValue, clsx } from "clsx"
# import { twMerge } from "tailwind-merge"
# export function cn(...inputs: ClassValue[]) {
#   return twMerge(clsx(inputs))
# }

# Check toast components exist
ls -la src/components/ui/toast*.tsx
```

### 6. Test Build
```bash
npm run build
```

### 7. Deploy
```bash
git add .
git commit -m "fix: Replace corrupted files with corrected components"
git push
vercel --prod
```

---

## 🎯 Critical Files to Copy

**Must copy these EXACT files from CORRECTED folder:**

1. ✅ `src/lib/utils.ts` - **CORRECTED** (was corrupted)
2. ✅ `src/components/ui/button.tsx`
3. ✅ `src/components/ui/textarea.tsx`
4. ✅ `src/components/ui/select.tsx`
5. ✅ `src/components/ui/sheet.tsx` - **CORRECTED** (exports were wrong)
6. ✅ `src/components/ui/panel.tsx`
7. ✅ `src/components/ui/dropdown-menu.tsx`
8. ✅ `src/components/ui/toast.tsx` - **NEW** (was missing)
9. ✅ `src/components/ui/toaster.tsx` - **NEW** (was missing)
10. ✅ `src/components/workspace/editor-panel.tsx`
11. ✅ `src/components/workspace/preview-panel.tsx`
12. ✅ `src/hooks/use-toast.ts` - **CORRECTED**

---

## ⚠️ Common Mistakes to Avoid

❌ **DON'T** copy from the old folder - use CORRECTED folder
❌ **DON'T** skip installing `@radix-ui/react-toast`
❌ **DON'T** forget to delete corrupted `utils.ts` first
❌ **DON'T** deploy without testing build locally first

✅ **DO** copy ALL files from CORRECTED folder
✅ **DO** install ALL dependencies including toast
✅ **DO** delete old corrupted files first
✅ **DO** test with `npm run build` before deploying

---

## 🔍 Verify Installation

```bash
# Check all dependencies are installed
npm list | grep radix
npm list | grep class-variance-authority
npm list | grep tailwindcss-animate

# Check file structure
tree src -L 3

# Check no TypeScript errors
npx tsc --noEmit
```

---

## 🚀 Expected Success Output

After running `npm run build`, you should see:

```
   Creating an optimized production build ...
 ✓ Compiled successfully
 ✓ Linting and checking validity of types    
 ✓ Collecting page data    
 ✓ Generating static pages (4/4)
 ✓ Collecting build traces    
 ✓ Finalizing page optimization    

Route (app)                              Size     First Load JS
┌ ○ /                                   XXX kB        XXX kB
└ ○ /_not-found                         XXX kB        XXX kB
```

After `vercel --prod`:

```
✅  Production: https://my-creative-workspace-[hash].vercel.app [Xs]
```

---

## 🎉 You're Done!

Your Creative Workspace should now be live and working! 🚀