import os
import glob

html_snippet = """
<!-- WhatsApp Chat Button -->
<a href="https://wa.me/919422003749?text=Hello,%20I%20want%20more%20information" class="whatsapp-chat-btn" target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">
  <svg viewBox="0 0 32 32" width="34" height="34" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.05 2.1C8.36 2.1 2.1 8.35 2.1 16.03c0 2.45.64 4.84 1.85 6.94L2.1 29.9l7.07-1.85a13.88 13.88 0 006.88 1.82c7.68 0 13.93-6.26 13.93-13.94S23.73 2.1 16.05 2.1zm0 23.36c-2.07 0-4.1-.55-5.87-1.6l-.42-.25-4.36 1.14 1.16-4.25-.28-.44a11.53 11.53 0 01-1.76-6.17c0-6.4 5.21-11.61 11.63-11.61 6.42 0 11.64 5.21 11.64 11.62s-5.22 11.6-11.63 11.6zm6.38-8.73c-.35-.18-2.07-1.02-2.39-1.14-.32-.12-.55-.18-.78.17-.23.35-.9 1.14-1.1 1.37-.2.23-.4.26-.75.09a9.55 9.55 0 01-2.81-1.74 10.56 10.56 0 01-1.95-2.42c-.2-.35-.02-.54.15-.71.16-.16.35-.41.53-.62.18-.21.23-.35.35-.58.12-.24.06-.44-.03-.62-.09-.18-.78-1.88-1.07-2.58-.28-.68-.56-.58-.78-.59-.2-.01-.43-.01-.66-.01-.23 0-.61.09-.93.44-.32.35-1.22 1.2-1.22 2.92s1.25 3.39 1.43 3.62c.17.24 2.47 3.77 5.98 5.29.84.36 1.49.58 2 .74.84.27 1.6.23 2.2.14.68-.1 2.07-.85 2.36-1.66.29-.82.29-1.52.2-1.66-.08-.15-.31-.24-.66-.41z"/>
  </svg>
</a>
</body>"""

css_snippet = """
/* WhatsApp Chat Button Styles */
.whatsapp-chat-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background-color: #25D366; /* Official WhatsApp Color */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
  z-index: 9999; /* Ensures it stays on top of all other elements */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Hover Animation */
.whatsapp-chat-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
}

/* Responsive adjustments for smaller screens */
@media (max-width: 768px) {
  .whatsapp-chat-btn {
    bottom: 20px;
    right: 20px;
    width: 55px;
    height: 55px;
  }
}

@media (max-width: 480px) {
  .whatsapp-chat-btn {
    bottom: 15px;
    right: 15px;
    width: 50px;
    height: 50px;
  }
  .whatsapp-chat-btn svg {
    width: 28px;
    height: 28px;
  }
}
"""

base_dir = r"d:\syn\talentsync\Talentsync Website"

# Append CSS to styles.css
css_path = os.path.join(base_dir, "styles.css")
with open(css_path, "a", encoding="utf-8") as f:
    f.write(css_snippet)

# Update HTML files
html_files = glob.glob(os.path.join(base_dir, "**/*.html"), recursive=True)
for file_path in html_files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    if "whatsapp-chat-btn" not in content and "</body>" in content:
        content = content.replace("</body>", html_snippet)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {file_path}")
