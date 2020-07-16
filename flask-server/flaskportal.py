from flask import Flask, render_template, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
import metrics

app = Flask(__name__, template_folder='templates')

# Set database parameters
db_name, ip, user_name, password = 'usaspending', 'dopelytics.site:5432','team', 'ZAQ!@#zaq123'

# Connect to database
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI']='postgresql+psycopg2://{}:{}@{}/{}'.format(user_name,password,ip,db_name)
SQLALCHEMY_TRACK_MODIFICATIONS = False
db = SQLAlchemy(app)
test1 = {}

# Create model to test on (table schema)
class test(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    contract_value = db.Column(db.String(50), unique=False, nullable=True)
    portfolio_group = db.Column(db.String(50), unique=False, nullable=True)
    set_aside = db.Column(db.String(50), unique=False, nullable=True)
    
# Using the real table
class consolidated_data2(db.Model):
    contract_transaction_unique_key = db.Column(db.String(50), primary_key=True)
    awarding_sub_agency_name = db.Column(db.String(50), unique=False, nullable=True)
    awarding_office_name = db.Column(db.String(50), unique=False, nullable=True)
    product_or_service_code_description = db.Column(db.String(50), unique=False, nullable=True)
    base_and_exercised_options_value = db.Column(db.String(50), unique=False, nullable=True)
    type_of_set_aside_code = db.Column(db.String(50), unique=False, nullable=True)



@app.route("/")
def home():
    return render_template("home.html")

@app.route("/about")
def about():
    return render_template("about.html")

# On input request query db and return an array of psc codes and set asides. Used to generate dropdowns.
# On POST request query the DB using the selected options and return the top 10 contracts by contract value. 
@app.route("/input", methods=['GET', 'POST'])
def input():
    contracts = ''
    psc_codes = db.session.query(consolidated_data2.product_or_service_code_description).order_by(consolidated_data2.product_or_service_code_description).distinct()
    set_asides = db.session.query(consolidated_data2.type_of_set_aside_code).order_by(consolidated_data2.type_of_set_aside_code).distinct()

# Precision, Recall, F1

    # Return contracts if on post request
    if request.method == "POST":
        queryString = request.form.get('set_aside')
        psc_filter = request.form['psc_code']
        
        AccuracyScore = metrics.Accuracy(queryString)
        PrecisionScore = metrics.Precision(queryString)
        RecallScore = metrics.Recall(queryString)
        F1Score = metrics.F1(queryString)

        if psc_filter == "All":
            contracts = consolidated_data2.query.filter_by(type_of_set_aside_code=queryString).order_by(consolidated_data2.base_and_exercised_options_value.desc()).limit(10)
        else:
            contracts = consolidated_data2.query.filter_by(type_of_set_aside_code=queryString, product_or_service_code_description=psc_filter).order_by(consolidated_data2.base_and_exercised_options_value.desc()).limit(10)

        # Log the set aside, psc code, and the query to the server. 
        print(queryString + " : " + psc_filter)
        print("return value: "+ str(contracts))
        return render_template("input.html", accuracy="90.27", psc_codes=psc_codes, contracts=contracts, set_asides=set_asides,
                              AccuracyScore=AccuracyScore, PrecisionScore=PrecisionScore, RecallScore=RecallScore,
                               F1Score=F1Score, set_aside=queryString, psc_filter=psc_filter)
    
    # If not a post request, just load the input page. 
    else:
        return render_template("input.html", psc_codes=psc_codes, contracts='', set_asides=set_asides,
                              AccuracyScore=0, PrecisionScore=0, RecallScore=0, F1Score=0, set_aside="None", psc_filter="All")

@app.route("/charts")
def charts():
    return render_template("charts.html")

@app.route("/handleData", methods=['POST'])
def handleData():
    queryString = request.form['contractType']
    contracts = test.query.filter_by(portfolio_group=queryString).all()
    return render_template("running.html", contracts=contracts, submitted="True")
    
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port='8090', threaded=True)