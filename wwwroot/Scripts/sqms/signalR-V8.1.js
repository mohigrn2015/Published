$(function () {
    $.support.cors = true;
    // Declare a proxy to reference the hub.
    var notifications = $.connection.notifyDisplay;

    notifications.serverTimeoutInMilliseconds = 1000 * 60 * 60; // 1 hour

    // Create a function that the hub can call to broadcast messages.

    notifications.client.callToken = function (counter_id) {

        // Text to Speech if any text available for this branch to speech
        if (counter_id != 0) {
            if ((window.location.href).toLowerCase() == (basedURL + 'ServiceDetails/Create').toLowerCase()) {
                if ($('#hid_counter_id').val() == counter_id) NewServiceNo();
            } else {
                alert("You have a new token. Please go to Service page.")
            }
            
        }
    };
    

    // Create a function that the hub can call to sendNotification
    notifications.client.sendNotification = function (users, message, hasAttachment, notification_id) {
        var user_id = $("#hid_user_id").val();

        if (users.indexOf(user_id) != -1) {

            let oldNotification = parseInt($.trim($(".dummy_notification_count").text()));
            oldNotification = (isNaN(oldNotification)) ? 0 : oldNotification;
            VisibleNotificationBadge((oldNotification + 1));

            PushNotificationPopUp(message, hasAttachment, notification_id, true);
            LoadRecentNotification();
        }
    };

    $.connection.hub.disconnected(function () {
        setTimeout(function () {
            $.connection.hub.start();
        }, 5000); // Restart connection after 5 seconds.
    });

    // Start the connection.
    $.connection.hub.start().done(function () {
        LoadBreakCount();
    }).fail(function (e) {
        modalAlert(e);
    });


});