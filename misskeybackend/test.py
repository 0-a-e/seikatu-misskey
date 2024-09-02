import requests
import json

userresponse = requests.post("https://msk.seppuku.club/api/users/search",json.dumps({"query":"yamad","limit":1,"localOnly":True}),headers={'Content-Type': 'application/json'}).json()
print(userresponse)

unse = requests.post("https://msk.seppuku.club/api/notes/search",json.dumps({"query":"yamad","limit":1}),headers={'Content-Type': 'application/json'}).json()
print(unse)