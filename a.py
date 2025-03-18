"""
How to fetch the Twitter data free using the scrpaing..


imp module used is twikit.  // used to scrape the twitter data..


"""


from twikit import Client,TooManyRequests 

import time,csv
from datetime import datetime
from configparser import ConfigParser
from random import randint
import asyncio

async def main():
        
    MINIMUM_TWEETS=10
    QUERY="fetch latest tweets"


    config = ConfigParser()
    config.read('config.ini')  # Fetching the credentials from the config file...
    username=config['X']['username']
    password=config['X']['password']
    email=config['X']['email']

    print("username: " + username + " password: " + password)

    # Authentication: 1) Use Login Credentials and generate cookies. 2) next onwards use cookies to access to website and get the data...

    client=Client(language='en-US')  # Connecting to the client

    # await client.login(auth_info_1=username, auth_info_2=email, password=password)
    # #client.login(auth_info_1=username,auth_info_2=email,password=password)

    # client.save_cookies('cookies.json')
    client.load_cookies('cookies.json')  # Use pre-saved cookies

    # Perform actions like searching tweets
    tweets = client.search_tweet(QUERY,product='Top')
    print("tweets",tweets)
    for tweet in tweets:
        print(vars(tweet))
        break


asyncio.run(main())


