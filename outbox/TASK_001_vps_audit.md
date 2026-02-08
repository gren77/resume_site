# TASK_001: richiesee.com VPS Audit

**Assigned to:** AG (Antigravity)  
**Project:** resume_site  
**Phase:** 1 - Infrastructure Discovery  
**Expected time:** 15-20 minutes

---

## OBJECTIVE

Audit richiesee.com VPS (72.60.107.17) to document current state before deploying static resume site.

**CRITICAL:** richiesee.com currently resolves via Traefik on port 80 → WordPress. We need to understand Traefik routing config to replace WordPress with static site.

**Goal:** Generate clean infrastructure report for Archi to design Phase 2 deployment strategy.

---

## SCOPE

**READ:**
- VPS filesystem structure (via SSH)
- Running services/containers  
- **Traefik configuration and routing rules**
- WordPress container details
- Port bindings

**WRITE:**
- `VPS_AUDIT_REPORT.md` (workspace root)

**READ-ONLY AUDIT. Do not modify anything on the VPS.**

---

## CREDENTIALS

**Host:** richiesee.com (72.60.107.17)  
**User:** myself  
**Password:** MeandI112233!!

**SSH command:** `ssh myself@richiesee.com`

---

## INSTRUCTIONS

Run each step, verify output before proceeding to next.

### 1. SSH Connection Test
```bash
ssh myself@richiesee.com "whoami && hostname"
```

### 2. System Info
```bash
ssh myself@richiesee.com "cat /etc/os-release && uname -a"
```

### 3. Docker Status
```bash
ssh myself@richiesee.com "docker --version && docker ps -a"
```

### 4. Traefik Configuration (CRITICAL)
```bash
ssh myself@richiesee.com "docker inspect traefik | grep -A 20 'Labels'; find /etc/traefik /opt/traefik -name '*.yml' -o -name '*.toml' 2>/dev/null"
```

### 5. WordPress Container Details
```bash
ssh myself@richiesee.com "docker ps -a | grep -i wordpress; docker inspect \$(docker ps -a | grep -i wordpress | awk '{print \$1}') 2>/dev/null | grep -E 'Name|Image|Ports|Labels'"
```

### 6. Port Bindings
```bash
ssh myself@richiesee.com "ss -tlnp | grep -E ':80|:443'"
```

### 7. Filesystem
```bash
ssh myself@richiesee.com "ls -la /var/www/ 2>/dev/null; ls -la /home/; ls -la /opt/ 2>/dev/null"
```

### 8. Disk Usage
```bash
ssh myself@richiesee.com "df -h"
```

---

## EXPECTED OUTPUT

Create `VPS_AUDIT_REPORT.md` in workspace root:

```markdown
# richiesee.com VPS Audit Report
**Date:** 2026-02-08  
**Host:** 72.60.107.17  
**Auditor:** AG

## System Info
- OS: {distro + version}
- Kernel: {version}
- Hostname: {name}

## Docker Status
- Installed: {yes/no + version}
- Running containers:
  | Name | Image | Ports | Status |
  |------|-------|-------|--------|
  | {list all} |

## Traefik Configuration
- Traefik container: {name/id}
- Config files: {paths found}
- Routing rules for richiesee.com: {labels or config}
- Current backend: {WordPress container name}

## WordPress
- Container: {name/id or "not found"}
- Image: {wordpress:version}
- Ports: {internal:external}
- Volume mounts: {if any}
- Traefik labels: {routing rules}

## Port Bindings
| Port | Service | Container |
|------|---------|-----------|
| 80 | {Traefik} | {container} |
| 443 | {Traefik} | {container} |

## Filesystem
{Relevant paths}

## Disk Usage
{df -h output}

## Phase 2 Strategy Recommendation
1. WordPress replacement plan: {stop container, remove, or leave orphaned}
2. New static container strategy: {behind Traefik routing}
3. Traefik rule changes needed: {specific labels or config}
4. Deployment steps: {overview}
```

---

## ACCEPTANCE CRITERIA

- [ ] SSH successful
- [ ] All 8 steps executed
- [ ] Traefik routing to WordPress documented
- [ ] Clear path to replace WordPress → static site
- [ ] VPS_AUDIT_REPORT.md complete
- [ ] Git commit with hash in receipt

---

## TIME ESTIMATE
~20 min. Friction if >30 min.

---

*Created by: resume_site META 02*  
*For: Phase 1 — discover Traefik→WordPress routing before replacement*

## RECEIPT
- Date: 2026-02-08
- Commit: 8e71528
- Status: DONE

