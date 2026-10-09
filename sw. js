self.addEventListener("push", function (event) {
  let data = {
    title: "Digital Memories",
    body: "A new public family update is available."
  };

  if (event.data) {
    try {
      const received = event.data.json();
      data.title = received.title || data.title;
      data.body = received.body || data.body;
    } catch (error) {}
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "./images/family.jpg",
      data: {
        url: "./family.html"
      }
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(
      new URL("./family.html", self.registration.scope).href
    )
  );
});
