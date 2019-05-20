import json
import urllib
import random
import os
import ssl

from flask import Flask, render_template, session, request, url_for, redirect, flash

from util import dataaccess, apeye

if (not os.environ.get('PYTHONHTTPSVERIFY', '') and
    getattr(ssl, '_create_unverified_context', None)):
    ssl._create_default_https_context = ssl._create_unverified_context


app = Flask(__name__)
app.secret_key = os.urandom(32)


#===========================EXTRACTING API DATA=================================


weather = apeye.weather("summary")
temperature = apeye.weather("temperature")

word, definition = apeye.word()

dateFact = apeye.number()

dogPic = apeye.dog()#Im()
catPic = apeye.cat()#Im()

dogVid = dogPic[-3:] == 'mp4'
catVid = catPic[-3:] == 'mp4'

articles = apeye.news()

print(dogVid,catVid)



#===============================ROOT ROUTE======================================

'''
Root route, immediately redirects to login page; users must be logged in to use
'''
@app.route("/")
def hello():
    if session.get('username'):
        return redirect(url_for("home"))
    else:
        return redirect(url_for("login"))



#=============================AUTHORIZATION=====================================

'''
Allows user to login

Users must log in to access website
If a user does not have an account, they may sign up for one
'''
@app.route("/login", methods=["POST", "GET"])
def login():
    return render_template("login.html")


'''
Authorizes users' login information

Checks if their profile exists in database
Flashes error if does not exist, redirect to login
Flashes success message if exists, redirect to home, adds user to session
'''
@app.route("/auth", methods = ["POST"])
def auth():
    if  dataaccess.loginuser(request.form['username'], request.form['password']):
        session['username'] = request.form['username']
        flash("Welcome " + session['username'] + "! You have successfully logged in.")
        return redirect(url_for("home"))
    else:
        flash("Your login credentials were incorrect.")
        return redirect(url_for("login"))


@app.route("/register", methods = ["POST", "GET"])
def register():
    '''Displays page for users to register'''
    return render_template("register.html")


'''
Authorizes users' registration information

Checks if passwords match or username is already taken; flashes appropriate
messages and redirects back to register if so.
Creates account and adds user information to database if okay, redirect to
login.
'''
@app.route("/regauth", methods = ["POST"])
def regauth():
    if not request.form['password'] == request.form['password2']:
        flash("Your passwords do not match")
        return redirect(url_for("register"))
    if dataaccess.registeruser(request.form['username'], request.form['password']):
        flash("You have successfully created an account")
        return redirect(url_for("login"))
    flash("The username you entered is taken.")
    return redirect(url_for("register"))


'''
Removes user from session, redirects to login
'''
@app.route("/logout", methods=["POST", "GET"])
def logout():
    try:
        session.pop('username')
        flash("You have successfully logged out")
        return redirect(url_for("login"))
    except:
        flash("You have successfully logged out")
        return redirect(url_for("login"))



#==============================VIEWING INFO=====================================


'''
Displays information from all APIs to logged in users

dailies = dataaccess.getPrefs(session.get('username'))[1]
if "Weather" in dailies:
    weather = apeye.weather()["currently"]["summary"]
    temperature = apeye.weather()["currently"]["temperature"]
if "Dog" in dailies:
    dogPic = apeye.dogIm()
if "Cat" in dailies:
    catPic = apeye.catIm()
if "Word" in dailies:
    words, defs = apeye.word()
    x = random.randint(1, len(words)) - 1
    word = words[x]
    definition = defs[x]
if "Date" in dailies:
    s = apeye.number()
'''
@app.route("/home", methods=["POST", "GET"])
def home():
    ''' Displays information from all APIs to logged in users
    '''
    #sources = dataaccess.getPrefs(session.get('username'))[0]
    #news = apeye.news(sources)
    return render_template("home.html", title = "DAILY BATT", user = session.get('username'), articles = articles, word = word, definition = definition, weather = weather, temperature = temperature, dateFact = dateFact, dogPic = dogPic, catPic = catPic, dogVid = dogVid, catVid = catVid)

'''
Currently not functional

@app.route("/myarticles", methods = ["POST", "GET"])
def myarticles():
    \'\'\'Displays any articles the user has shared, had shared with them,
    liked, commented on, etc.
    \'\'\'
    return render_template("myarticles.html", myarticles = True, title = "My Articles", user = session.get('username'), articles = articles, word = word, definition = definition, weather = weather, temperature = temperature)
'''

'''
Currently not functional

@app.route("/popularposts")
def popposts():
    \'\'\'Displays articles with the most comments, shares, and likes
    \'\'\'
    return render_template("popularposts.html", popposts = True, title = "Popular Posts", user = session.get('username'), articles = articles, word = word, definition = definition, weather = weather, temperature = temperature)
'''



@app.route("/article", methods=["POST", "GET"])
def article():
    '''Displays a single article, includes link to source website'''
    if "username" not in session:
        return redirect(url_for("login"))
    title = request.args["title"]
    print(title)
    for article in articles:
        if title == articles[article][0]:
            print(article)
            return render_template("article.html", article = articles[article])


#============================USER PREFERENCES===================================

'''
Currently not functional

@app.route("/preferences")
def preferences():
    \'\'\'Displays page allowing users to choose their preferences

    By default, all possible information is shown.
    Users can choose what news sources and what daily bits they want on their
    home page
    New information will update in database
    \'\'\'
    #sources = dataaccess.getPrefs(session.get('username'))[0]
    #dailies = dataaccess.getPrefs(session.get('username'))[1]
    return render_template("preferences.html", pref = True) #, sources = sources, dailies = dailies )
'''

'''
Currently not functional

@app.route("/updatepref", methods = ["POST"])
def updatepref():
    \'\'\'Adds information from users selected preferences to database\'\'\'
    sources = request.form.getlist('sources')
    dailies = request.form.getlist('dailies')
    #dataaccess.setPrefs(session.get('username'), sources, dailies)
    flash("You have successfully updated your preferences.")
    return redirect(url_for("home"))
'''


if __name__== "__main__":
    app.debug = True
    app.run()
