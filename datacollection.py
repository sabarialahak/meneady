import numpy as np
import pandas as pd
import json
import time
from telnetlib import Telnet

class Mindwave():
    # Initializing the arrays required to store the data.
    attention_values = np.array([])
    time_array = np.array([])

    def __init__(self):
        self.HOST='localhost'
        self.port=13854

    def getConnection(self):
        self.tn=Telnet(self.HOST,self.port)

    def getReading(self):
        start=time.perf_counter()
        self.tn.write(('{"enableRawOutput":true, "format": "Json"}').encode('ascii'))
        eSenseDict={'attention':0}
        while time.perf_counter() - start < 60:
                line=self.tn.read_until(b'\r').decode("utf-8")
                if len(line) > 60:	
                    timediff=time.perf_counter()-start
                    dict=json.loads(str(line))
                    if "eegPower" in dict:
                        eSenseDict=dict['eSense']
                    if eSenseDict['attention'] ==0:
                        continue
                    self.time_array = np.append(self.time_array, [timediff])
                    self.attention_values = np.append(self.attention_values, [eSenseDict['attention']])
                    print(eSenseDict["attention"])
                    return(eSenseDict['attention'])
