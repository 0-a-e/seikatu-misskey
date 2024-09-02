import json
import requests
import datetime
from flask import Flask, request, render_template
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

class main:
    back7days = datetime.datetime.today() - datetime.timedelta(days=7)
    print(datetime.datetime.strftime(back7days, '%Y-%m-%d'))
    from1970 = back7days - datetime.datetime(1970,1,1)
    from1970 = int(from1970.total_seconds()) * 1000
    datalist0 = []
    datalist1 = []
    datalist2 = []
    datalist3 = []
    datalist4 = []
    datalist5 = []
    datalist6 = []
    #あとでfor + evalに
    
    def main(self,user):
        self.resetdatalistnum()
        userresponse = requests.post("https://msk.seppuku.club/api/users/search",json.dumps({"query":user,"limit":1,"localOnly":True}),headers={'Content-Type': 'application/json'}).json()
        print(userresponse)
        if len(userresponse) == 0:
            return {"error":"usernotfound"}
        self.uid = userresponse[0]["id"]
        sinceId = False
        iffirst = True
        #sinceId == False) &

        while (iffirst is True) or (sinceId != False):
            #sinceIdには終了時にはfalseがくる
            sinceId = self.getdata(sinceId)
            print("sinceId: " + str(sinceId))
            iffirst = False
        else:
            return {
            "error":"none",
            "d0":{
                "data":self.datalist0,
                "backgroundColor": "rgba(219,39,91,0.5)",
                "label": datetime.datetime.strftime((datetime.datetime.today() - datetime.timedelta(days=1)), '%m/%d')
                },
            "d1":{
                "data":self.datalist1,
                "backgroundColor":"rgba(255, 179, 0,0.5)",
                "label": datetime.datetime.strftime((datetime.datetime.today() - datetime.timedelta(days=2)), '%m/%d')
                },
            "d2":{
                "data":self.datalist2,
                "backgroundColor":"rgba(47, 194, 115,0.5)",
                "label": datetime.datetime.strftime((datetime.datetime.today() - datetime.timedelta(days=3)), '%m/%d')
                },
            "d3":{
                "data":self.datalist3,
                "backgroundColor":"rgba(35, 103, 219,0.5)",
                 "label": datetime.datetime.strftime((datetime.datetime.today() - datetime.timedelta(days=4)), '%m/%d')
                },
            "d4":{
                "data":self.datalist4,
                "backgroundColor":"rgba(143, 36, 214,0.2)",
                "label": datetime.datetime.strftime((datetime.datetime.today() - datetime.timedelta(days=5)), '%m/%d')
                },
            "d5":{
                "data":self.datalist5,
                "backgroundColor":"rgba(240, 7, 154,0.2)",
                "label": datetime.datetime.strftime((datetime.datetime.today() - datetime.timedelta(days=6)), '%m/%d')
                },
            "d6":{
                "data":self.datalist6,
                "backgroundColor":"rgba(91, 217, 91,0.5)",
                "label": datetime.datetime.strftime((datetime.datetime.today() - datetime.timedelta(days=7)), '%m/%d')
                }
            }

    def resetdatalistnum(self):
        self.datalist0 = []
        self.datalist1 = []
        self.datalist2 = []
        self.datalist3 = []
        self.datalist4 = []
        self.datalist5 = []
        self.datalist6 = []
            

    
    def getdata(self,sinceId):
        usernoteresp =  self.getnotes(self.uid,sinceId)
        pn = self.processnotes(usernoteresp,sinceId)
        if pn:
            print("--全データ取得--")
            return False
        else:
            #最後のノートを取り出す
            self.datalist = []
            unsortdatalist = self.datalist0 + self.datalist1 +  self.datalist2 +  self.datalist3 + self.datalist4 + self.datalist5 + self.datalist6
            self.datalist = sorted(unsortdatalist, key=lambda x:x['time'])
            self.datalist.reverse()     
            return self.datalist[0]["id"]


    def getnotes(self,uid,sinceId):
        #めも　新しいほうが取得されない
        usernoteurl = "https://msk.seppuku.club/api/users/notes"
        usernotedata = {"userId": uid,"limit":100,"sinceDate":self.from1970}
        
        if sinceId:
            usernotedata["sinceId"] = sinceId
        rvresp = requests.post(usernoteurl,json.dumps(usernotedata),headers={'Content-Type': 'application/json'}).json()
        rvresp.reverse()
        return rvresp


    def processnotes(self,usernoteresp,sinceId):
        i = 0
        if len(usernoteresp) == 0:
            return True
        for rp in usernoteresp:
            i+=1
            # print(rp["text"])
            notetime = datetime.datetime.strptime(rp["createdAt"],'%Y-%m-%dT%H:%M:%S.%fZ')
            
            #if sinceId == False:
            #    if (len(usernoteresp) < 100) and (len(usernoteresp) == i):
            #        return True
                # if datetime.datetime.strptime(usernoteresp[i]["createdAt"],'%Y-%m-%dT%H:%M:%S.%fZ')
            
            #100ノート未満用
            #rは丸のサイズ後でツイート数に応じるように直すかも
            #先週も入っちゃうから今週に処理
            #原因 returnしちゃうからforが終わる
            #なんか2回入ってる
            #これif機能してない
            print(notetime)
            print(self.back7days)
            if notetime > self.back7days:
                waru24 = float(notetime.strftime("%X")[:-3].replace(':','.'))
                data = {
                    "text":rp["text"],
                    "time":notetime,
                    "id":rp["id"],
                    "x":waru24,
                    "y":int(notetime.strftime('%d')),
                    "r":10
                    }
                    #今は曜日になっている　投稿日ごとに1~6を振り分けるようにする 修正済み
                dlistname="self.datalist" + str(int(datetime.datetime.today().day) - int(notetime.day) - 1)
                #こっちが機能してる
                print(dlistname)
                if dlistname == "self.datalist-1":
                    return True
                
                d = eval(dlistname)
                d.append(data)
                #日付を超えるのが出たときにfalseを返している
            else:
                return True
        #forのelse
        else:
            return False

@app.route('/')
def index():
    return main().main(request.args.get("user"))

#main().main()
#herokuのときに削除
app.debug = True
app.run(host='0.0.0.0', port=80)