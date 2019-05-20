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



#===============================ROOT ROUTE======================================

'''
Root route, immediately redirects to login page; users must be logged in to use
'''
@app.route("/")
def hello():
    if session.get('username'):
        return redirect(url_for("draw"))
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
        return redirect(url_for("draw"))
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

# remember to change "draw" to "home"
@app.route("/draw", methods=["POST", "GET"])
def draw():
    ''' Displays information from all APIs to logged in users
    '''
    #sources = dataaccess.getPrefs(session.get('username'))[0]
    #news = apeye.news(sources)
    return render_template("draw.html", title = "Animado Bravado", user = session.get('username'))




if __name__== "__main__":
    app.debug = True
    app.run()
