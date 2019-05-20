'''
This script creates a database with the necessary tables for data to be stored
'''

import sqlite3 #imports sqlite

DB_FILE="data/AnimadoBravado.db"

db = sqlite3.connect(DB_FILE) #open if file exists, otherwise create
c = db.cursor() #facilitates db operations


def main(): #calls all of the functions to build the databases
    try:
        users()
        print("done")
    except:
        pass


main()
