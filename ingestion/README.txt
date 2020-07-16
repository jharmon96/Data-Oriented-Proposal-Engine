This document explains how to upload USA Spending csv files to the PostgreSQL database

Go to usaspending.gov
Go to 'Download Center'
Select 'Award Data Archive'
Filter by 'Agency' = DEPARTMENT OF DEFENSE
Filter by 'Fiscal Year' = 2014-2017
Export CSV files to specified location

Note most years require four CSV files as exports are capped at one million records

Read in each CSV to the PostgreSQL database using Upload_DF_to_Postgres.ipynb
Rename the individual data tables in the database using the nomenclature: Year_File#
    For example, the first 1M records for 2014 should be labeled "2014_1"