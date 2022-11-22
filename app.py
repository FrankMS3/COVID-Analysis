#setup dependencies
import numpy as np
import datetime as dt

import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify
from config import username, password


#Database setup:
protocol = 'postgresql'

host = 'localhost'
port = 5432
database_name = 'covid_db'
rds_connection_string = f'{protocol}://postgres:{password}@{host}:{port}/{database_name}'
engine = create_engine(rds_connection_string)
conn = engine.connect()
#reflect an existing database into a new model
Base = automap_base()
#reflect the tables
Base.prepare(engine, reflect=True)

#Saving reference to the table (What are our references?)
#measurement = Base.classes.measurement

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
    #retrieve_data = session.query().all()
    retrieve_vic = pd.read_sql_query("SELECT * FROM vic", conn)
    retrieve_nsw = pd.read_sql_query("SELECT * FROM nsw", conn)
    retrieve_tas = pd.read_sql_query("SELECT * FROM tas", conn)
    retrieve_wa = pd.read_sql_query("SELECT * FROM wa", conn)
    retrieve_qld = pd.read_sql_query("SELECT * FROM qld", conn)
    retrieve_nt = pd.read_sql_query("SELECT * FROM nt", conn)
    retrieve_sa = pd.read_sql_query("SELECT * FROM sa", conn)
    retrieve_act = pd.read_sql_query("SELECT * FROM act", conn)
    #convert list of tuples into normal list
    vic_list = list(np.ravel(retrieve_vic))
    nsw_list = list(np.ravel(retrieve_nsw))
    tas_list = list(np.ravel(retrieve_tas))
    wa_list = list(np.ravel(retrieve_wa))
    qld_list = list(np.ravel(retrieve_qld))
    nt_list = list(np.ravel(retrieve_nt))
    sa_list = list(np.ravel(retrieve_sa))
    act_list = list(np.ravel(retrieve_act))
    #convert to json
    vic_data = jsonify(vic_list)
    nsw_data = jsonify(nsw_list)
    tas_data = jsonify(tas_list)
    wa_data = jsonify(wa_list)
    qld_data = jsonify(qld_list)
    nt_data = jsonify(nt_list)
    sa_data = jsonify(sa_list)
    act_data = jsonify(act_list)
    session.close()
    return jsonify(vic_list)
    





if __name__ == '__main__':
    app.run (debug=True)