
sh $(${PWD}/build.sh)

echo 'Start build'
echo
sh ./build.sh

echo 'Move tar.gz file'
echo

cp $(find ${PWD} -name "*.tar.gz") ../ 

echo 'Checkout gh-pages'
echo
git checkout gh-pages

echo 'Remove all files in gh-pages branch'
echo 'y' | rm -rf *

echo 'Move tar.gz file'
mv ../$(find ${PWD} -name "*.tar.gz") ./

echo 'Extract tar.gz file'
tar -xzvf $(find ../ -name "*.tar.gz")

echo 'Remove tag.gz file'
rm $(find ../ -name "*.tar.gz")

git add -A

git status

git commit -am 'Update build'

git push origin gh-pages

echo 'Successfully updated gh-pages'

git checkout master

