from flask import Flask, render_template, session, request, url_for, redirect, flash

from util import db_builder

app = Flask(__name__)



@app.route("/")
def home():
    return render_template('Draw.html')

@app.route('/endp',methods = ['POST', 'GET'])
def result():
	if request.method == 'POST':
		result = request.form
		#print(result)
		#print("=================================================================")
		#print(result['imgstring'])
		db_builder.add_ani('b',result['imgstring'])
		return render_template("result.html", result = result)

if __name__== "__main__":
    app.debug = True
    app.run()
