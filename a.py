"""
How to fetch the Twitter data free.

imp module used is twikit.

"""


from twikit import Client,TooManyRequests

import time,csv
from datetime import datetime
from configparser import ConfigParser
from random import randint

MINIMUM_TWEETS=100
QUERY="fetch latest tweets"


config = ConfigParser()
config.read('config.ini')
username=config['X']['username']
password=config['X']['password']
email=config['X']['email']


print("username: " + username + " password: " + password)