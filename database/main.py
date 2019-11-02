import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy import Table, Column, Integer, String, MetaData, ForeignKey
from sqlalchemy import inspect
import psycopg2
import pandas as pd

db_name, ip, user_name, password, table_name = 'usaspending', '66.44.98.24:5432','postgres', 'welcome', '2014.1:1'

print('Connecting to Postgresql...\n')
engine = create_engine('postgresql+psycopg2://{}:{}@{}/{}'.format(user_name,password,ip,db_name)) #create connection to db
print("Connect!")

inspector = inspect(engine)
output = inspector.get_columns(table_name)

print(output)
