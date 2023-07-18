FROM node:18-bookworm-slim

RUN apt -y update && apt -y upgrade && apt -y install curl
RUN mkdir -p /usr/local/etc/bash_completion.d && cd $_ && \
curl -O https://raw.githubusercontent.com/git/git/master/contrib/completion/git-prompt.sh && \
curl -O https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash && \
chmod a+x git*.* && \
ls -l $PWD/git*.* | awk '{print "source "$9}' >> $HOME/.bashrc && \
echo "export PS1='\\\[\\\033[01;32m\\\]\\\u@\\\h\\\[\\\033[01;33m\\\] \\\w \\\[\\\033[01;31m\\\]\$(__git_ps1 \"(%s)\") \\\n\\\[\\\033[01;34m\\\]\\\$\\\[\\\033[00m\\\] '" >> $HOME/.bashrc

RUN curl -fsSL https://get.pnpm.io/install.sh | bash -

ENTRYPOINT tail -f /dev/null
