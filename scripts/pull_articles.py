import json
import requests
import constants as C
import logging
from xml.dom.minidom import parseString
from bs4 import BeautifulSoup
import datetime

logging.getLogger().setLevel(logging.INFO)
logging.basicConfig(level=logging.INFO)

def get_dev_articles():
    articles = []
    req = requests.get(C.DEV_API_URL.format(C.DEV_USERNAME))
    reqJson = req.json()
    for article in reqJson:
        _article = {
            "blog_website": 0,
            "img_url": article["cover_image"],
            "title": article["title"],
            "url": article["url"],
            "description": article["description"],
            "tags": article["tag_list"],
            "date": article["published_at"],
        }

        articles.append(_article)
    logging.info("Pulling DEV Articles done!!")
    return articles


def get_medium_articles():
    articles = []
    res = requests.get(C.MEDIUM_API_URL.format(C.MEDIUM_USERNAME))
    doc = parseString(res.text)
    for item in doc.getElementsByTagName("item"):
        _categories = []
        _content = item.getElementsByTagName(
            "content:encoded")[0].firstChild.nodeValue
        _doc_content = BeautifulSoup(_content, "html.parser")
        _img_url = _doc_content.select_one("img").attrs["src"]
        _description = _doc_content.select_one("p").text
        for category in item.getElementsByTagName("category"):
            _categories.append(category.firstChild.data)
        _date = datetime.datetime.strptime(
            item.getElementsByTagName("pubDate")[0].firstChild.data,
            "%a, %d %b %Y %H:%M:%S %Z").isoformat()
        _article = {
            "blog_website": 1,
            "img_url": _img_url,
            "title": item.getElementsByTagName("title")[0].firstChild.data,
            "url": item.getElementsByTagName("link")[0].firstChild.data,
            "description": _description,
            "tags": _categories,
            "date": _date,
        }
        articles.append(_article)
    logging.info("Pulling Medium Articles done!!")
    return articles


def pull_articles():
    articles = get_medium_articles()
    articles.extend(get_dev_articles())
    blogs_content = {
        "blog_websites": [{
            "title": "DEV Community",
            "website": "https://dev.to/",
            "url": "https://dev.to/shivishbrahma",
            "icon": "https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
        }, {
            "title": "Medium",
            "website": "https://medium.com/",
            "url": "https://shivishbrahma.medium.com/",
            "icon": "https://miro.medium.com/fit/c/152/152/1*sHhtYhaCe2Uc3IU0IgKwIQ.png"
        },{
            "title": "Github",
            "website": "https://github.io/",
            "url": "https://shivishbrahma.github.io/publog/",
            "icon": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        }],
        "blogs":
        articles
    }
    logging.info("Pulling Articles done!!")
    with open("public/data/blogs.json", "w") as f:
        json.dump(blogs_content, f, indent=4)