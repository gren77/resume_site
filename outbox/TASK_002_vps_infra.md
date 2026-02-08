# TASK_002: VPS Infrastructure — Static Nginx Deployment

## Scope
READ: `/opt/docker/wordpress/docker-compose.yml` (or wherever WP compose lives)
READ: Traefik config (labels, network name, entrypoints, certresolver)
WRITE: `/opt/docker/resume_site/docker-compose.yml`
WRITE: `/opt/docker/resume_site/html/index.html` (test page)

## Connection
```
ssh myself@richiesee.com
```

## Known Gotchas
- **SSH as `myself@richiesee.com`, NOT root.** Use `sudo` for privileged ops. We never SSH as root.
- **nginx here is NOT replacing Traefik.** Traefik = reverse proxy + TLS. nginx:alpine = dumb static file server behind Traefik. They're layered, not alternatives.
- **Read WP's Traefik labels FIRST.** Do NOT guess entrypoint names, certresolver names, or network names. Copy them from the working WordPress config.
- Traefik network must be the SAME external network WordPress is on.
- If HTTPS doesn't work immediately, wait 30-60s — existing cert may carry over from WP.
- **Stop WordPress, don't delete it.** `docker compose stop`, not `docker compose down` or `docker rm`.
- Comment out or remove Traefik labels from WP compose to prevent routing conflicts on accidental restart.

## Standards
```
☐ Stage-by-stage: build → verify → commit → next stage
☐ No hardcoded creds
☐ Verify both directions (old gone + new present + functional)
☐ Git commit before reporting done
☐ Friction mandatory if time > 1.5x estimate
```

## Instructions

### Stage 1: Recon
1. SSH to VPS
2. Find WordPress docker-compose: `find /opt/docker -name "docker-compose.yml" | head -20`
3. Read WP compose: `cat /opt/docker/wordpress/docker-compose.yml` (adjust path if different)
4. Extract and note these EXACT values:
   - Traefik network name (e.g., `proxy`, `traefik`, `web`)
   - Entrypoints label value (e.g., `websecure`)
   - Certresolver name (e.g., `letsencrypt`, `myresolver`)
5. Verify Traefik network exists: `docker network ls | grep {network_name}`

### Stage 2: Create resume_site container
1. `mkdir -p /opt/docker/resume_site/html`
2. Create test page:
   ```bash
   echo '<h1>it works</h1>' > /opt/docker/resume_site/html/index.html
   ```
3. Create `/opt/docker/resume_site/docker-compose.yml` using values from Stage 1:
   ```yaml
   services:
     resume_site:
       image: nginx:alpine
       container_name: resume_site
       restart: unless-stopped
       volumes:
         - ./html:/usr/share/nginx/html:ro
       labels:
         - "traefik.enable=true"
         - "traefik.http.routers.resume.rule=Host(`richiesee.com`)"
         - "traefik.http.routers.resume.entrypoints={VALUE_FROM_WP}"
         - "traefik.http.routers.resume.tls.certresolver={VALUE_FROM_WP}"
         - "traefik.http.services.resume.loadbalancer.server.port=80"
       networks:
         - {VALUE_FROM_WP}
   networks:
     {VALUE_FROM_WP}:
       external: true
   ```
   **Replace ALL `{VALUE_FROM_WP}` with actual values from Stage 1.**

### Stage 3: Swap
1. Stop WordPress: `cd /opt/docker/wordpress && docker compose stop`
2. Comment out Traefik labels in WP's docker-compose.yml (add `#` prefix to each label line)
3. Start resume_site: `cd /opt/docker/resume_site && docker compose up -d`
4. Wait 10 seconds

### Stage 4: Verify
1. `curl -I https://richiesee.com` — expect 200, server: nginx
2. `docker ps | grep resume_site` — container running
3. `docker ps | grep wordpress` — should NOT appear (stopped)
4. Browser check if possible: https://richiesee.com shows "it works"

## Expected Time
20 minutes

## Acceptance
- [ ] `curl https://richiesee.com` returns 200
- [ ] HTTPS works (valid Let's Encrypt cert)
- [ ] WordPress container stopped
- [ ] WP Traefik labels commented out
- [ ] Test page visible
- [ ] docker-compose.yml saved on VPS

## RECEIPT
- Date: 2026-02-08
- Status: DONE (VPS deployed)

