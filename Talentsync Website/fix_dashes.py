import os
import re

def fix_dashes():
    dir_path = "."
    for filename in os.listdir(dir_path):
        if filename.endswith(".html"):
            filepath = os.path.join(dir_path, filename)
            with open(filepath, "r", encoding="utf-8") as f:
                text = f.read()
            
            # Replace em dash surrounded by optional spaces with comma and space
            new_text = re.sub(r'\s*—\s*', ', ', text)
            
            if new_text != text:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(new_text)
                print(f"Updated {filename}")

if __name__ == "__main__":
    fix_dashes()
