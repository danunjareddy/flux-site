# FLUX — Machine Learning Experts

Website and backend for FLUX, the freelance team of Danunja Reddy Kota and Nikhil Raju Vadali.

Frontend: React + TypeScript + Tailwind CSS + Framer Motion + Lucide, built with Vite.
Backend: Node.js + Express + Nodemailer (in `server/`).

## Run it on your computer

```bash
npm install
cp .env.example .env     # on Windows PowerShell: Copy-Item .env.example .env
# edit .env (see "Email setup" below)
npm run dev:all          # website on http://localhost:5173 and backend on http://localhost:3001
```

Other commands:

```bash
npm run dev      # website only
npm run server   # backend only (restarts when you edit it)
npm run build    # type-check + production build into dist/
npm start        # backend serving the built website from dist/ (production)
```

Requires Node 18 or newer.

## Email setup (client requests reach both of you)

When a client submits the form, the backend emails **everyone listed in `MAIL_TO`** and sets Reply-To to the client, so replying answers the client. Every request is also saved to `server/data/requests.jsonl`, so nothing is lost if email fails.

1. In `.env`, check `MAIL_TO` has both of your emails.
2. Choose the mailbox that sends the emails (`SMTP_USER`). For Gmail:
   - Turn on 2-Step Verification for that Google account.
   - Create an App password at https://myaccount.google.com/apppasswords.
   - Put the 16-character app password in `SMTP_PASS`.
3. Run `npm run dev:all`, submit the form on the site, and check both inboxes (and spam folders).

Check the server any time at http://localhost:3001/api/health. It says whether email is configured.

Protection built in: rate limit (5 requests per 15 minutes per visitor), hidden spam trap field, minimum fill time, input validation, size limits, security headers.

## Deploy

The site needs a host that runs Node (Render, Railway, Fly.io, a VPS). Static-only hosts cannot run the backend.

1. Push the project to GitHub.
2. Create a web service on the host. Build command: `npm install && npm run build`. Start command: `npm start`.
3. Add the `.env` values as environment variables on the host (`MAIL_TO`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`).
4. One server then serves both the website and `/api/contact`. No extra setup.

If you host the website separately (for example Netlify), host the backend elsewhere, set `CORS_ORIGIN` on the backend to the website address, and set `VITE_API_URL` to the full backend URL (for example `https://your-api.onrender.com/api/contact`) when building the website.

Hosts with temporary disks (some free plans) erase `server/data` on restart. The email is the real record.

## Where to edit content

Everything is in `src/config/content.ts`. Empty values hide the related UI.

- **Brand:** `site` (name, descriptor, headline, intro). Logo files are in `public/` (`logo-mark.png`, `favicon.png`, `flux-logo.jpg`).
- **Team** (`team`): bio, education, experience, skills, GitHub, LinkedIn, email, resume file.
- **Projects** (`projects`): `owners`, `repoUrl`, and optional `problem`, `solution`, `contribution`, `status`, `demoUrl`, `image`.
  **View Project** opens the project's `repoUrl` on GitHub. If a project has no `repoUrl`, it opens the GitHub profile of its owner. Set `repoUrl` on each project to link its exact repository.
- **Certifications** (`certifications`): `owner`, `show`, and optional `issued`, `validity`, `ids`, `verifyUrl`, `image`.
- **Services, process, form options:** `services`, `processSteps`, `contactForm`.
- **Phone number required on the form:** `contactForm.phoneRequired`.
- **WhatsApp link:** `studio.whatsapp` (digits with country code, for example `919876543210`).

## Resumes

PDFs live in `public/`: `resume-danunja.pdf` and `resume-nikhil.pdf`. To replace one, overwrite the file and keep the name.
