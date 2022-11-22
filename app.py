#setup dependencies
import numpy as np
import datetime as dt

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify


#Database setup: (NEED SQLITE FILE)
engine = create_engine('sqlite:///Resources/covid-19.sqlite')

#reflect an existing database into a new model
Base = automap_base()
#reflect the tables
Base.prepare(engine, reflect=True)

#Saving reference to the table (What are our references?)
measurement = Base.classes.measurement
station = Base.classes.station

# Flask setup
app = Flask(__name__)

#Flask Routes:

#creating homepage:
@app.route("/")
def homepage():
    """All available api routes"""
    return (
        f"Welcome to the COVID-19 Database Home Page!<br/>"
        f"All available API routes:<br/>"
        f"/api..."
        f"/api..."
        f"/api..."


    )

#creating /api/

@app.route ("/api")
def vaccination():
    session = Session(engine)
    retrieve_data = session.query ().all()

    session.close()
    #convert list of tuples into normal list
    retrieve_list = list(np.ravel(retrieve_data))
    #convert to json
    return jsonify (retrieve_list)





if __name__ == '__main__':
    app.run (debug=True)