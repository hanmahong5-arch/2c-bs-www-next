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
#
# On Windows: Git for Windows' bundled ssh often ignores ~/.ssh/config Host
# aliases. Prefer System32 OpenSSH when present so `Host master` resolves.
set -euo pipefail

REMOTE="${REMOTE:-master}"
MIRROR_PATH="/data/git-mirrors/2c-bs-www-next.git"
MIRROR_SSH="ssh://${REMOTE}${MIRROR_PATH}"
NS=lurus-www
APP=lurus-www
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# Resolve ssh binary (and tell git to use the same one for push).
SSH_BIN=ssh
if [[ -x /c/Windows/System32/OpenSSH/ssh.exe ]]; then
  SSH_BIN=/c/Windows/System32/OpenSSH/ssh.exe
elif [[ -x /mnt/c/Windows/System32/OpenSSH/ssh.exe ]]; then
  SSH_BIN=/mnt/c/Windows/System32/OpenSSH/ssh.exe
elif command -v ssh.exe >/dev/null 2>&1; then
  # Native Windows path when invoked from PowerShell-wrapped bash
  SSH_BIN="$(command -v ssh.exe)"
fi
export GIT_SSH_COMMAND="${GIT_SSH_COMMAND:-$SSH_BIN}"

# Prefer explicit IMAGE_TAG; else read the tip from deploy/k8s (Argo often
# stays OutOfSync for unrelated drift, so waiting on Synced alone hangs).
if [[ -z "${IMAGE_TAG:-}" ]]; then
  IMAGE_TAG=$(grep -oE 'main-[0-9a-f]+' "$ROOT/deploy/k8s/deployment.yaml" | head -1 || true)
fi

echo "==> push origin/main → R1 mirror (local→SSH; avoids R1→GitHub TLS)"
echo "    ssh=$SSH_BIN remote=$REMOTE want=${IMAGE_TAG:-"(any)"}"
git -C "$ROOT" fetch origin main
git -C "$ROOT" push "$MIRROR_SSH" "refs/remotes/origin/main:refs/heads/main"

echo "==> hard refresh Argo + wait rollout on $REMOTE"
"$SSH_BIN" -o BatchMode=yes -o ConnectTimeout=20 "$REMOTE" \
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
  if [[ -z "${WANT_TAG}" && "$sync" == "Synced" ]]; then
    break
  fi
  sleep 5
done
kubectl rollout status "deployment/$APP" -n "$NS" --timeout=600s
kubectl get pods -n "$NS" -l app="$APP" -o wide
kubectl get deploy "$APP" -n "$NS" -o jsonpath='image={.spec.template.spec.containers[0].image}{"\n"}'
kubectl get application "$APP" -n argocd -o jsonpath='sync={.status.sync.status} health={.status.health.status}{"\n"}'
REMOTE
