Installation instructions:

1. run "install.bat".
2. setup config.json 
	as such:
	{
	  "RPC_CLIENT_ID": "#RPC_CLIENT_ID_HERE",
	  "PLEX_API_HOSTNAME": "#LOCAL_PLEX_IP_HERE",
	  "PLEX_API_KEY": "#API_KEY_FOR_PLEX (if needed read about x-plex-token)",
	  "PLEX_OBSERVING_CLIENT_IP": "#THE_IP_OF_THE_WATCHING_PC",
	  "PLEX_IMAGE_KEY": "#IMAGE_TO_SHOW_IN_RICH_PRESENCE_WHEN_WATCHING"
	}
you have a choice either install as service or just run the server:
 3a. to install as a service run "install as service.bat"
 3b. to just run the server you use "run.bat"

4. ENJOY~~~

BEWARE ! PLEX HAS A BUG THAT IF YOU DON'T EXIT THE STREAM BEFORE CLOSING THE WINDOW
THE SESSION WILL GET STUCK, AND IT WILL THINK YOU ARE WATCHING
AFTER ABOUT 2MIN IT SHOULD GO AWAY
IF IT DOESN'T STOP THE SERVICE AND WAIT FOR NOWPLAYING TO BE EMPTY