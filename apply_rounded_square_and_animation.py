import os
import re

base_dir = r"d:\syn\talentsync\Talentsync Website"

# 1. Update SVG to white outline
white_outline_svg = """<svg viewBox="0 0 24 24" width="34" height="34" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM11.964 21c-1.488 0-2.946-.381-4.223-1.101l-.302-.17-3.136.822.84-3.059-.187-.297A8.995 8.995 0 0 1 3.56 12c0-4.962 4.038-9 9.004-9 4.965 0 9.004 4.038 9.004 9s-4.039 9-9.004 9zm0-19.5C6.182 1.5 1.5 6.182 1.5 12c0 1.849.483 3.652 1.401 5.244L1.5 22.5l5.414-1.42A10.457 10.457 0 0 0 11.964 22.5c5.78 0 10.464-4.684 10.464-10.464S17.744 1.5 11.964 1.5z" />
</svg>"""

with open(os.path.join(base_dir, "assests", "whatsapp.svg"), "w", encoding="utf-8") as f:
    f.write(white_outline_svg)

# 2. Update CSS in styles.css
css_path = os.path.join(base_dir, "styles.css")
with open(css_path, "r", encoding="utf-8") as f:
    css_content = f.read()

# Replace the whatsapp-chat-btn class entirely using regex or string slicing to ensure it is clean
import re

new_css = """/* WhatsApp Chat Button Styles */
.whatsapp-chat-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background-color: #25D366; /* Official WhatsApp Color */
  border-radius: 16px; /* Rounded Square */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
  z-index: 9999;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: whatsapp-pulse 2s infinite ease-in-out;
}

.whatsapp-chat-btn:hover {
  animation: none;
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
}

@keyframes whatsapp-pulse {
  0% { transform: scale(1); box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4); }
  50% { transform: scale(1.05); box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6); }
  100% { transform: scale(1); box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4); }
}

/* Responsive adjustments for smaller screens */
@media (max-width: 768px) {
  .whatsapp-chat-btn {
    bottom: 20px;
    right: 20px;
    width: 55px;
    height: 55px;
    border-radius: 14px;
  }
}

@media (max-width: 480px) {
  .whatsapp-chat-btn {
    bottom: 15px;
    right: 15px;
    width: 50px;
    height: 50px;
    border-radius: 12px;
  }
  .whatsapp-chat-btn svg {
    width: 28px;
    height: 28px;
  }
}"""

# We'll just replace everything from "/* WhatsApp Chat Button Styles */" to the end of the file.
parts = css_content.split("/* WhatsApp Chat Button Styles */")
if len(parts) > 1:
    css_content = parts[0] + new_css

with open(css_path, "w", encoding="utf-8") as f:
    f.write(css_content)

print("Updated everything.")
