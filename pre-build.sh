npm run build
sudo chmod 777 -R dist 
rm -Rf /usr/share/lightdm-webkit/themes/lightdm-webkit-theme-osmos/*
cp -r ./dist/* /usr/share/lightdm-webkit/themes/lightdm-webkit-theme-osmos