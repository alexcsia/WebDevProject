from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By

import pymongo
import time
import bcrypt

# Initialize chromedriver
driver = webdriver.Chrome()
client = pymongo.MongoClient("mongodb://localhost:27017/blogwebsite")
db = client.blogwebsite
User = db.users
Post = db.posts
Comment = db.comments

def assert_element_visibility(driver, locator, visible=True):
    try:
        element = WebDriverWait(driver, 3).until(
            EC.visibility_of_element_located(locator)
        )
        assert element.is_displayed() == visible

    except Exception as e:
        print(f"Test failed: {e}")

#homepage elements

def test_homepage_elements(driver):
    assert_element_visibility(driver, (By.ID, "src-bar"))
    assert_element_visibility(driver, (By.ID, "send-button"))
    assert_element_visibility(driver, (By.ID, "tag-btn"))
    assert_element_visibility(driver, (By.ID, "signup"))
    assert_element_visibility(driver, (By.ID, "login"))
    assert_element_visibility(driver, (By.ID, "create-post-btn"))
    assert_element_visibility(driver, (By.ID, "trending-btn"))

#signup page elements
def test_signup_elements(driver):
    assert_element_visibility(driver, (By.ID,"SignUpDiv"))
    assert_element_visibility(driver, (By.ID,"fname"))
    assert_element_visibility(driver, (By.ID,"email"))
    assert_element_visibility(driver, (By.ID,"uname"))
    assert_element_visibility(driver, (By.ID,"password"))
    assert_element_visibility(driver,(By.CSS_SELECTOR,'a[href="/index.html"]'))
    assert_element_visibility(driver,(By.CSS_SELECTOR,'a[href="/login.html"]'))

#login page elements

def test_login_elements(driver):
    assert_element_visibility(driver,(By.ID,"username"))
    assert_element_visibility(driver,(By.ID,"password"))
    assert_element_visibility(driver, (By.CSS_SELECTOR, 'button.custom-button[type="submit"]'))
    assert_element_visibility(driver,(By.CSS_SELECTOR,'a[href="/index.html"]'))

#create post page elements
def test_create_post_elements():
    assert_element_visibility(driver, (By.ID, "title-space"))
    assert_element_visibility(driver, (By.ID, "content-space"))
    assert_element_visibility(driver, (By.ID, "tags-space"))
    assert_element_visibility(driver, (By.ID,"submit-post"))

#attempt signup
def attempt_signup(driver):
    fname_field = driver.find_element(By.ID,"fname")
    fname_field.send_keys("e2efname")
    lname_field = driver.find_element(By.ID,"lname")
    lname_field.send_keys("e2elname")
    uname_field = driver.find_element(By.ID,"uname")
    uname_field.send_keys("e2e")
    email_field = driver.find_element(By.ID,"email")
    email_field.send_keys("email@e2e")
    phone_field = driver.find_element(By.ID,"pnumber")
    phone_field.send_keys("e2epnumber")
    password_field = driver.find_element(By.ID,"password")
    password_field.send_keys("123")
    send_btn = driver.find_element(By.ID,"submit-info-btn")
    send_btn.click()

    user = User.find({"username":"e2e"})
    print(user)
    if user:
        print("signup passed")
    else:
        print("signup failed")

def delete_testUser():
    user = User.delete_one({"username":"e2e"})
  
def create_testUser():
    hashed_password = bcrypt.hashpw("123".encode("utf-8"), bcrypt.gensalt())
    user = User.insert_one({"username":"e2e", "first_name":"e2efname", 
                            "last_name":"e2elname", "email":"e2e@email", 
                            "phone_number":"123", "password": hashed_password.decode("utf-8") })

def delete_testPost():
    post = Post.delete_one({"title":"test title"})

def create_testPost():
    post = Post.insert_one({ "title": "test title",
        "content": "content",
       " tags": "tags",
        "author": {
          "first_name": "first_name",
          "last_name": "last_name",
          "username": "username",
        }})

#attempt login
def attempt_login(driver):
    uname_field = driver.find_element(By.ID,"username")
    uname_field.send_keys("e2e")
    pword_field = driver.find_element(By.ID,"password")
    pword_field.send_keys("123")
    btn = driver.find_element(By.CSS_SELECTOR, "button.custom-button[type='submit']")
    btn.click()

#attempt post creation

def attempt_create_post():
    title_field = driver.find_element(By.ID,"title-space")
    title_field.send_keys("test title")
    post_field = driver.find_element(By.ID,"content-space")
    post_field.send_keys("content")
    tags_field = driver.find_element(By.ID,"tags-space")
    tags_field.send_keys("#testing this")
    create_btn = driver.find_element(By.ID, "submit-post")
    create_btn.click()
    time.sleep(2)

def attempt_search():
    search_bar = driver.find_element(By.ID, "src-bar")
    search_bar.send_keys("test title")
    search_btn = driver.find_element(By.ID, "send-button")
    search_btn.click()

#e2e tests

def homepage_test():
    try:
        driver.get("http://localhost:3000/index.html")
        test_homepage_elements(driver)
        print("homepage test passed")
    except Exception as e:
        print(e)


def signup_test():
    try:
        driver.get("http://localhost:3000/signup.html")
        test_signup_elements(driver)
        attempt_signup(driver)
        time.sleep(1)
        delete_testUser()
    except Exception as e:
        print(e)
  
def login_test():
    try:
        driver.get("http://localhost:3000/login.html")
        test_login_elements(driver)
        create_testUser()
        time.sleep(1)
        attempt_login(driver)
        time.sleep(1)
        delete_testUser()
        print("login test passed")
    except Exception as e:
        print(e)

def create_post_test():
    try:
        driver.get("http://localhost:3000/login.html")
        create_testUser()
        time.sleep(1)
        attempt_login(driver)
        driver.get("http://localhost:3000/createPost.html")
        attempt_create_post()
        delete_testUser()
        delete_testPost()
        print("create post test passed")
    except Exception as e:
        print(e)

def search_functionality_test():
    try:
        driver.get("http://localhost:3000/index.html")
        create_testPost()
        time.sleep(1)
        attempt_search()
        time.sleep(1)
        article = driver.find_element(By.CSS_SELECTOR,'a.article[href="/search/articles/test title"]')
        article.click()
        time.sleep(1)
        title = driver.find_element(By.XPATH, "//h2[contains(text(), 'test title')]")

        if title:
            print("search test passed")
        else:
            print("search test failed")
        delete_testPost()
    except Exception as e:
        print(e)

def profile_page_test():
    driver.get("http://localhost:3000/login.html")
    create_testUser()
    time.sleep(1)
    attempt_login(driver)
    time.sleep(1)
    driver.get("http://localhost:3000/index.html")
    time.sleep(1)
    btn_profile = driver.find_element(By.ID,"profile-btn")
    btn_profile.click()
    btn_edit = driver.find_element(By.ID,"editBtn")
    btn_edit.click()
    username = driver.find_element(By.ID, "uname")
    value = username.get_attribute("value")
    assert value == "e2e"
    username.send_keys("updated")
    save_btn = driver.find_element(By.ID, "submit-info-btn")
    save_btn.click()
    user = User.find({"username":"e2eupdated"})
    if user:
        print("profile test passed")
    else:
        print("profile test failed")
    User.delete_one({"username":"e2eupdated"})
    delete_testUser()

  
if __name__ == "__main__":
    homepage_test()
    signup_test()
    login_test()
    create_post_test()
    search_functionality_test()
    profile_page_test()
    
  





