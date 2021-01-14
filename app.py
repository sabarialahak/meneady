from flask import Flask,flash,jsonify,redirect,stream_with_context,url_for,render_template,request,Response,make_response
from datacollection import Mindwave
import time
import random
from datetime import datetime
import numpy as np
import webbrowser

app=Flask(__name__)
app.config['SECRET_KEY']= 'mysecretkey'

@app.route('/_update',methods=["GET","POST"])
def update():
    random_decimal=np.random.randint(50)
    time1=datetime.now().strftime('%H:%M:%S')

    return jsonify(x=random_decimal,time1=time1)

@app.route('/',methods=['GET','POST'])
def index():
   return render_template('home.html')

@app.route('/home',methods=['GET','POST'])
def home():
   return render_template('home.html')

@app.route('/about',methods=['GET','POST'])
def about():
    return render_template('aboutus.html')

if __name__=='__main__':
    app.run(debug=True)
