/* DIGITAL FAMILY MEMORIES — PUSH NOTIFICATIONS */

self.addEventListener("push", function (event) {
    let data = {
        title: "Digital Family Memories",
        body: "A new public family update is available."
    };

    if (event.data) {
        try {
            const received = event.data.json();

            data.title = received.title || data.title;
            data.body = received.body || data.body;
        } catch (error) {
            data.body = event.data.text() || data.body;
        }
    }

    const notificationOptions = {
        body: data.body,
        icon: new URL(
            "images/family.jpg",
            self.registration.scope
        ).href,
        data: {
            url: new URL(
                "family.html",
                self.registration.scope
            ).href
        }
    };

    event.waitUntil(
        self.registration.showNotification(
            data.title,
            notificationOptions
        )
    );
});


/* OPEN FAMILY MEMORIES WHEN NOTIFICATION IS TAPPED */

self.addEventListener("notificationclick", function (event) {
    event.notification.close();

    const targetUrl = new URL(
        "family.html",
        self.registration.scope
    ).href;

    event.waitUntil(
        clients.matchAll({
            type: "window",
            includeUncontrolled: true
        }).then(function (windowClients) {
            for (const client of windowClients) {
                if (
                    client.url.startsWith(
                        self.registration.scope
                    ) &&
                    "focus" in client
                ) {
                    return client.focus().then(function () {
                        return client.navigate(targetUrl);
                    });
                }
            }

            return clients.openWindow(targetUrl);
        })
    );
});
