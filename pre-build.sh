npm run build
sudo chmod 777 -R dist 
rm -Rf /usr/share/lightdm-webkit/themes/lightdm-webkit-theme-osmos/*
cp -r /home/atlant/Documents/Programming/Applications/webkit-greeter/lightdm-webkit-theme-osmos/dist/* /usr/share/lightdm-webkit/themes/lightdm-webkit-theme-osmos