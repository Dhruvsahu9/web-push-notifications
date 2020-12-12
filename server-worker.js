self.addEventListener('notificationclose',event => {
    console.log('notification closed', event)
})

self.addEventListener('notificationclick',event => {
   
    if(event.action === "search"){
       const githubUser = event.notification.data.githubUser;
       clients.openWindow(`https://github.com/${githubUser}`);

    } else if(event.action === "close") {
        clients.openWindow(`https://giphy.com/gifs/the-secret-life-of-pets-happy-relax-26hisjy85ML01lqH6/fullscreen`);

    }

   
    console.log('notification clicked', event.notification.data)
})