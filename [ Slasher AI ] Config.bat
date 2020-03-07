@echo off
color a
title Slasher AI - Intializer
cd assets
cls
echo                                  All of the bot's info is
echo                                     configurated Here
echo                                     Starting in... 5
ping localhost -n 2 >nul
cls
echo                                  All of the bot's info is
echo                                     configurated Here
echo                                     Starting in... 4
ping localhost -n 2 >nul
cls
echo                                  All of the bot's info is
echo                                     configurated Here
echo                                     Starting in... 3
ping localhost -n 2 >nul
cls
echo                                  All of the bot's info is
echo                                     configurated Here
echo                                     Starting in... 2
ping localhost -n 2 >nul
cls
echo                                  All of the bot's info is
echo                                     configurated Here
echo                                     Starting in... 1
ping localhost -n 2 >nul
cls
set /p BotsName=                        Bot's name : 
set /p MaxBots=                        Maximum Bots : 
echo { > config.json
echo 	"botNames": [ >> config.json
echo 		"%BotsName%", >> config.json
echo 		"%BotsName%" >> config.json
echo 	], >> config.json
echo     "accounts": [ >> config.json
echo       "nxeqCZE6iXsWvaLFvEXTxq3PMexCpGDHYAgS5x8YPgGvOVRg9vSWhdHuqgXqgeIR", >> config.json
echo       "lEFjVNsCKgkWLMM6rlYLuZm0fz7uLywCcY52Sp3aSYf7LGPFhX1G19c0OXfrPuNo", >> config.json
echo       "eKzaBvuV2RuoJX1A1Nj9OFB2qsK7UHDe9Dhxrk0Sbu65zqXr2JAU9sye7wlXGPFq" >> config.json
echo 	], >> config.json
echo 	"useAccount": false, >> config.json
echo 	"useProxyApi": true, >> config.json
echo 	"useCaptcha": true, >> config.json
echo 	"encryptMainKey": true, >> config.json
echo 	"maxBots": %MaxBots% >> config.json
echo } >> config.json