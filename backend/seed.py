# Seed database with example data
from sqlalchemy.orm import Session
from database import SessionLocal, init_db
from models import User, Post, Comment, Like, Follower
from auth import hash_password

def seed_database():
    init_db()
    db = SessionLocal()
    
    db.query(Follower).delete()
    db.query(Like).delete()
    db.query(Comment).delete()
    db.query(Post).delete()
    db.query(User).delete()
    db.commit()
    
    # Create 15 users
    users_data = [
        {"username": "alice_dev", "email": "alice@example.com", "password": "password123", "bio": "Full-stack developer | Python & React enthusiast", "profile_pic": "https://i.pravatar.cc/150?img=1"},
        {"username": "bob_coder", "email": "bob@example.com", "password": "password123", "bio": "Backend engineer | Love building APIs", "profile_pic": "https://i.pravatar.cc/150?img=2"},
        {"username": "charlie_tech", "email": "charlie@example.com", "password": "password123", "bio": "DevOps | Cloud architecture", "profile_pic": "https://i.pravatar.cc/150?img=3"},
        {"username": "diana_js", "email": "diana@example.com", "password": "password123", "bio": "Frontend developer | JavaScript ninja", "profile_pic": "https://i.pravatar.cc/150?img=4"},
        {"username": "eve_data", "email": "eve@example.com", "password": "password123", "bio": "Data Scientist | ML enthusiast", "profile_pic": "https://i.pravatar.cc/150?img=5"},
        {"username": "frank_mobile", "email": "frank@example.com", "password": "password123", "bio": "Mobile dev | Flutter & React Native", "profile_pic": "https://i.pravatar.cc/150?img=6"},
        {"username": "grace_ui", "email": "grace@example.com", "password": "password123", "bio": "UI/UX Designer | Making apps beautiful", "profile_pic": "https://i.pravatar.cc/150?img=7"},
        {"username": "henry_security", "email": "henry@example.com", "password": "password123", "bio": "Security researcher | Ethical hacker", "profile_pic": "https://i.pravatar.cc/150?img=8"},
        {"username": "iris_ai", "email": "iris@example.com", "password": "password123", "bio": "AI researcher | Deep learning", "profile_pic": "https://i.pravatar.cc/150?img=9"},
        {"username": "jack_blockchain", "email": "jack@example.com", "password": "password123", "bio": "Blockchain developer | Web3 builder", "profile_pic": "https://i.pravatar.cc/150?img=10"},
        {"username": "kate_product", "email": "kate@example.com", "password": "password123", "bio": "Product Manager | Tech strategy", "profile_pic": "https://i.pravatar.cc/150?img=11"},
        {"username": "leo_game", "email": "leo@example.com", "password": "password123", "bio": "Game developer | Unity & Unreal", "profile_pic": "https://i.pravatar.cc/150?img=12"},
        {"username": "mia_cloud", "email": "mia@example.com", "password": "password123", "bio": "Cloud architect | AWS certified", "profile_pic": "https://i.pravatar.cc/150?img=13"},
        {"username": "noah_startup", "email": "noah@example.com", "password": "password123", "bio": "Startup founder | Building the future", "profile_pic": "https://i.pravatar.cc/150?img=14"},
        {"username": "olivia_qa", "email": "olivia@example.com", "password": "password123", "bio": "QA Engineer | Breaking things professionally", "profile_pic": "https://i.pravatar.cc/150?img=15"},
    ]
    
    users = []
    for user_data in users_data:
        user = User(
            username=user_data["username"],
            email=user_data["email"],
            password=hash_password(user_data["password"]),
            bio=user_data["bio"],
            profile_pic=user_data["profile_pic"],
            security_question="What is your favorite color?",
            security_answer="blue"
        )
        db.add(user)
        users.append(user)
    
    db.commit()
    
    # Create 30+ posts
    posts_data = [
        {"user_idx": 0, "content": "Just deployed my first FastAPI app! The performance is incredible 🚀 #FastAPI #Python"},
        {"user_idx": 0, "content": "React hooks have completely changed how I write components. useEffect is a game changer!"},
        {"user_idx": 1, "content": "Debugging a race condition in production... wish me luck 😅 #DevLife"},
        {"user_idx": 1, "content": "SQLAlchemy ORM makes database operations so much cleaner. Highly recommend!"},
        {"user_idx": 2, "content": "Setting up CI/CD pipeline with GitHub Actions. Automation is beautiful! #DevOps"},
        {"user_idx": 2, "content": "Docker containers have saved me so many times. 'Works on my machine' is no longer an excuse 🐳"},
        {"user_idx": 3, "content": "TailwindCSS is the best thing that happened to CSS. Change my mind! 💅"},
        {"user_idx": 3, "content": "Just learned about Web Workers. Parallel processing in the browser is amazing!"},
        {"user_idx": 4, "content": "Training a neural network to recognize cat breeds. 95% accuracy so far! 🐱"},
        {"user_idx": 4, "content": "Pandas + NumPy = Data science magic ✨"},
        {"user_idx": 5, "content": "Flutter's hot reload is a game changer for mobile development!"},
        {"user_idx": 5, "content": "Cross-platform development has never been easier. React Native FTW!"},
        {"user_idx": 6, "content": "Figma is revolutionizing how designers and developers collaborate 🎨"},
        {"user_idx": 6, "content": "Dark mode isn't just a trend, it's a necessity for modern apps"},
        {"user_idx": 7, "content": "Found a critical XSS vulnerability today. Always sanitize your inputs! 🔒"},
        {"user_idx": 7, "content": "Two-factor authentication should be mandatory for all apps in 2024"},
        {"user_idx": 8, "content": "GPT-4 is mind-blowing. The future of AI is here! 🤖"},
        {"user_idx": 8, "content": "Working on a computer vision project. OpenCV is incredibly powerful!"},
        {"user_idx": 9, "content": "Smart contracts are changing how we think about trust in applications"},
        {"user_idx": 9, "content": "Ethereum gas fees are still too high. Layer 2 solutions can't come soon enough!"},
        {"user_idx": 10, "content": "Product-market fit is everything. Build what users actually need!"},
        {"user_idx": 10, "content": "User feedback is gold. Always listen to your customers 💎"},
        {"user_idx": 11, "content": "Unity's new rendering pipeline is a massive improvement for game graphics"},
        {"user_idx": 11, "content": "Indie game development is tough but so rewarding! 🎮"},
        {"user_idx": 12, "content": "Kubernetes orchestration makes scaling apps so much easier"},
        {"user_idx": 12, "content": "AWS Lambda + API Gateway = Serverless heaven ☁️"},
        {"user_idx": 13, "content": "Launched our MVP today! Excited to see user feedback 🚀"},
        {"user_idx": 13, "content": "Startup life: 20% coding, 80% talking to customers"},
        {"user_idx": 14, "content": "Found 15 bugs before production. QA saves the day again! 🐛"},
        {"user_idx": 14, "content": "Automated testing is not optional. It's essential for quality software"},
    ]
    
    posts = []
    for post_data in posts_data:
        post = Post(
            user_id=users[post_data["user_idx"]].id,
            content=post_data["content"]
        )
        db.add(post)
        posts.append(post)
    
    db.commit()
    
    # Create comments
    comments_data = [
        {"user_idx": 1, "post_idx": 0, "content": "FastAPI is awesome! What hosting service did you use?"},
        {"user_idx": 2, "post_idx": 0, "content": "Congrats! FastAPI + Docker is my go-to stack"},
        {"user_idx": 3, "post_idx": 1, "content": "useState and useEffect are essential. Have you tried useReducer?"},
        {"user_idx": 0, "post_idx": 3, "content": "Totally agree! The relationship system is so intuitive"},
        {"user_idx": 1, "post_idx": 6, "content": "Tailwind is great but the bundle size can get large. Tree-shaking helps!"},
        {"user_idx": 5, "post_idx": 8, "content": "That's impressive! What dataset are you using?"},
        {"user_idx": 7, "post_idx": 14, "content": "Security first! Thanks for sharing"},
        {"user_idx": 9, "post_idx": 16, "content": "Have you tried the new GPT-4 Turbo? Even better!"},
    ]
    
    for comment_data in comments_data:
        comment = Comment(
            user_id=users[comment_data["user_idx"]].id,
            post_id=posts[comment_data["post_idx"]].id,
            content=comment_data["content"]
        )
        db.add(comment)
    
    db.commit()
    
    # Create likes
    likes_data = [
        {"user_idx": 1, "post_idx": 0}, {"user_idx": 2, "post_idx": 0}, {"user_idx": 3, "post_idx": 0},
        {"user_idx": 0, "post_idx": 2}, {"user_idx": 2, "post_idx": 2},
        {"user_idx": 0, "post_idx": 4}, {"user_idx": 1, "post_idx": 4},
        {"user_idx": 0, "post_idx": 6}, {"user_idx": 1, "post_idx": 6}, {"user_idx": 2, "post_idx": 6},
        {"user_idx": 4, "post_idx": 8}, {"user_idx": 5, "post_idx": 8},
        {"user_idx": 6, "post_idx": 12}, {"user_idx": 7, "post_idx": 12},
        {"user_idx": 8, "post_idx": 16}, {"user_idx": 9, "post_idx": 16},
    ]
    
    for like_data in likes_data:
        like = Like(
            user_id=users[like_data["user_idx"]].id,
            post_id=posts[like_data["post_idx"]].id
        )
        db.add(like)
    
    db.commit()
    
    # Create follow relationships
    follows_data = [
        {"follower_idx": 0, "followed_idx": 1}, {"follower_idx": 0, "followed_idx": 2}, {"follower_idx": 0, "followed_idx": 3},
        {"follower_idx": 1, "followed_idx": 0}, {"follower_idx": 1, "followed_idx": 2},
        {"follower_idx": 2, "followed_idx": 0}, {"follower_idx": 2, "followed_idx": 1},
        {"follower_idx": 3, "followed_idx": 0}, {"follower_idx": 4, "followed_idx": 0},
        {"follower_idx": 5, "followed_idx": 1}, {"follower_idx": 6, "followed_idx": 2},
        {"follower_idx": 7, "followed_idx": 3}, {"follower_idx": 8, "followed_idx": 4},
    ]
    
    for follow_data in follows_data:
        follow = Follower(
            follower_id=users[follow_data["follower_idx"]].id,
            followed_id=users[follow_data["followed_idx"]].id
        )
        db.add(follow)
    
    db.commit()
    db.close()
    
    print("✅ Database seeded successfully with 15 users and 30+ posts!")
    print("\nTest accounts:")
    for user_data in users_data[:4]:
        print(f"Email: {user_data['email']} | Password: password123")

if __name__ == "__main__":
    seed_database()
