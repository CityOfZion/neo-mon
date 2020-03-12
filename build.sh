mkdir -p dist
rm -r dist/* || true # Ignore error if files don't exist
npm run build-css
cp mainnet.json testnet.json dist
cp -r src/assets/icons dist/icons
cd src
cp index.html ../dist/
cd app

cat lib/neo.js lib/angular.http.js view.controller.js netstats.factory.js icon.directive.js filters.js app.module.js app.run.js > ../../dist/app.js
cat view.html | sed -e '/{replace view.html}/{r /dev/stdin' -e 'd;}' include.template.js >> ../../dist/app.js

cp lib/vendor.js ../../dist/
