@echo off
title Slasher AI - Intializing. . .
color 9
cd assets
cls
echo                                  Proxies are auto-grabbed
echo                                         By an API
echo                                     Starting in... 3
ping localhost -n 2 >nul
title Slasher AI - Intializing. . 
cls
echo                                  Proxies are auto-grabbed
echo                                         By an API
echo                                     Starting in... 2
ping localhost -n 2 >nul
title Slasher AI - Intializing. 
cls
echo                                  Proxies are auto-grabbed
echo                                         By an API
echo                                     Starting in... 1
ping localhost -n 2 >nul
title Slasher AI - Starting Bots
cls
title Slasher AI - Running Bots
node index.js
exit