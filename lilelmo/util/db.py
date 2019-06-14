import sqlite3
import os

DIR = os.path.dirname(__file__) or '.'
DIR += '/../'

DB_FILE = DIR + "data/elmo.db"

def createTable():
    """Creates the two main data tables for users and list of stories."""
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    command = "CREATE TABLE users (username TEXT, password TEXT)"
    c.execute(command)

    command = "CREATE TABLE flipbooks (username TEXT, title TEXT, image TEXT, id INTEGER)"
    c.execute(command)

    command = "CREATE TABLE interactions (id INTEGER, likes INTEGER, comments INTEGER)"
    c.execute(command)

    command = "CREATE TABLE comments(id INTEGER, user TEXT, content TEXT)"
    c.execute(command)
    
    db.commit() #save changes
    db.close()  #close database

#createTable()

def add_user(username, password):
    """Insert credentials for newly registered user into database."""
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    c.execute("INSERT INTO users VALUES(?, ?)", (username, password))
    db.commit() #save changes
    db.close()  #close database

def auth_user(username, password):
    """Authenticate a user attempting to log in."""
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    # user_info = c.execute("SELECT users.username, users.password FROM users WHERE username={} AND password={}".format(username, password))
    for entry in c.execute("SELECT users.username, users.password FROM users"):
        if(entry[0] == username and entry[1] == password):
            db.close()
            return True
    db.close()
    return False

def check_user(username):
    """Check if a username has already been taken when registering."""
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    for entry in c.execute("SELECT users.username FROM users"):
        if(entry[0] == username):
            db.close()
            return True
    db.close()
    return False


def add_ani(user, animation):
    """add animation to db"""
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    ani= animation.split(", ")
    title = ani.pop(0)
    frame = 0
    for pic in ani:
        c.execute("INSERT INTO flipbooks VALUES(?, ?, ?, ?)", (user, title, pic, frame))
        frame +=1
    db.commit() #save changes
    db.close()  #close database


    
# =========== db function tests ===========
#createTable()
#add_user('b','b');
#print(auth_user('a','a'))
#print(auth_user('a','b'))
#print(auth_user('b','b'))
#print(auth_user('c','s'))
#print(check_user('a'))
#print(check_user('b'))
#print(check_user('c'))
add_ani('b', 'test, "da')
