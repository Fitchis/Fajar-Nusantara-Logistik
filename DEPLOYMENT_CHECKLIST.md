# Deployment Checklist

Use this checklist to ensure everything is ready before deploying to production.

## Pre-Deployment

### Code Quality
- [ ] All TypeScript errors resolved (`npm run build` succeeds)
- [ ] No console warnings or errors in development
- [ ] All components load correctly
- [ ] Navigation works smoothly

### Functionality Testing
- [ ] Language switcher (ID/EN) works
- [ ] All menu links scroll to correct sections
- [ ] Mobile menu opens/closes properly
- [ ] Responsive layout on mobile (375px), tablet (768px), desktop (1024px)
- [ ] WhatsApp links open WhatsApp correctly
- [ ] Social media links open in new tabs
- [ ] Testimonials carousel navigates correctly
- [ ] Client filter buttons work
- [ ] Services tabs switch correctly
- [ ] Scroll-to-top button appears and works

### Performance
- [ ] Build completes without errors: `npm run build`
- [ ] Production preview works: `npm start`
- [ ] No critical console errors in production
- [ ] All images load (currently using placeholders)

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Accessibility
- [ ] Navigation is keyboard accessible (Tab key)
- [ ] Links are descriptive
- [ ] Images have alt text
- [ ] Color contrast is sufficient
- [ ] Form inputs have labels (if any)

## Deployment Steps

### Vercel Deployment (Recommended)

1. **Prepare Code**
   ```bash
   git add .
   git commit -m "Convert to Next.js"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import GitHub repository
   - Select "Fajar-Nusantara-Logistik"

3. **Configure Project**
   - Framework: Next.js (auto-detected)
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next
   - Environment Variables: (none required)

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Visit preview URL
   - Run final tests

### Self-Hosted Deployment

1. **Build for Production**
   ```bash
   npm install
   npm run build
   ```

2. **Test Production Build Locally**
   ```bash
   npm start
   # Visit http://localhost:3000
   ```

3. **Deploy to Server**
   ```bash
   # Copy entire project to production server
   # Install dependencies: npm install --production
   # Start with: npm start
   # Or use PM2: pm2 start npm --name "fnl" -- start
   ```

4. **Configure Web Server**
   - Point domain to server
   - Set up SSL certificate
   - Configure reverse proxy (nginx/Apache)
   - Set environment variables if needed

## Post-Deployment

### Verification
- [ ] Website loads without errors
- [ ] All pages/sections accessible
- [ ] Language switcher works
- [ ] Mobile responsiveness verified
- [ ] Forms/links functional
- [ ] Images load correctly
- [ ] No 404 errors in console
- [ ] Performance is acceptable (< 3s load time)

### SEO & Analytics (Optional)
- [ ] Google Search Console: Submit sitemap
- [ ] Google Analytics: Setup tracking
- [ ] Meta tags verified with SEO checker
- [ ] Social media links verified
- [ ] Structured data (JSON-LD) added if needed

### Monitoring (Optional)
- [ ] Error logging setup (Sentry/Rollbar)
- [ ] Performance monitoring active
- [ ] Uptime monitoring configured
- [ ] Daily backups scheduled

### Domain & DNS
- [ ] Domain registered and active
- [ ] DNS records configured
- [ ] SSL certificate valid
- [ ] Email service configured (if needed)

## Post-Launch Maintenance

### First Week
- [ ] Monitor error logs daily
- [ ] Check performance metrics
- [ ] Verify all features working
- [ ] Gather user feedback
- [ ] Test on user devices

### Monthly
- [ ] Update dependencies: `npm update`
- [ ] Check for security vulnerabilities: `npm audit`
- [ ] Review analytics
- [ ] Backup database (if applicable)
- [ ] Update content if needed

### Quarterly
- [ ] Performance optimization review
- [ ] SEO audit
- [ ] Security audit
- [ ] Competitor analysis
- [ ] Plan new features

## Rollback Plan

If issues occur after deployment:

1. **Quick Rollback to Previous Version**
   ```bash
   git revert HEAD
   git push origin main
   # Redeploy on Vercel (auto-triggers)
   ```

2. **Keep Previous Build**
   - Vercel keeps previous 10 deployments
   - Can revert from Vercel dashboard
   - Click "Deployments" → Find previous version → Click "Promote"

3. **Local Testing**
   - Always test locally before pushing
   - Use `npm run build && npm start` to test production build

## Contact Information

**Support Contacts**
- Technical: [Your email/Slack]
- Emergency: [Your phone]
- Client Support: fajarnusantaralogistik@gmail.com

**Live Site**
- Production URL: https://fajar-nusantara-logistik.com (when deployed)
- Admin: [Dashboard URL if applicable]

## Sign-Off

- [ ] Deployment Lead: _________________ Date: _______
- [ ] QA Team: _________________ Date: _______
- [ ] Client: _________________ Date: _______

---

## Notes

Use this space to document any issues, solutions, or notes:

```
Issue 1: 
Solution:
Date:

Issue 2:
Solution:
Date:
```

---

**Ready to launch! 🚀**
