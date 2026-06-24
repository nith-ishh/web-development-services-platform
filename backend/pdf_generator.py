from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

def generate_pdf(
    client_name,
    website_type,
    pages,
    cost,
    days
):

    pdf = SimpleDocTemplate("quotation.pdf")

    styles = getSampleStyleSheet()

    elements = []

    elements.append(
        Paragraph(
            "WEB DEVELOPMENT SERVICES QUOTATION",
            styles["Title"]
        )
    )

    elements.append(Spacer(1,20))

    elements.append(
        Paragraph(
            f"Client Name : {client_name}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Website Type : {website_type}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Number of Pages : {pages}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Estimated Cost : ₹{cost}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Development Time : {days} Days",
            styles["Normal"]
        )
    )

    elements.append(Spacer(1,20))

    elements.append(
        Paragraph(
            "Thank You for Choosing Our Services",
            styles["Heading2"]
        )
    )

    pdf.build(elements)