import os
import datetime
import wikipedia
import requests
import re
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from chatgui import get_response

#--------------------------------------
from flask_mysqldb import MySQL
#-----------------

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
mysql = MySQL(app)



@app.post("/predict")
def predict():
    text = request.get_json().get("message")
    # if any(x in text for x in ["-who ", "-what "] ) or "'," not in get_response(text) :
    # print(request.get_json().get("message"))
    #print(get_response( text ))

    if len(get_response(text)) != 2:
        response = get_response(text)
        message = {"answer": response}
    else:
        response, urls = get_response(text)
        message = {"answer": response, "urls": urls}
        # print("message")

    return jsonify(message)


@app.post("/newqtns")
def newqtns():
    myarr=request.get_json()    
    app.config['MYSQL_DB'] = 'cbot'

    logid = myarr[0]
    name  = myarr[1]
    email = myarr[2]
    emply = myarr[3]
    zone = 'IPAddr'
    date = datetime.datetime.now()
    rem=''
    cursor = mysql.connection.cursor()
    query_string = "SELECT * FROM bot_tab WHERE nquery = %s"
    cursor.execute(query_string, (logid,))
    data = cursor.fetchall()

    if emply:
        print(emply)
    
    cursor.execute(''' INSERT INTO bot_tab VALUES(%s,%s,%s,%s,%s,%s,%s,%s)''',(id,name,email,emply,logid,zone,date,rem))
    mysql.connection.commit()
    #if not(data):
    #    cursor.execute(''' INSERT INTO info_table VALUES(%s,%s,%s,%s)''',(id,nwquery,zone,date))
    #    mysql.connection.commit()
    cursor.close()
    return f"Done!!"





@app.post("/myapin")
def myapin():
    moblic = request.get_json().get("message")
    endpoint = "http://wservices.margcompusoft.com/api/Question/GetLicenseInfo"
    data = {"Token": "BFqSaj179B++xDIdZPE6Ru1pWff0ctm4SeGCxPZ39PgVSGtJupfj6PQx5kBd31bZEXU4d8g3km1zfsdZ5jWJ7rHCgd0Xyu/DRQ2jSx8gpDw=", "SearhText": moblic}
    r = requests.post(url=endpoint, data=data)
    if(r.text[11:15] == 'true'):
        result = r.text[36::]
        result = result.replace("}", "").replace('"', '')
    else:
        result = r.text[34:88]
        result = result.replace('"', '')
    message = {"intro": result}
    return jsonify(message)


@app.post("/myapqn")
def myapqn():
    apqn = request.get_json().get("message")
    endpoint = "http://wservices.margcompusoft.com/api/Question/SearchQuestion"
    data = {"Token": "BFqSaj179B++xDIdZPE6Ru1pWff0ctm4SeGCxPZ39PgVSGtJupfj6PQx5kBd31bZEXU4d8g3km1zfsdZ5jWJ7rHCgd0Xyu/DRQ2jSx8gpDw=", "Question": apqn}
    r = requests.post(url=endpoint, data=data)
    if(r.text[11:15] == 'true'):
        resultqn = r.text
        #resultqn = " - " + resultqn.replace("}", "").replace('"', '')
    else:
        resultqn = ""
    message = {"qtns": resultqn}
    # print(resultqn)
    return jsonify(message)

# 0512 to be replaced
@app.post("/myapan")
def myapan():
    if(int(request.get_json().get("message")) > 0):
        apan = request.get_json().get("message")
        endpoint = "http://wservices.margcompusoft.com/api/Question/GetAnswerData"
        data = {"Token": "BFqSaj179B++xDIdZPE6Ru1pWff0ctm4SeGCxPZ39PgVSGtJupfj6PQx5kBd31bZEXU4d8g3km1zfsdZ5jWJ7rHCgd0Xyu/DRQ2jSx8gpDw=", "Question": apan}
        r = requests.post(url=endpoint, data=data)
        r_json = r.json()
        #print(r_json['data'][0])

        if(r_json['success'] == True):
            resultan = r_json['data'][0]['Answer']

            lrow = 1
            while lrow < 10:
                #resulti = re.search("<span style="+'"'+"text-decoration: underline;"+'"'+"><a href="+'"#'+"(.+?)</a></span>", resultan)
                resulti = re.search("<a href="+'"#'+"(.+?)</a>", resultan)
                if(resulti):
                    resultan = resultan.replace(resulti.group(0), "")
                else:
                    lrow = 10
                lrow = lrow+1

            lrow = 1
            while lrow < 10:
                resulti = re.search("<a href="+'"file:///C:/Users/'+"(.+?)</a>", resultan)
                if(resulti):
                    resultan = resultan.replace(resulti.group(0), "")
                else:
                    lrow = 10
                lrow = lrow+1

            lrow = 1
            while lrow < 10:
                resulti = re.search("<span style="+'"'+"text-decoration: underline;"+'"'+"><a href="+"(.+?)</a></span>", resultan)
                if(resulti):
                    resultan = resultan.replace(resulti.group(0), "")
                else:
                    lrow = 10
                lrow = lrow+1

            lrow = 1
            while lrow < 10:
                resulti = re.search("<a href="+'"http://care.margcompusoft.com/Admin/'+"(.+?)</a>", resultan)
                if(resulti):
                    resultan = resultan.replace(resulti.group(0), "")
                else:
                    lrow = 10
                lrow = lrow+1

            resultan = resultan.replace("<p>&nbsp;</p>", "")

            resultan = resultan.replace(
                ".png", ".png"+'"'+" width='245' class='btn img-fluid' data-bs-toggle='modal' data-bs-target='#imgPop' onClick='sendimg(this);'")

            resultan = resultan.replace(
                '<span style="white-space: pre; font-family: Calibri; font-size: 16px;">', '<span>')

            resultan = resultan.replace('<table style="width', '<div class="table-responsive"> <table class="table table-bordered" style="width')
            resultan = resultan.replace('</table>', '</table></div>')

            resultan = resultan.replace('<div class="table-responsive-sm">', '<div class="table-responsive">')

            if(r_json['data'][0]['VideoLink']):
                resultan = resultan + "Videolink: <a href="+r_json['data'][0]['VideoLink']+" target='_blank' > "+r_json['data'][0]['VideoLink']+"</a>"
                #print(resultan)

            
        else:
            resultan = ""
        message = {"ansr": resultan}

        '''text_file = open("rdata.txt", "w")
        n = text_file.write(resultan)
        text_file.close()'''
        
        #print(resultan)
        return jsonify(message)
# till here

@app.post("/wishme")
def wishme():
    hour = datetime.datetime.now().hour
    if hour >= 0 and hour < 12:
        stalk = "Good Morning!"
    elif hour >= 12 and hour < 18:
        stalk = "Good Afternoon!"
    else:
        stalk = "Good Evening!"
    message = {"greets": stalk}
    return jsonify(message)


@app.post("/g1bot")
def g1bot():
    textg = request.get_json().get("message")
    #url_ = "https://www.google.com/search?q= " + textg
    info = ''
    if any(x in textg for x in ["who* ", "what* "]):
        person = textg.replace('who is ', '').replace('what is ', '')
        try:
            info = wikipedia.summary(person, 1)
        except wikipedia.exceptions.DisambiguationError:
            info = 'Perhaps I didn’t understand your question correctly.'
        except wikipedia.exceptions.PageError:
            info = 'Perhaps I didn’t understand your question correctly.'
    message = {"botg": info}
    return jsonify(message)


if __name__ == "__main__":
	#app.run(host='0.0.0.0', port=5000)
    app.run(debug=True)
