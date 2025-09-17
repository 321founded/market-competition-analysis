# Deployment Guide

## Vercel Deployment

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Git repository with the market-visualizer app

### Quick Deployment Steps

#### 1. Prepare Repository
```bash
# Navigate to the app directory
cd market-visualizer

# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial commit: Market competition analysis app"

# Push to GitHub
git remote add origin https://github.com/your-username/market-competition.git
git push -u origin main
```

#### 2. Deploy to Vercel

**Option A: Via Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: market-competition-analysis
# - Which directory is your code located? ./
# - Want to override settings? No
```

**Option B: Via Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select the `market-visualizer` directory as root
5. Click "Deploy"

#### 3. Configure Project Settings

In Vercel dashboard:
- **Build Command**: `npm run build`
- **Output Directory**: `out`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### Expected URLs

#### Automatic Vercel URL
```
https://market-competition-analysis-[hash].vercel.app
```

#### Custom Domain (Optional)
```
https://market-analysis.321founded.com
```

## Data Management

### Static Data Deployment
The app now includes data in `public/data/` which will be deployed with the app:

```
market-visualizer/
├── public/
│   └── data/
│       └── employee_benefits_greece/
│           ├── global-insurance-giants.json
│           ├── modern-platforms.json
│           └── specialized-providers-consultants.json
└── ...
```

### Adding New Markets
To add new market data:

1. **Add data to public/data/**
   ```bash
   mkdir -p public/data/new-market-name
   cp -r ../data/new-market-name/* public/data/new-market-name/
   ```

2. **Commit and push**
   ```bash
   git add public/data/new-market-name
   git commit -m "Add new market: new-market-name"
   git push
   ```

3. **Vercel auto-deploys** from git pushes

### Screenshot Management
Screenshots are stored in `public/data/[market]/screenshots/` and deployed with the app.

For large screenshot collections:
- Consider image optimization
- Use `.vercelignore` to exclude large files if needed
- Implement lazy loading for images

## Environment Configuration

### Production vs Development
The app automatically detects environment:

```typescript
// Data loading adapts to environment
const dataDirectory = path.join(process.cwd(), 'public', 'data');
```

### Environment Variables (if needed)
Create `.env.local` for local development:
```
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

Add environment variables in Vercel dashboard under Settings → Environment Variables.

## Build Optimization

### Static Export Configuration
Configured in `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};
```

### Bundle Analysis
To analyze bundle size:
```bash
npm install --save-dev @next/bundle-analyzer
```

Add to `next.config.ts`:
```typescript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
```

Run analysis:
```bash
ANALYZE=true npm run build
```

## Performance Considerations

### Caching Strategy
Vercel automatically caches:
- Static assets (24 hours)
- API routes (configurable)
- Build outputs

### CDN Distribution
Vercel provides global CDN automatically for:
- Static files in `/public`
- Generated pages
- API responses

### Monitoring
Access deployment metrics in Vercel dashboard:
- Build times
- Function execution
- Bandwidth usage
- Error rates

## Custom Domain Setup

### Add Custom Domain
1. In Vercel dashboard → Settings → Domains
2. Add domain: `market-analysis.321founded.com`
3. Configure DNS:
   ```
   Type: CNAME
   Name: market-analysis
   Value: cname.vercel-dns.com
   ```

### SSL Certificate
Vercel automatically provisions SSL certificates for custom domains.

## Continuous Deployment

### Automatic Deployments
Vercel automatically deploys on:
- Push to main branch
- Pull request creation (preview deployments)

### Branch Deployments
- **Production**: `main` branch → https://market-analysis.321founded.com
- **Preview**: Feature branches → https://market-analysis-git-feature-branch.vercel.app

### Deployment Hooks
Configure webhooks in Vercel for:
- Slack notifications
- Discord notifications
- Custom integrations

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Check build locally
npm run build

# Check dependencies
npm install

# Clear Next.js cache
rm -rf .next
npm run build
```

#### Data Loading Issues
- Verify data files are in `public/data/`
- Check file paths in components
- Ensure JSON files are valid

#### Image Loading Issues
- Use `unoptimized: true` in `next.config.ts`
- Check image URLs and formats
- Verify CORS for external images

### Debug Information
Access deployment logs in Vercel dashboard:
- Build logs
- Function logs
- Edge logs

### Support Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Static Export Documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

## Security Considerations

### Data Privacy
- Only include publicly available competitive data
- Ensure compliance with data protection regulations
- Document data sources and collection methods

### Access Control
For private deployments:
- Use Vercel Pro for password protection
- Implement authentication if needed
- Consider IP restrictions

## Maintenance

### Regular Updates
- Update dependencies monthly
- Review and update market data quarterly
- Monitor performance metrics
- Update Next.js and Vercel configurations as needed

### Backup Strategy
- Data is version-controlled in Git
- Vercel maintains deployment history
- Consider external backup for critical data