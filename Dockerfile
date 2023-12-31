FROM mcr.microsoft.com/vscode/devcontainers/base:bookworm
ARG NODE_VER=lts
RUN apt -y update && apt -y upgrade && apt -y install curl
RUN mkdir -p /workspaces/node_modules /workspaces/.pnpm-store && chown -R vscode:vscode /workspaces

USER vscode
ENV PNPM_HOME=/home/vscode/.pnpm
ENV PATH $PATH:${PNPM_HOME}
RUN bash -c "curl -fsSL https://get.pnpm.io/install.sh | bash - && cd ~ && pnpm env use --global ${NODE_VER}"

ENTRYPOINT tail -f /dev/null
