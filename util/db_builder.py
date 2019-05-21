'''
This script creates a database with the necessary tables for data to be stored
'''

import sqlite3 #imports sqlite

from datetime import date

DB_FILE="data/Elmo.db"

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

def setPref(user,text,types):
    #db_builder.main()

    DB_FILE = "data/Elmo.db"
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    params = (user,text,types)
    command = "INSERT INTO pref VALUES (?,?,?)"
    c.execute(command,params)
    db.commit()#save changes
    db.close()  #close database
    return True

def setPrefs(user, sources, dailies):
    #db_builder.main()
    #print(sources)
    #print(dailies)
    print(user)
    print('\n\n')
    DB_FILE = "data/Elmo.db"
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    command = "DELETE FROM pref where user = '{0}'".format(user)
    with sqlite3.connect(DB_FILE) as x:
        x.execute(command)
    for source in sources:
        #print(source)
        setPref(user, source, "source")
    for daily in dailies:
        #print(daily)
        setPref(user, daily, "daily")
    db.commit()#save changes
    db.close()  #close database
    return True


def getPrefs(user):
    #db_builder.main()
    DB_FILE = "data/Elmo.db"
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    db_builder.main()
    command = "SELECT * FROM pref WHERE user = '{0}' ".format(user)
    c.execute(command)
    if (not c.fetchone()):
        #sources = ['ars-technica', 'abc-news', 'bbc-news', 'business-insider','buzzfeed', 'cbs-news', 'el-mundo', 'the-new-york-times', 'national-geographic', 'the-wall-street-journal', 'the-washington-post']
        #dailies = ['Word', 'Date', 'Cat', 'Dog', 'Weather']

        #setPref(user, sources, dailies)

        setPref(user,"ABC News", "source")
        setPref(user,"Ars Technica", "source")
        setPref(user,"BBC News", "source")
        setPref(user,"Business Insider", "source")
        setPref(user,"Buzzfeed", "source")
        setPref(user,"El Mundo", "source")
        setPref(user,"National Geographic", "source")
        setPref(user,"New York Times", "source")
        setPref(user,"Wall Street Journal", "source")
        setPref(user,"National Geographic", "source")
        setPref(user,"CBS News", "source")
        setPref(user,"Word of the Day", "daily")
        setPref(user,"Weather", "daily")
        setPref(user,"Date Fact", "daily")

    command = "SELECT preffered,type FROM pref WHERE user = '{0}'".format(user)
    c.execute(command)
    ans = dict()
    ans['source']=[]
    ans['daily'] = []
    source = 'source'
    daily = 'daily'
    for row in c.fetchall():
        ans[row[1]].append(row[0])
    c.execute(command)

    db.commit() #save changes
    db.close()  #close database
    print(ans['source'])
    return ans['source'], ans['daily']

def origSetPref(user):
    setPref(user,"ABC News", "source")
    setPref(user,"Ars Technica", "source")
    setPref(user,"BBC News", "source")
    setPref(user,"Business Insider", "source")
    setPref(user,"Buzzfeed", "source")
    setPref(user,"El Mundo", "source")
    setPref(user,"National Geographic", "source")
    setPref(user,"New York Times", "source")
    setPref(user,"Wall Street Journal", "source")
    setPref(user,"National Geographic", "source")
    setPref(user,"CBS News", "source")
    setPref(user,"Word of the Day", "daily")
    setPref(user,"Weather", "daily")
    setPref(user,"Date Fact", "daily")

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
