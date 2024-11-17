# Supernova

Supernova is an Ultraviolet based proxy

## Install

```
git clone https://github.com/alive-hamster/Supernova.git
cd Supernova
npm install
npm run build
npm start
```
### Remember to create a .env file
**If using https through a reverse proxy https in .env may need to be set to false**

**Recommended way to genereate secret key:**
```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```