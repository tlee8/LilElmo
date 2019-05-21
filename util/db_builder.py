'''
This script creates a database with the necessary tables for data to be stored
'''

import sqlite3 #imports sqlite

DB_FILE="data/Animado.db"

db = sqlite3.connect(DB_FILE) #open if file exists, otherwise create
c = db.cursor() #facilitates db operations


def users(): #creates the users db
    command = "CREATE TABLE users(username TEXT, password TEXT)"
    c.execute(command)

def articles(): #create the articles db
    command = "CREATE TABLE articles(article_id INTEGER, title TEXT, text TEXT, numlikes INTEGER, users TEXT)"
    c.execute(command)

def comments(): #creates the comments db
    command = "CREATE TABLE comments(comment_id INTEGER, article_id INTEGER, commenter TEXT, text TEXT)"
    c.execute(command)

def daily(): #creates the daily db
    command = "CREATE TABLE daily(date TEXT, cat TEXT, dog TEXT, recipe TEXT, word TEXT, defi TEXT, weather TEXT, temperature TEXT)"
    c.execute(command)

def pref(): #creates the pref db
#    command = "CREATE TABLE pref(user TEXT, source TEXT, daily TEXT)"
    command = "CREATE TABLE pref(user TEXT, preffered TEXT, type TEXT)"
    c.execute(command)


def main(): #calls all of the functions to build the databases
    try:
        users()
        articles()
        comments()
        daily()
        pref()
        print("done")
    except:
        pass


main()
