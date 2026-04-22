import os

replacements = {
    'recruitment-process-outsourcing.html': ('"./assests/rpo.jpg"', '"https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&q=80"'),
    'staffing-solutions.html': ('"./assests/Staffing solutions.jpg"', '"https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"'),
    'it-recruitment.html': ('"./assests/IT recruitment.jpg"', '"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80"'),
    'hr-outsourcing.html': ('"./assests/Hr outscourcing.jpg"', '"https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80"'),
    'customised-software-development.html': ('"./assests/customized software development.jpg"', '"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80"'),
    'mobile-application-development.html': ('"./assests/mobile app dev.png"', '"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80"'),
    'web-application-development.html': ('"./assests/web application development.jpg"', '"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80"'),
    'data-analytics-solutions.html': ('"./assests/data analytics.png"', '"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"'),
    'artificial-intelligence-machine-learning.html': ('"./assests/ArtificialInteligence.jpg"', '"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80"')
}

base_dir = r"d:\syn\talentsync\Talentsync Website"

for filename, (old_img, new_img) in replacements.items():
    filepath = os.path.join(base_dir, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = content.replace(old_img, new_img)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename}")
    else:
        print(f"File not found: {filename}")
