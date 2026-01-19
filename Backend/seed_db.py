from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, auth
from datetime import date

def seed():
    # Only run if called directly
    db = SessionLocal()
    
    # Check if courses exist
    if db.query(models.Course).count() == 0:
        courses_data = [
            {
                "title": "Python for Data Science",
                "description": "Learn how to use Python for data analysis. This course covers libraries like Pandas, NumPy, and Matplotlib to help you visualize and interpret complex data.",
                "image": "/Coding.jpg",
                "instructor": "Prof. Gideon",
                "level": "Beginner",
                "price": 50,
                "category": "Data",
                "duration": "12 Hours"
            },
            {
                "title": "Full-stack Web Development",
                "description": "Master both frontend and backend development. You will build real-world projects using React, Node.js, Express, and MongoDB.",
                "image": "/Coding.jpg",
                "instructor": "Gabriel N.",
                "level": "Intermediate",
                "price": 89,
                "category": "Web",
                "duration": "40 Hours"
            },
            {
                "title": "UX Design Fundamentals",
                "description": "Dive into the world of User Experience. Learn how to conduct user research, create wireframes, and design high-fidelity prototypes using Figma.",
                "image": "/UIUx.jpg",
                "instructor": "Myles Daniel",
                "level": "Beginner",
                "price": 35,
                "category": "Design",
                "duration": "15 Hours"
            },
            {
                "title": "Machine Learning A-Z",
                "description": "Build powerful Machine Learning models. This course covers everything from Linear Regression to Neural Networks and Deep Learning.",
                "image": "/machine.jpg",
                "instructor": "Dr. Anietie",
                "level": "Advanced",
                "price": 150,
                "category": "Data",
                "duration": "30 Hours"
            },
            {
                "title": "Product Management Essentials",
                "description": "Learn how to manage the lifecycle of a product. Understand market research, product roadmaps, and how to work with engineering teams.",
                "image": "/marketing.jpg",
                "instructor": "prof. Dwight",
                "level": "Intermediate",
                "price": 89,
                "category": "Business",
                "duration": "20 Hours"
            },
            {
                "title": "React.js — From Zero",
                "description": "The most popular JavaScript library explained simply. Learn components, state management, and how to build fast, modern web applications.",
                "image": "/Coding.jpg",
                "instructor": "Prof. Deborah",
                "level": "Intermediate",
                "price": 100,
                "category": "Web",
                "duration": "25 Hours"
            },
            {
                "title": "Time Management Mastery",
                "description": "Stop procrastinating and start achieving. Learn proven techniques like the Pomodoro method and Eisenhower matrix to boost your productivity.",
                "image": "/Leadership.jpg",
                "instructor": "Dr. Becky",
                "level": "Beginner",
                "price": 35,
                "category": "Self Improvement",
                "duration": "5 Hours"
            },
            {
                "title": "Advanced SQL",
                "description": "Go beyond simple SELECT statements. Master complex joins, subqueries, and database optimization for large-scale data systems.",
                "image": "/sql.jpg",
                "instructor": "Prof. Darlington",
                "level": "Advanced",
                "price": 159,
                "category": "Data",
                "duration": "18 Hours"
            },
            {
                "title": "Financial Accounting",
                "description": "Understand the language of business. Learn how to read balance sheets, income statements, and manage corporate financial records.",
                "image": "/marketing.jpg",
                "instructor": "Prof Emmanuella",
                "level": "Beginner",
                "price": 50,
                "category": "Finance",
                "duration": "22 Hours"
            },
            {
                "title": "Digital Marketing Essentials",
                "description": "Grow your business online. Master SEO, Social Media Marketing, and Email campaigns to reach a global audience.",
                "image": "/marketing.jpg",
                "instructor": "Prof. Emmanuella",
                "level": "Intermediate",
                "price": 100,
                "category": "Marketing",
                "duration": "14 Hours"
            },
            {
                "title": "Human Resource Management",
                "description": "Learn how to build and lead great teams. This course covers recruitment, employee relations, and workplace culture development.",
                "image": "/Rights.jpg",
                "instructor": "Prof Ime",
                "level": "Intermediate",
                "price": 100,
                "category": "Business",
                "duration": "20 Hours"
            },
            {
                "title": "Database Management Systems",
                "description": "Learn the architecture of modern databases. Understand relational and non-relational systems and how to maintain data integrity.",
                "image": "/sql.jpg",
                "instructor": "Dr. Precious",
                "level": "Intermediate",
                "price": 100,
                "category": "Data",
                "duration": "24 Hours"
            },
            {
                "title": "Mathematics for Data Science",
                "description": "The math behind the code. Master Linear Algebra, Calculus, and Probability theories essential for high-level data analysis.",
                "image": "/mathsci.jpg",
                "instructor": "Prof. Patrick",
                "level": "Intermediate",
                "price": 100,
                "category": "Data",
                "duration": "30 Hours"
            },
            {
                "title": "Data Engineering",
                "description": "Build the pipelines that move data. Learn how to design ETL processes and manage big data infrastructures like Hadoop and Spark.",
                "image": "/Coding.jpg",
                "instructor": "Prof. David",
                "level": "Intermediate",
                "price": 100,
                "category": "Data",
                "duration": "28 Hours"
            },
            {
                "title": "Mobile App Development",
                "description": "Build apps for iOS and Android. Using React Native, you will learn to create high-performance mobile applications from a single codebase.",
                "image": "/Coding.jpg",
                "instructor": "Prof. Ihechi",
                "level": "Intermediate",
                "price": 100,
                "category": "Software",
                "duration": "35 Hours"
            },
            {
                "title": "Cloud Computing with AWS",
                "description": "Master the world's leading cloud platform. Learn to deploy, manage, and scale applications using Amazon Web Services (AWS).",
                "image": "/Coding.jpg",
                "instructor": "prof. Miracle",
                "level": "Advanced",
                "price": 189,
                "category": "Software",
                "duration": "25 Hours"
            },
            {
                "title": "Ethics in the Workplace",
                "description": "Understand the importance of professional integrity. Learn how to navigate ethical dilemmas and foster a culture of respect and honesty.",
                "image": "/Rights.jpg",
                "instructor": "Prof. Faith",
                "level": "Intermediate",
                "price": 100,
                "category": "Professional Studies",
                "duration": "10 Hours"
            }
        ]

        courses_db = [models.Course(**data) for data in courses_data]
        db.add_all(courses_db)
        print(f"Seeded {len(courses_db)} courses")
        
    # Create Admin User
    admin_email = "admin@learnflow.com"
    if not db.query(models.User).filter(models.User.email == admin_email).first():
        hashed_password = auth.pwd_context.hash("admin123")
        admin_user = models.User(
            full_name="Admin User",
            email=admin_email,
            password_hash=hashed_password,
            role="admin",
            streak=0,
            last_active_date=date.today()
        )
        db.add(admin_user)
        print("Admin user created: admin@learnflow.com / admin123")
        
    # Create Instructor User
    instructor_email = "instructor@learnflow.com"
    if not db.query(models.User).filter(models.User.email == instructor_email).first():
        hashed_password = auth.pwd_context.hash("instructor123")
        instructor_user = models.User(
            full_name="Prof. Gideon", # Matches one of the course instructors
            email=instructor_email,
            password_hash=hashed_password,
            role="instructor",
            streak=0,
            last_active_date=date.today()
        )
        db.add(instructor_user)
        print("Instructor user created: instructor@learnflow.com / instructor123")

    # Create test user
    test_user_email = "test@example.com"
    if not db.query(models.User).filter(models.User.email == test_user_email).first():
        hashed_password = auth.pwd_context.hash("password")
        user = models.User(
            full_name="Test Student",
            email=test_user_email,
            password_hash=hashed_password,
            streak=1,
            last_active_date=date.today()
        )
        db.add(user)
        print("Test user created: test@example.com / password")
        
    # TARGET SEEDING: "Darlington Daniel"
    target_name = "Darlington Daniel"
    target_user = db.query(models.User).filter(models.User.full_name == target_name).first()
    
    if not target_user:
        # If Darlington Daniel doesn't exist, check if we should rename Admin User
        # (Assuming the user is logged in as Admin but wants to be Darlington)
        admin_user = db.query(models.User).filter(models.User.email == "admin@learnflow.com").first()
        if admin_user:
            print(f"Renaming Admin User to {target_name}")
            admin_user.full_name = target_name
            target_user = admin_user
            db.commit()
    
    if target_user:
        print(f"Found target instructor: {target_user.full_name}")
        
        # 1. Assign 7 Specific Courses to Darlington Daniel
        # Select specific courses by title that match the instructor's expertise
        target_course_titles = [
            "Machine Learning A-Z",
            "Product Management Essentials",
            "Digital Marketing Essentials",
            "Python for Data Science",
            "Advanced SQL",
            "Full-stack Web Development",
            "UX Design Fundamentals"
        ]
        
        all_courses = db.query(models.Course).all()
        my_courses = [c for c in all_courses if c.title in target_course_titles]
        
        # Reset instructor assignment
        for course in all_courses:
            if course in my_courses:
                course.instructor = target_user.full_name
            elif course.instructor == target_user.full_name:
                 # Un-assign courses not in the target list
                 course.instructor = "Other Instructor"
        db.commit()
        
        print(f"Assigned {len(my_courses)} specific courses to {target_user.full_name}")

        # 2. Seed 50 students enrolled ONLY in these 7 courses
        instructor_courses = db.query(models.Course).filter(models.Course.instructor == target_user.full_name).all()
        
        if instructor_courses:
            import random
            first_names = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"]
            last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"]
            
            # Iterate through all 50 potential students
            for i in range(50):
                email = f"student{i}@example.com"
                
                # Check exist
                student_user = db.query(models.User).filter(models.User.email == email).first()
                
                if not student_user:
                    f_name = random.choice(first_names)
                    l_name = random.choice(last_names)
                    hashed_password = auth.pwd_context.hash("password")
                    student_user = models.User(
                        full_name=f"{f_name} {l_name}",
                        email=email,
                        password_hash=hashed_password,
                        role="student",
                        streak=random.randint(0, 15),
                        xp=0, # Will calc below
                        last_active_date=date.today()
                    )
                    db.add(student_user)
                    db.flush() 
                
                # Enroll in 1-3 of MY courses
                # Clear existing enrollments for this instructor to avoid duplicates/messy state?
                # For now, just append safely.
                
                courses_to_enroll = random.sample(instructor_courses, k=random.randint(1, 3))
                
                current_total_xp = 0
                
                for course in courses_to_enroll:
                     # Check exist
                     existing_enr = db.query(models.Enrollment).filter(models.Enrollment.user_id == student_user.id, models.Enrollment.course_id == course.id).first()
                     
                     if existing_enr:
                         # Update existing
                         progress = existing_enr.progress
                         # If we re-seed, maybe vary progress? Let's keep existing to be stable unless 0
                         if progress == 0: progress = random.randint(10, 90)
                         existing_enr.progress = progress
                     else:
                         # Create new
                         progress = random.randint(5, 100)
                         status = "active"
                         if progress == 100: status = "completed"
                         
                         existing_enr = models.Enrollment(
                                user_id=student_user.id,
                                course_id=course.id,
                                progress=progress,
                                status=status,
                                last_lesson="Introduction"
                            )
                         db.add(existing_enr)
                     
                     # Calculate XP based on Progress
                     # Formula: Progress * 150 + random bonus
                     course_xp = (existing_enr.progress * 150) + random.randint(0, 500)
                     current_total_xp += course_xp

                # Update Student XP to match the sum of their progress
                student_user.xp = current_total_xp
                
                # Update status name just in case (preservation)
                if not student_user.full_name:
                     f_name = random.choice(first_names)
                     l_name = random.choice(last_names)
                     student_user.full_name = f"{f_name} {l_name}"

            print(f"Seeded/Updated students for {target_name} with Correlation XP")
    else:
        print(f"Could not find or create user {target_name}")

    db.commit()
    db.close()

if __name__ == "__main__":
    # Ensure tables are created first
    models.Base.metadata.create_all(bind=engine)
    seed()
