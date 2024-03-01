#!bin/bash
CYAN="\033[1;36m"
YELLOW="\033[1;33m"
PURPLE="\033[1;35m"
GREEN="\033[1;32m"
RED='\033[1;31m'
NC='\033[0m'

echo $YELLOW"[$RED ! $YELLOW] Eu vou instalar as dependências essenciais pro bot funcionar você só concorda com os programas que vou instalar blz? [s/n]"
read inp
if [ "$inp" = "s" ]; then
apt-get upgrade
apt-get update
apt upgrade -y
apt update -y
apt install nodejs -y 
apt install nodejs-lts -y 
apt install ffmpeg -y
npm install sharp -y
apt install wget -y 
apt install git -y
echo $GREEN"Hmmm tudo certo pode dar npm start, escanear o código e se divirta com o bot :)"
fi
if [ "$inp" = "n" ]; then
    echo $RED"Jae então, se divirta tentando descobrir as dependências sozinho e manualmente :)"
    exit
fi


# © Rooh Mods #