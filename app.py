from flask import Flask, render_template, session, request, url_for, redirect, flash

app = Flask(__name__)



@app.route("/")
def home():
    return render_template('Draw.html')

if __name__== "__main__":
    app.debug = True
    app.run()
