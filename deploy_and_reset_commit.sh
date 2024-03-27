#!/bin/bash
export GPG_TTY=$(tty)
hexo clean

# 暗梦：em...... 有的时候看了看 hexo_source 的 commits
# 一直计数有点无话可说呢，索性有的时候就会用到这个来重置。

# 重置 hexo_source branch 的 commit
git checkout --orphan hexo_source2
git add .
git commit -m "Hexo源文件备份 By 暗梦先生呀~"
git branch -D hexo_source
git branch -m hexo_source
git push origin hexo_source -f

# 本地备份源文件
rm -rf .deploy_git
rm -rf ~/hexo_backup.tar.gz
tar -zcvf ~/hexo_backup.tar.gz ./

# 部署博客到 GitHub Pages
hexo g
hexo d
