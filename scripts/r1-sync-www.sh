#!/usr/bin/env bash
# Sync R1 git mirror → Argo selfHeal → wait rollout.
#
# R1 often cannot fetch GitHub (TLS EOF). Default path: push main FROM this
# workstation (which can reach GitHub) into the bare mirror over SSH, then
# hard-refresh Argo on master.
#
# Usage (PowerShell or Git Bash, with `ssh master` working):
#   bash scripts/r1-sync-www.sh
# Optional: IMAGE_TAG=main-abcdef0 bash scripts/r1-sync-www.sh
set -euo pipefail

REMOTE="${REMOTE:-master}"
MIRROR_PATH="/data/git-mirrors/2c-bs-www-next.git"
MIRROR_SSH="ssh://${REMOTE}${MIRROR_PATH}"
NS=lurus-www
APP=lurus-www
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "==> push origin/main → R1 mirror (local→SSH; avoids R1→GitHub TLS)"
git -C "$ROOT" fetch origin main
git -C "$ROOT" push "$MIRROR_SSH" "refs/remotes/origin/main:refs/heads/main"

echo "==> hard refresh Argo + wait rollout on $REMOTE"
ssh -o BatchMode=yes -o ConnectTimeout=20 "$REMOTE" \
  NS="$NS" APP="$APP" WANT_TAG="${IMAGE_TAG:-}" bash -s <<'REMOTE'
set -euo pipefail
kubectl -n argocd annotate application "$APP" argocd.argoproj.io/refresh=hard --overwrite
deadline=$((SECONDS + 300))
while (( SECONDS < deadline )); do
  img=$(kubectl get deploy "$APP" -n "$NS" -o jsonpath='{.spec.template.spec.containers[0].image}')
  sync=$(kubectl get application "$APP" -n argocd -o jsonpath='{.status.sync.status}')
  echo "  sync=$sync image=$img"
  if [[ -n "${WANT_TAG}" && "$img" == *"${WANT_TAG}"* ]]; then
    break
  fi
  sleep 5
done
kubectl rollout status "deployment/$APP" -n "$NS" --timeout=600s
kubectl get pods -n "$NS" -l app="$APP" -o wide
kubectl get deploy "$APP" -n "$NS" -o jsonpath='image={.spec.template.spec.containers[0].image}{"\n"}'
kubectl get application "$APP" -n argocd -o jsonpath='sync={.status.sync.status} health={.status.health.status}{"\n"}'
REMOTE
