# LilElmo
* Sarar Aseer (Canvas and JS)
* Shin Bamba (DB and Bootstrap)
* Thomas Lee (Project Manager)
* Tim Marder (HTML page creation and Flask)

# Animation Sensation
Our project is an app where a user can make an animation via flipbook style. The user draws each individual frame, which can then be played in succession, creating the animation. Then the user will be able to post their own animation and comment on others on topic threads. Users will be able to play, vote, and comment on other peoples animations. 

## a video demo

## LAUNCH CODES

#### Install and run on localhost
1. Activate your virtual environment 
```
$ python3 -m venv venv
$ . venv/bin/activate
```

2. Clone our repo 
```
$ git clone git@github.com:tlee8/LilElmo.git
```

3. Switch to our directory 
```
$ cd LilElmo
```

4. Install the required packages 
```
$ pip install -r requirements.txt
```

5. Run app.py 
```
$ python app.py
```

6. Open your web browser and go to http://127.0.0.1:5000/

7. Explore our app!

#### Install and run on Apache2
1. SSH into your droplet
```$ ssh <user>@<ip address>```
2. Change directories to the www directory 
```$ cd ../../var/www```
3. Create a directory named after your app and then cd into it
```
$ mkdir <appname>
$ cd <appname>
```
4. Get root access
```$ sudo su ```

5. Clone the repo via https
```$ git clone https://github.com/tlee8/LilElmo.git <appname> ```
6. Add write permisssions
```
$ chgrp -R www-data <appname>
$ chmod -R g+w <appname>
```
7. Move into the repo, rename app.py, and install requirements
```
$ cd <appname>
$ mv app.py __init__.py
$ pip3 install -r requirements.txt
```
8. Move the wsgi file to the \<appname\> directory ```mv LilElmo.wsgi ../```
9. Change the ServerName in the conf file to the ip of your own droplet and move the file to the sites-available directory ```mv LilElmo.conf ~/../../etc/apache2/sites-enabled/```
10. Change directories to the sites-enabled directory
```$ cd ~/../../etc/apache2/sites-enabled/```
11. Enable the site:
```$ a2ensite <appname>```
12. Reload and restart the server
```
$ service apache2 reload
$ service apache2 restart
```
13. Open your browser and go to your ip address!
