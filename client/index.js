const client = (() =>
{
    let serviceWorkerRegObj = undefined;
    
    const  notificationButton = document.getElementById("btn-notify");

    const showNotificationButton = () => {
        notificationButton.style.display = "block";
        notificationButton.addEventListener("click",showNotification);   
    }

    const showNotification = () => {
        // console.log("button clicked")

        const simpleTextNotification = reg => reg.showNotification("My First Notification")

        const customizedTextNotification = reg =>{
             const options = {
                 body : "This is an important body!",
                 icon : "imgs/bell-icon.png"
             }
             reg.showNotification("Second Notification",options)
        }
        navigator.serviceWorker.getRegistration()
        // .then(registration => simpleTextNotification(registration)); 
         .then(registration =>  customizedTextNotification(registration));  // this block of code releases the notification 
    }
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
                showNotificationButton();
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