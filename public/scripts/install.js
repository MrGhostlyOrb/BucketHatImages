'use strict';

let deferredInstallPrompt = null;
const installButton2 = document.getElementById('butInstall2');
const installBtn3 = document.getElementById('installBtn3');
const installButton = document.getElementById('butInstall');
installButton.addEventListener('click', installPWA);
if(window.location.pathname == '/'){
	installButton2.addEventListener('click', (e)=>{installPWA(e)});
}
if(window.location.pathname == '/'){
	installBtn3.addEventListener('click', (e)=>{installPWA(e)});
}

window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);


function saveBeforeInstallPromptEvent(evt) {

deferredInstallPrompt = evt;
installButton.removeAttribute('hidden');
}


function installPWA(evt) {

const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test( userAgent );
}
// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

// Checks if should display install popup notification:
if (isIos() && !isInStandaloneMode()) {
  this.setState({ showInstallMessage: true });
}

deferredInstallPrompt.prompt();

evt.srcElement.setAttribute('hidden', true);



}

window.addEventListener('appinstalled', logAppInstalled);


function logAppInstalled(evt) {
	console.log('Richmond Paper App was installed.', evt);
}
