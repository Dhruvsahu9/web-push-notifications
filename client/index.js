const client = (() =>
{
    let serviceWorkerRegObj = undefined;
    const checkNotificationSupport = () => {
        // return Promise.reject("notification support not checked.")
        if(!('Notification' in window)){
            return Promise.reject("The browser dosen't support notifications.")
        }
        console.log("the browser support Notifications !")
        return Promise.resolve("OK!")
    }

    const registerServiceWorker = () => {
        // return Promise.reject("service worker not registered yet")
        if(!('serviceWorker') in navigator){
            return Promise.reject("Service worker support is not availaible.")
        }
        return navigator.serviceWorker.register('server-worker.js')
        .then(regObj => {
                console.log("service worker is registered sucessfully!");
                serviceWorkerRegObj = regObj;
            })   
    
    }

    const requestNotificationPermissions = () => {
        // return Promise.reject("Permissions not requested.")
        return Notification.requestPermission(status => {
            console.log("Notification Permission Status : ",status);
        })
     }

    checkNotificationSupport()
        .then(registerServiceWorker)
        .then(requestNotificationPermissions)
        .catch(err => console.error(err))
})()