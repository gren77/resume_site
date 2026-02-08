# richiesee.com VPS Audit Report
**Date:** 2026-02-08  
**Host:** 72.60.107.17  
**Auditor:** AG

## System Info
- OS: Ubuntu 24.04.3 LTS (Noble Numbat)
- Kernel: 6.8.0-87-generic
- Hostname: srv984304

## Docker Status
- Installed: Yes (Version 28.3.3)
- Running containers (partial list):
  | Name | Image | Ports | Status |
  |------|-------|-------|--------|
  | traefik | traefik:v3.0 | 80, 443 | Up |
  | uptime-kuma | louislam/uptime-kuma:1 | | Up |
  | changedetection | lscr.io/linuxserver/changedetection.io | | Up |
  | n8n | n8nio/n8n | | Up |
  | wordpress | wordpress:latest | | Up |
  | postgres | postgres:15-alpine | | Up |
  
- Available images: n8n, pgvector, changedetection, wordpress, postgres, vikunja, mariadb, couchdb, chrome, etc.

## Web Server
- Reverse proxy: Traefik (v3.0)
- Status: Running (containerized)
- Config location: likely in `/opt/docker` (volume mapped)
- Note: Systemd nginx/apache services are NOT present.

## Port Bindings
| Port | Service | Process |
|------|---------|---------|
| 80 | Traefik (via Docker) | docker-proxy |
| 443 | Traefik (via Docker) | docker-proxy |

## WordPress
- Location: `/opt/docker/wordpress/wordpress_files/`
- Config: `/opt/docker/wordpress/wordpress_files/wp-config.php`
- Status: Dockerized

## Filesystem
- `/opt/docker`: Contains container data volumes and configurations.
- `/home/myself`: User home directory.
- `/var/www`: Not actively used for main web serving (empty/standard).

## Disk Usage
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        96G   17G   80G  17% /

## Recommendations for Archi
1. **WordPress**: It exists and is dockerized. Changing it might break existing setup. We should likely deploy the new static site alongside it, using Traefik to route traffic based on domain/path.
2. **Deployment**: Connect to existing Traefik instance. Add a new container for the static site (e.g. simple nginx alpine) and add appropriate labels to `docker-compose.yml` (if we can find it) or run a new container with labels.
3. **Ports**: 80/443 are taken by Traefik. New services must route through Traefik.
4. **Blockers**: None. Plenty of disk space (80GB free).
