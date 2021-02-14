#!/bin/bash

echo Building LightDM Webkit theme Osmos v$(cat ./version)...
echo

rm lightdm-webkit-theme-osmos*.tar.gz
rm -r dist/
yarn build
pushd dist && tar zcvf ../lightdm-webkit-theme-osmos-$(cat ../version).tar.gz ./* && popd
