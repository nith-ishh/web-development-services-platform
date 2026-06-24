from ai_proposal import generate_proposal
from pdf_generator import generate_pdf
from flask import send_file
from flask import send_from_directory
import sqlite3
from flask import Flask, request
import os
from werkzeug.utils import secure_filename

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = "uploads"

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

CORS(app)

@app.route("/")
def home():
    return {
        "message": "Backend Running Successfully"
    }

@app.route("/api/test")
def test():
    return {
        "status": "success",
        "message": "React and Flask Connected"
    }
@app.route("/api/register", methods=["POST"])
def register():

    data = request.json

    conn = sqlite3.connect("users.db")

    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO users(name,email,password) VALUES(?,?,?)",
        (
            data["name"],
            data["email"],
            data["password"]
        )
    )

    conn.commit()

    conn.close()

    return {
        "status": "success",
        "message": "User Registered Successfully"
    }

@app.route("/api/users")
def get_users():

    conn = sqlite3.connect("users.db")

    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users")

    users = cursor.fetchall()

    conn.close()

    return {
        "users": users
    }

@app.route("/api/login", methods=["POST"])
def login():

    data = request.json

    conn = sqlite3.connect("users.db")

    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE email=? AND password=?",
        (
            data["email"],
            data["password"]
        )
    )

    user = cursor.fetchone()

    conn.close()

    if user:
        return {
            "status": "success",
            "message": "Login Successful"
        }

    return {
        "status": "failed",
        "message": "Invalid Email or Password"
    }

@app.route("/api/project", methods=["POST"])
def add_project():

    data = request.json

    conn = sqlite3.connect("users.db")

    cursor = conn.cursor()

    cursor.execute(
    """
    INSERT INTO projects
    (
        client_name,
        email,
        project_type,
        budget,
        description,
        file_name
    )

    VALUES (?, ?, ?, ?, ?, ?)
    """,
    (
        data["client_name"],
        data["email"],
        data["project_type"],
        data["budget"],
        data["description"],
        data["file_name"]
    )
)

    conn.commit()

    conn.close()

    return {
        "status": "success",
        "message": "Project Request Submitted"
    }

@app.route("/api/projects")
def get_projects():

    conn = sqlite3.connect("users.db")

    cursor = conn.cursor()

    cursor.execute("SELECT * FROM projects")

    projects = cursor.fetchall()

    conn.close()

    return {
        "projects": projects
    }

@app.route("/api/update-status/<int:id>", methods=["PUT"])
def update_status(id):

    conn = sqlite3.connect("users.db")

    cursor = conn.cursor()

    cursor.execute(
        "UPDATE projects SET status='Completed' WHERE id=?",
        (id,)
    )

    conn.commit()

    conn.close()

    return {
        "status": "success",
        "message": "Project Status Updated"
    }

@app.route("/api/client-projects/<email>")
def client_projects(email):

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM assigned_projects
        WHERE freelancer_email=?
        ORDER BY id DESC
    """, (email,))

    projects = cursor.fetchall()

    conn.close()

    return {
        "projects": projects
    }

@app.route("/api/delete-user/<int:id>", methods=["DELETE"])
def delete_user(id):

    conn = sqlite3.connect("users.db")

    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM users WHERE id=?",
        (id,)
    )

    conn.commit()

    conn.close()

    return {
        "status": "success",
        "message": "User Deleted Successfully"
    }

@app.route("/api/upload", methods=["POST"])
def upload_file():

    print("UPLOAD API CALLED")

    if "file" not in request.files:
        return {
            "status": "failed",
            "message": "No file selected"
        }

    file = request.files["file"]

    filename = secure_filename(file.filename)

    file.save(
        os.path.join(
            app.config["UPLOAD_FOLDER"],
            filename
        )
    )

    return {
        "status": "success",
        "message": "File Uploaded Successfully",
        "filename": filename
    }

@app.route("/api/files")
def get_files():

    files = os.listdir(app.config["UPLOAD_FOLDER"])

    return {
        "files": files
    }

@app.route("/api/download/<filename>")
def download_file(filename):

    return send_from_directory(
        app.config["UPLOAD_FOLDER"],
        filename,
        as_attachment=True
    )

@app.route("/api/estimate", methods=["POST"])
def estimate():

    data = request.json

    cost = 0

    # Website Type

    if data["website_type"] == "Portfolio":
        cost += 10000

    elif data["website_type"] == "Business":
        cost += 25000

    elif data["website_type"] == "E-commerce":
        cost += 50000

    # Number of Pages

    cost += int(data["pages"]) * 2000

    # Login System

    if data["login"]:
        cost += 10000

    # Payment Gateway

    if data["payment"]:
        cost += 15000

    # AI Chatbot

    if data["chatbot"]:
        cost += 20000

    # Development Time

    days = cost // 3000

    return {
        "estimated_cost": cost,
        "estimated_days": days
    }

@app.route("/api/generate-pdf", methods=["POST"])
def generate_quotation():

    data = request.json

    generate_pdf(
        data["client_name"],
        data["website_type"],
        data["pages"],
        data["cost"],
        data["days"]
    )

    return send_file(
        "quotation.pdf",
        as_attachment=True
    )

@app.route("/api/analytics")
def analytics():

    conn = sqlite3.connect("users.db")

    cursor = conn.cursor()

    # Total Users

    cursor.execute("SELECT COUNT(*) FROM users")

    total_users = cursor.fetchone()[0]

    # Total Projects

    cursor.execute("SELECT COUNT(*) FROM projects")

    total_projects = cursor.fetchone()[0]

    # Completed Projects

    cursor.execute(
        "SELECT COUNT(*) FROM projects WHERE status='Completed'"
    )

    completed = cursor.fetchone()[0]

    # Pending Projects

    cursor.execute(
        "SELECT COUNT(*) FROM projects WHERE status='Pending'"
    )

    pending = cursor.fetchone()[0]

    conn.close()

    return {
        "total_users": total_users,
        "total_projects": total_projects,
        "completed_projects": completed,
        "pending_projects": pending
    }




@app.route("/api/update-stage/<int:id>/<stage>", methods=["GET"])
def update_stage(id, stage):

    progress = 0
    status = "Pending"

    if stage == "requirement":
        progress = 20
        status = "Requirement"

    elif stage == "ui":
        progress = 40
        status = "UI Design"

    elif stage == "development":
        progress = 60
        status = "Development"

    elif stage == "testing":
        progress = 80
        status = "Testing"

    elif stage == "completed":
        progress = 100
        status = "Completed"

    conn = sqlite3.connect("users.db")

    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE projects
        SET status=?,
            progress=?
        WHERE id=?
        """,
        (
            status,
            progress,
            id
        )
    )

    conn.commit()

    conn.close()

    return {
        "status": "success",
        "message": "Stage Updated"
    }

@app.route("/api/add-notification", methods=["POST"])
def add_notification():

    data = request.json

    conn = sqlite3.connect("users.db")

    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO notifications(email, message)
        VALUES(?, ?)
        """,
        (
            data["email"],
            data["message"]
        )
    )

    conn.commit()

    conn.close()

    return {
        "status": "success",
        "message": "Notification Added"
    }

@app.route("/api/notifications/<email>", methods=["GET"])
def get_notifications(email):

    conn = sqlite3.connect("users.db")

    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT id, message
        FROM notifications
        WHERE email=?
        AND is_read=0
        ORDER BY id DESC
        """,
        (email,)
    )

    notifications = cursor.fetchall()

    # cursor.execute(
#     """
#     UPDATE notifications
#     SET is_read=1
#     WHERE email=?
#     """,
#     (email,)
# )

# conn.commit()

    conn.close()

    return {
        "notifications": notifications
    }

@app.route("/api/mark-notification-read/<int:id>")
def mark_notification_read(id):

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE notifications
        SET is_read=1
        WHERE id=?
        """,
        (id,)
    )

    conn.commit()
    conn.close()

    return {
        "status": "success"
    }

@app.route("/api/messages/<email>", methods=["GET"])
def get_messages(email):

    conn = sqlite3.connect("users.db")

    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT sender, message
        FROM chats
        WHERE sender=? OR receiver=?
        ORDER BY id ASC
        """,
        (email, email)
    )

    messages = cursor.fetchall()

    conn.close()

    return {
        "messages": messages
    }

    

@app.route("/api/send-message", methods=["POST", "OPTIONS"])
def send_message():

    if request.method == "OPTIONS":
        return {"status": "ok"}

    data = request.json

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO chats(sender, receiver, message)
        VALUES(?, ?, ?)
        """,
        (
            data["sender"],
            data["receiver"],
            data["message"]
        )
    )

    sender = data["sender"]
    receiver = data["receiver"]

    if sender == "nithish@gmail.com":
        notification_message = "Admin sent a new message"
    else:
        notification_message = f"{sender} sent a new message"
        
    print("NOTIFICATION:", receiver, notification_message)
    cursor.execute(
        """
        INSERT INTO notifications(email, message)
        VALUES (?, ?)
        """,
        (
            receiver,
            notification_message
        )
    )

    conn.commit()
    conn.close()

    return {"status": "success"}

@app.route("/test-chat")
def test_chat():
    return {"status": "chat routes loaded"}

@app.route("/api/chat-clients")
def chat_clients():

    conn = sqlite3.connect("users.db")

    cursor = conn.cursor()

    cursor.execute("""
        SELECT DISTINCT sender
        FROM chats
        WHERE sender != 'nithish@gmail.com'
    """)

    clients = cursor.fetchall()

    conn.close()

    return {
        "clients": clients
    }

@app.route("/api/unread-count/<email>")
def unread_count(email):

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT COUNT(*)
        FROM chats
        WHERE receiver=?
        AND is_read=0
        """,
        (email,)
    )

    count = cursor.fetchone()[0]

    conn.close()

    return {
        "count": count
    }

@app.route("/api/mark-read/<email>")
def mark_read(email):

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE chats
        SET is_read=1
        WHERE receiver=?
        """,
        (email,)
    )

    conn.commit()
    conn.close()

    return {"status": "success"}


@app.route("/api/chat-files/<email>")
def get_chat_files(email):

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT id, filename
        FROM chat_files
        WHERE sender=?
        OR receiver=?
        """,
        (email, email)
    )

    files = cursor.fetchall()

    conn.close()

    return {
        "files": files
    }

@app.route("/api/upload-chat-file", methods=["POST"])
def upload_chat_file():

    file = request.files["file"]

    sender = request.form["sender"]
    receiver = request.form["receiver"]

    filename = secure_filename(file.filename)

    filepath = os.path.join(
        app.config["UPLOAD_FOLDER"],
        filename
    )

    file.save(filepath)

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO chat_files(
            sender,
            receiver,
            filename
        )
        VALUES(?,?,?)
        """,
        (
            sender,
            receiver,
            filename
        )
    )

    conn.commit()
    conn.close()

    return {"status": "success"}

@app.route("/api/upload-deliverable", methods=["POST"])
def upload_deliverable():

    file = request.files["file"]

    client_email = request.form["client_email"]
    project_name = request.form["project_name"]

    filename = secure_filename(file.filename)

    file.save(
        os.path.join(
            app.config["UPLOAD_FOLDER"],
            filename
        )
    )

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO deliverables
        (
            client_email,
            project_name,
            file_name
        )
        VALUES (?, ?, ?)
        """,
        (
            client_email,
            project_name,
            filename
        )
    )

    conn.commit()
    conn.close()

    return {
        "status": "success"
    }

@app.route("/uploads/<filename>")
def uploaded_file(filename):

    return send_from_directory(
        app.config["UPLOAD_FOLDER"],
        filename
    )

@app.route("/api/all-chat-files")
def all_chat_files():

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute("""
        SELECT sender, filename
        FROM chat_files
    """)

    files = cursor.fetchall()

    conn.close()

    return {
        "files": files
    }

@app.route("/api/delete-chat-file/<int:file_id>")
def delete_chat_file(file_id):

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute("""
        DELETE FROM chat_files
        WHERE id=?
    """, (file_id,))

    conn.commit()
    conn.close()

    return {
        "status": "success"
    }

@app.route("/api/request-meeting", methods=["POST"])
def request_meeting():

    data = request.json

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO meetings
        (
            client_email,
            meeting_date,
            meeting_time
        )
        VALUES (?, ?, ?)
    """,
    (
        data["email"],
        data["date"],
        data["time"]
    ))

    conn.commit()
    conn.close()

    return {
        "status": "success"
    }

@app.route("/api/meetings")
def get_meetings():

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM meetings
        ORDER BY id DESC
    """)

    meetings = cursor.fetchall()

    conn.close()

    return {
        "meetings": meetings
    }

@app.route("/api/update-meeting/<int:meeting_id>/<status>")
def update_meeting(meeting_id, status):

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE meetings
        SET status=?
        WHERE id=?
    """,
    (status, meeting_id))

    conn.commit()
    conn.close()

    return {
        "status": "success"
    }

@app.route("/api/my-meetings/<email>")
def my_meetings(email):

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM meetings
        WHERE client_email=?
        ORDER BY id DESC
    """, (email,))

    meetings = cursor.fetchall()

    conn.close()

    return {
        "meetings": meetings
    }

@app.route("/api/deliverables/<email>")
def get_deliverables(email):

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT project_name, file_name
        FROM deliverables
        WHERE client_email=?
        """,
        (email,)
    )

    files = cursor.fetchall()

    conn.close()

    return {
        "files": files
    }

@app.route("/api/add-review", methods=["POST"])
def add_review():

    data = request.json

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO reviews
        (
            client_email,
            project_name,
            rating,
            review
        )
        VALUES (?, ?, ?, ?)
        """,
        (
            data["email"],
            data["project"],
            data["rating"],
            data["review"]
        )
    )

    conn.commit()
    conn.close()

    return {
        "status": "success"
    }

@app.route("/api/reviews")
def get_reviews():

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM reviews
        ORDER BY id DESC
    """)

    reviews = cursor.fetchall()

    conn.close()

    return {
        "reviews": reviews
    }  

@app.route("/api/add-payment", methods=["POST"])
def add_payment():

    data = request.json

    remaining = (
        int(data["total_amount"])
        - int(data["paid_amount"])
    )

    status = "Pending"

    if remaining == 0:
        status = "Paid"

    elif remaining < int(data["total_amount"]):
        status = "Partially Paid"

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO payments
        (
            client_email,
            project_name,
            total_amount,
            paid_amount,
            remaining_amount,
            payment_status
        )
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            data["client_email"],
            data["project_name"],
            data["total_amount"],
            data["paid_amount"],
            remaining,
            status
        )
    )

    conn.commit()
    conn.close()

    return {"status": "success"}

@app.route("/api/payments/<email>")
def get_payments(email):

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT *
        FROM payments
        WHERE client_email=?
        """,
        (email,)
    )

    payments = cursor.fetchall()

    conn.close()

    return {
        "payments": payments
    } 

@app.route("/api/generate-proposal", methods=["POST"])
def generate_ai_proposal():

    try:

        data = request.json

        proposal = generate_proposal(
            data["requirements"]
        )

        return {
            "proposal": proposal
        }

    except Exception as e:

        print("ERROR:", e)

        return {
            "error": str(e)
        }, 500
@app.route("/api/place-bid", methods=["POST"])
def place_bid():

    data = request.json

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO bids
        (
            project_id,
            freelancer_email,
            bid_amount,
            delivery_days,
            proposal
        )
        VALUES (?, ?, ?, ?, ?)
        """,
        (
            data["project_id"],
            data["freelancer_email"],
            data["bid_amount"],
            data["delivery_days"],
            data["proposal"]
        )
    )

    conn.commit()
    conn.close()

    return {"message": "Bid Submitted"}



@app.route("/check-bids")
def check_bids():

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM bids")

    rows = cursor.fetchall()

    conn.close()

    return {"rows": rows}

@app.route("/api/my-bids/<email>")
def my_bids(email):

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute("""
    SELECT id,
           project_id,
           bid_amount,
           delivery_days,
           proposal,
           status
    FROM bids
    WHERE freelancer_email=?
    ORDER BY id DESC
""", (email,))

    bids = cursor.fetchall()

    conn.close()

    return {"bids": bids}

@app.route("/api/bids")
def get_bids():
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM bids
        ORDER BY id DESC
    """)

    bids = cursor.fetchall()
    conn.close()

    return {"bids": bids}

@app.route("/api/accept-bid/<int:bid_id>", methods=["POST"])
def accept_bid(bid_id):

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE bids
        SET status='Accepted'
        WHERE id=?
    """, (bid_id,))

    cursor.execute("""
        SELECT project_id, freelancer_email
         FROM bids
         WHERE id=?
    """, (bid_id,))
    bid = cursor.fetchone()

    cursor.execute("""
    INSERT INTO assigned_projects
    (
        project_id,
        freelancer_email,
        status
    )
    VALUES (?, ?, ?)
""", (
    bid[0],
    bid[1],
    "In Progress"
))

    conn.commit()
    conn.close()

    return {
        "message": "Bid Accepted Successfully"
    }

@app.route("/api/assigned-projects/<email>")
def assigned_projects(email):

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute("""
SELECT
    p.id,
    p.project_type,
    p.budget,
    p.description,
    ap.status,
    p.progress
FROM assigned_projects ap
JOIN projects p
ON ap.project_id = p.id
WHERE ap.freelancer_email=?
ORDER BY ap.id DESC
""", (email,))

    projects = cursor.fetchall()

    conn.close()

    return {
        "projects": projects
    }

@app.route("/api/update-progress/<int:project_id>", methods=["POST"])
def update_progress(project_id):

    data = request.json

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE projects
        SET progress=?
        WHERE id=?
    """, (
        data["progress"],
        project_id
    ))

    conn.commit()
    conn.close()

    return {
        "message": "Progress Updated"
    }
    
    
if __name__ == "__main__":
    app.run(debug=True)