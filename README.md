
```
Portofolio
└─ packages
   ├─ api
   │  ├─ .env
   │  ├─ package-lock.json
   │  ├─ package.json
   │  ├─ prisma
   │  │  ├─ migrations
   │  │  │  ├─ 20251218003736_init
   │  │  │  │  └─ migration.sql
   │  │  │  ├─ 20251218022202_add_unique_content_metric_entity_type_entity_id
   │  │  │  │  └─ migration.sql
   │  │  │  └─ migration_lock.toml
   │  │  └─ schema.prisma
   │  ├─ src
   │  │  ├─ api
   │  │  │  ├─ index.ts
   │  │  │  └─ routes
   │  │  │     ├─ admin-blogPost.routes.ts
   │  │  │     ├─ admin-caseStudy.routes.ts
   │  │  │     ├─ admin-contentMetric.routes.ts
   │  │  │     ├─ admin-siteConfig.routes.ts
   │  │  │     ├─ admin-skill.routes.ts
   │  │  │     ├─ admin-technology.routes.ts
   │  │  │     ├─ admin.routes.ts
   │  │  │     ├─ auth.routes.ts
   │  │  │     ├─ blogPost.routes.ts
   │  │  │     ├─ caseStudy.routes.ts
   │  │  │     ├─ project.routes.ts
   │  │  │     └─ siteConfig.routes.ts
   │  │  ├─ config
   │  │  ├─ controllers
   │  │  │  ├─ auth.controller.ts
   │  │  │  ├─ blogPost.controller.ts
   │  │  │  ├─ caseStudy.controller.ts
   │  │  │  ├─ contentMetric.controller.ts
   │  │  │  ├─ project.controller.ts
   │  │  │  ├─ siteConfig.controller.ts
   │  │  │  ├─ skill.controller.ts
   │  │  │  └─ technology.controller.ts
   │  │  ├─ database
   │  │  │  └─ index.ts
   │  │  ├─ index.ts
   │  │  ├─ middleware
   │  │  │  ├─ auth.ts
   │  │  │  └─ validation.middleware.ts
   │  │  ├─ models
   │  │  ├─ repositories
   │  │  │  ├─ blogPost.repository.ts
   │  │  │  ├─ caseStudy.repository.ts
   │  │  │  ├─ contentMetric.repository.ts
   │  │  │  ├─ project.repository.ts
   │  │  │  ├─ siteConfig.repository.ts
   │  │  │  ├─ skill.repository.ts
   │  │  │  └─ technology.repository.ts
   │  │  ├─ schemas
   │  │  │  ├─ auth.schema.ts
   │  │  │  ├─ blogPost.schema.ts
   │  │  │  ├─ caseStudy.schema.ts
   │  │  │  ├─ contentMetric.schema.ts
   │  │  │  ├─ project.schema.ts
   │  │  │  ├─ siteConfig.schema.ts
   │  │  │  ├─ skill.schema.ts
   │  │  │  └─ technology.schema.ts
   │  │  ├─ services
   │  │  │  ├─ auth.service.ts
   │  │  │  ├─ blogPost.service.ts
   │  │  │  ├─ caseStudy.service.ts
   │  │  │  ├─ contentMetric.service.ts
   │  │  │  ├─ project.service.ts
   │  │  │  ├─ siteConfig.service.ts
   │  │  │  ├─ skill.service.ts
   │  │  │  └─ technology.service.ts
   │  │  ├─ types
   │  │  │  └─ express-zod-helpers.d.ts
   │  │  └─ utils
   │  └─ tsconfig.json
   └─ web
      ├─ .next
      │  ├─ app-build-manifest.json
      │  ├─ build-manifest.json
      │  ├─ cache
      │  │  ├─ fetch-cache
      │  │  │  └─ 033da7f58624532c9593113f4295818a819398e8f034c02707507b47320f6cc7
      │  │  ├─ swc
      │  │  │  └─ plugins
      │  │  │     └─ v7_windows_x86_64_0.102.1
      │  │  └─ webpack
      │  │     ├─ client-development
      │  │     │  ├─ 0.pack.gz
      │  │     │  ├─ 1.pack.gz
      │  │     │  ├─ 2.pack.gz
      │  │     │  ├─ 3.pack.gz
      │  │     │  ├─ index.pack.gz
      │  │     │  └─ index.pack.gz.old
      │  │     ├─ edge-server-development
      │  │     │  ├─ 0.pack.gz
      │  │     │  └─ index.pack.gz
      │  │     └─ server-development
      │  │        ├─ 0.pack.gz
      │  │        ├─ 1.pack.gz
      │  │        ├─ index.pack.gz
      │  │        └─ index.pack.gz.old
      │  ├─ package.json
      │  ├─ react-loadable-manifest.json
      │  ├─ server
      │  │  ├─ app-paths-manifest.json
      │  │  ├─ middleware-build-manifest.js
      │  │  ├─ middleware-manifest.json
      │  │  ├─ middleware-react-loadable-manifest.js
      │  │  ├─ next-font-manifest.js
      │  │  ├─ next-font-manifest.json
      │  │  ├─ pages-manifest.json
      │  │  ├─ server-reference-manifest.js
      │  │  └─ server-reference-manifest.json
      │  ├─ static
      │  │  ├─ chunks
      │  │  │  └─ polyfills.js
      │  │  └─ development
      │  │     ├─ _buildManifest.js
      │  │     └─ _ssgManifest.js
      │  ├─ trace
      │  └─ types
      │     └─ package.json
      ├─ next-env.d.ts
      ├─ next.config.js
      ├─ package-lock.json
      ├─ package.json
      ├─ postcss.config.js
      ├─ public
      │  └─ robots.txt
      ├─ src
      │  ├─ app
      │  │  ├─ (admin)
      │  │  │  ├─ admin
      │  │  │  │  ├─ blog
      │  │  │  │  │  ├─ new
      │  │  │  │  │  │  └─ page.tsx
      │  │  │  │  │  ├─ page.tsx
      │  │  │  │  │  └─ [blogId]
      │  │  │  │  │     └─ edit
      │  │  │  │  │        └─ page.tsx
      │  │  │  │  ├─ case-studies
      │  │  │  │  │  ├─ page.tsx
      │  │  │  │  │  └─ [projectId]
      │  │  │  │  │     └─ edit
      │  │  │  │  │        └─ page.tsx
      │  │  │  │  ├─ layout.tsx
      │  │  │  │  ├─ page.tsx
      │  │  │  │  ├─ projects
      │  │  │  │  │  ├─ edit
      │  │  │  │  │  │  ├─ [id]
      │  │  │  │  │  │  │  └─ page.tsx
      │  │  │  │  │  │  └─ [slug]
      │  │  │  │  │  │     └─ page.tsx
      │  │  │  │  │  ├─ new
      │  │  │  │  │  │  └─ page.tsx
      │  │  │  │  │  └─ page.tsx
      │  │  │  │  ├─ site-config
      │  │  │  │  │  └─ page.tsx
      │  │  │  │  ├─ skills
      │  │  │  │  │  ├─ new
      │  │  │  │  │  │  └─ page.tsx
      │  │  │  │  │  ├─ page.tsx
      │  │  │  │  │  └─ [skillId]
      │  │  │  │  │     └─ edit
      │  │  │  │  │        └─ page.tsx
      │  │  │  │  └─ technologies
      │  │  │  │     ├─ new
      │  │  │  │     │  └─ page.tsx
      │  │  │  │     ├─ page.tsx
      │  │  │  │     └─ [techId]
      │  │  │  │        └─ edit
      │  │  │  │           └─ page.tsx
      │  │  │  └─ login
      │  │  │     └─ page.tsx
      │  │  ├─ about
      │  │  │  └─ page.tsx
      │  │  ├─ blog
      │  │  │  ├─ page.tsx
      │  │  │  └─ [slug]
      │  │  │     └─ page.tsx
      │  │  ├─ case-studies
      │  │  │  └─ [slug]
      │  │  │     └─ page.tsx
      │  │  ├─ contact
      │  │  │  └─ page.tsx
      │  │  ├─ globals.css
      │  │  ├─ how-it-is-built
      │  │  │  └─ page.tsx
      │  │  ├─ layout.tsx
      │  │  ├─ page.tsx
      │  │  ├─ projects
      │  │  │  ├─ page.tsx
      │  │  │  └─ [slug]
      │  │  │     └─ page.tsx
      │  │  └─ sitemap.ts
      │  ├─ components
      │  │  ├─ admin
      │  │  │  └─ AdminDashboardCard.tsx
      │  │  ├─ Footer.tsx
      │  │  ├─ forms
      │  │  │  └─ FormField.tsx
      │  │  ├─ Header.tsx
      │  │  ├─ ProjectCard.tsx
      │  │  └─ ui
      │  │     ├─ Button.tsx
      │  │     ├─ Card.tsx
      │  │     ├─ EmptyState.tsx
      │  │     ├─ Input.tsx
      │  │     ├─ Label.tsx
      │  │     ├─ LoadingSpinner.tsx
      │  │     ├─ Modal.tsx
      │  │     ├─ Select.tsx
      │  │     ├─ Skeleton.tsx
      │  │     ├─ Switch.tsx
      │  │     ├─ Table.tsx
      │  │     ├─ Textarea.tsx
      │  │     └─ Toggle.tsx
      │  ├─ hooks
      │  │  └─ use-debounce.ts
      │  ├─ lib
      │  │  ├─ api.ts
      │  │  ├─ auth.ts
      │  │  ├─ constants.ts
      │  │  ├─ types.ts
      │  │  └─ utils.ts
      │  └─ middleware.ts
      ├─ tailwind.config.ts
      ├─ tsconfig.json
      └─ types
         └─ index.ts

```