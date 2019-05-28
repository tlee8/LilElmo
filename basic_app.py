from flask import Flask, render_template, session, request, url_for, redirect, flash

app = Flask(__name__)



@app.route("/")
def home():
    return render_template('Draw.html')

@app.route('/endp',methods = ['POST', 'GET'])
def result():
   if request.method == 'POST':
      result = request.form
      return render_template("
