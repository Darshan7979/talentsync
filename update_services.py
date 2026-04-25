import re

def update_services_html():
    with open('d:\\syn\\talentsync\\Talentsync Website\\services.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update CSS
    old_css_start = content.find('/* â”€â”€ SERVICE CARD â”€â”€ */')
    old_css_end = content.find('/* â”€â”€ RESPONSIVE GRID â”€â”€ */')
    
    new_css = """/* ── SERVICE CARD ── */
    .srv-card {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      cursor: pointer;
      border: 1px solid rgba(146, 170, 255, 0.28);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
      background: rgba(255, 255, 255, 0.06);
      height: 480px;
      width: 100%;
      transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
    }

    .srv-card:hover {
      transform: translateY(-5px);
      border-color: rgba(220, 186, 104, 0.65);
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
    }

    .srv-card-img {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      transform: scale(1) translate(0%, 0%);
      transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: transform;
      z-index: 0;
    }

    .srv-card:hover .srv-card-img {
      transform: scale(1.12) translate(5%, 5%);
    }

    .srv-card-text {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 144px;
      padding: 24px 28px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      z-index: 3;
    }

    .srv-card-label {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #f6d365;
    }

    .srv-card-title {
      font-size: 22px;
      font-weight: 700;
      color: #fff;
      line-height: 1.3;
      text-shadow: 0 2px 4px rgba(0,0,0,0.6);
    }

    .srv-card-overlay {
      position: absolute;
      inset: 0;
      background: rgba(10, 10, 10, 0.65);
      opacity: 0.3; /* Base opacity to darken images slightly */
      transition: opacity 0.45s ease;
      z-index: 1;
    }

    .srv-card:hover .srv-card-overlay {
      opacity: 0.85; /* Darken a lot on hover so text is readable */
    }

    .srv-card-desc {
      position: absolute;
      inset: 0;
      z-index: 2;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 28px;
      transform: translateX(100%);
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.08s;
    }

    .srv-card:hover .srv-card-desc {
      transform: translateX(0%);
    }

    .srv-card-desc p {
      color: #fff;
      font-size: 15px;
      line-height: 1.65;
      margin-bottom: 20px;
      font-weight: 400;
      text-shadow: 0 1px 3px rgba(0,0,0,0.8);
    }

    .srv-card-read-more {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: #f6d365;
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      text-decoration: none;
      text-shadow: 0 1px 2px rgba(0,0,0,0.8);
    }

    """
    
    content = content[:old_css_start] + new_css + content[old_css_end:]

    # 2. Update HTML
    # We will replace the <div class="srv-grid"> contents
    old_grid_start = content.find('<div class="srv-grid">') + len('<div class="srv-grid">')
    old_grid_end = content.find('</section>', old_grid_start) - len('    </div>\n  ')

    cards_data = [
        {
            "id": "01",
            "label": "Recruitment",
            "title": "Recruitment Process Outsourcing (RPO)",
            "desc": "End-to-end recruitment ownership to reduce time-to-hire, improve quality, and scale hiring efficiently.",
            "link": "recruitment-process-outsourcing.html",
            "image": "./assests/rpo.jpg",
            "delay": "1"
        },
        {
            "id": "02",
            "label": "Staffing",
            "title": "Staffing Solutions",
            "desc": "Flexible staffing for contract, temporary, or permanent roles to match your workforce and timelines.",
            "link": "staffing-solutions.html",
            "image": "./assests/Staffing solutions.jpg",
            "delay": "2"
        },
        {
            "id": "03",
            "label": "IT Recruitment",
            "title": "IT Recruitment",
            "desc": "Specialized sourcing and screening for developers, engineers, and tech leaders - aligned to your stack.",
            "link": "it-recruitment.html",
            "image": "./assests/IT recruitment.jpg",
            "delay": "3"
        },
        {
            "id": "04",
            "label": "HR Outsourcing",
            "title": "HR Outsourcing",
            "desc": "Streamline HR operations with onboarding, employee lifecycle support, and compliance-focused processes.",
            "link": "hr-outsourcing.html",
            "image": "./assests/Hr outscourcing.jpg",
            "delay": "1"
        },
        {
            "id": "05",
            "label": "Custom Software",
            "title": "Customised Software Development",
            "desc": "Build tailored software that fits your workflows - designed for reliability, performance, and maintainability.",
            "link": "customised-software-development.html",
            "image": "./assests/customized software development.jpg",
            "delay": "3"
        },
        {
            "id": "06",
            "label": "Mobile App",
            "title": "Mobile Application Development",
            "desc": "Design and develop scalable Android/iOS apps with a clean UX, strong performance, and secure architecture.",
            "link": "mobile-application-development.html",
            "image": "./assests/mobile app dev.png",
            "delay": "1"
        },
        {
            "id": "07",
            "label": "Web App",
            "title": "Web Application Development",
            "desc": "Modern, secure web applications built for speed, reliability, and scale - aligned to your business goals.",
            "link": "web-application-development.html",
            "image": "./assests/web application development.jpg",
            "delay": "2"
        },
        {
            "id": "08",
            "label": "Data Analytics",
            "title": "Data Analytics Solutions",
            "desc": "Turn raw data into clear dashboards and actionable insights to help teams make faster, better decisions.",
            "link": "data-analytics-solutions.html",
            "image": "./assests/data analytics.png",
            "delay": "3"
        },
        {
            "id": "09",
            "label": "AI & ML",
            "title": "Artificial Intelligence & Machine Learning",
            "desc": "Implement AI/ML solutions to automate workflows, enhance customer experiences, and unlock predictive insights.",
            "link": "artificial-intelligence-machine-learning.html",
            "image": "./assests/ArtificialInteligence.jpg",
            "delay": "1"
        }
    ]

    new_html = "\\n"
    for card in cards_data:
        new_html += f'''
      <!-- {card['title']} -->
      <div class="srv-card reveal reveal-delay-{card['delay']}" onclick="window.location.href='{card['link']}'">
        <div class="srv-card-img" style="background-image: url('{card['image']}');"></div>
        <div class="srv-card-text">
          <span class="srv-card-label">{card['id']} {card['label']}</span>
          <h2 class="srv-card-title">{card['title']}</h2>
        </div>
        <div class="srv-card-overlay"></div>
        <div class="srv-card-desc">
          <p>
            {card['desc']}
          </p>
          <a href="{card['link']}" class="srv-card-read-more">
            Read more
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
'''

    content = content[:old_grid_start] + new_html + "    " + content[old_grid_end:]

    with open('d:\\syn\\talentsync\\Talentsync Website\\services.html', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    update_services_html()
    print("Updated services.html successfully!")
