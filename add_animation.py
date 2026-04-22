import os

css_path = r"d:\syn\talentsync\Talentsync Website\styles.css"
with open(css_path, "r", encoding="utf-8") as f:
    css_content = f.read()

animation_css = """
@keyframes whatsapp-jiggle {
  0%, 10% { transform: rotate(0) scale(1); filter: drop-shadow(0 4px 10px rgba(37, 211, 102, 0.4)); }
  15% { transform: rotate(-10deg) scale(1.1); filter: drop-shadow(0 6px 12px rgba(37, 211, 102, 0.6)); }
  20% { transform: rotate(10deg) scale(1.1); filter: drop-shadow(0 6px 12px rgba(37, 211, 102, 0.6)); }
  25% { transform: rotate(-10deg) scale(1.1); filter: drop-shadow(0 6px 12px rgba(37, 211, 102, 0.6)); }
  30% { transform: rotate(10deg) scale(1.1); filter: drop-shadow(0 6px 12px rgba(37, 211, 102, 0.6)); }
  35%, 100% { transform: rotate(0) scale(1); filter: drop-shadow(0 4px 10px rgba(37, 211, 102, 0.4)); }
}
"""

if "@keyframes whatsapp-jiggle" not in css_content:
    # replace transition property
    css_content = css_content.replace(
        "transition: transform 0.3s ease, box-shadow 0.3s ease;",
        "transition: transform 0.3s ease, filter 0.3s ease;\n  animation: whatsapp-jiggle 4s infinite ease-in-out;"
    )
    
    # modify hover state to remove animation
    css_content = css_content.replace(
        ".whatsapp-chat-btn:hover {\n  transform: scale(1.1);",
        ".whatsapp-chat-btn:hover {\n  animation: none;\n  transform: scale(1.1);"
    )
    
    # append keyframes
    css_content += animation_css

    with open(css_path, "w", encoding="utf-8") as f:
        f.write(css_content)

print("Added jiggle animation to styles.css.")
