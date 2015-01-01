Controller
==========

This is an experimental application using Socket.io and Create.js. I make the app to test the possibility for making realtime multiplayer game using websocket. The result is very promising.

Installation
-------
To run this app, you should have node.js installed. Using command prompt and direct to root folder, use

    npm install
to install all the dependencies. Then

    node index
 to run the server.  After that, you can open two browser tab,  **localhost:8000**
and  **localhost:8000/player**. Pressing the color circles on the second tab will cause the black circle on the first tab to move.

*ps. I also tested running the client on mobile device. To do that, you would need to open a port at 8000 for TCP on your firewall, and then replace localhost with the local address of your server (given that both your server and clients are in the same wifi network).*

