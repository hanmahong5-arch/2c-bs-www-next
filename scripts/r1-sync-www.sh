#!/usr/bin/env bash
# Sync git mirror on R1 master, let Argo selfHeal pull the new image tag.
# Usage (from a machine with `ssh master`):
#   bash scripts/r1-sync-www.sh
# Optional: IMAGE_TAG=main-abcdef0 bash scripts/r1-sync-www.sh
set -euo pipefail

REMOTE="${REMOTE:-master}"
MIRROR="/data/git-mirrors/2c-bs-www-next.git"
REPO_HTTPS="https://github.com/hanmahong5-arch/2c-bs-www-next.git"
NS=lurus-www
APP=lurus-www

ssh -o BatchMode=yes -o ConnectTimeout=20 "$REMOTE" bash -s -- "$MIRROR" "$REPO_HTTPS" "$NS" "$APP" "${IMAGE_TAG:-}" <<'REMOTE'
set -euo pipefail
MIRROR="$1"; REPO="$2"; NS="$3"; APP="$4"; WANT_TAG="${5:-}"

echo "==> fetch mirror main"
cd "$MIRROR"
git fetch "$REPO" '+refs/heads/main:refs/heads/main'
git symbolic-ref HEAD refs/heads/main 2>/dev/null || true
echo "mirror HEAD: $(git log main -1 --oneline)"
git show main:deploy/k8s/deployment.yaml | grep -E 'image:'

echo "==> hard refresh Argo"
kubectl -n argocd annotate application "$APP" argocd.argoproj.io/refresh=hard --overwrite

# Wait until deploy image matches git (or WANT_TAG)
deadline=$((SECONDS + 300))
while (( SECONDS < deadline )); do
  img=$(kubectl get deploy "$APP" -n "$NS" -o jsonpath='{.spec.template.spec.containers[0].image}')
  sync=$(kubectl get application "$APP" -n argocd -o jsonpath='{.status.sync.status}')
  echo "  sync=$sync image=$img"
  if [[ -n "$WANT_TAG" && "$img" == *"$WANT_TAG"* ]]; then
    break
  fi
  if [[ -z "$WANT_TAG" && "$sync" == "Synced" ]]; then
    break
  fi
  # If a new pod is stuck Pulling/ContainerCreating > 4m while old Ready, leave it —
  # CN GHCR pulls are slow; do not thrash.
  sleep 5
done

echo "==> rollout status"
kubectl rollout status "deployment/$APP" -n "$NS" --timeout=600s
kubectl get pods -n "$NS" -l app="$APP" -o wide
kubectl get deploy "$APP" -n "$NS" -o jsonpath='image={.spec.template.spec.containers[0].image}{"\n"}'
kubectl get application "$APP" -n argocd -o jsonpath='sync={.status.sync.status} health={.status.health.status}{"\n"}'
REMOTE
