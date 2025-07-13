Bang Bang is a multiplayer 3D tank shooter game made with Pygame and OpenGL.
Last year, I started a major refactor which involved migrating from Python 2 to
Python 3; rewriting the networking from the ground up, including building a
custom schema on top of WebSockets; moving almost all game logic from the
client to the server; converting frame-per-second timings to
delta-between-frame ones; and writing [a
sub-project](https://github.com/byronsharman/playground) that handled
player-joining logic.
