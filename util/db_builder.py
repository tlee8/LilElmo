'''
This script creates a database with the necessary tables for data to be stored
'''

import sqlite3 #imports sqlite

from datetime import date

DB_FILE="data/elmo.db"

db = sqlite3.connect("../"+DB_FILE) #open if file exists, otherwise create
c = db.cursor() #facilitates db operations


def users(): #creates the users db
    command = "CREATE TABLE users(username TEXT, password TEXT)"
    c.execute(command)

def flipbooks(): #create the articles db
    command = "CREATE TABLE flipbooks (username TEXT, title TEXT, frame TEXT, image TEXT, id INTEGER, time TEXT)"
    c.execute(command)

def comments(): #creates the comments db
    command = "CREATE TABLE comments(id INTEGER, commenter TEXT, text TEXT)"
    c.execute(command)

def interaction(): #creates the daily db
    command = "CREATE TABLE interactions (id INTEGER, likes INTEGER, comments INTEGER)"
    c.execute(command)


def registeruser(user, pwd):
    DB_FILE="data/Elmo.db"
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    command = "SELECT username FROM users WHERE username = \'"+user+"\'"
    c.execute(command)
    rows = c.fetchone()
    if rows:
        return False;
    params = (user, pwd)
    c.execute("INSERT INTO users VALUES (?,?)", params)
    db.commit() #save changes
    db.close()  #close database
    return True

'''
Checks login credentials from database
'''
def loginuser(user, pwd):
    DB_FILE="data/Elmo.db"
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    command = "SELECT username, password FROM users WHERE username = ? AND password = ?"
    params = (user, pwd)
    c.execute(command, params)
    rows = c.fetchone()
    return rows

def add_ani(user, animation):
    """add animation to db"""
    db = sqlite3.connect("../"+DB_FILE)
    c = db.cursor()

    ani= animation.split(", ")
    title = ani.pop(0)
    frame = ani.pop(0)
    num = 0
    time = date.today()
    for pic in ani:
        c.execute("INSERT INTO flipbooks VALUES(?, ?, ?, ?, ?, ?)", (user, title, frame,pic, num, time))
        num +=1
    db.commit() #save changes
    db.close()  #close database




def main(): #calls all of the functions to build the databases
    try:
        users()
        flipbooks()
        comments()
        interaction()
        print("done")
    except:
        pass

#### TESTS ####
#main()
