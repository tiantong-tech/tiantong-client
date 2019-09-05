#!/usr/bin/env sh

set -e

yarn run build

cd ./dist

git init
git add -A
git commit -m 'deploy'

git push -f git@e.coding.net:ilog/ilog.coding.me.git master

cd -
