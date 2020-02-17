npm run build

cp -r ./dist/* ../gh-page/

git add -A

git commit -am 'Update build'

git push origin gh-pages