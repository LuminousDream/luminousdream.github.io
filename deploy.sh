#!/bin/bash
export GPG_TTY=$(tty)
hexo clean

#源文件备份到 Github branch
#git rm -r --cached .
git checkout hexo_source
git add -A
git commit -m "Hexo源文件备份 By 暗梦先生呀~"
git push origin hexo_source -f

# 本地备份源文件
rm -rf .deploy_git
rm -rf ~/hexo_backup.tar.gz
tar -zcvf ~/hexo_backup.tar.gz ./

# 部署博客到 GitHub Pages
hexo g
hexo d