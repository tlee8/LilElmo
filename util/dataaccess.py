#BATTery
#Thomas Lee (PM)
#Britni Canale
#Ahnaf Kazi
#Tim Marder
#p06

'''This script extracts data from database for use in application'''

import sqlite3

from datetime import date
from util import db_builder

db_builder.main()

'''
Takes user and password input from register pages

Checks if user already exists
If not, adds new user to database
'''
def registeruser(user, pwd):
    DB_FILE="data/BATT.db"
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
    DB_FILE="data/BATT.db"
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    command = "SELECT username, password FROM users WHERE username = ? AND password = ?"
    params = (user, pwd)
    c.execute(command, params)
    rows = c.fetchone()
    return rows

'''
These are not currently being implemented

def saveday(cat, dog, word, defi, weather, temperature):
        date = date.today().isoformat()
        params = (date, cat, dog, word, defi, weather, temperature)
        c.execute("INSERT INTO users VALUES (?,?,?,?,?,?,?)", params)
        db.commit() #save changes
        db.close()  #close database

def newday():
    DB_FILE = "data/BATT.db"
    date = date.today().isoformat()
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    command = "SELECT date FROM daily WHERE date = {0}".format(date)
    c.execute(command)
    rows = c.fetchone()
    if rows:
        return False
    else:
        return True

def update():
    if newday:
        weather = apeye.weather()["currently"]["summary"]
        temperature = apeye.weather()["currently"]["temperature"]
        words, defs = apeye.word()
        x = random.randint(1, len(words)) - 1
        word = words[x]
        definition = defs[x]
        saveday("","","",word,definition,)
'''

def setPref(user,text,types):
    #db_builder.main()

    DB_FILE = "data/BATT.db"
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
    DB_FILE = "data/BATT.db"
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
    DB_FILE = "data/BATT.db"
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


#def main():
#    setPrefs("battery", "CNN", "article")
#    print(getPrefs("battery"))
#main()
