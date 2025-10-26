# ✅ BUILD FIX CHECKLIST

Use this checklist to ensure you complete all steps correctly.

## 📋 Pre-Installation Checklist

- [ ] I have downloaded the entire CORRECTED folder
- [ ] I am in my project directory: `/workspaces/my-creative-workspace`
- [ ] I have backup of my current code (git commit or backup)
- [ ] I understand I need to **replace** some existing files

## 🗑️ Step 1: Clean Up

- [ ] Delete corrupted `src/lib/utils.ts`
  ```bash
  rm src/lib/utils.ts
  ```
- [ ] Verify deletion
  ```bash
  ls src/lib/utils.ts  # Should show "No such file"
  ```

## 📦 Step 2: Install Dependencies

- [ ] Install toast package (NEW)
  ```bash
  npm install @radix-ui/react-toast
  ```
- [ ] Install all other dependencies
  ```bash
  npm install @radix-ui/react-slot @radix-ui/react-select @radix-ui/react-dialog @radix-ui/react-dropdown-menu class-variance-authority clsx tailwind-merge tailwindcss-animate
  ```
- [ ] Verify installation (no errors shown)

## 📁 Step 3: Copy Files from CORRECTED Folder

### UI Components (8 files)
- [ ] Copy `button.tsx` → `src/components/ui/`
- [ ] Copy `textarea.tsx` → `src/components/ui/`
- [ ] Copy `select.tsx` → `src/components/ui/`
- [ ] Copy `sheet.tsx` → `src/components/ui/` (REPLACE if exists)
- [ ] Copy `panel.tsx` → `src/components/ui/`
- [ ] Copy `dropdown-menu.tsx` → `src/components/ui/`
- [ ] Copy `toast.tsx` → `src/components/ui/` (NEW FILE)
- [ ] Copy `toaster.tsx` → `src/components/ui/` (NEW FILE)

### Workspace Components (2 files)
- [ ] Copy `editor-panel.tsx` → `src/components/workspace/`
- [ ] Copy `preview-panel.tsx` → `src/components/workspace/`

### Utilities (1 file)
- [ ] Copy `utils.ts` → `src/lib/` (CRITICAL - this is the fixed version)

### Hooks (1 file)
- [ ] Copy `use-toast.ts` → `src/hooks/` (REPLACE if exists)
- [ ] Keep your existing `useCompose.ts` (don't replace)

## 🔍 Step 4: Verify Files

- [ ] Check `utils.ts` content
  ```bash
  cat src/lib/utils.ts
  ```
  ✅ Should show ONLY the cn function (5 lines)
  ❌ Should NOT have React components or JSX

- [ ] Count UI components
  ```bash
  ls src/components/ui/*.tsx | wc -l
  ```
  ✅ Should show: 8 or more files

- [ ] Check toast files exist
  ```bash
  ls src/components/ui/toast*.tsx
  ```
  ✅ Should show: `toast.tsx` and `toaster.tsx`

- [ ] Check workspace components
  ```bash
  ls src/components/workspace/*.tsx
  ```
  ✅ Should show at least: `editor-panel.tsx` and `preview-panel.tsx`

## 🏗️ Step 5: Test Build

- [ ] Run local build
  ```bash
  npm run build
  ```
- [ ] Build completes successfully (no errors)
- [ ] See "Compiled successfully" message
- [ ] See "Collecting page data" message
- [ ] See "Generating static pages" message

## 🚀 Step 6: Deploy

- [ ] Add all files to git
  ```bash
  git add .
  ```
- [ ] Check what will be committed
  ```bash
  git status
  ```
- [ ] Commit changes
  ```bash
  git commit -m "fix: Replace corrupted files with corrected components"
  ```
- [ ] Push to GitHub
  ```bash
  git push
  ```
- [ ] Deploy to Vercel
  ```bash
  vercel --prod
  ```

## ✅ Step 7: Verify Deployment

- [ ] Vercel build starts
- [ ] No build errors in Vercel logs
- [ ] See "✅ Production: https://..." message
- [ ] Click production URL and verify site loads
- [ ] Test creating a draft (if applicable)
- [ ] Check dark mode toggle works (if applicable)

## 🎉 Success Indicators

When everything is working:
- ✅ Local build: 0 errors
- ✅ Vercel build: 0 errors
- ✅ Production URL is live
- ✅ All components render correctly
- ✅ No console errors in browser

## ⚠️ If Build Fails

Go through this checklist:
- [ ] All dependencies installed? Run: `npm list | grep radix`
- [ ] Toast package installed? Run: `npm list @radix-ui/react-toast`
- [ ] Utils.ts is correct? Run: `cat src/lib/utils.ts`
- [ ] Toast files exist? Run: `ls src/components/ui/toast*.tsx`
- [ ] All 8+ UI components present? Run: `ls src/components/ui/*.tsx`
- [ ] Tried clearing cache? Run: `rm -rf .next node_modules/.cache`

## 📊 Progress Tracker

Mark your progress:
- [ ] ✅ Dependencies installed
- [ ] ✅ Old files removed
- [ ] ✅ New files copied
- [ ] ✅ Files verified
- [ ] ✅ Local build successful
- [ ] ✅ Committed to git
- [ ] ✅ Pushed to GitHub
- [ ] ✅ Deployed to Vercel
- [ ] ✅ Production site is live

## 🎯 Final Checklist

Before considering this complete:
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Production URL loads without errors
- [ ] All pages accessible
- [ ] Components render correctly
- [ ] Dark mode works (if applicable)
- [ ] Toast notifications work (if you test them)

---

## 🆘 Need Help?

If stuck, check these files in CORRECTED folder:
- `START_HERE.md` - Overview and download links
- `README.md` - Detailed explanations
- `QUICK_FIX.md` - Command reference

**Remember:** Use files from **CORRECTED** folder only!

---

**Once all boxes are checked, you're done! 🎊**